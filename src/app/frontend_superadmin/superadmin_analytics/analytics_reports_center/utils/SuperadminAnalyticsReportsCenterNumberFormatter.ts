/** Formats finite display numbers using a caller-selected locale. */
export function formatNumber(value: number, locale = 'en'): string {
 return Number.isFinite(value) ? new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }).format(value) : '—';
}
/** Compact notation for report axes; monetary values use the dedicated currency utility. */
export function formatKPI(value: number, locale = 'en'): string {
 return Number.isFinite(value) ? new Intl.NumberFormat(locale, { notation: 'compact', maximumFractionDigits: 1 }).format(value) : '—';
}
