/** Format a numeric metric using the active locale without changing meaningful zero values. */
export function formatSuperadminGymsNumber(value: number | null | undefined, locale: string): string {
  if (value === null || value === undefined || !Number.isFinite(value)) return '—';
  return new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(value);
}
