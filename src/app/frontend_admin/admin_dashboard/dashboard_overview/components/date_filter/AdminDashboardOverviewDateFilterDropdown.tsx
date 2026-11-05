"use client";
// RESPONSIBILITY: Dashboard-owned date filter dropdown; reporting modules own their own domain presets.
// DATA FLOW: feature data/state and user input → AdminDashboardOverviewDateFilterDropdown → accessible UI/events routed to owning hooks (admin_dashboard/dashboard_overview/components/date_filter/AdminDashboardOverviewDateFilterDropdown.tsx)

import { useTranslations } from 'next-intl';
import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { AdminNavigationLayoutSearchableDropdown } from '@/app/frontend_admin/admin_dashboard/dashboard_overview/components/searchable_dropdown/AdminDashboardOverviewSearchableDropdown';
import type { AdminDashboardDateFilterRange } from '@/app/frontend_admin/admin_dashboard/dashboard_overview/types/AdminDashboardOverviewDateFilterTypes';
import { ADMIN_DASHBOARD_DATE_FILTER_PRESETS } from '@/app/frontend_admin/admin_dashboard/dashboard_overview/constants/AdminDashboardOverviewConstants';
import { getAdminDashboardPresetDateRange, isValidAdminDashboardDateRange } from '@/app/frontend_admin/admin_dashboard/dashboard_overview/utils/AdminDashboardOverviewDateRangeUtils';

const ADMIN_DASHBOARD_DATE_FILTER_VALUES: readonly AdminDashboardDateFilterRange[] = ['this_month', 'last_month', 'last_3_months', 'last_6_months', 'this_year', 'monthly', 'yearly', 'custom'];

/**
 * @description AdminDashboardOverviewDateFilterDropdown renders the DashboardOverviewDateFilterDropdown interface for its owning feature.
 * @dependencies Uses feature-local hooks and zero-business UI primitives.
 * @edge-case Preserves contract-defined loading, empty, error, permission, and recovery states.
 */
export function AdminDashboardOverviewDateFilterDropdown() {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const rawRange = searchParams.get('range') ?? 'this_month';
  const value: AdminDashboardDateFilterRange = (ADMIN_DASHBOARD_DATE_FILTER_VALUES.includes(rawRange as AdminDashboardDateFilterRange) ? rawRange : 'this_month') as AdminDashboardDateFilterRange;
  const startDate = searchParams.get('startDate') ?? '';
  const endDate = searchParams.get('endDate') ?? '';
  const customValid = isValidAdminDashboardDateRange(startDate, endDate);
  const options = ADMIN_DASHBOARD_DATE_FILTER_PRESETS.map(({ value: preset, messageKey }) => ({
    value: preset,
    label: t(`dashboard.AdminAuditRepair.${messageKey}`),
  }));

  const updateParams = useCallback((updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, nextValue]) => nextValue ? params.set(key, nextValue) : params.delete(key));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, router, searchParams]);

  const handlePresetChange = useCallback((presetValue: string) => {
    const preset = ADMIN_DASHBOARD_DATE_FILTER_VALUES.includes(presetValue as AdminDashboardDateFilterRange) ? presetValue as AdminDashboardDateFilterRange : 'this_month';
    const range = getAdminDashboardPresetDateRange(preset);
    const updates: Record<string, string | null> = { range: preset };
    if (range) {
      updates.startDate = range.startDate;
      updates.endDate = range.endDate;
    } else if (preset !== 'custom') {
      updates.startDate = null;
      updates.endDate = null;
    }
    updateParams(updates);
  }, [updateParams]);

  const updateCustomDate = (key: 'startDate' | 'endDate', nextValue: string) => {
    updateParams({ range: 'custom', [key]: nextValue || null });
  };

  return (
    <div className="space-y-3">
      <div className="w-48 rounded-lg border border-border bg-input shadow-card">
        <AdminNavigationLayoutSearchableDropdown options={options} value={value} onChange={(next) => handlePresetChange(String(next))} placeholder={t('dashboard.AdminDashboardDateFilterDropdown.text_12e1289bac')} testId="admin_dashboard-admin_dashboard-date-filter-dropdown-filter" />
      </div>
      {value === 'custom' && (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <div className="space-y-1">
            <label htmlFor="admin-dashboard-custom-start-date" className="text-sm text-secondary">{t('dashboard.admin_dashboard_date_filter.startDate')}</label>
            <input id="admin-dashboard-custom-start-date" type="date" value={startDate} max={endDate || undefined} onChange={(event) => updateCustomDate('startDate', event.target.value)} className="min-h-11 rounded-lg border border-border bg-input px-3 text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"  data-testid="dashboard-overview-dashboard-overview-date-filter-dropdown-admin-dashboard-custom-start-date"/>
          </div>
          <div className="space-y-1">
            <label htmlFor="admin-dashboard-custom-end-date" className="text-sm text-secondary">{t('dashboard.admin_dashboard_date_filter.endDate')}</label>
            <input id="admin-dashboard-custom-end-date" type="date" value={endDate} min={startDate || undefined} onChange={(event) => updateCustomDate('endDate', event.target.value)} className="min-h-11 rounded-lg border border-border bg-input px-3 text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"  data-testid="dashboard-overview-dashboard-overview-date-filter-dropdown-admin-dashboard-custom-end-date"/>
          </div>
          {!customValid && <p role="alert" className="text-sm text-danger sm:col-span-2">{t('dashboard.admin_dashboard_date_filter.invalidRange')}</p>}
        </div>
      )}
    </div>
  );
}
