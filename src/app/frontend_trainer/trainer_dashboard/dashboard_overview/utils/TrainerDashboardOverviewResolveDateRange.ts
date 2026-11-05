// RESPONSIBILITY: Resolves Dashboard date-range presets into server-query date windows. Kept inside Dashboard to preserve business/config isolation.
import type { TrainerDashboardDateRange } from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/types/TrainerDashboardOverviewDateRangeTypes';

const toDateValue = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

/**
 * @description Resolves Dashboard date-range presets into server-query date windows. Kept inside Dashboard to preserve business/config isolation.
 * @dependencies Uses only the module-owned dependencies declared by this artifact.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
export function TrainerDashboardResolveDateRange(range: TrainerDashboardDateRange, referenceDate = new Date()) {
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
