// RESPONSIBILITY: Provides feature-local formatting or transformation helpers for dashboard_overview; it does not own network state or UI workflow.
// DATA FLOW: verified feature data → focused utility → formatted/normalized result → owning component or hook (admin_dashboard/dashboard_overview/utils/AdminDashboardOverviewFormatters.ts)

import { format, isValid, parse, parseISO } from 'date-fns';
import { enUS, hi } from 'date-fns/locale';

/** Locale-aware dashboard formatters owned by the Admin Dashboard feature. @description Implements formatNumber for the owning feature’s explicitly typed data. @returns The typed result declared by the function signature. @param value - Input used according to the declared TypeScript signature. @param locale - Input used according to the declared TypeScript signature. */
export const formatNumber = (value: number, locale: string): string => new Intl.NumberFormat(locale).format(value);
/** @description Implements formatKPI for the owning feature. @param value - Input used according to the declared TypeScript signature. @param locale - Input used according to the declared TypeScript signature. @returns The typed result declared by this utility’s signature. */
export const /** @description Implements formatKPI for the owning feature’s explicitly typed data. @returns The typed result declared by the function signature. @param value - Input used according to the utility’s declared TypeScript signature. @param locale - Input used according to the utility’s declared TypeScript signature. */
formatKPI = (value: number, locale: string): string => new Intl.NumberFormat(locale, { notation: 'compact', maximumFractionDigits: 1 }).format(value);
const dateLocale = (locale: string) => locale.toLowerCase().startsWith('hi') ? hi : enUS;
const ADMIN_DASHBOARD_MONTH_PARSE_REFERENCE_DATE = new Date(Date.UTC(2026, 0, 1));

/** Formats a verified month abbreviation into the active locale without embedding date construction in a UI component. */
export const formatAdminDashboardMonthLabel = (value: string, locale: string): string => {
  const parsed = parse(value, 'MMM', ADMIN_DASHBOARD_MONTH_PARSE_REFERENCE_DATE);
  return isValid(parsed) ? format(parsed, 'MMM', { locale: dateLocale(locale) }) : value;
};

/** @description Implements formatDate for the owning feature. @param value - Input used according to the declared TypeScript signature. @param locale - Input used according to the declared TypeScript signature. @returns The typed result declared by this utility’s signature. */
export const /** @description Implements formatDate for the owning feature’s explicitly typed data. @returns The typed result declared by the function signature. @param value - Input used according to the utility’s declared TypeScript signature. @param locale - Input used according to the utility’s declared TypeScript signature. */
formatDate = (value: string, locale: string): string => {
  const date = parseISO(value);
  return isValid(date) ? format(date, 'dd MMM yyyy', { locale: dateLocale(locale) }) : '—';
};
/** @description Implements formatWeekday for the owning feature. @param value - Input used according to the declared TypeScript signature. @param locale - Input used according to the declared TypeScript signature. @returns The typed result declared by this utility’s signature. */
export const /** @description Implements formatWeekday for the owning feature’s explicitly typed data. @returns The typed result declared by the function signature. @param value - Input used according to the utility’s declared TypeScript signature. @param locale - Input used according to the utility’s declared TypeScript signature. */
formatWeekday = (value: string, locale: string): string => {
  const date = parseISO(value);
  return isValid(date) ? format(date, 'EEE', { locale: dateLocale(locale) }) : '—';
};
