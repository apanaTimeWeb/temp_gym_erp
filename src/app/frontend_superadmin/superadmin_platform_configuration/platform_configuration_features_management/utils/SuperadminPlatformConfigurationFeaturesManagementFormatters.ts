'use client';
/** Feature-local display formatters. */
import { format as formatDateValue, parseISO } from 'date-fns';
import { enUS, hi } from 'date-fns/locale';

const getLocaleTag = (): string => {
  if (typeof document !== 'undefined' && document.documentElement.lang) return document.documentElement.lang;
  return 'en-IN';
};
const getDateFnsLocale = () => /^(hi|hi-IN)(-|$)/i.test(getLocaleTag()) ? hi : enUS;
const getNumberLocale = (): string => getLocaleTag();

export function formatNumber(value: number | null | undefined): string {
  if (value == null || Number.isNaN(value)) return '—';
  return new Intl.NumberFormat(getNumberLocale(), { maximumFractionDigits: 0 }).format(value);
}
export function formatPercent1dp(value: number | null | undefined): string {
  if (value == null || Number.isNaN(value)) return '—';
  return `${new Intl.NumberFormat(getNumberLocale(), { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(value)}%`;
}
export function formatDateTime(value: string | number | Date | null | undefined): string {
  if (value == null || value === '') return '—';
  const date = (() => { if (value instanceof Date) { return (value); } if (typeof value === 'number') { return (new Date(value)); } return (parseISO(value)); })();
  if (Number.isNaN(date.getTime())) return '—';
  return formatDateValue(date, 'dd MMM yyyy, HH:mm', { locale: getDateFnsLocale() });
}
export function formatDate(value: string | number | Date | null | undefined): string {
  if (value == null || value === '') return '—';
  const date = (() => { if (value instanceof Date) { return (value); } if (typeof value === 'number') { return (new Date(value)); } return (parseISO(value)); })();
  if (Number.isNaN(date.getTime())) return '—';
  return formatDateValue(date, 'dd MMM yyyy', { locale: getDateFnsLocale() });
}
export function formatDuration(seconds: number | null | undefined): string {
  if (seconds == null || Number.isNaN(seconds)) return '—';
  const total = Math.max(0, Math.round(seconds));
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const remainder = total % 60;
  return (() => { if (hours) { return (`${hours}h ${minutes}m`); } if (minutes) { return (`${minutes}m ${remainder}s`); } return (`${remainder}s`); })();
}
export function formatKPI(value: number | null | undefined): string {
  if (value == null || Number.isNaN(value)) return '—';
  return new Intl.NumberFormat(getNumberLocale(), { notation: 'compact', maximumFractionDigits: 1 }).format(value);
}
export function formatDecimal(value: number | null | undefined, maximumFractionDigits = 2): string {
  if (value == null || Number.isNaN(value)) return '—';
  return new Intl.NumberFormat(getNumberLocale(), { maximumFractionDigits }).format(value);
}
