// RESPONSIBILITY: Masks sensitive personal identifiers for Admin list and summary views.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_navigation/utils/AdminNavigationLayoutMaskSensitiveData.ts)

/**
 * Masks a phone number while preserving the first two and last four digits.
 * Non-digit input is returned in a canonical masked form without exposing the full value.
 */
export function maskSensitiveData(value: string | null | undefined): string {
  if (!value) return '—';
  const digits = value.replace(/\D/g, '');
  if (digits.length < 6) return '****';
  return `${digits.slice(0, 2)}****${digits.slice(-4)}`;
}
