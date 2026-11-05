// RESPONSIBILITY: Provides feature-local formatting or transformation helpers for finance_summary; it does not own network state or UI workflow.
// DATA FLOW: verified feature data → focused utility → formatted/normalized result → owning component or hook (admin_finance/finance_summary/utils/AdminFinanceOverviewDateRangeUtils.ts)

import type { AdminFinanceDateFilterRange } from '@/app/frontend_admin/admin_finance/finance_summary/types/AdminFinanceSummaryDateFilterTypes';
import type { AdminFinanceDateRange } from '@/app/frontend_admin/admin_finance/finance_summary/types/AdminFinanceSummaryDateRangeTypes';


/** Format date-only values in local calendar time; toISOString can shift days across timezones. @description Implements toAdminFinanceDateKey for the owning feature’s explicitly typed data. @param date - Input used by this utility as declared by the signature. @returns The typed result declared by the function signature. */
export function toAdminFinanceDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${String(year).padStart(4, '0')}-${month}-${day}`;
}

/** Resolve bounded presets into inclusive date-only keys. All-time and custom ranges are caller-managed. @description Implements getAdminFinancePresetDateRange for the owning feature’s explicitly typed data. @param preset - Input used by this utility as declared by the signature. @param today - Input used by this utility as declared by the signature. @returns The typed result declared by the function signature. */
export function getAdminFinancePresetDateRange(
  preset: AdminFinanceDateFilterRange,
  today = new Date(),
): AdminFinanceDateRange | null {
  const year = today.getFullYear();
  const month = today.getMonth();
  let from: Date;
  let to: Date;
  const civilDate = (civilYear: number, civilMonth: number, day: number): Date => {
    const date = new Date(0);
    date.setFullYear(civilYear, civilMonth, day);
    date.setHours(12, 0, 0, 0);
    return date;
  };
  switch (preset) {
    case 'this_month':
      from = civilDate(year, month, 1);
      to = civilDate(year, month + 1, 0);
      break;
    case 'last_month':
      from = civilDate(year, month - 1, 1);
      to = civilDate(year, month, 0);
      break;
    case 'last_3_months':
      from = civilDate(year, month - 2, 1);
      to = civilDate(year, month + 1, 0);
      break;
    case 'last_6_months':
      from = civilDate(year, month - 5, 1);
      to = civilDate(year, month + 1, 0);
      break;
    case 'this_year':
      from = civilDate(year, 0, 1);
      to = civilDate(year, 11, 31);
      break;
    default:
      return null;
  }
  return { startDate: toAdminFinanceDateKey(from), endDate: toAdminFinanceDateKey(to) };
}

/** Accept only real ISO calendar dates and an ordered inclusive range. @description Implements isValidAdminFinanceDateRange for the owning feature’s explicitly typed data. @param startDate - Input used by this utility as declared by the signature. @param endDate - Input used by this utility as declared by the signature. @returns The typed result declared by the function signature. */
export function isValidAdminFinanceDateRange(startDate: string, endDate: string): boolean {
  return isValidAdminFinanceDateKey(startDate) && isValidAdminFinanceDateKey(endDate) && startDate <= endDate;
}

/** Strict YYYY-MM-DD validation in the local civil calendar (including years 0001-0099). */
export function isValidAdminFinanceDateKey(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  if (year < 1 || month < 1 || month > 12 || day < 1 || day > 31) return false;
  // new Date(0..99, ...) silently shifts the date into the 1900s.
  const date = new Date(0);
  date.setFullYear(year, month - 1, day);
  date.setHours(12, 0, 0, 0);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}
