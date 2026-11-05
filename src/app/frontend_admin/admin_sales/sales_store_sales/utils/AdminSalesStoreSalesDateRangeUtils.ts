// RESPONSIBILITY: Validates and serializes date ranges used by this Sales leaf.
import { endOfMonth, endOfYear, format, isValid, parseISO, startOfMonth, startOfYear, subMonths } from 'date-fns';
import type { DateFilter } from '@/app/frontend_admin/admin_sales/sales_store_sales/types/AdminSalesStoreSalesTypes';
import type { AdminSalesDateRange } from '@/app/frontend_admin/admin_sales/sales_store_sales/types/AdminSalesStoreSalesDateRangeTypes';

export function toAdminSalesStoreSalesDateKey(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

export function getAdminSalesStoreSalesPresetDateRange(filter: DateFilter, now = new Date()): AdminSalesDateRange | null {
  switch (filter) {
    case 'this_month': return { startDate: toAdminSalesStoreSalesDateKey(startOfMonth(now)), endDate: toAdminSalesStoreSalesDateKey(endOfMonth(now)) };
    case 'last_month': { const previousMonth = subMonths(now, 1); return { startDate: toAdminSalesStoreSalesDateKey(startOfMonth(previousMonth)), endDate: toAdminSalesStoreSalesDateKey(endOfMonth(previousMonth)) }; }
    case 'last_3_months': return { startDate: toAdminSalesStoreSalesDateKey(startOfMonth(subMonths(now, 2))), endDate: toAdminSalesStoreSalesDateKey(endOfMonth(now)) };
    case 'last_6_months': return { startDate: toAdminSalesStoreSalesDateKey(startOfMonth(subMonths(now, 5))), endDate: toAdminSalesStoreSalesDateKey(endOfMonth(now)) };
    case 'this_year': return { startDate: toAdminSalesStoreSalesDateKey(startOfYear(now)), endDate: toAdminSalesStoreSalesDateKey(endOfYear(now)) };
    case 'monthly': case 'yearly': case 'custom': return null;
  }
}

export function isValidAdminSalesStoreSalesDateRange(startDate: string, endDate: string): boolean {
  const validDateKey = (value: string) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const parsed = parseISO(value);
    return isValid(parsed) && format(parsed, 'yyyy-MM-dd') === value;
  };
  return validDateKey(startDate) && validDateKey(endDate) && startDate <= endDate;
}
