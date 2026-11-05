// RESPONSIBILITY: Calculates Coupons date preset boundaries for URL/API query values. No JSX or network calls.
/** Returns YYYY-MM-DD bounds for a Coupons date preset. */
/**
 * @description Provides coupons formatting or feature utility behavior for SuperadminBillingCouponsDateRangeUtils.
 * @dependencies Pure or module-local utility with no UI rendering or API transport ownership.
 * @edge-case Returns deterministic output for nullable or boundary values handled by the utility contract.
 */
export function SuperadminBillingCouponsDateRangeUtils(preset: string, now = new Date()): { from: string; to: string } {
  const year = now.getFullYear();
  const month = now.getMonth();
  const format = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const subtractMonthsClamped = (date: Date, amount: number): Date => {
    const result = new Date(date.getFullYear(), date.getMonth(), 1);
    result.setMonth(result.getMonth() - amount);
    const lastDay = new Date(result.getFullYear(), result.getMonth() + 1, 0).getDate();
    result.setDate(Math.min(date.getDate(), lastDay));
    return result;
  };
  switch (preset) {
    case 'this_month': return { from: format(new Date(year, month, 1)), to: format(now) };
    case 'last_month': return { from: format(new Date(year, month - 1, 1)), to: format(new Date(year, month, 0)) };
    case 'last_3_months': return { from: format(subtractMonthsClamped(now, 3)), to: format(now) };
    case 'last_6_months': return { from: format(subtractMonthsClamped(now, 6)), to: format(now) };
    case 'this_year': return { from: format(new Date(year, 0, 1)), to: format(new Date(year, 11, 31)) };
    default: return { from: '', to: '' };
  }
}
