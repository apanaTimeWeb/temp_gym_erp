/**
 * Restrict WhatsApp handoffs to actual recipient numbers. Never construct an
 * external messaging URL with a missing recipient or path/query characters.
 * Normalizes 10-digit Indian numbers with country code 91, strips leading 0 from 11-digit numbers,
 * prevents double 91 prefixes, and validates length 7-15.
 * Empty result means no safe handoff is available.
 */
export function TrainerMembersBuildWhatsAppUrl(phone: string, message: string): string {
  const rawDigits = String(phone || '').replace(/\D/g, '');
  if (!rawDigits) return '';

  const cleanDigits = rawDigits.startsWith('0') && rawDigits.length === 11 ? rawDigits.slice(1) : rawDigits;
  const cleanPhone =
    cleanDigits.startsWith('91') && cleanDigits.length === 12
      ? cleanDigits
      : cleanDigits.length === 10
      ? `91${cleanDigits}`
      : cleanDigits;

  if (!/^\d{7,15}$/.test(cleanPhone)) return '';
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
