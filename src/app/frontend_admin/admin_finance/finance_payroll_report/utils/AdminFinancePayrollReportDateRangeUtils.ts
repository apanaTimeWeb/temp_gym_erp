// RESPONSIBILITY: Provides feature-local formatting or transformation helpers for finance_payroll_report; it does not own network state or UI workflow.
// DATA FLOW: verified feature data → focused utility → formatted/normalized result → owning component or hook (admin_finance/finance_payroll_report/utils/AdminFinancePayrollReportDateRangeUtils.ts)

import { endOfMonth, endOfYear, format, isValid, parseISO, startOfMonth, startOfYear, subMonths } from 'date-fns';
import type { ReportDateRange } from '@/app/frontend_admin/admin_finance/finance_payroll_report/types/AdminFinancePayrollReportTypes';
import type { AdminFinancePayrollReportDateRange } from '@/app/frontend_admin/admin_finance/finance_payroll_report/types/AdminFinancePayrollReportDateRangeTypes';


/** Resolve each supported bounded report preset to local calendar dates, inclusive of both endpoints. @description Implements getAdminFinancePayrollReportPresetDateRange for the owning feature’s explicitly typed data. @param preset - Input used by this utility as declared by the signature. @param now - Input used by this utility as declared by the signature. @returns The typed result declared by the function signature. */
export function getAdminFinancePayrollReportPresetDateRange(preset: Exclude<ReportDateRange, 'custom'>, now = new Date()): AdminFinancePayrollReportDateRange {
  const thisMonth = startOfMonth(now);
  switch (preset) {
    case 'this_month':
      return { startDate: toAdminFinancePayrollReportDateKey(startOfMonth(now)), endDate: toAdminFinancePayrollReportDateKey(endOfMonth(now)) };
    case 'last_month': {
      const lastMonth = subMonths(thisMonth, 1);
      return { startDate: toAdminFinancePayrollReportDateKey(startOfMonth(lastMonth)), endDate: toAdminFinancePayrollReportDateKey(endOfMonth(lastMonth)) };
    }
    case 'last_3_months': {
      const firstMonth = subMonths(thisMonth, 2);
      return { startDate: toAdminFinancePayrollReportDateKey(startOfMonth(firstMonth)), endDate: toAdminFinancePayrollReportDateKey(endOfMonth(now)) };
    }
    case 'last_6_months': {
      const firstMonth = subMonths(thisMonth, 5);
      return { startDate: toAdminFinancePayrollReportDateKey(startOfMonth(firstMonth)), endDate: toAdminFinancePayrollReportDateKey(endOfMonth(now)) };
    }
    case 'this_year':
      return { startDate: toAdminFinancePayrollReportDateKey(startOfYear(now)), endDate: toAdminFinancePayrollReportDateKey(endOfYear(now)) };
  }
}

/** @description Implements isValidAdminFinancePayrollReportDateRange for the owning feature’s explicitly typed data. @param startDate - Input used by this utility as declared by the signature. @param endDate - Input used by this utility as declared by the signature. @returns The typed result declared by the function signature. */
export function isValidAdminFinancePayrollReportDateRange(startDate: string, endDate: string): boolean {
  const isDateKey = (value: string) => {
    if (!/^(?!0000)\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const parsed = parseISO(value);
    return isValid(parsed) && format(parsed, 'yyyy-MM-dd') === value;
  };
  return isDateKey(startDate) && isDateKey(endDate) && startDate <= endDate;
}


/** Format a valid local date into the canonical YYYY-MM-DD query key used by this report. */
export function toAdminFinancePayrollReportDateKey(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}
