// RESPONSIBILITY: Provides feature-local formatting or transformation helpers for finance_payments; it does not own network state or UI workflow.
// DATA FLOW: verified feature data → focused utility → formatted/normalized result → owning component or hook (admin_finance/finance_payments/utils/AdminFinanceOverviewFormatters.ts)

import { format, isValid, parseISO } from 'date-fns';
import { enUS, hi } from 'date-fns/locale';

/** Locale-aware finance number/date formatters owned by the Admin Finance feature. @description Implements formatPercent1dp for the owning feature’s explicitly typed data. @returns The typed result declared by the function signature. @param value - Input used according to the declared TypeScript signature. @param locale - Input used according to the declared TypeScript signature. */
export const formatPercent1dp = (value: number, locale: string): string => new Intl.NumberFormat(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(value);
/** @description Implements formatKPI for the owning feature. @param value - Input used according to the declared TypeScript signature. @param locale - Input used according to the declared TypeScript signature. @returns The typed result declared by this utility’s signature. */
export const /** @description Implements formatKPI for the owning feature’s explicitly typed data. @returns The typed result declared by the function signature. @param value - Input used according to the utility’s declared TypeScript signature. @param locale - Input used according to the utility’s declared TypeScript signature. */
formatKPI = (value: number, locale: string): string => new Intl.NumberFormat(locale, { notation: 'compact', maximumFractionDigits: 1 }).format(value);
/** @description Implements formatDate for the owning feature. @param value - Input used according to the declared TypeScript signature. @param locale - Input used according to the declared TypeScript signature. @returns The typed result declared by this utility’s signature. */
export const /** @description Implements formatDate for the owning feature’s explicitly typed data. @returns The typed result declared by the function signature. @param value - Input used according to the utility’s declared TypeScript signature. @param locale - Input used according to the utility’s declared TypeScript signature. */
formatDate = (value: string, locale: string): string => {
  const date = parseISO(value);
  return isValid(date) ? format(date, 'dd MMM yyyy', { locale: locale.toLowerCase().startsWith('hi') ? hi : enUS }) : '—';
};
