// RESPONSIBILITY: Provides feature-local formatting or transformation helpers for finance_payments; it does not own network state or UI workflow.
// DATA FLOW: verified feature data → focused utility → formatted/normalized result → owning component or hook (admin_finance/finance_payments/utils/AdminFinanceOverviewDateRangeUtils.ts)

import type { AdminFinanceDateFilterRange } from '@/app/frontend_admin/admin_finance/finance_payments/types/AdminFinancePaymentsDateFilterTypes';
import type { AdminFinanceDateRange } from '@/app/frontend_admin/admin_finance/finance_payments/types/AdminFinancePaymentsDateRangeTypes';


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
  switch (preset) {
    case 'this_month':
      from = new Date(year, month, 1);
      to = new Date(year, month + 1, 0);
      break;
    case 'last_month':
      from = new Date(year, month - 1, 1);
      to = new Date(year, month, 0);
      break;
    case 'last_3_months':
      from = new Date(year, month - 2, 1);
      to = new Date(year, month + 1, 0);
      break;
    case 'last_6_months':
      from = new Date(year, month - 5, 1);
      to = new Date(year, month + 1, 0);
      break;
    case 'this_year':
      from = new Date(year, 0, 1);
      to = new Date(year, 11, 31);
      break;
    default:
      return null;
  }
  return { startDate: toAdminFinanceDateKey(from), endDate: toAdminFinanceDateKey(to) };
}

/** Accept only real ISO calendar dates and an ordered inclusive range. @description Implements isValidAdminFinanceDateRange for the owning feature’s explicitly typed data. @param startDate - Input used by this utility as declared by the signature. @param endDate - Input used by this utility as declared by the signature. @returns The typed result declared by the function signature. */
/** Strict YYYY-MM-DD validation; JS Date normalizes invalid days and years below 0100. */
export function isValidAdminFinanceDateKey(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  if (year < 1 || month < 1 || month > 12 || day < 1 || day > 31) return false;
  const candidate = new Date(0);
  candidate.setFullYear(year, month - 1, day);
  candidate.setHours(0, 0, 0, 0);
  return candidate.getFullYear() === year && candidate.getMonth() === month - 1 && candidate.getDate() === day;
}

/** Inclusive date filter requires two real ordered civil dates. */
export function isValidAdminFinanceDateRange(startDate: string, endDate: string): boolean {
  return isValidAdminFinanceDateKey(startDate) && isValidAdminFinanceDateKey(endDate) && startDate <= endDate;
}
