"use client";
// RESPONSIBILITY: Renders the Attendance-owned URL date-range control.
import { Calendar } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, type ChangeEvent } from 'react';

export const TRAINER_ATTENDANCE_DATE_RANGE_OPTIONS = [
  { labelKey: 'TEXT_THIS_MONTH', value: 'this_month' },
  { labelKey: 'TEXT_LAST_MONTH', value: 'last_month' },
  { labelKey: 'TEXT_LAST_3_MONTHS', value: 'last_3_months' },
  { labelKey: 'TEXT_THIS_YEAR', value: 'this_year' },
  { labelKey: 'TEXT_CUSTOM', value: 'custom' },
] as const;

export type TrainerAttendanceDateRange = typeof TRAINER_ATTENDANCE_DATE_RANGE_OPTIONS[number]['value'];

const toDateValue = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

export function resolveAttendanceDateRange(range: TrainerAttendanceDateRange, referenceDate = new Date()) {
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
  const monthsBack = range === 'last_3_months' ? 2 : 0;
  const start = new Date(year, month - monthsBack, 1);
  return { startDate: toDateValue(start), endDate: end };
}

export default function TrainerOperationsTrainerAttendanceDateFilterDropdown() {
  const t = useTranslations('TRAINER_ATTENDANCE');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const rangeParam = searchParams.get('range') ?? 'this_month';
  const currentRange = TRAINER_ATTENDANCE_DATE_RANGE_OPTIONS.some((opt) => opt.value === rangeParam)
    ? (rangeParam as TrainerAttendanceDateRange)
    : 'this_month';

  const customStartDate = searchParams.get('startDate') ?? '';
  const customEndDate = searchParams.get('endDate') ?? '';

  useEffect(() => {
    if (searchParams.has('range')) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set('range', currentRange);
    const { startDate, endDate } = resolveAttendanceDateRange(currentRange);
    params.set('startDate', startDate);
    params.set('endDate', endDate);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [currentRange, pathname, router, searchParams]);

  const pushParams = (params: URLSearchParams) => {
    params.delete('page');
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleRangeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newRange = event.target.value as TrainerAttendanceDateRange;
    const params = new URLSearchParams(searchParams.toString());
    params.set('range', newRange);

    if (newRange === 'custom') {
      params.delete('startDate');
      params.delete('endDate');
    } else {
      const { startDate, endDate } = resolveAttendanceDateRange(newRange);
      params.set('startDate', startDate);
      params.set('endDate', endDate);
    }
    pushParams(params);
  };

  const handleDateChange = (key: 'startDate' | 'endDate', value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('range', 'custom');
    if (value) params.set(key, value);
    else params.delete(key);
    pushParams(params);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
      <div className="relative min-w-40">
        <Calendar
          size={18}
          className="absolute start-3 top-1/2 -translate-y-1/2 text-secondary pointer-events-none"
          aria-hidden="true"
          strokeWidth={2}
        />
        <label className="sr-only" htmlFor="trainer-attendance-range">
          {t('TEXT_DATE_RANGE')}
        </label>
        <select
          id="trainer-attendance-range"
          value={currentRange}
          onChange={handleRangeChange}
          className="w-full ps-9 pe-8 py-2 text-sm bg-input border border-border rounded-lg text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring appearance-none cursor-pointer motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95"
          data-testid="trainer_attendance-date_range_select"
        >
          {TRAINER_ATTENDANCE_DATE_RANGE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {t(option.labelKey)}
            </option>
          ))}
        </select>
      </div>

      {currentRange === 'custom' && (
        <div className="flex items-center gap-2">
          <label className="sr-only" htmlFor="trainer-attendance-start-date">
            {t('TEXT_START_DATE')}
          </label>
          <input
            id="trainer-attendance-start-date"
            type="date"
            value={customStartDate}
            onChange={(e) => handleDateChange('startDate', e.target.value)}
            className="px-3 py-2 text-sm bg-input border border-border rounded-lg text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
          />
          <span className="text-secondary text-sm font-medium" aria-hidden="true">
            {t('TEXT_TO')}
          </span>
          <label className="sr-only" htmlFor="trainer-attendance-end-date">
            {t('TEXT_END_DATE')}
          </label>
          <input
            id="trainer-attendance-end-date"
            type="date"
            value={customEndDate}
            onChange={(e) => handleDateChange('endDate', e.target.value)}
            className="px-3 py-2 text-sm bg-input border border-border rounded-lg text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
          />
        </div>
      )}
    </div>
  );
}

