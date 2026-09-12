import test from 'node:test';
import assert from 'node:assert/strict';
import { createContactHandler } from '../src/lib/contact-server.mjs';

const env = { RESEND_API_KEY: 'test-only', CONTACT_FROM_EMAIL: 'Portfolio <hello@example.com>' };
const payload = { name: 'Visitor', email: 'visitor@example.com', message: 'Hello <Juan> & friends!', website: '', submissionId: 'c2f78b5b-420b-4379-a5e9-6c04143bcff5' };
const request = (body = payload, headers = {}) => new Request('https://juan-oclock.com/api/contact', {
  method: 'POST', headers: { origin: 'https://juan-oclock.com', 'content-type': 'application/json', ...headers }, body: typeof body === 'string' ? body : JSON.stringify(body),
});

test('sends plain-text mail only to Juan, with visitor reply-to and stable retry key', async () => {
  const sent = [];
  const handle = createContactHandler({ env, fetchImpl: async (url, options) => {
    sent.push({ url, ...options }); return Response.json({ id: 'email-id' });
  } });
  assert.equal((await handle(request({ ...payload, to: 'attacker@example.com' }))).status, 200);
  assert.equal((await handle(request())).status, 200);
  const mail = JSON.parse(sent[0].body);
  assert.deepEqual(mail.to, ['onelasttimejuan@gmail.com']);
  assert.equal(mail.reply_to, 'visitor@example.com');
  assert.match(mail.text, /Hello <Juan> & friends!/);
  assert.equal(mail.html, undefined);
  assert.equal(sent[0].url, 'https://api.resend.com/emails');
  assert.equal(sent[0].headers['Idempotency-Key'], sent[1].headers['Idempotency-Key']);
});

test('invalid, cross-origin, oversized, and honeypot submissions never reach email service', async () => {
  let sends = 0;
  const handle = createContactHandler({ env, fetchImpl: async () => { sends++; return Response.json({ id: 'id' }); } });
  for (const body of [null, {}, { ...payload, name: '  ' }, { ...payload, email: 'bad\r\nBcc:x@y.com' }, { ...payload, name: 'Name\nBcc' }, { ...payload, message: 'x'.repeat(1501) }, { ...payload, submissionId: 'bad' }]) {
    assert.equal((await handle(request(body))).status, 400);
  }
  assert.equal((await handle(request('{'))).status, 400);
  assert.equal((await handle(request(payload, { origin: 'https://elsewhere.example' }))).status, 403);
  assert.equal((await handle(request(payload, { 'content-type': 'text/plain' }))).status, 415);
  assert.equal((await handle(request('x'.repeat(17000)))).status, 413);
  assert.equal((await handle(request({ ...payload, website: 'bot.example' }))).status, 400);
  assert.equal(sends, 0);
});

test('missing configuration and provider failures never report success or expose credentials', async () => {
  const missing = createContactHandler({ env: {}, fetchImpl: async () => { throw new Error('must not send'); } });
  assert.equal((await missing(request())).status, 503);
  for (const fetchImpl of [async () => Response.json({ message: 'test-only secret' }, { status: 401 }), async () => { throw new Error('test-only secret'); }, async () => Response.json({})]) {
    const response = await createContactHandler({ env, fetchImpl })(request());
    assert.equal(response.status, 502);
    assert.doesNotMatch(await response.text(), /test-only secret/);
  }
});

test('repeated attempts are throttled and the window expires', async () => {
  let time = 1000;
  const handle = createContactHandler({ env, now: () => time, fetchImpl: async () => Response.json({ id: 'id' }) });
  for (let i = 0; i < 5; i++) assert.equal((await handle(request())).status, 200);
  const limited = await handle(request());
  assert.equal(limited.status, 429);
  assert.ok(Number(limited.headers.get('retry-after')) > 0);
  time += 600001;
  assert.equal((await handle(request())).status, 200);
});

test('uses the public Host header when Next normalizes the internal URL to localhost', async () => {
  const handle = createContactHandler({ env: {} });
  const local = new Request('http://localhost:4173/api/contact', {
    method: 'POST', headers: { host: '127.0.0.1:4173', origin: 'http://127.0.0.1:4173', 'content-type': 'application/json' }, body: JSON.stringify(payload),
  });
  assert.equal((await handle(local)).status, 503);
});
