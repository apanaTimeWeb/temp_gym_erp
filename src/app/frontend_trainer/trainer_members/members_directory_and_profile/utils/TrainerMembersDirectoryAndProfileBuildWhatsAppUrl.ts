/**
 * Restrict WhatsApp handoffs to actual recipient numbers. Never construct an
 * external messaging URL with a missing recipient or path/query characters.
 * Empty result means no safe handoff is available.
 */
export function TrainerMembersBuildWhatsAppUrl(phone: string, message: string): string {
  const digits = phone.replace(/\D/g, '');
  if (!/^\d{7,15}$/.test(digits)) return '';
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
