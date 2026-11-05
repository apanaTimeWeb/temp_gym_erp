/**
 * Build a recipient-safe external email handoff without allowing untrusted
 * address text to inject another mailto header or additional recipients.
 * Empty result means the recipient is not a valid single address.
 */
export function TrainerMembersBuildMailtoUrl(email: string, subject: string, body: string): string {
  const recipient = email.trim();
  if (!/^[^\s@,;?&:]+@[^\s@,;?&:]+\.[^\s@,;?&:]+$/.test(recipient)) return '';
  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
