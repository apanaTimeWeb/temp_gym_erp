"use client";
// RESPONSIBILITY: Renders the Manager Attendance-owned URL date-range control.
import { Calendar } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, type ChangeEvent } from 'react';

export const MANAGER_ATTENDANCE_DATE_RANGE_OPTIONS = [
  { labelKey: 'TEXT_THIS_MONTH', value: 'this_month' },
  { labelKey: 'TEXT_LAST_MONTH', value: 'last_month' },
  { labelKey: 'TEXT_LAST_3_MONTHS', value: 'last_3_months' },
  { labelKey: 'TEXT_THIS_YEAR', value: 'this_year' },
  { labelKey: 'TEXT_CUSTOM', value: 'custom' },
] as const;

export type ManagerAttendanceDateRange = typeof MANAGER_ATTENDANCE_DATE_RANGE_OPTIONS[number]['value'];

const toDateValue = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

export function resolveManagerAttendanceDateRange(range: ManagerAttendanceDateRange, referenceDate = new Date()) {
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

export default function ManagerAttendanceTrackingDateFilterDropdown() {
  const t = useTranslations('MANAGER_ATTENDANCE_TRACKING');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const rangeParam = searchParams.get('range') ?? 'this_month';
  const currentRange = MANAGER_ATTENDANCE_DATE_RANGE_OPTIONS.some((opt) => opt.value === rangeParam)
    ? (rangeParam as ManagerAttendanceDateRange)
    : 'this_month';

  const customStartDate = searchParams.get('startDate') ?? '';
  const customEndDate = searchParams.get('endDate') ?? '';

  useEffect(() => {
    if (searchParams.has('range')) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set('range', currentRange);
    const { startDate, endDate } = resolveManagerAttendanceDateRange(currentRange);
    if (startDate) params.set('startDate', startDate);
    if (endDate) params.set('endDate', endDate);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [currentRange, pathname, router, searchParams]);

  const pushParams = (params: URLSearchParams) => {
    params.delete('page');
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleRangeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newRange = event.target.value as ManagerAttendanceDateRange;
    const params = new URLSearchParams(searchParams.toString());
    params.set('range', newRange);

    if (newRange === 'custom') {
      params.delete('startDate');
      params.delete('endDate');
    } else {
      const { startDate, endDate } = resolveManagerAttendanceDateRange(newRange);
      if (startDate) params.set('startDate', startDate); else params.delete('startDate');
      if (endDate) params.set('endDate', endDate); else params.delete('endDate');
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
          className="absolute start-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none"
          aria-hidden="true"
          strokeWidth={2}
        />
        <label className="sr-only" htmlFor="manager-attendance-range">
          {t('TEXT_DATE_RANGE')}
        </label>
        <select
          id="manager-attendance-range"
          value={currentRange}
          onChange={handleRangeChange}
          className="w-full ps-9 pe-8 py-2 text-sm bg-input border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring appearance-none cursor-pointer motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95"
          data-testid="manager_attendance-date-range-dropdown"
        >
          {MANAGER_ATTENDANCE_DATE_RANGE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {t(option.labelKey)}
            </option>
          ))}
        </select>
      </div>

      {currentRange === 'custom' && (
        <div className="flex items-center gap-2">
          <label className="sr-only" htmlFor="manager-attendance-start-date">
            {t('COPY_START_DATE')}
          </label>
          <input
            id="manager-attendance-start-date"
            type="date"
            value={customStartDate}
            onChange={(event) => handleDateChange('startDate', event.target.value)}
            className="px-3 py-2 text-sm bg-input border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95"
          />
          <span className="text-text-secondary text-sm font-medium" aria-hidden="true">
            {t('TEXT_TO')}
          </span>
          <label className="sr-only" htmlFor="manager-attendance-end-date">
            {t('COPY_END_DATE_OPTIONAL')}
          </label>
          <input
            id="manager-attendance-end-date"
            type="date"
            value={customEndDate}
            onChange={(event) => handleDateChange('endDate', event.target.value)}
            className="px-3 py-2 text-sm bg-input border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95"
          />
        </div>
      )}
    </div>
  );
}

