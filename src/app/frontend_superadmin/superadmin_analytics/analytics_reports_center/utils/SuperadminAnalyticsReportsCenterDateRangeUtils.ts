// RESPONSIBILITY: Calculates Reports date preset boundaries for URL/API query values. No JSX or network calls.
/** Returns YYYY-MM-DD bounds for a Reports date preset. */
/**
 * @description Provides reports formatting or feature utility behavior for getSuperadminAnalyticsReportsPresetRange.
 * @dependencies Pure or module-local utility with no UI rendering or API transport ownership.
 * @edge-case Returns deterministic output for nullable or boundary values handled by the utility contract.
 */
export function getSuperadminAnalyticsReportsPresetRange(preset: string, now = new Date()): { from: string; to: string } {
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
    case 'THIS_MONTH': return { from: format(new Date(year, month, 1)), to: format(now) };
    case 'LAST_MONTH': return { from: format(new Date(year, month - 1, 1)), to: format(new Date(year, month, 0)) };
    case 'LAST_3_MONTHS': return { from: format(subtractMonthsClamped(now, 3)), to: format(now) };
    case 'LAST_6_MONTHS': return { from: format(subtractMonthsClamped(now, 6)), to: format(now) };
    case 'THIS_YEAR': return { from: format(new Date(year, 0, 1)), to: format(new Date(year, 11, 31)) };
    default: return { from: '', to: '' };
  }
}

/** Validates a YYYY-MM-DD calendar date without converting local midnight through UTC. */
export function isValidSuperadminAnalyticsReportsDateParam(value: string): boolean {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return false;
  const [, year, month, day] = match;
  const calendarDate = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
  return calendarDate.getUTCFullYear() === Number(year)
    && calendarDate.getUTCMonth() + 1 === Number(month)
    && calendarDate.getUTCDate() === Number(day);
}
