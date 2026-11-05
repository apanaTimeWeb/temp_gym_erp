/** Feature-owned numeric and date formatting for Compliance. */
import { format, parseISO } from 'date-fns';
import { enUS, hi } from 'date-fns/locale';

function resolveLocale(locale?: string) {
  const requested = locale ?? (typeof document !== 'undefined' ? document.documentElement.lang : 'en');
  return requested.toLowerCase().startsWith('hi') ? hi : enUS;
}

export function formatComplianceNumber(value: number | null | undefined, locale?: string): string {
  if (value == null || !Number.isFinite(value)) return '—';
  const requested = locale ?? (typeof document !== 'undefined' ? document.documentElement.lang : 'en-IN');
  return new Intl.NumberFormat(requested || 'en-IN', { maximumFractionDigits: 0 }).format(value);
}

export function formatComplianceDate(value: string | null | undefined, locale?: string): string {
  if (!value) return '—';
  const date = parseISO(value);
  if (Number.isNaN(date.getTime())) return '—';
  return format(date, 'PP', { locale: resolveLocale(locale) });
}

/** Formats percentage rates without rounding fractional contract values to whole percentages. */
export function formatCompliancePercentage(value: number | null | undefined, locale?: string): string {
  if (value == null || !Number.isFinite(value)) return '—';
  const resolvedLocale = locale || (typeof document !== 'undefined' ? document.documentElement.lang : undefined) || 'en-IN';
  return new Intl.NumberFormat(resolvedLocale, { maximumFractionDigits: 20 }).format(value);
}
