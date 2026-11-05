import {
  BILLING_CYCLE_CUSTOM,
  BILLING_CYCLE_ONE_MONTH,
  BILLING_CYCLE_SIX_MONTHS,
  BILLING_CYCLE_THREE_MONTHS,
  BILLING_CYCLE_TWELVE_MONTHS,
} from '@/app/frontend_manager/manager_members/members_directory/constants/manager_members_directory_billing_cycle.constants';

/** Calculates a cycle expiry date without mutating the caller's date. Invalid start dates return null. */
export function ManagerMembersDirectoryCalculateMemberExpiryDate(
  startDate: string | Date,
  billingCycle: string,
  customDays: number = 0,
): string | null {
  const start = startDate instanceof Date ? new Date(startDate.getTime()) : new Date(startDate);
  if (!Number.isFinite(start.getTime())) return null;

  const expiry = new Date(start);
  const addMonthsClamped = (months: number) => {
    const day = expiry.getDate();
    const targetMonth = expiry.getMonth() + months;
    expiry.setDate(1);
    expiry.setMonth(targetMonth);
    const lastDay = new Date(expiry.getFullYear(), expiry.getMonth() + 1, 0).getDate();
    expiry.setDate(Math.min(day, lastDay));
  };
  if (billingCycle === BILLING_CYCLE_ONE_MONTH || billingCycle === 'Monthly') addMonthsClamped(1);
  else if (billingCycle === BILLING_CYCLE_THREE_MONTHS || billingCycle === 'Quarterly') addMonthsClamped(3);
  else if (billingCycle === BILLING_CYCLE_SIX_MONTHS || billingCycle === 'Semiannual') addMonthsClamped(6);
  else if (billingCycle === BILLING_CYCLE_TWELVE_MONTHS || billingCycle === 'Annual') addMonthsClamped(12);
  else if (billingCycle === BILLING_CYCLE_CUSTOM && Number.isSafeInteger(customDays) && customDays > 0) expiry.setDate(expiry.getDate() + customDays);

  return expiry.toISOString().split('T')[0] ?? null;
}
