// RESPONSIBILITY: Provides feature-local formatting or transformation helpers for dashboard_overview; it does not own network state or UI workflow.
// DATA FLOW: verified feature data → focused utility → formatted/normalized result → owning component or hook (admin_dashboard/dashboard_overview/utils/AdminDashboardOverviewDateRangeUtils.ts)

import { endOfMonth, endOfYear, format, isValid, parseISO, startOfMonth, startOfYear, subMonths } from 'date-fns';
import type { AdminDashboardDateFilterRange } from '@/app/frontend_admin/admin_dashboard/dashboard_overview/types/AdminDashboardOverviewDateFilterTypes';
import type { AdminDashboardDateRange } from '@/app/frontend_admin/admin_dashboard/dashboard_overview/types/AdminDashboardOverviewDateRangeTypes';


/** Converts a valid Date to a local-calendar ISO date key without UTC timezone shifts. */
export function toAdminDashboardDateKey(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

/** Bounded dashboard presets use inclusive local-calendar dates. @description Implements getAdminDashboardPresetDateRange for the owning feature’s explicitly typed data. @param preset - Input used by this utility as declared by the signature. @param today - Input used by this utility as declared by the signature. @returns The typed result declared by the function signature. */
export function getAdminDashboardPresetDateRange(preset: AdminDashboardDateFilterRange, today = new Date()): AdminDashboardDateRange | null {
  const currentMonth = startOfMonth(today);
  let startDate: Date;
  let endDate: Date;
  switch (preset) {
    case 'this_month': startDate = currentMonth; endDate = endOfMonth(today); break;
    case 'last_month': startDate = startOfMonth(subMonths(currentMonth, 1)); endDate = endOfMonth(subMonths(currentMonth, 1)); break;
    case 'last_3_months': startDate = startOfMonth(subMonths(currentMonth, 2)); endDate = endOfMonth(today); break;
    case 'last_6_months': startDate = startOfMonth(subMonths(currentMonth, 5)); endDate = endOfMonth(today); break;
    case 'this_year': startDate = startOfYear(today); endDate = endOfYear(today); break;
    default: return null;
  }
  return { startDate: toAdminDashboardDateKey(startDate), endDate: toAdminDashboardDateKey(endDate) };
}

/** @description Implements isValidAdminDashboardDateRange for the owning feature’s explicitly typed data. @param startDate - Input used by this utility as declared by the signature. @param endDate - Input used by this utility as declared by the signature. @returns The typed result declared by the function signature. */
export function isValidAdminDashboardDateRange(startDate: string, endDate: string): boolean {
  const isIsoCalendarDate = (value: string) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const parsed = parseISO(value);
    return isValid(parsed) && format(parsed, 'yyyy-MM-dd') === value;
  };
  return isIsoCalendarDate(startDate) && isIsoCalendarDate(endDate) && startDate <= endDate;
}
