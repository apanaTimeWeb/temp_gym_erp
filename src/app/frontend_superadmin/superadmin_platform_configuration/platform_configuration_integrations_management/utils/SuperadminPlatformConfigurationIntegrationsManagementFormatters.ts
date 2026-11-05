'use client';
import { format as formatDateValue, parseISO } from 'date-fns';
import { enUS, hi } from 'date-fns/locale';

function getLocale(): string {
  return typeof document !== 'undefined' && document.documentElement.lang ? document.documentElement.lang : 'en-IN';
}
function resolveDateLocale(language?: string) {
  const requested = language ?? getLocale();
  return requested.toLowerCase().startsWith('hi') ? hi : enUS;
}
function parseDate(value: string | Date | null | undefined): Date | null {
  if (value == null || value === '') return null;
  const date = value instanceof Date ? value : parseISO(value);
  return Number.isNaN(date.getTime()) ? null : date;
}
export function formatNumber(value: number | null | undefined): string {
  if (value == null || !Number.isFinite(value)) return '—';
  return new Intl.NumberFormat(getLocale(), { maximumFractionDigits: 0 }).format(value);
}
export function formatPercent1dp(value: number | null | undefined): string {
  if (value == null || !Number.isFinite(value)) return '—';
  return `${new Intl.NumberFormat(getLocale(), { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(value)}%`;
}
export function formatDateTime(value: string | Date | null | undefined, language?: string): string {
  const date = parseDate(value);
  return date ? formatDateValue(date, 'dd MMM yyyy, HH:mm', { locale: resolveDateLocale(language) }) : '—';
}
export function formatDate(value: string | Date | null | undefined, language?: string): string {
  const date = parseDate(value);
  return date ? formatDateValue(date, 'dd MMM yyyy', { locale: resolveDateLocale(language) }) : '—';
}
export function formatDuration(seconds: number | null | undefined): string {
  if (seconds == null || !Number.isFinite(seconds)) return '—';
  const total = Math.max(0, Math.round(seconds)); const hours = Math.floor(total / 3600); const minutes = Math.floor((total % 3600) / 60); const remainder = total % 60;
  return (() => { if (hours) { return (`${hours}h ${minutes}m`); } if (minutes) { return (`${minutes}m ${remainder}s`); } return (`${remainder}s`); })();
}
export function formatKPI(value: number | null | undefined): string {
  if (value == null || !Number.isFinite(value)) return '—';
  return new Intl.NumberFormat(getLocale(), { notation: 'compact', maximumFractionDigits: 1 }).format(value);
}
export function formatDecimal(value: number | null | undefined, maximumFractionDigits = 2): string {
  if (value == null || !Number.isFinite(value)) return '—';
  return new Intl.NumberFormat(getLocale(), { maximumFractionDigits }).format(value);
}
export function superadminIntegrationsDisplayValue(value: string | number | null | undefined, fallback = '—'): string {
  if (value == null || value === '') return fallback;
  return String(value);
}
