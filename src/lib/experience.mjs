/** @param {string} name @param {string} email @param {string} message */
export function emailDraft(name, email, message) {
  const subject = `Portfolio hello from ${name.trim().replace(/[\r\n]/g, ' ')}`;
  const body = `Hi Juan,\n\n${message.trim()}\n\nFrom: ${name.trim()}\nReply to: ${email.trim()}`;
  return `mailto:onelasttimejuan@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** @param {string} email @param {{ writeText: (value: string) => Promise<void> } | undefined} clipboard */
export async function copyEmail(email, clipboard) {
  if (!clipboard?.writeText) return 'unavailable';
  try {
    await clipboard.writeText(email);
    return 'copied';
  } catch {
    return 'unavailable';
  }
}
