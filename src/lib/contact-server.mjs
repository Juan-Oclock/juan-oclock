import { createHash } from 'node:crypto';

const WINDOW = 10 * 60 * 1000;
const MAX_BODY = 16 * 1024;
const failure = (status, error, headers = {}) => Response.json({ error }, { status, headers: { 'Cache-Control': 'no-store', ...headers } });

/** @param {{env?: Record<string, string | undefined>, fetchImpl?: typeof fetch, now?: () => number}} options */
export function createContactHandler({ env = process.env, fetchImpl = fetch, now = Date.now } = {}) {
  // Best-effort per-instance throttling. Use a platform firewall for distributed limits.
  const attempts = new Map();
  let total = { count: 0, until: 0 };
  return async function handleContact(request) {
    const publicUrl = new URL(request.url);
    // Next's local adapter normalizes request.url to localhost; Host keeps the browser-facing address.
    publicUrl.host = request.headers.get('host') || publicUrl.host;
    if (request.headers.get('origin') !== publicUrl.origin) return failure(403, 'Please send your message from this website.');
    if (request.headers.get('content-type')?.split(';')[0].trim() !== 'application/json') return failure(415, 'Please submit the contact form.');
    let data;
    try {
      const reader = request.body?.getReader();
      if (!reader) return failure(400, 'Please complete all fields.');
      let bytes = 0;
      const chunks = [];
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        bytes += value.byteLength;
        if (bytes > MAX_BODY) { await reader.cancel(); return failure(413, 'Your message is too long.'); }
        chunks.push(Buffer.from(value));
      }
      data = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    } catch { return failure(400, 'Please check your message and try again.'); }
    if (!data || typeof data !== 'object' || Array.isArray(data)) return failure(400, 'Please complete all fields.');
    const { name, email, message, website, submissionId } = data;
    if (typeof name !== 'string' || !name.trim() || name.length > 100 || /[\r\n\x00-\x1f\x7f]/.test(name)
      || typeof email !== 'string' || email.length > 254 || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email) || /[\x00-\x1f\x7f]/.test(email)
      || typeof message !== 'string' || !message.trim() || message.length > 1500 || message.includes('\0')
      || typeof submissionId !== 'string' || !/^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(submissionId)
      || (website !== undefined && website !== '')) return failure(400, 'Please check your name, email, and message.');

    if (!env.RESEND_API_KEY?.trim() || !env.CONTACT_FROM_EMAIL?.trim()) return failure(503, 'The form is temporarily unavailable. Please try again later.');
    const time = now();
    for (const [key, entry] of attempts) if (entry.until <= time) attempts.delete(key);
    // Vercel sets this header; fall back to a shared bucket outside Vercel.
    const ip = env.VERCEL ? request.headers.get('x-vercel-forwarded-for')?.split(',')[0].trim() : 'local';
    const key = createHash('sha256').update(ip || 'unknown').digest('hex');
    const entry = attempts.get(key) || { count: 0, until: time + WINDOW };
    if (total.until <= time) total = { count: 0, until: time + WINDOW };
    if (entry.count >= 5 || total.count >= 30) return failure(429, 'Too many attempts. Please wait a few minutes before trying again.', { 'Retry-After': String(Math.max(1, Math.ceil(((entry.count >= 5 ? entry : total).until - time) / 1000))) });
    entry.count++;
    total.count++;
    attempts.set(key, entry);
    const mail = {
      from: env.CONTACT_FROM_EMAIL.trim(),
      to: ['onelasttimejuan@gmail.com'],
      reply_to: email.trim(),
      subject: `Portfolio hello from ${name.trim()}`,
      text: `New message from your portfolio\n\nName: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`,
    };
    const body = JSON.stringify(mail);
    const idempotencyKey = createHash('sha256').update(submissionId + body).digest('hex');
    try {
      const response = await fetchImpl('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json', 'Idempotency-Key': `contact/${idempotencyKey}` },
        body, signal: AbortSignal.timeout(10000),
      });
      if (!response.ok) return failure(502, 'Your message could not be sent. Please try again in a moment.');
      const result = await response.json();
      if (typeof result?.id !== 'string' || !result.id) return failure(502, 'Your message could not be confirmed. Please try again.');
      return Response.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } });
    } catch { return failure(502, 'Your message could not be confirmed. Please try again in a moment.'); }
  };
}
