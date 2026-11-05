// RESPONSIBILITY: Renders/orchestrates SuperadminAnalyticsDashboardDateFilterDropdown within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: A unified Date Filter dropdown used across Superadmin pages (Dashboard, Analytics, Invoices, Coupons, Onboarding, Reports).


import { useCallback } from 'react';

import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

import { SearchableDropdown } from '@/components/ui/SearchableDropdown';

import { SUPERADMIN_ANALYTICS_DATE_FILTER_OPTIONS } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/constants/superadmin_analytics_dashboard_date_filter.constants';
import { getSuperadminAnalyticsPresetRange, hasValidAnalyticsCustomRange, isSuperadminAnalyticsDateRange } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/utils/SuperadminAnalyticsDashboardDateRangeUtils';

import type { SuperadminAnalyticsDateFilterBoundary, SuperadminAnalyticsDateRange } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/types/superadmin_analytics_dashboard_date_filter.types';

/**
 * @description A unified Date Filter dropdown used across Superadmin pages (Dashboard, Analytics, Invoices, Coupons, Onboarding, Reports).
 * @dependencies Uses the existing feature-local API, query, state, and approved UI/infrastructure contracts imported by this component.
 * @edge-case Interactive, loading, empty, error, disabled, and repeated-action paths must remain recoverable through the owning feature contract.
 */
export function SuperadminAnalyticsDashboardDateFilterDropdown() {
  const t = useTranslations('superadmin_analytics');
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const rangeParam = searchParams.get('range');
    const value: SuperadminAnalyticsDateRange = isSuperadminAnalyticsDateRange(rangeParam) ? rangeParam : 'this_month';
    const currentStartDate = searchParams.get('startDate') || '';
    const currentEndDate = searchParams.get('endDate') || '';
    const customRangeInvalid = value === 'custom' && !hasValidAnalyticsCustomRange(currentStartDate, currentEndDate);
    const handleCustomDateChange = useCallback((type: SuperadminAnalyticsDateFilterBoundary, val: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('range', 'custom');
        if (type === 'start') {
            if (val)
                params.set('startDate', val);
            else
                params.delete('startDate');
        }
        else {
            if (val)
                params.set('endDate', val);
            else
                params.delete('endDate');
        }
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, [router, searchParams, pathname]);
    const handlePresetChange = useCallback((preset: string) => {
        const { from, to } = getSuperadminAnalyticsPresetRange(preset);
        const params = new URLSearchParams(searchParams.toString());
        params.set('range', preset);
        if (preset !== 'custom' && preset !== 'monthly' && preset !== 'yearly') {
            params.set('startDate', from);
            params.set('endDate', to);
        } else if (preset !== 'custom') {
            params.delete('startDate');
            params.delete('endDate');
        }
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, [router, searchParams, pathname]);
    return (<div className="flex items-center gap-2 flex-wrap">
      <div className="w-48 bg-floating border border-border rounded-lg shadow-card shrink-0">
        <SearchableDropdown data-testid="superadmin_analytics-superadmin-analytics-date-filter-dropdown-filter-dropdown-SearchableDropdown-59" options={SUPERADMIN_ANALYTICS_DATE_FILTER_OPTIONS.map((option) => ({ value: option.value, label: t(option.labelKey) }))} value={value} onChange={(val) => handlePresetChange(String(val))} className="bg-transparent border-transparent"/>
      </div>

      {value === 'custom' && (<div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 bg-floating border border-border rounded-lg shadow-card px-3 py-2 shrink-0">
          <label htmlFor="superadmin_analytics-custom-start-date" className="sr-only">{t('ui.custom_start_date_v3')}</label>
          <input  id="superadmin_analytics-custom-start-date" type="date" aria-invalid={customRangeInvalid} aria-describedby={customRangeInvalid ? "superadmin_analytics-custom-range-error" : undefined} value={currentStartDate} onChange={(e) => handleCustomDateChange('start', e.target.value)} className="min-h-11 bg-input text-sm text-primary focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page custom-date-input motion-safe:transition-all motion-safe:duration-base ease-in-out" data-testid="superadmin_analytics-superadmin-analytics-date-filter-dropdown-filter-dropdown-date-end"/>
          <span className="text-secondary text-sm font-medium">{t('ui.to_a179b48')}</span>
          <label htmlFor="superadmin_analytics-custom-end-date" className="sr-only">{t('ui.custom_end_date_v3')}</label>
          <input  id="superadmin_analytics-custom-end-date" type="date" aria-invalid={customRangeInvalid} aria-describedby={customRangeInvalid ? "superadmin_analytics-custom-range-error" : undefined} value={currentEndDate} onChange={(e) => handleCustomDateChange('end', e.target.value)} className="min-h-11 bg-input text-sm text-primary focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page custom-date-input motion-safe:transition-all motion-safe:duration-base ease-in-out" data-testid="superadmin_analytics-superadmin-analytics-date-filter-dropdown-filter-dropdown-date-range"/>
        </div>
        {customRangeInvalid ? <p id="superadmin_analytics-custom-range-error" className="text-xs text-danger" role="alert">{t('ui.analytics_custom_range_invalid')}</p> : null}
      </div>)}
    </div>);
}

