import { format } from 'date-fns';
import { enIN, hi } from 'date-fns/locale';
/** Formats non-monetary display metrics inside this leaf. */
export function formatNumber(value: number | null | undefined, locale = 'en'): string { return typeof value === 'number' && Number.isFinite(value) ? new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }).format(value) : '—'; }
/** Formats a UTC API timestamp using the viewer's local time and active script locale. */
export function formatDateTime(value: string | null | undefined, locale = 'en'): string { if (!value) return '—'; const date = new Date(value); if (Number.isNaN(date.getTime())) return '—'; return format(date, 'dd MMM yyyy, HH:mm', { locale: locale.startsWith('hi') ? hi : enIN }); }
