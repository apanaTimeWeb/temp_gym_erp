// RESPONSIBILITY: Provides feature-local formatting or transformation helpers for finance_profit_and_loss_report; it does not own network state or UI workflow.
// DATA FLOW: verified feature data → focused utility → formatted/normalized result → owning component or hook (admin_finance/finance_profit_and_loss_report/utils/AdminFinanceProfitAndLossReportDateRangeUtils.ts)

import { endOfMonth, endOfYear, format, isValid, parseISO, startOfMonth, startOfYear, subMonths } from 'date-fns';
import type { ReportDateRange } from '@/app/frontend_admin/admin_finance/finance_profit_and_loss_report/types/AdminFinanceProfitAndLossReportTypes';
import type { AdminFinanceProfitAndLossReportDateRange } from '@/app/frontend_admin/admin_finance/finance_profit_and_loss_report/types/AdminFinanceProfitAndLossReportDateRangeTypes';


/** Resolve each supported bounded report preset to local calendar dates, inclusive of both endpoints. @description Implements getAdminFinanceProfitAndLossReportPresetDateRange for the owning feature’s explicitly typed data. @param preset - Input used by this utility as declared by the signature. @param now - Input used by this utility as declared by the signature. @returns The typed result declared by the function signature. */
export function getAdminFinanceProfitAndLossReportPresetDateRange(preset: Exclude<ReportDateRange, 'custom'>, now = new Date()): AdminFinanceProfitAndLossReportDateRange {
  const thisMonth = startOfMonth(now);
  switch (preset) {
    case 'this_month':
      return { startDate: toAdminFinanceProfitAndLossReportDateKey(startOfMonth(now)), endDate: toAdminFinanceProfitAndLossReportDateKey(endOfMonth(now)) };
    case 'last_month': {
      const lastMonth = subMonths(thisMonth, 1);
      return { startDate: toAdminFinanceProfitAndLossReportDateKey(startOfMonth(lastMonth)), endDate: toAdminFinanceProfitAndLossReportDateKey(endOfMonth(lastMonth)) };
    }
    case 'last_3_months': {
      const firstMonth = subMonths(thisMonth, 2);
      return { startDate: toAdminFinanceProfitAndLossReportDateKey(startOfMonth(firstMonth)), endDate: toAdminFinanceProfitAndLossReportDateKey(endOfMonth(now)) };
    }
    case 'last_6_months': {
      const firstMonth = subMonths(thisMonth, 5);
      return { startDate: toAdminFinanceProfitAndLossReportDateKey(startOfMonth(firstMonth)), endDate: toAdminFinanceProfitAndLossReportDateKey(endOfMonth(now)) };
    }
    case 'this_year':
      return { startDate: toAdminFinanceProfitAndLossReportDateKey(startOfYear(now)), endDate: toAdminFinanceProfitAndLossReportDateKey(endOfYear(now)) };
  }
}

/** @description Implements isValidAdminFinanceProfitAndLossReportDateRange for the owning feature’s explicitly typed data. @param startDate - Input used by this utility as declared by the signature. @param endDate - Input used by this utility as declared by the signature. @returns The typed result declared by the function signature. */
export function parseAdminFinanceProfitAndLossReportDateKey(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const parsed = parseISO(value);
  return isValid(parsed) && format(parsed, 'yyyy-MM-dd') === value ? parsed : null;
}

export function isValidAdminFinanceProfitAndLossReportDateRange(startDate: string, endDate: string): boolean {
  return parseAdminFinanceProfitAndLossReportDateKey(startDate) !== null
    && parseAdminFinanceProfitAndLossReportDateKey(endDate) !== null
    && startDate <= endDate;
}


/** Format a valid local date into the canonical YYYY-MM-DD query key used by this report. */
export function toAdminFinanceProfitAndLossReportDateKey(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}
