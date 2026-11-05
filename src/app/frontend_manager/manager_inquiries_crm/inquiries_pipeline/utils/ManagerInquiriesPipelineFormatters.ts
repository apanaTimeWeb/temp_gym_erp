import { format, isValid, parseISO } from 'date-fns';
import { enUS, hi } from 'date-fns/locale';


/**
 * Module-local display utilities for inquiries. Converts minor-unit monetary values,
 * dates, nullable display values, masked identifiers, numeric metrics, and percentages.
 */
export function ManagerInquiriesPipelineFormatCurrency(amountMinor: number, currencyCode: string, locale: string): string {
  const zeroDecimalCurrencies = ['JPY', 'KRW'];
  const threeDecimalCurrencies = ['BHD', 'IQD', 'JOD', 'KWD'];
  const fractionDigits = zeroDecimalCurrencies.includes(currencyCode) ? 0 : threeDecimalCurrencies.includes(currencyCode) ? 3 : 2;
  const divisor = 10 ** fractionDigits;
  return new Intl.NumberFormat(locale, { style: 'currency', currency: currencyCode, minimumFractionDigits: fractionDigits, maximumFractionDigits: fractionDigits }).format(amountMinor / divisor);
}

export function ManagerInquiriesPipelineFormatNumber(value: number, locale = 'en-IN'): string {
  return new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(value);
}

export function ManagerInquiriesPipelineFormatPercent(value: number, locale = 'en-IN'): string {
  return new Intl.NumberFormat(locale, { style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(value / 100);
}

export function ManagerInquiriesPipelineFormatKpi(value: number, locale = 'en-IN'): string {
  return new Intl.NumberFormat(locale, { notation: 'compact', maximumFractionDigits: 1 }).format(value);
}

export function ManagerInquiriesPipelineDisplayValue(value: string | number | null | undefined): string {
  return value === null || value === undefined || value === '' ? '—' : String(value);
}

export function ManagerInquiriesPipelineMaskSensitiveData(value: string | null | undefined, type: 'phone' | 'email' | 'identifier' = 'identifier'): string {
  if (!value) return '—';
  if (type === 'phone') return value.length <= 4 ? '****' : `${value.slice(0, 2)}****${value.slice(-4)}`;
  if (type === 'email') {
    const [local, domain = ''] = value.split('@');
    return `${local?.slice(0, 2) ?? ''}***@${domain}`;
  }
  return value.length <= 4 ? '****' : `${'*'.repeat(Math.max(0, value.length - 4))}${value.slice(-4)}`;
}

function parseDate(value: string | Date): Date {
  return value instanceof Date ? value : parseISO(value);
}

function resolveDateLocale(locale: string) {
  return locale.toLowerCase().startsWith('hi') ? hi : enUS;
}

function safeFormatDate(value: string | Date, pattern: string, locale: string): string {
  const date = parseDate(value);
  if (!isValid(date)) return '—';
  try {
    return format(date, pattern, { locale: resolveDateLocale(locale) });
  } catch {
    return '—';
  }
}

export function ManagerInquiriesPipelineFormatDate(value: string | Date | null | undefined, locale = 'en-IN'): string {
  if (!value) return '—';
  return safeFormatDate(value, 'dd MMM yyyy', locale);
}

export function ManagerInquiriesPipelineFormatDateTime(value: string | Date | null | undefined, locale = 'en-IN'): string {
  if (!value) return '—';
  return safeFormatDate(value, 'dd MMM yyyy, hh:mm a', locale);
}


/** Formats inquiry activity timestamps for consistent manager UI display. */
export function ManagerInquiriesPipelineFormatTime(value: Date | string, locale = 'en-IN'): string {
  return safeFormatDate(value, 'hh:mm a', locale);
}

/** Builds a message from already-localized message segments. */
export function ManagerInquiriesPipelineGenerateDefaultMessage(segments: { greeting: string; details: string; signoff: string }): string {
  return [segments.greeting, segments.details, segments.signoff].join('\n\n');
}
