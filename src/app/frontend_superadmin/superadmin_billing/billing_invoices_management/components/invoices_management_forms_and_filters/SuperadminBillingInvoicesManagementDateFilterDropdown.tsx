// RESPONSIBILITY: Renders/orchestrates SuperadminBillingInvoicesManagementDateFilterDropdown within its owning Superadmin feature module; no direct backend implementation.
'use client';
/**
 * RESPONSIBILITY: React component SuperadminBillingInvoicesManagementDateFilterDropdown owned by the superadmin_billing_invoices feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: useCallback, useRouter, useSearchParams, usePathname
 * MODULE DEPENDENCIES: next/navigation, react, next-intl, @/components/ui/SearchableDropdown, @/app/frontend_superadmin/superadmin_billing/billing_invoices_management/constants/superadmin_billing_invoices_management.constants, @/app/frontend_superadmin/superadmin_billing/billing_invoices_management/utils/SuperadminBillingInvoicesManagementDateRangeUtils, @/app/frontend_superadmin/superadmin_billing/billing_invoices_management/types/superadmin_billing_invoices_management_date_filter.types
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: A unified Date Filter dropdown used across Superadmin pages (Dashboard, Analytics, Invoices, Coupons, Onboarding, Reports).
// It syncs the selected preset directly to the URL query parameters (range, startDate, endDate), allowing SSR/hooks to fetch data accordingly.


import { useCallback } from 'react';

import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

import { SearchableDropdown } from '@/components/ui/SearchableDropdown';

import { SUPERADMIN_BILLING_INVOICES_DATE_FILTER_OPTIONS } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/constants/superadmin_billing_invoices_management.constants';
import { getSuperadminBillingInvoicesPresetRange } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/utils/SuperadminBillingInvoicesManagementDateRangeUtils';

import type { SuperadminBillingInvoicesDateFilterBoundary, SuperadminBillingInvoicesDateRange } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/types/superadmin_billing_invoices_management_date_filter.types';

/**
 * Responsibility: Renders the SuperadminBillingInvoicesManagementDateFilterDropdown UI boundary for the owning Superadmin feature.
 * Dependencies: Receives typed feature data/actions from the owning module; contains no cross-feature business ownership.
 * Accessibility: Preserves semantic controls, keyboard access, and feature-defined test selectors.
 * Invariants: Visual styling consumes approved semantic tokens and the component remains below the documented size ceiling.
 */
export function SuperadminBillingInvoicesManagementDateFilterDropdown() {
  const t = useTranslations('superadmin_billing_invoices');
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const value = (searchParams.get('range') as SuperadminBillingInvoicesDateRange) ?? 'this_month';
    const currentStartDate = searchParams.get('startDate') || '';
    const currentEndDate = searchParams.get('endDate') || '';
    const handleCustomDateChange = useCallback((type: SuperadminBillingInvoicesDateFilterBoundary, val: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('range', 'custom');
        params.set('page', '1');
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
        const { from, to } = getSuperadminBillingInvoicesPresetRange(preset);
        const params = new URLSearchParams(searchParams.toString());
        params.set('range', preset);
        params.set('page', '1');
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
      <div className="w-48 bg-input border border-border rounded-lg shadow-card shrink-0">
        <SearchableDropdown data-testid="superadmin_billing_invoices-superadmin-invoices-date-filter-dropdown-date-filter" options={SUPERADMIN_BILLING_INVOICES_DATE_FILTER_OPTIONS.map((option) => ({ label: t(option.labelKey), value: option.value }))} value={value} onChange={(val) => handlePresetChange(String(val))} className="bg-transparent border-transparent"/>
      </div>

      {value === 'custom' && (<div className="flex items-center gap-2 bg-input border border-border rounded-lg shadow-card px-3 py-2 shrink-0">
          <input aria-label={t('ui.start_date')} type="date" value={currentStartDate} onChange={(e) => handleCustomDateChange('start', e.target.value)} className="bg-transparent text-sm text-primary focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page custom-date-input min-h-11" data-testid="superadmin_billing_invoices-superadmin-invoices-date-filter-dropdown-date-filter-dropdown-date"/>
          <span className="text-secondary text-sm font-medium">{t('ui.to_01b6e203')}</span>
          <input aria-label={t('ui.end_date')} type="date" value={currentEndDate} onChange={(e) => handleCustomDateChange('end', e.target.value)} className="bg-transparent text-sm text-primary focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page custom-date-input min-h-11" data-testid="superadmin_billing_invoices-superadmin-invoices-date-filter-dropdown-filter-dropdown-date-2"/>
        </div>)}
    </div>);
}

