// RESPONSIBILITY: Validates and serializes date ranges for the Sales membership-report filter.
import { endOfMonth, endOfYear, format, isValid, parseISO, startOfMonth, startOfYear, subMonths } from 'date-fns';
import type { DateFilter } from '@/app/frontend_admin/admin_sales/sales_membership_report/types/AdminSalesMembershipReportTypes';
import type { AdminSalesDateRange } from '@/app/frontend_admin/admin_sales/sales_membership_report/types/AdminSalesMembershipReportDateRangeTypes';

export function toAdminSalesDateKey(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

/** Returns inclusive local bounds for presets with defined calendar windows. */
export function getAdminSalesPresetDateRange(filter: DateFilter, now = new Date()): AdminSalesDateRange | null {
  switch (filter) {
    case 'this_month':
      return { startDate: toAdminSalesDateKey(startOfMonth(now)), endDate: toAdminSalesDateKey(endOfMonth(now)) };
    case 'last_month': {
      const previousMonth = subMonths(now, 1);
      return { startDate: toAdminSalesDateKey(startOfMonth(previousMonth)), endDate: toAdminSalesDateKey(endOfMonth(previousMonth)) };
    }
    case 'last_3_months':
      return { startDate: toAdminSalesDateKey(startOfMonth(subMonths(now, 2))), endDate: toAdminSalesDateKey(endOfMonth(now)) };
    case 'last_6_months':
      return { startDate: toAdminSalesDateKey(startOfMonth(subMonths(now, 5))), endDate: toAdminSalesDateKey(endOfMonth(now)) };
    case 'this_year':
      return { startDate: toAdminSalesDateKey(startOfYear(now)), endDate: toAdminSalesDateKey(endOfYear(now)) };
    case 'monthly':
    case 'yearly':
    case 'custom':
      return null;
  }
}

/** Accepts only real ISO calendar dates and ordered inclusive bounds. */
export function isValidAdminSalesDateRange(startDate: string, endDate: string): boolean {
  const validDateKey = (value: string) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const parsed = parseISO(value);
    return isValid(parsed) && format(parsed, 'yyyy-MM-dd') === value;
  };
  return validDateKey(startDate) && validDateKey(endDate) && startDate <= endDate;
}
