/**
 * Masks sensitive personal identifiers (phone numbers, email addresses) for UI display.
 */
export function maskSensitiveData(value: string | null | undefined, kind?: string): string {
  if (!value) return '—';
  
  if (kind === 'email' || (kind !== 'phone' && value.includes('@'))) {
    const parts = value.split('@');
    if (parts.length !== 2) return '****';
    const [local, domain] = parts;
    const prefix = local.length > 2 ? local.slice(0, 2) : local.slice(0, 1);
    return `${prefix}****@${domain}`;
  }

  const digits = value.replace(/\D/g, '');
  if (digits.length < 6) return '****';
  return `${digits.slice(0, 2)}****${digits.slice(-4)}`;
}

export default {
  maskSensitiveData,
};

