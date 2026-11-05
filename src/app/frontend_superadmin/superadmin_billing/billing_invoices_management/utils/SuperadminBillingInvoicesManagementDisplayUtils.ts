import { format, parseISO } from 'date-fns';
import { enUS, hi } from 'date-fns/locale';

export function displaySuperadminInvoiceValue(value: unknown, fallback = '—'): string {
  if (value === null || value === undefined) return fallback;
  if (typeof value === 'string' && value.trim() === '') return fallback;
  if (typeof value === 'number' && !Number.isFinite(value)) return fallback;
  return String(value);
}

export function formatSuperadminInvoiceDate(value: string | number | Date | null | undefined, locale: string, fallback = '—'): string {
  if (value === null || value === undefined || value === '') return fallback;
  const date = (() => { if (value instanceof Date) { return (value); } if (typeof value === 'string') { return (parseISO(value)); } return (new Date(value)); })();
  if (Number.isNaN(date.getTime())) return fallback;
  try { return format(date, 'PP', { locale: locale.toLowerCase().startsWith('hi') ? hi : enUS }); } catch { return fallback; }
}
