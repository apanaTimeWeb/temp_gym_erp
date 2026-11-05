

/**
 * Module-local display utilities for finance. Converts minor-unit monetary values,
 * dates, nullable display values, masked identifiers, numeric metrics, and percentages.
 */
/**
 * @description Formats or transforms data for manager finance presentation without owning server state.
 * @dependencies Uses module-local formatting/constants and approved platform APIs only.
 * @edge-case Returns the documented fallback or masked representation for nullish, invalid, or sensitive values.
 */
export function ManagerFinancePaymentsAndSummaryFormatCurrency(amountMinor: number, currencyCode: string, locale: string): string {
  const currency = currencyCode;
  const zeroDecimal = new Set(['JPY', 'KRW']);
  const threeDecimal = new Set(['KWD', 'BHD', 'JOD', 'IQD']);
  const divisor = (() => { if (zeroDecimal.has(currency)) return 1; return (() => { if (threeDecimal.has(currency)) return 1000; return 100; })(); })();
  return new Intl.NumberFormat(locale, { style: 'currency', currency, minimumFractionDigits: (() => { if (divisor === 1) return 0; return (() => { if (threeDecimal.has(currency)) return 3; return 2; })(); })(), maximumFractionDigits: (() => { if (divisor === 1) return 0; return (() => { if (threeDecimal.has(currency)) return 3; return 2; })(); })() }).format(amountMinor / divisor);
}

/**
 * @description Formats or transforms data for manager finance presentation without owning server state.
 * @dependencies Uses module-local formatting/constants and approved platform APIs only.
 * @edge-case Returns the documented fallback or masked representation for nullish, invalid, or sensitive values.
 */
export function ManagerFinancePaymentsAndSummaryFormatNumber(value: number, locale = 'en-IN'): string {
  return new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(value);
}

/**
 * @description Formats or transforms data for manager finance presentation without owning server state.
 * @dependencies Uses module-local formatting/constants and approved platform APIs only.
 * @edge-case Returns the documented fallback or masked representation for nullish, invalid, or sensitive values.
 */
export function ManagerFinancePaymentsAndSummaryFormatPercent(value: number, locale = 'en-IN'): string {
  return new Intl.NumberFormat(locale, { style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(value / 100);
}

/**
 * @description Formats or transforms data for manager finance presentation without owning server state.
 * @dependencies Uses module-local formatting/constants and approved platform APIs only.
 * @edge-case Returns the documented fallback or masked representation for nullish, invalid, or sensitive values.
 */
export function ManagerFinancePaymentsAndSummaryFormatKpi(value: number, locale = 'en-IN'): string {
  return new Intl.NumberFormat(locale, { notation: 'compact', maximumFractionDigits: 1 }).format(value);
}

/**
 * @description Formats or transforms data for manager finance presentation without owning server state.
 * @dependencies Uses module-local formatting/constants and approved platform APIs only.
 * @edge-case Returns the documented fallback or masked representation for nullish, invalid, or sensitive values.
 */
export function ManagerFinancePaymentsAndSummaryDisplayValue(value: string | number | null | undefined): string {
  return value === null || value === undefined || value === '' ? '—' : String(value);
}

/**
 * @description Formats or transforms data for manager finance presentation without owning server state.
 * @dependencies Uses module-local formatting/constants and approved platform APIs only.
 * @edge-case Returns the documented fallback or masked representation for nullish, invalid, or sensitive values.
 */
export function ManagerFinancePaymentsAndSummaryMaskSensitiveData(value: string | null | undefined, type: 'phone' | 'email' | 'identifier' = 'identifier'): string {
  if (!value) return '—';
  if (type === 'phone') return value.length <= 4 ? '****' : `${value.slice(0, 2)}****${value.slice(-4)}`;
  if (type === 'email') {
    const [local, domain = ''] = value.split('@');
    return `${local?.slice(0, 2) ?? ''}***@${domain}`;
  }
  return value.length <= 4 ? '****' : `${'*'.repeat(Math.max(0, value.length - 4))}${value.slice(-4)}`;
}

function parseDate(value: string | Date): Date | null {
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value;
  const dateOnly = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  const parsed = dateOnly ? new Date(Number(dateOnly[1]), Number(dateOnly[2]) - 1, Number(dateOnly[3])) : new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function ManagerFinancePaymentsAndSummaryFormatDate(value: string | Date | null | undefined, locale = 'en-IN'): string {
  if (!value) return '—';
  const date = parseDate(value);
  return date ? new Intl.DateTimeFormat(locale, { day: '2-digit', month: 'short', year: 'numeric' }).format(date) : '—';
}

export function ManagerFinancePaymentsAndSummaryFormatDateTime(value: string | Date | null | undefined, locale = 'en-IN'): string {
  if (!value) return '—';
  const date = parseDate(value);
  return date ? new Intl.DateTimeFormat(locale, { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(date) : '—';
}
