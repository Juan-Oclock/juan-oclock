# Direct contact email

The form posts JSON to `/api/contact`. Resend sends a plain-text message to the fixed recipient `onelasttimejuan@gmail.com`; Reply-To is the visitor's validated address. The browser cannot choose a recipient or access the API key. No message database is created.

## Activate delivery

Local activation completed on September 12, 2026. `juan-oclock.com` is verified in the `junlargo78` Resend team after the approved ownership transfer and Cloudflare DKIM update. Existing website and mail-routing records were preserved. The `juan-oclock-portfolio` key has sending-only access restricted to this domain and is stored in the ignored `.env.local`; the sender is `Juan's portfolio <hello@juan-oclock.com>`.

One approved test was submitted through Chrome at `http://127.0.0.1:4173/`. The form displayed “Message sent. Thanks for saying hello!” and cleared its fields. Resend reported **Delivered** to `onelasttimejuan@gmail.com` for “Portfolio hello from Juan portfolio test” (email ID `2435f97e-7913-42aa-a322-c5962581355b`). Gmail inbox placement was not inspected.

On September 12, 2026, `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` were saved as Production secrets in Vercel's existing `juan-oclock` project. They take effect in the next production deployment. No credentials are included in this repository.

1. Verify `juan-oclock.com` (or a dedicated sending subdomain) in [Resend Domains](https://resend.com/domains) using the exact DNS records Resend provides. Do not replace existing mail records blindly.
2. Create a Resend API key with sending access restricted to that domain.
3. Copy `docs/contact-email.env.example` to the project root as `.env.local`. Set `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` to a verified sender, such as `Juan's portfolio <hello@juan-oclock.com>`. Never put either credential in a `NEXT_PUBLIC_` variable or commit a real key.
4. Restart the local server. For production, add the same two environment variables to the existing Vercel project and deploy the implementation when ready.
5. Send an explicitly authorized test submission, verify receipt in Juan's inbox (including spam), and check Reply-To. API acceptance alone does not prove inbox delivery.

Resend's `onboarding@resend.dev` sender is testing-only and can send only to the email address associated with the Resend account. The implementation intentionally has no default sender. Without configuration it returns a helpful 503 response and retains the visitor's text.

## Behavior and safeguards

- Required, length-limited fields validated on the server. JSON body capped at 16 KB, even without Content-Length.
- Same-origin requests only; hidden honeypot rejects basic form bots. Email body is plain text, so submitted HTML is not executed.
- Per-instance best-effort limits: 5 attempts per IP per 10 minutes on Vercel, 30 total per instance. Local development uses one shared bucket. This is not a durable distributed limit: cold starts and multiple instances reset/split counters. Configure Vercel firewall rate limiting or a shared limiter before relying on this against sustained automated abuse.
- Resend request times out after 10 seconds; browser after 15 seconds. A stable idempotency key is reused for unchanged retries within the page session to avoid duplicate provider sends. The key changes after successful submission or edits.
- Submit is disabled while sending. Success clears the form only after Resend accepts an email and returns an ID. Errors preserve fields so the visitor can retry. The recipient address is not displayed in the contact section.
- Do not log submitted names, addresses, message bodies, or API keys. Provider failures return generic messages.

## Verification

Run `npm test`, `npm run lint`, `npm run typecheck`, and `npm run build` (stop the dev server before building).
Automated tests use simulated provider responses, never actual email delivery. They cover recipient restrictions, reply-to, retry keys, validation, origin/body limits, honeypot rejection, missing config, provider failures, and throttle expiry.

References: [Resend Send Email API](https://resend.com/docs/api-reference/emails/send-email), [idempotency](https://resend.com/docs/dashboard/emails/idempotency-keys), [test sender restrictions](https://resend.com/docs/knowledge-base/403-error-resend-dev-domain).
