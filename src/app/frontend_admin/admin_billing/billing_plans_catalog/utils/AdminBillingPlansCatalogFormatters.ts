// RESPONSIBILITY: Provides feature-local formatting or transformation helpers for plans_catalog; it does not own network state or UI workflow.
// DATA FLOW: verified feature data → focused utility → formatted/normalized result → owning component or hook (admin_plans/plans_catalog/utils/AdminBillingPlansCatalogFormatters.ts)

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

/** Formats a KPI using locale-aware compact notation for dashboard-scale values. @description Implements formatKPI for the owning feature’s explicitly typed data. @returns The typed result declared by the function signature. @param value - Input used according to the declared TypeScript signature. @param locale - Input used according to the declared TypeScript signature. */
export const formatKPI = (value: number, locale: string): string =>
  new Intl.NumberFormat(locale, { notation: "compact", maximumFractionDigits: 1 }).format(value);
