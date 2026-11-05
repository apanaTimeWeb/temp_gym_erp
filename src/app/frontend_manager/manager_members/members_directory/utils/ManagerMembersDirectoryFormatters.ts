import { format, isValid, parseISO } from 'date-fns';
import { enUS, hi } from 'date-fns/locale';

/**
 * Module-local display utilities for members. Converts minor-unit monetary values,
 * dates, nullable display values, masked identifiers, numeric metrics, and percentages.
 */
/**
 * Returns the ISO-currency subunit divisor used by Manager Members currency formatting.
 */
function getManagerMembersDirectoryCurrencyDivisor(currencyCode: string): number {
  const zeroDecimalCurrencies = new Set(['JPY', 'KRW']);
  const threeDecimalCurrencies = new Set(['KWD', 'BHD', 'JOD', 'IQD']);
  if (zeroDecimalCurrencies.has(currencyCode)) return 1;
  if (threeDecimalCurrencies.has(currencyCode)) return 1000;
  return 100;
}

/**
 * Returns the decimal precision required by a currency divisor.
 */
function getManagerMembersDirectoryCurrencyFractionDigits(divisor: number): number {
  if (divisor === 1) return 0;
  if (divisor === 1000) return 3;
  return 2;
}

export function ManagerMembersDirectoryFormatCurrency(amountMinor: number, currencyCode: string, locale: string): string {
  const divisor = getManagerMembersDirectoryCurrencyDivisor(currencyCode);
  const fractionDigits = getManagerMembersDirectoryCurrencyFractionDigits(divisor);
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(amountMinor / divisor);
}

/** Formats a whole-number metric in the requested locale. */
export function ManagerMembersDirectoryFormatNumber(value: number, locale = 'en-IN'): string {
  return new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(value);
}

/** Formats a percentage in the requested locale. */
export function ManagerMembersDirectoryFormatPercent(value: number, locale = 'en-IN'): string {
  return new Intl.NumberFormat(locale, { style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(value / 100);
}

/** Formats a compact KPI number in the requested locale. */
export function ManagerMembersDirectoryFormatKpi(value: number, locale = 'en-IN'): string {
  return new Intl.NumberFormat(locale, { notation: 'compact', maximumFractionDigits: 1 }).format(value);
}

/** Renders a safe nullable display value. */
export function ManagerMembersDirectoryDisplayValue(value: string | number | null | undefined): string {
  return value === null || value === undefined || value === '' ? '—' : String(value);
}

/** Masks a phone, email, or identifier for display. */
export function ManagerMembersDirectoryMaskSensitiveData(value: string | null | undefined, type: 'phone' | 'email' | 'identifier' = 'identifier'): string {
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
  try { return format(date, pattern, { locale: resolveDateLocale(locale) }); } catch { return '—'; }
}

/** Formats a valid date using the requested locale. */
export function ManagerMembersDirectoryFormatDate(value: string | Date | null | undefined, locale = 'en-IN'): string {
  if (!value) return '—';
  return safeFormatDate(value, 'dd MMM yyyy', locale);
}

/** Formats a valid date using the requested locale. */
/** Formats a valid date-time using the requested locale. */
export function ManagerMembersDirectoryFormatDateTime(value: string | Date | null | undefined, locale = 'en-IN'): string {
  if (!value) return '—';
  return safeFormatDate(value, 'dd MMM yyyy, hh:mm a', locale);
}
