"use client";
// RESPONSIBILITY: Renders the Earnings-owned URL date-range control; API/query behavior remains in the Earnings query/API layers.
import { Calendar } from 'lucide-react';

import { useTranslations } from 'next-intl';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { TRAINER_EARNINGS_DATE_RANGE_OPTIONS } from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/utils/TrainerEarningsOverviewAndLedgerEarningsDateRangeConstants';

import { TrainerEarningsResolveTrainerEarningsDateRange, TrainerEarningsIsValidDateRange } from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/utils/TrainerEarningsOverviewAndLedgerEarningsResolveTrainerEarningsDateRange';

import type { TrainerEarningsDateField } from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/types/TrainerEarningsOverviewAndLedgerEarningsDateRangeTypes';

import type { TrainerEarningsDateRange } from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/types/TrainerEarningsOverviewAndLedgerEarningsDateRangeTypes';

import { useEffect } from 'react';

import type { ChangeEvent } from 'react';

/**
 * @description Renders the Earnings-owned URL date-range control; API/query behavior remains in the Earnings query/API layers.
 * @dependencies Consumes owning-module props/state and localized UI configuration.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Renders the earnings feature's filtering and control surface, preserving URL/query state and accessible interaction semantics.
 * @dependencies Uses only documented earnings module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerEarningsDateFilterDropdown() {
  const t = useTranslations('TRAINER_EARNINGS');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const rangeParam = searchParams.get('range') ?? 'this_month';
  const currentRange = TRAINER_EARNINGS_DATE_RANGE_OPTIONS.some((option) => option.value === rangeParam) ? rangeParam as TrainerEarningsDateRange : 'this_month';
  const customStartDate = searchParams.get('startDate') ?? '';
  const customEndDate = searchParams.get('endDate') ?? '';
  const customRangeInvalid = currentRange === 'custom' && !TrainerEarningsIsValidDateRange(customStartDate, customEndDate);

  useEffect(() => {
    if (rangeParam === currentRange) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set('range', currentRange);
    const resolved = TrainerEarningsResolveTrainerEarningsDateRange(currentRange);
    if (currentRange === 'custom') { params.delete('startDate'); params.delete('endDate'); }
    else { params.set('startDate', resolved.startDate); params.set('endDate', resolved.endDate); }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [currentRange, pathname, rangeParam, router, searchParams]);

  const pushParams = (params: URLSearchParams) => {
    params.delete('page');
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleRangeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newRange = event.target.value as TrainerEarningsDateRange;
    const params = new URLSearchParams(searchParams.toString());
    params.set('range', newRange);
    if (newRange === 'custom') {
      params.delete('startDate');
      params.delete('endDate');
    } else {
      const { startDate, endDate } = TrainerEarningsResolveTrainerEarningsDateRange(newRange);
      params.set('startDate', startDate);
      params.set('endDate', endDate);
    }
    pushParams(params);
  };

  const handleDateChange = (key: TrainerEarningsDateField, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('range', 'custom');
    if (value) params.set(key, value); else params.delete(key);
    pushParams(params);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center ">
      <div className="relative min-w-40 ">
        <Calendar size={18} className="absolute start-3 top-1/2 -translate-y-1/2 text-secondary pointer-events-none " aria-hidden="true"  strokeWidth={2}/>
        <label className="sr-only " htmlFor="trainer-earnings-range">{t("TEXT_EARNINGS_DATE_RANGE")}</label>
        <select id="trainer-earnings-range" value={currentRange} onChange={handleRangeChange} className="w-full ps-9 pe-8 py-2 text-sm bg-input border border-border rounded-lg text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring appearance-none cursor-pointer  motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_earnings-earnings-main_date_range">
          {TRAINER_EARNINGS_DATE_RANGE_OPTIONS.map((option) => <option key={option.value} value={option.value} data-testid={`trainer_earnings-date-filter_dropdown_option${option.value}`}>{t(option.labelKey)}</option>)}
        </select>
      </div>
      {currentRange === 'custom' && (
        <div className="flex items-center gap-2 ">
          <label className="sr-only " htmlFor="trainer-earnings-start-date">{t("TEXT_EARNINGS_START_DATE")}</label>
          <input id="trainer-earnings-start-date" type="date" aria-invalid={Boolean(customRangeInvalid)} value={customStartDate} onChange={(event) => handleDateChange('startDate', event.target.value)} className="px-3 py-2 text-sm bg-input border border-border rounded-lg text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring  motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95"  data-testid="trainer_earnings-earnings-main_start_date"/>
          <span className="text-secondary text-sm font-medium " aria-hidden="true">{t("TEXT_TO")}</span>
          <label className="sr-only " htmlFor="trainer-earnings-end-date">{t("TEXT_EARNINGS_END_DATE")}</label>
          <input id="trainer-earnings-end-date" type="date" aria-invalid={Boolean(customRangeInvalid)} value={customEndDate} onChange={(event) => handleDateChange('endDate', event.target.value)} className="px-3 py-2 text-sm bg-input border border-border rounded-lg text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring  motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95"  data-testid="trainer_earnings-earnings-main_end_date"/>
          {customRangeInvalid && <p role="alert" className="text-danger text-sm">{t("TEXT_INVALID_DATE_RANGE")}</p>}
        </div>
      )}
    </div>
  );
}
