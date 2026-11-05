import { parseISO } from 'date-fns';


/**
 * Module-local display utilities for reports. Converts minor-unit monetary values,
 * dates, nullable display values, masked identifiers, numeric metrics, and percentages.
 */
/**
 * @description Formats or transforms data for manager reports presentation without owning server state.
 * @dependencies Uses module-local formatting/constants and approved platform APIs only.
 * @edge-case Returns the documented fallback or masked representation for nullish, invalid, or sensitive values.
 */
export function ManagerReportsOverviewFormatCurrency(amountMinor: number, currencyCode: string, locale: string): string {
  const currency = currencyCode;
  const zeroDecimal = new Set(['JPY', 'KRW']);
  const threeDecimal = new Set(['KWD', 'BHD', 'JOD', 'IQD']);
  const divisor = (() => { if (zeroDecimal.has(currency)) return 1; return (() => { if (threeDecimal.has(currency)) return 1000; return 100; })(); })();
  return new Intl.NumberFormat(locale, { style: 'currency', currency, minimumFractionDigits: (() => { if (divisor === 1) return 0; return (() => { if (threeDecimal.has(currency)) return 3; return 2; })(); })(), maximumFractionDigits: (() => { if (divisor === 1) return 0; return (() => { if (threeDecimal.has(currency)) return 3; return 2; })(); })() }).format(amountMinor / divisor);
}

/**
 * @description Formats or transforms data for manager reports presentation without owning server state.
 * @dependencies Uses module-local formatting/constants and approved platform APIs only.
 * @edge-case Returns the documented fallback or masked representation for nullish, invalid, or sensitive values.
 */
export function ManagerReportsOverviewFormatNumber(value: number, locale = 'en-IN'): string {
  return new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(value);
}

/**
 * @description Formats or transforms data for manager reports presentation without owning server state.
 * @dependencies Uses module-local formatting/constants and approved platform APIs only.
 * @edge-case Returns the documented fallback or masked representation for nullish, invalid, or sensitive values.
 */
export function ManagerReportsOverviewFormatPercent(value: number, locale = 'en-IN'): string {
  return new Intl.NumberFormat(locale, { style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(value / 100);
}

/**
 * @description Formats or transforms data for manager reports presentation without owning server state.
 * @dependencies Uses module-local formatting/constants and approved platform APIs only.
 * @edge-case Returns the documented fallback or masked representation for nullish, invalid, or sensitive values.
 */
export function ManagerReportsOverviewFormatKpi(value: number, locale = 'en-IN'): string {
  return new Intl.NumberFormat(locale, { notation: 'compact', maximumFractionDigits: 1 }).format(value);
}

/**
 * @description Formats or transforms data for manager reports presentation without owning server state.
 * @dependencies Uses module-local formatting/constants and approved platform APIs only.
 * @edge-case Returns the documented fallback or masked representation for nullish, invalid, or sensitive values.
 */
export function ManagerReportsOverviewDisplayValue(value: string | number | null | undefined): string {
  return value === null || value === undefined || value === '' ? '—' : String(value);
}

/**
 * @description Formats or transforms data for manager reports presentation without owning server state.
 * @dependencies Uses module-local formatting/constants and approved platform APIs only.
 * @edge-case Returns the documented fallback or masked representation for nullish, invalid, or sensitive values.
 */
export function ManagerReportsOverviewMaskSensitiveData(value: string | null | undefined, type: 'phone' | 'email' | 'identifier' = 'identifier'): string {
  if (!value) return '—';
  if (type === 'phone') return value.length <= 4 ? '****' : `${value.slice(0, 2)}****${value.slice(-4)}`;
  if (type === 'email') {
    const [local, domain = ''] = value.split('@');
    return `${local?.slice(0, 2) ?? ''}***@${domain}`;
  }
  return value.length <= 4 ? '****' : `${'*'.repeat(Math.max(0, value.length - 4))}${value.slice(-4)}`;
}

function parseDate(value: string | Date): Date | null {
  const parsed = value instanceof Date ? value : parseISO(value);
  return Number.isFinite(parsed.getTime()) ? parsed : null;
}

function formatLocalizedDate(value: string | Date | null | undefined, locale: string, includeTime = false): string {
  if (value === null || value === undefined || value === '') return '—';
  const date = parseDate(value);
  if (!date) return '—';
  const options: Intl.DateTimeFormatOptions = includeTime
    ? { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }
    : { day: '2-digit', month: 'short', year: 'numeric' };
  try {
    return new Intl.DateTimeFormat(locale, options).format(date);
  } catch {
    return new Intl.DateTimeFormat('en-IN', options).format(date);
  }
}

/** @description Formats a date using the active locale and returns an en-dash for absent or invalid values. */
export function ManagerReportsOverviewFormatDate(value: string | Date | null | undefined, locale = 'en-IN'): string {
  return formatLocalizedDate(value, locale);
}

/** @description Formats a date and time using the active locale and returns an en-dash for absent or invalid values. */
export function ManagerReportsOverviewFormatDateTime(value: string | Date | null | undefined, locale = 'en-IN'): string {
  return formatLocalizedDate(value, locale, true);
}
