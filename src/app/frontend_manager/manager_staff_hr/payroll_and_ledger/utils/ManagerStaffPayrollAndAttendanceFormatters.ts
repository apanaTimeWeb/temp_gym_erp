import { format, isValid, parseISO } from 'date-fns';
import { enUS, hi } from 'date-fns/locale';


/**
 * Module-local display utilities for hr. Converts minor-unit monetary values,
 * dates, nullable display values, masked identifiers, numeric metrics, and percentages.
 */
/**
 * @description Formats or transforms data for manager hr presentation without owning server state.
 * @dependencies Uses module-local formatting/constants and approved platform APIs only.
 * @edge-case Returns the documented fallback or masked representation for nullish, invalid, or sensitive values.
 */
export function ManagerStaffPayrollAndAttendanceFormatCurrency(amountMinor: number, currencyCode: string, locale: string): string {
  const currency = currencyCode;
  const zeroDecimal = new Set(['JPY', 'KRW']);
  const threeDecimal = new Set(['KWD', 'BHD', 'JOD', 'IQD']);
  const divisor = (() => { if (zeroDecimal.has(currency)) return 1; return (() => { if (threeDecimal.has(currency)) return 1000; return 100; })(); })();
  return new Intl.NumberFormat(locale, { style: 'currency', currency, minimumFractionDigits: (() => { if (divisor === 1) return 0; return (() => { if (threeDecimal.has(currency)) return 3; return 2; })(); })(), maximumFractionDigits: (() => { if (divisor === 1) return 0; return (() => { if (threeDecimal.has(currency)) return 3; return 2; })(); })() }).format(amountMinor / divisor);
}

/**
 * @description Formats or transforms data for manager hr presentation without owning server state.
 * @dependencies Uses module-local formatting/constants and approved platform APIs only.
 * @edge-case Returns the documented fallback or masked representation for nullish, invalid, or sensitive values.
 */
export function ManagerStaffPayrollAndAttendanceFormatNumber(value: number, locale = 'en-IN'): string {
  return new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(value);
}

/**
 * @description Formats or transforms data for manager hr presentation without owning server state.
 * @dependencies Uses module-local formatting/constants and approved platform APIs only.
 * @edge-case Returns the documented fallback or masked representation for nullish, invalid, or sensitive values.
 */
export function ManagerStaffPayrollAndAttendanceFormatPercent(value: number, locale = 'en-IN'): string {
  return new Intl.NumberFormat(locale, { style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(value / 100);
}

/**
 * @description Formats or transforms data for manager hr presentation without owning server state.
 * @dependencies Uses module-local formatting/constants and approved platform APIs only.
 * @edge-case Returns the documented fallback or masked representation for nullish, invalid, or sensitive values.
 */
export function ManagerStaffPayrollAndAttendanceFormatKpi(value: number, locale = 'en-IN'): string {
  return new Intl.NumberFormat(locale, { notation: 'compact', maximumFractionDigits: 1 }).format(value);
}

/**
 * @description Formats or transforms data for manager hr presentation without owning server state.
 * @dependencies Uses module-local formatting/constants and approved platform APIs only.
 * @edge-case Returns the documented fallback or masked representation for nullish, invalid, or sensitive values.
 */
export function ManagerStaffPayrollAndAttendanceDisplayValue(value: string | number | null | undefined): string {
  return value === null || value === undefined || value === '' ? '—' : String(value);
}

/**
 * @description Formats or transforms data for manager hr presentation without owning server state.
 * @dependencies Uses module-local formatting/constants and approved platform APIs only.
 * @edge-case Returns the documented fallback or masked representation for nullish, invalid, or sensitive values.
 */
export function ManagerStaffPayrollAndAttendanceMaskSensitiveData(value: string | null | undefined, type: 'phone' | 'email' | 'identifier' = 'identifier'): string {
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

function safeFormat(value: string | Date, pattern: string, locale: string): string {
  const date = parseDate(value);
  if (!isValid(date)) return '—';
  try { return format(date, pattern, { locale: resolveDateLocale(locale) }); } catch { return '—'; }
}

/**
 * @description Formats or transforms data for manager hr presentation without owning server state.
 * @dependencies Uses module-local formatting/constants and approved platform APIs only.
 * @edge-case Returns the documented fallback or masked representation for nullish, invalid, or sensitive values.
 */
export function ManagerStaffPayrollAndAttendanceFormatDate(value: string | Date | null | undefined, locale = 'en-IN'): string {
  if (!value) return '—';
  return safeFormat(value, 'dd MMM yyyy', locale);
}

/**
 * @description Formats or transforms data for manager hr presentation without owning server state.
 * @dependencies Uses module-local formatting/constants and approved platform APIs only.
 * @edge-case Returns the documented fallback or masked representation for nullish, invalid, or sensitive values.
 */
export function ManagerStaffPayrollAndAttendanceFormatDateTime(value: string | Date | null | undefined, locale = 'en-IN'): string {
  if (!value) return '—';
  return safeFormat(value, 'dd MMM yyyy, hh:mm a', locale);
}
