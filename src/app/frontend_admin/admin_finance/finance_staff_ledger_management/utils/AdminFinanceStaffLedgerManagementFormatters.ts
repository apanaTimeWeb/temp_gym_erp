// RESPONSIBILITY: Provides feature-local formatting or transformation helpers for hr_management; it does not own network state or UI workflow.
// DATA FLOW: verified feature data → focused utility → formatted/normalized result → owning component or hook (admin_finance/finance_staff_ledger_management/utils/AdminFinanceStaffLedgerManagementFormatters.ts)

import { format, parseISO, isValid } from 'date-fns';
import { enUS, hi } from 'date-fns/locale';

/**
 * Locale-aware numeric/date formatters owned by the Admin feature.
 * @remarks These utilities contain presentation formatting only; server data remains owned by TanStack Query.
 */

/** Formats an integer/number using the active UI locale. @description Implements formatNumber for the owning feature’s explicitly typed data. @returns The typed result declared by the function signature. @param value - Input used according to the declared TypeScript signature. @param locale - Input used according to the declared TypeScript signature. */
export const formatNumber = (value: number, locale: string): string =>
  new Intl.NumberFormat(locale).format(value);

/** Formats a percentage-like value with one decimal place using the active UI locale. @description Implements formatPercent1dp for the owning feature’s explicitly typed data. @returns The typed result declared by the function signature. @param value - Input used according to the declared TypeScript signature. @param locale - Input used according to the declared TypeScript signature. */
export const formatPercent1dp = (value: number, locale: string): string =>
  new Intl.NumberFormat(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(value);

/** Formats a decimal metric with one decimal place using the active UI locale. @description Implements formatDecimal for the owning feature’s explicitly typed data. @returns The typed result declared by the function signature. @param value - Input used according to the declared TypeScript signature. @param locale - Input used according to the declared TypeScript signature. */
export const formatDecimal = (value: number, locale: string): string =>
  new Intl.NumberFormat(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(value);

/** Formats HR dates with the active UI locale. @description Implements formatDate for the owning feature’s explicitly typed data. @returns The typed result declared by the function signature. @param value - Input used according to the declared TypeScript signature. @param locale - Input used according to the declared TypeScript signature. */
export const formatDate = (value: string, locale: string): string => {
  const parsed = parseISO(value);
  if (!isValid(parsed)) return '—';
  return format(parsed, 'dd MMM yyyy', { locale: locale.toLowerCase().startsWith('hi') ? hi : enUS });
};
