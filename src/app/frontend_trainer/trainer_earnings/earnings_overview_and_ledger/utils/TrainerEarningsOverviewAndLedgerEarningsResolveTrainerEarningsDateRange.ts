// RESPONSIBILITY: Resolves Earnings date-range presets into server-query date windows. Kept inside Earnings to preserve business/config isolation.
import type { TrainerEarningsDateRange } from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/types/TrainerEarningsOverviewAndLedgerEarningsDateRangeTypes';

const toDateValue = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

/**
 * @description Resolves Earnings date-range presets into server-query date windows. Kept inside Earnings to preserve business/config isolation.
 * @dependencies Uses only the module-owned dependencies declared by this artifact.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
export function TrainerEarningsResolveTrainerEarningsDateRange(range: TrainerEarningsDateRange, referenceDate = new Date()) {
  const year = referenceDate.getFullYear();
  const month = referenceDate.getMonth();
  const end = toDateValue(referenceDate);
  if (range === 'custom') return { startDate: '', endDate: '' };
  if (range === 'this_year') return { startDate: `${year}-01-01`, endDate: end };
  if (range === 'last_month') {
    const start = new Date(year, month - 1, 1);
    const last = new Date(year, month, 0);
    return { startDate: toDateValue(start), endDate: toDateValue(last) };
  }
  const monthsBack = range === 'last_6_months' ? 5 : range === 'last_3_months' ? 2 : 0;
  const start = new Date(year, month - monthsBack, 1);
  return { startDate: toDateValue(start), endDate: end };
}

export function TrainerEarningsIsRealISODate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}
export function TrainerEarningsIsValidDateRange(startDate: string, endDate: string): boolean {
  return TrainerEarningsIsRealISODate(startDate) && TrainerEarningsIsRealISODate(endDate) && startDate <= endDate;
}
