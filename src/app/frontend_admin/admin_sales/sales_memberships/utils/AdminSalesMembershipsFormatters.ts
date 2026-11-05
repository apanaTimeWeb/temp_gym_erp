// RESPONSIBILITY: Provides feature-local formatting or transformation helpers for sales_analytics; it does not own network state or UI workflow.
// DATA FLOW: verified feature data → focused utility → formatted/normalized result → owning component or hook (admin_sales/sales_memberships/utils/AdminSalesAnalyticsFormatters.ts)

import { format, isValid, parseISO } from 'date-fns';
import { enUS, hi } from 'date-fns/locale';

// RESPONSIBILITY: Reject impossible/ambiguous membership expiry values before Date.parse
// can silently normalize a nonexistent calendar date to a different month.
// The existing full-24-hour calculation remains unchanged for valid ISO values.
const MEMBERSHIP_EXPIRY_ISO = /^(\d{4})-(\d{2})-(\d{2})(?:T(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d{1,9})?)?(?:Z|[+-](?:[01]\d|2[0-3]):[0-5]\d)?)?$/;

function isValidAdminSalesMembershipsExpiryDate(value: string): boolean {
  const parts = MEMBERSHIP_EXPIRY_ISO.exec(value);
  if (!parts) return false;
  const year = Number(parts[1]);
  const month = Number(parts[2]);
  const day = Number(parts[3]);
  if (month < 1 || month > 12 || day < 1) return false;
  const leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const daysInMonth = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return day <= daysInMonth[month - 1];
}

/**
 * Counts full 24-hour intervals to a validated ISO expiry date or timestamp.
 * Unknown/invalid expiry values stay NaN; no inferred calendar date or status.
 * `observedAt` allows one request to use a stable clock snapshot.
 */
export const getAdminSalesMembershipsDaysLeft = (expiryDate: string, observedAt = Date.now()): number => {
  if (!isValidAdminSalesMembershipsExpiryDate(expiryDate) || !Number.isFinite(observedAt)) return Number.NaN;
  const expiryAt = Date.parse(expiryDate);
  return Number.isFinite(expiryAt) ? Math.floor((expiryAt - observedAt) / 86_400_000) : Number.NaN;
};

/** Locale-aware sales number/date formatters owned by the Admin Sales feature. @description Implements formatNumber for the owning feature’s explicitly typed data. @returns The typed result declared by the function signature. @param value - Input used according to the declared TypeScript signature. @param locale - Input used according to the declared TypeScript signature. */
export const formatNumber = (value: number, locale: string): string => new Intl.NumberFormat(locale).format(value);
/** @description Implements formatKPI for the owning feature. @param value - Input used according to the declared TypeScript signature. @param locale - Input used according to the declared TypeScript signature. @returns The typed result declared by this utility’s signature. */
export const /** @description Implements formatKPI for the owning feature’s explicitly typed data. @returns The typed result declared by the function signature. @param value - Input used according to the utility’s declared TypeScript signature. @param locale - Input used according to the utility’s declared TypeScript signature. */
formatKPI = (value: number, locale: string): string => new Intl.NumberFormat(locale, { notation: 'compact', maximumFractionDigits: 1 }).format(value);
/** @description Implements formatDate for the owning feature. @param value - Input used according to the declared TypeScript signature. @param locale - Input used according to the declared TypeScript signature. @returns The typed result declared by this utility’s signature. */
export const /** @description Implements formatDate for the owning feature’s explicitly typed data. @returns The typed result declared by the function signature. @param value - Input used according to the utility’s declared TypeScript signature. @param locale - Input used according to the utility’s declared TypeScript signature. */
formatDate = (value: string, locale: string): string => {
  const date = parseISO(value);
  return isValid(date) ? format(date, 'dd MMM yyyy', { locale: locale.toLowerCase().startsWith('hi') ? hi : enUS }) : '—';
};
