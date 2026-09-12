'use client';

import { useRef, useState } from 'react';
import { PiArrowUpRight } from 'react-icons/pi';

export default function Contact() {
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState('');
  const inFlight = useRef(false);
  const submission = useRef({ body: '', id: '' });
  async function handleSend(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    const form = event.currentTarget;
    const values = new FormData(form);
    const fields = {
      name: String(values.get('name') || '').trim(),
      email: String(values.get('email') || '').trim(),
      message: String(values.get('message') || '').trim(),
      website: String(values.get('website') || ''),
    };
    inFlight.current = true;
    setSending(true);
    setFeedback('');
    try {
      const body = JSON.stringify(fields);
      if (body !== submission.current.body) submission.current = { body, id: crypto.randomUUID() };
      const response = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...fields, submissionId: submission.current.id }),
        signal: AbortSignal.timeout(15000),
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true) {
        setFeedback(typeof result.error === 'string' ? result.error : 'Couldn’t send your message. Please try again in a moment.');
        return;
      }
      setFeedback('Message sent. Thanks for saying hello!');
      form.reset();
      submission.current = { body: '', id: '' };
    } catch {
      setFeedback('Couldn’t confirm your message was sent. Please try again in a moment. Your text is still here.');
    } finally {
      inFlight.current = false;
      setSending(false);
    }
  }
  return (
    <section id="contact" className="contact content-width section-space" aria-labelledby="contact-title" data-reveal-group>
      <div className="contact-intro">
      <h2 id="contact-title" data-reveal>Got a “wouldn’t it be cool if…”?</h2>
      <p className="contact-description" data-reveal>Send it over. I like fun ideas and interesting people.</p>
      <p className="contact-footnote">Side project, collaboration, or a particularly good dad joke. I’m listening.</p>
      </div>
      <form className="contact-form" onSubmit={handleSend} aria-busy={sending} data-reveal>
        <div className="contact-trap" aria-hidden="true"><label>Leave this empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
        <div className="form-pair">
          <label htmlFor="contact-name">Your name<input data-lpignore="true" id="contact-name" name="name" disabled={sending} autoComplete="name" required maxLength={100} placeholder="What should I call you?" /></label>
          <label htmlFor="contact-email">Your email<input data-lpignore="true" id="contact-email" name="email" disabled={sending} type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com" /></label>
        </div>
        <label htmlFor="contact-message">What’s on your mind?<textarea id="contact-message" name="message" disabled={sending} required maxLength={1500} rows={5} placeholder="It starts with a small idea…" /></label>
        <div className="form-bottom"><button className="button button-light" type="submit" disabled={sending}>{sending ? 'Sending…' : 'Send message'} <PiArrowUpRight aria-hidden="true" /></button><p>Straight to my inbox.<br />No email app needed.</p></div>
        <p className="form-feedback" role="status">{feedback}</p>
      </form>
    </section>
  );
}
