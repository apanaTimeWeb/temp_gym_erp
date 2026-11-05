import { format, parseISO } from 'date-fns';
/**
 * Module-local display utilities for workout. Converts minor-unit monetary values,
 * dates, nullable display values, masked identifiers, numeric metrics, and percentages.
 */
/**
 * @description Formats or transforms data for manager workout presentation without owning server state.
 * @dependencies Uses module-local formatting/constants and approved platform APIs only.
 * @edge-case Returns the documented fallback or masked representation for nullish, invalid, or sensitive values.
 */
export function ManagerWorkoutPlansFormatCurrency(amountMinor: number, currencyCode: string, locale: string): string {
  const currency = currencyCode;
  const zeroDecimal = new Set(['JPY', 'KRW']);
  const threeDecimal = new Set(['KWD', 'BHD', 'JOD', 'IQD']);
  const divisor = (() => { if (zeroDecimal.has(currency)) return 1; return (() => { if (threeDecimal.has(currency)) return 1000; return 100; })(); })();
  return new Intl.NumberFormat(locale, { style: 'currency', currency, minimumFractionDigits: (() => { if (divisor === 1) return 0; return (() => { if (threeDecimal.has(currency)) return 3; return 2; })(); })(), maximumFractionDigits: (() => { if (divisor === 1) return 0; return (() => { if (threeDecimal.has(currency)) return 3; return 2; })(); })() }).format(amountMinor / divisor);
}

/**
 * @description Formats or transforms data for manager workout presentation without owning server state.
 * @dependencies Uses module-local formatting/constants and approved platform APIs only.
 * @edge-case Returns the documented fallback or masked representation for nullish, invalid, or sensitive values.
 */
export function ManagerWorkoutPlansFormatNumber(value: number, locale = 'en-IN'): string {
  return new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(value);
}

/**
 * @description Formats or transforms data for manager workout presentation without owning server state.
 * @dependencies Uses module-local formatting/constants and approved platform APIs only.
 * @edge-case Returns the documented fallback or masked representation for nullish, invalid, or sensitive values.
 */
export function ManagerWorkoutPlansFormatPercent(value: number, locale = 'en-IN'): string {
  return new Intl.NumberFormat(locale, { style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(value / 100);
}

/**
 * @description Formats or transforms data for manager workout presentation without owning server state.
 * @dependencies Uses module-local formatting/constants and approved platform APIs only.
 * @edge-case Returns the documented fallback or masked representation for nullish, invalid, or sensitive values.
 */
export function ManagerWorkoutPlansFormatKpi(value: number, locale = 'en-IN'): string {
  return new Intl.NumberFormat(locale, { notation: 'compact', maximumFractionDigits: 1 }).format(value);
}

const MANAGER_WORKOUT_PLANS_LEVEL_DISPLAY_LABEL_KEYS: Record<string, string> = {
  BEGINNER: 'COPY_BEGINNER',
  INTERMEDIATE: 'COPY_INTERMEDIATE',
  ADVANCED: 'COPY_ADVANCED',
};

/**
 * @description Formats or transforms data for manager workout presentation without owning server state.
 * @dependencies Uses module-local formatting/constants and approved platform APIs only.
 * @edge-case Returns the documented fallback or masked representation for nullish, invalid, or sensitive values.
 */
export function ManagerWorkoutPlansGetLevelLabelKey(value: string): string {
  return MANAGER_WORKOUT_PLANS_LEVEL_DISPLAY_LABEL_KEYS[value] ?? 'COPY_N';
}

/**
 * @description Formats or transforms data for manager workout presentation without owning server state.
 * @dependencies Uses module-local formatting/constants and approved platform APIs only.
 * @edge-case Returns the documented fallback or masked representation for nullish, invalid, or sensitive values.
 */
export function ManagerWorkoutPlansGetDifficultyLabelKey(value: string): string {
  return MANAGER_WORKOUT_PLANS_LEVEL_DISPLAY_LABEL_KEYS[value] ?? 'COPY_N';
}

/**
 * @description Formats or transforms data for manager workout presentation without owning server state.
 * @dependencies Uses module-local formatting/constants and approved platform APIs only.
 * @edge-case Returns the documented fallback or masked representation for nullish, invalid, or sensitive values.
 */
export function ManagerWorkoutPlansDisplayValue(value: string | number | null | undefined): string {
  return value === null || value === undefined || value === '' ? '—' : String(value);
}

/**
 * @description Formats or transforms data for manager workout presentation without owning server state.
 * @dependencies Uses module-local formatting/constants and approved platform APIs only.
 * @edge-case Returns the documented fallback or masked representation for nullish, invalid, or sensitive values.
 */
export function ManagerWorkoutPlansMaskSensitiveData(value: string | null | undefined, type: 'phone' | 'email' | 'identifier' = 'identifier'): string {
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

/**
 * @description Formats or transforms data for manager workout presentation without owning server state.
 * @dependencies Uses module-local formatting/constants and approved platform APIs only.
 * @edge-case Returns the documented fallback or masked representation for nullish, invalid, or sensitive values.
 */
export function ManagerWorkoutPlansFormatDate(value: string | Date | null | undefined, locale = 'en-IN'): string {
  if (!value) return '—';
  return format(parseDate(value), 'dd MMM yyyy');
}

/**
 * @description Formats or transforms data for manager workout presentation without owning server state.
 * @dependencies Uses module-local formatting/constants and approved platform APIs only.
 * @edge-case Returns the documented fallback or masked representation for nullish, invalid, or sensitive values.
 */
export function ManagerWorkoutPlansFormatDateTime(value: string | Date | null | undefined, locale = 'en-IN'): string {
  if (!value) return '—';
  return format(parseDate(value), 'dd MMM yyyy, hh:mm a');
}
