// RESPONSIBILITY: Provides feature-local formatting or transformation helpers for usage_analytics; it does not own network state or UI workflow.
// DATA FLOW: verified feature data → focused utility → formatted/normalized result → owning component or hook (admin_usage/usage_analytics/utils/AdminBillingUsageAnalyticsFormatters.ts)

import { format, isValid, parseISO } from 'date-fns';
import { enUS, hi } from 'date-fns/locale';

/** Locale-aware usage number/date formatters owned by the Admin Usage feature. @description Implements formatNumber for the owning feature’s explicitly typed data. @returns The typed result declared by the function signature. @param value - Input used according to the declared TypeScript signature. @param locale - Input used according to the declared TypeScript signature. */
export const formatNumber = (value: number, locale: string): string => new Intl.NumberFormat(locale).format(value);
/** @description Implements formatDate for the owning feature. @param value - Input used according to the declared TypeScript signature. @param locale - Input used according to the declared TypeScript signature. @returns The typed result declared by this utility’s signature. */
export const /** @description Implements formatDate for the owning feature’s explicitly typed data. @returns The typed result declared by the function signature. @param value - Input used according to the utility’s declared TypeScript signature. @param locale - Input used according to the utility’s declared TypeScript signature. */
formatDate = (value: string, locale: string): string => {
  const date = parseISO(value);
  return isValid(date) ? format(date, 'dd MMM yyyy', { locale: locale.toLowerCase().startsWith('hi') ? hi : enUS }) : '—';
};
