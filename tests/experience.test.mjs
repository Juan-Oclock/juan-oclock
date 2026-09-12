import test from 'node:test';
import assert from 'node:assert/strict';
import { copyEmail, emailDraft } from '../src/lib/experience.mjs';

test('contact draft preserves special characters and cannot inject mail headers', () => {
  const draft = new URL(emailDraft('Juan & Co', 'hello@example.com', 'An idea? Yes & more\nSecond line'));
  assert.equal(draft.protocol, 'mailto:');
  assert.equal(draft.pathname, 'onelasttimejuan@gmail.com');
  assert.equal(draft.searchParams.get('subject'), 'Portfolio hello from Juan & Co');
  assert.match(draft.searchParams.get('body'), /An idea\? Yes & more\nSecond line/);
  assert.equal(draft.searchParams.has('bcc'), false);
});

test('email copy writes the actual address and reports success only after it resolves', async () => {
  let stored = '';
  const result = await copyEmail('juan@example.com', { writeText: async value => { stored = value; } });
  assert.equal(stored, 'juan@example.com');
  assert.equal(result, 'copied');
});

test('blocked or unavailable clipboard gives the visitor a manual-copy fallback', async () => {
  assert.equal(await copyEmail('juan@example.com', undefined), 'unavailable');
  assert.equal(await copyEmail('juan@example.com', { writeText: async () => { throw new Error('Permission denied'); } }), 'unavailable');
});
