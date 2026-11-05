// RESPONSIBILITY: Provides feature-local formatting or transformation helpers for sales_membership_growth_report; it does not own network state or UI workflow.
// DATA FLOW: verified feature data → focused utility → formatted/normalized result → owning component or hook (admin_sales/sales_membership_growth_report/utils/AdminSalesMembershipGrowthReportAnalyticsDateRangeUtils.ts)

import { endOfMonth, endOfYear, format, isValid, parseISO, startOfMonth, startOfYear, subMonths } from 'date-fns';
import type { ReportDateRange } from '@/app/frontend_admin/admin_sales/sales_membership_growth_report/types/AdminSalesMembershipGrowthReportTypes';
import type { AdminSalesMembershipGrowthReportDateRange } from '@/app/frontend_admin/admin_sales/sales_membership_growth_report/types/AdminSalesMembershipGrowthReportDateRangeTypes';


/** Resolve each supported bounded report preset to local calendar dates, inclusive of both endpoints. @description Implements getAdminSalesMembershipGrowthReportPresetDateRange for the owning feature’s explicitly typed data. @param preset - Input used by this utility as declared by the signature. @param now - Input used by this utility as declared by the signature. @returns The typed result declared by the function signature. */
export function getAdminSalesMembershipGrowthReportPresetDateRange(preset: Exclude<ReportDateRange, 'custom'>, now = new Date()): AdminSalesMembershipGrowthReportDateRange {
  const thisMonth = startOfMonth(now);
  switch (preset) {
    case 'this_month':
      return { startDate: toAdminSalesMembershipGrowthReportDateKey(startOfMonth(now)), endDate: toAdminSalesMembershipGrowthReportDateKey(endOfMonth(now)) };
    case 'last_month': {
      const lastMonth = subMonths(thisMonth, 1);
      return { startDate: toAdminSalesMembershipGrowthReportDateKey(startOfMonth(lastMonth)), endDate: toAdminSalesMembershipGrowthReportDateKey(endOfMonth(lastMonth)) };
    }
    case 'last_3_months': {
      const firstMonth = subMonths(thisMonth, 2);
      return { startDate: toAdminSalesMembershipGrowthReportDateKey(startOfMonth(firstMonth)), endDate: toAdminSalesMembershipGrowthReportDateKey(endOfMonth(now)) };
    }
    case 'last_6_months': {
      const firstMonth = subMonths(thisMonth, 5);
      return { startDate: toAdminSalesMembershipGrowthReportDateKey(startOfMonth(firstMonth)), endDate: toAdminSalesMembershipGrowthReportDateKey(endOfMonth(now)) };
    }
    case 'this_year':
      return { startDate: toAdminSalesMembershipGrowthReportDateKey(startOfYear(now)), endDate: toAdminSalesMembershipGrowthReportDateKey(endOfYear(now)) };
  }
}

/** Parse one canonical local YYYY-MM-DD key without JavaScript's 1900 mapping for years 00–99. */
export function parseAdminSalesMembershipGrowthReportDateKey(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const parsed = parseISO(value);
  return isValid(parsed) && format(parsed, 'yyyy-MM-dd') === value ? parsed : null;
}

/** Both API/URL bounds must be real local dates and form an inclusive nonreversed window. */
export function isValidAdminSalesMembershipGrowthReportDateRange(startDate: string, endDate: string): boolean {
  return parseAdminSalesMembershipGrowthReportDateKey(startDate) !== null
    && parseAdminSalesMembershipGrowthReportDateKey(endDate) !== null
    && startDate <= endDate;
}


/** Format a valid local date into the canonical YYYY-MM-DD query key used by this report. */
export function toAdminSalesMembershipGrowthReportDateKey(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}
