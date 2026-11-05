"use client";
// RESPONSIBILITY: A unified Date Filter dropdown used across Admin pages (Dashboard, Finance, Reports, Sales).
// DATA FLOW: feature data/state and user input → AdminSalesAnalyticsDateFilterDropdown → accessible UI/events routed to owning hooks (admin_sales/sales_memberships/components/date_filter/AdminSalesAnalyticsDateFilterDropdown.tsx)

import { useTranslations } from 'next-intl';
// It syncs the selected preset directly to the URL query parameters (range, startDate, endDate), allowing SSR/hooks to fetch data accordingly.

import { useCallback } from 'react';
import { DATE_FILTERS } from '@/app/frontend_admin/admin_sales/sales_memberships/constants/AdminSalesMembershipsConstants';
import { isValidAdminSalesMembershipsDateRange } from '@/app/frontend_admin/admin_sales/sales_memberships/utils/AdminSalesMembershipsDateRangeUtils';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { AdminNavigationLayoutSearchableDropdown } from '@/app/frontend_admin/admin_sales/sales_memberships/components/searchable_dropdown/AdminSalesMembershipsSearchableDropdown';
import { getAdminSalesMembershipsPresetDateRange } from '@/app/frontend_admin/admin_sales/sales_memberships/utils/AdminSalesMembershipsDateRangeUtils';

import type { DateFilter as AdminSalesDateFilterRange } from '@/app/frontend_admin/admin_sales/sales_memberships/types/AdminSalesMembershipsTypes';


/**
 * AdminSalesAnalyticsDateFilterDropdown renders the admin sales date filter dropdown UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminSalesAnalyticsDateFilterDropdown: A unified Date Filter dropdown used across Admin pages (Dashboard, Finance, Reports, Sales).
 * @dependencies Consumes AdminNavigationLayoutSearchableDropdown, AdminSalesTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export function AdminSalesAnalyticsDateFilterDropdown() {
  const t = useTranslations();

  const options = [
    { value: 'this_month', label: t('sales.AdminAuditRepair.thisMonth') },
    { value: 'last_month', label: t('sales.AdminAuditRepair.lastMonth') },
    { value: 'last_3_months', label: t('sales.AdminAuditRepair.last3Months') },
    { value: 'last_6_months', label: t('sales.AdminAuditRepair.last6Months') },
    { value: 'this_year', label: t('sales.AdminAuditRepair.thisYear') },
    { value: 'monthly', label: t('sales.AdminAuditRepair.monthlyAllTime') }, // Keep compatibility with dashboard
    { value: 'yearly', label: t('sales.AdminAuditRepair.yearlyAllTime') },   // Keep compatibility with dashboard
    { value: 'custom', label: t('sales.AdminAuditRepair.customRange') },
  ];

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const requestedValue = searchParams.get('range') ?? 'this_month';
  const value: AdminSalesDateFilterRange = (DATE_FILTERS as readonly string[]).includes(requestedValue) ? requestedValue as AdminSalesDateFilterRange : 'this_month';

  const handlePresetChange = useCallback((preset: string) => {
    const safePreset = (DATE_FILTERS as readonly string[]).includes(preset) ? preset as AdminSalesDateFilterRange : 'this_month';
    const bounds = getAdminSalesMembershipsPresetDateRange(safePreset);
    const params = new URLSearchParams(searchParams.toString());
    params.set('range', safePreset);
    if (bounds) {
      params.set('startDate', bounds.startDate);
      params.set('endDate', bounds.endDate);
    } else if (safePreset !== 'custom') {
      params.delete('startDate');
      params.delete('endDate');
    }
    params.delete('page');
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [router, searchParams, pathname]);

  const startDate = searchParams.get('startDate') ?? '';
  const endDate = searchParams.get('endDate') ?? '';
  const updateCustomRange = useCallback((key: 'startDate' | 'endDate', date: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('range', 'custom');
    if (date) params.set(key, date); else params.delete(key);
    params.delete('page');
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [router, searchParams, pathname]);
  const customRangeInvalid = value === 'custom' && (!startDate || !endDate || !isValidAdminSalesMembershipsDateRange(startDate, endDate));

  return (
    <div className="flex flex-col gap-2">
      <div className="w-48 bg-input border border-border rounded-lg shadow-card">
        <AdminNavigationLayoutSearchableDropdown
          options={options}
          value={value}
          onChange={(val) => handlePresetChange(String(val))}
          placeholder={t('sales.AdminSalesDateFilterDropdown.text_12e1289bac')}
          testId="admin_sales-admin_sales-date-filter-dropdown-filter"/>
      </div>
      {value === 'custom' && (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <label className="flex flex-col gap-1 text-xs text-secondary">
            <span>{t('sales.AdminSalesDateFilterDropdown.startDate')}</span>
            <input type="date" value={startDate} onChange={(event) => updateCustomRange('startDate', event.target.value)} aria-label={t('sales.AdminSalesDateFilterDropdown.startDate')} className="min-h-11 rounded-lg border border-border bg-input px-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="admin_sales-custom-start-date" />
          </label>
          <label className="flex flex-col gap-1 text-xs text-secondary">
            <span>{t('sales.AdminSalesDateFilterDropdown.endDate')}</span>
            <input type="date" min={startDate || undefined} value={endDate} onChange={(event) => updateCustomRange('endDate', event.target.value)} aria-label={t('sales.AdminSalesDateFilterDropdown.endDate')} className="min-h-11 rounded-lg border border-border bg-input px-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="admin_sales-custom-end-date" />
          </label>
          {customRangeInvalid && <p className="text-xs text-danger" role="status" data-testid="sales-analytics-sales-analytics-date-filter-dropdown-status-region">{t('sales.AdminSalesDateFilterDropdown.customRangeHelp')}</p>}
        </div>
      )}
    </div>
  );
}
