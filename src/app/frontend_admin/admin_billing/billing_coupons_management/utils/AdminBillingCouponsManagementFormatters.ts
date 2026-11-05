// RESPONSIBILITY: Provides feature-local formatting or transformation helpers for coupons_management; it does not own network state or UI workflow.
// DATA FLOW: verified feature data → focused utility → formatted/normalized result → owning component or hook (admin_coupons/coupons_management/utils/AdminBillingCouponsManagementFormatters.ts)

/** Returns the current UTC calendar day key for comparison with coupon date-only wire values. */
export const getAdminBillingCouponsManagementUtcTodayKey = (): string => new Date().toISOString().slice(0, 10);

/**
 * Locale-aware numeric/date formatters owned by the Admin feature.
 * @remarks These utilities contain presentation formatting only; server data remains owned by TanStack Query.
 */

/** Formats an integer/number using the active UI locale. @description Implements formatNumber for the owning feature’s explicitly typed data. @returns The typed result declared by the function signature. @param value - Input used according to the declared TypeScript signature. @param locale - Input used according to the declared TypeScript signature. */
export const formatNumber = (value: number, locale: string): string =>
  new Intl.NumberFormat(locale).format(value);
