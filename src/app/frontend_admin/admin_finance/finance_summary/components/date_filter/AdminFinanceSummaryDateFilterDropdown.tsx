"use client";
// RESPONSIBILITY: Owns the finance date-range controls and synchronizes validated date-only filters to URL state.
// DATA FLOW: feature data/state and user input → AdminFinanceOverviewDateFilterDropdown → accessible UI/events routed to owning hooks (admin_finance/finance_summary/components/date_filter/AdminFinanceOverviewDateFilterDropdown.tsx)

import { useCallback, useEffect, useRef } from 'react';
import type { ChangeEvent } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { AdminNavigationLayoutSearchableDropdown } from '@/app/frontend_admin/admin_finance/finance_summary/components/searchable_dropdown/AdminFinanceSummarySearchableDropdown';
import type { AdminFinanceDateFilterRange } from '@/app/frontend_admin/admin_finance/finance_summary/types/AdminFinanceSummaryDateFilterTypes';
import { getAdminFinancePresetDateRange, isValidAdminFinanceDateRange, isValidAdminFinanceDateKey } from '@/app/frontend_admin/admin_finance/finance_summary/utils/AdminFinanceSummaryDateRangeUtils';
import { FINANCE_DATE_FILTER_PRESETS, FINANCE_DATE_FILTER_OPTION_LABEL_KEYS } from '@/app/frontend_admin/admin_finance/finance_summary/constants/AdminFinanceSummaryConstants';


/**
 * @description AdminFinanceOverviewDateFilterDropdown renders the FinanceOverviewDateFilterDropdown interface for its owning feature.
 * @dependencies Uses feature-local hooks and zero-business UI primitives.
 * @edge-case Preserves contract-defined loading, empty, error, permission, and recovery states.
 */
export function AdminFinanceOverviewDateFilterDropdown() {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const rawRange = searchParams.get('range');
  const value: AdminFinanceDateFilterRange = FINANCE_DATE_FILTER_PRESETS.includes(rawRange as (typeof FINANCE_DATE_FILTER_PRESETS)[number]) ? rawRange as AdminFinanceDateFilterRange : 'this_month';
  const startDate = searchParams.get('startDate') ?? '';
  const endDate = searchParams.get('endDate') ?? '';
  const validCustomRange = isValidAdminFinanceDateRange(startDate, endDate);
  const hasInvalidCustomRange = value === 'custom' && !validCustomRange;
  const startIsValid = isValidAdminFinanceDateKey(startDate);
  const endIsValid = isValidAdminFinanceDateKey(endDate);

  const options = FINANCE_DATE_FILTER_OPTION_LABEL_KEYS.map((option) => ({ value: option.value, label: t(option.labelKey) }));

  // Stage adjacent edits until the router has committed the new searchParams snapshot.
  const renderedQuery = searchParams.toString();
  const pendingUrlRef = useRef<{ snapshots: Set<string>; latest: string } | null>(null);
  useEffect(() => {
    const draft = pendingUrlRef.current;
    if (draft && (draft.latest === renderedQuery || !draft.snapshots.has(renderedQuery))) pendingUrlRef.current = null;
  }, [renderedQuery]);
  const replaceParams = useCallback((update: (params: URLSearchParams) => void) => {
    const draft = pendingUrlRef.current;
    const canReuse = Boolean(draft?.snapshots.has(renderedQuery));
    const params = new URLSearchParams(canReuse ? draft!.latest : renderedQuery);
    update(params);
    params.delete('page'); // Date changes reset paginated results.
    const query = params.toString();
    pendingUrlRef.current = { snapshots: new Set([...(canReuse ? draft!.snapshots : []), renderedQuery, query]), latest: query };
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [pathname, router, renderedQuery]);

  const handlePresetChange = useCallback((presetValue: string) => {
    const preset = FINANCE_DATE_FILTER_PRESETS.includes(presetValue as (typeof FINANCE_DATE_FILTER_PRESETS)[number])
      ? presetValue as AdminFinanceDateFilterRange : 'this_month';
    const range = getAdminFinancePresetDateRange(preset);
    replaceParams((params) => {
      params.set('range', preset);
      if (range) {
        params.set('startDate', range.startDate);
        params.set('endDate', range.endDate);
      } else if (preset !== 'custom') {
        params.delete('startDate');
        params.delete('endDate');
      }
    });
  }, [replaceParams]);

  const updateCustomDate = useCallback((key: 'startDate' | 'endDate', dateValue: string) => {
    replaceParams((params) => {
      params.set('range', 'custom');
      if (dateValue) params.set(key, dateValue);
      else params.delete(key);
    });
  }, [replaceParams]);

  return (
    <div className="w-full max-w-md space-y-3">
      <div className="w-full bg-input border border-border rounded-lg shadow-card">
        <AdminNavigationLayoutSearchableDropdown options={options} value={value} onChange={(nextValue) => handlePresetChange(String(nextValue))} placeholder={t('finance.AdminFinanceDateFilterDropdown.text_12e1289bac')} testId="admin_finance-admin_finance-date-filter-dropdown-filter" />
      </div>
      {value === 'custom' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 rounded-lg border border-border bg-card p-3" data-testid="admin_finance-admin_finance-date-filter-custom-range">
          <div>
            <label htmlFor="admin-finance-custom-start-date" className="mb-1 block text-sm font-medium text-secondary">{t('finance.AdminFinanceDateFilterDropdown.customStartDate')}</label>
            <input id="admin-finance-custom-start-date" type="date" value={startDate} max={endIsValid ? endDate : undefined} onChange={(event: ChangeEvent<HTMLInputElement>) => updateCustomDate('startDate', event.target.value)} aria-invalid={hasInvalidCustomRange} aria-describedby="admin-finance-custom-range-help" className="w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-11"  data-testid="finance-overview-finance-overview-date-filter-dropdown-admin-finance-custom-start-date"/>
          </div>
          <div>
            <label htmlFor="admin-finance-custom-end-date" className="mb-1 block text-sm font-medium text-secondary">{t('finance.AdminFinanceDateFilterDropdown.customEndDate')}</label>
            <input id="admin-finance-custom-end-date" type="date" value={endDate} min={startIsValid ? startDate : undefined} onChange={(event: ChangeEvent<HTMLInputElement>) => updateCustomDate('endDate', event.target.value)} aria-invalid={hasInvalidCustomRange} aria-describedby="admin-finance-custom-range-help" className="w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-11"  data-testid="finance-overview-finance-overview-date-filter-dropdown-admin-finance-custom-end-date"/>
          </div>
          <p id="admin-finance-custom-range-help" aria-live="polite" className={validCustomRange ? 'col-span-full text-xs text-secondary' : 'col-span-full text-xs text-danger'} role="status" data-testid="finance-overview-finance-overview-date-filter-dropdown-status-region">
            {validCustomRange ? t('finance.AdminFinanceDateFilterDropdown.customRangeHelp') : t('finance.AdminFinanceDateFilterDropdown.customRangeInvalid')}
          </p>
        </div>
      )}
    </div>
  );
}
