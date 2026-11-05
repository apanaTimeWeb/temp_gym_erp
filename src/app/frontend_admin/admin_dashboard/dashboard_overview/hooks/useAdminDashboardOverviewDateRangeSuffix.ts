"use client";
// RESPONSIBILITY: Owns feature-local query, mutation, or interaction orchestration for dashboard_overview; it does not render the page UI.
// DATA FLOW: Dashboard date-range state → local formatter utility → dashboard API/query URL construction.

import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import type { AdminDashboardDateFilterRange } from '@/app/frontend_admin/admin_dashboard/dashboard_overview/types/AdminDashboardOverviewDateFilterTypes';
/** @description useAdminDashboardDateRangeSuffix: Owns the useAdminDashboardDateRangeSuffix responsibility for the admin_dashboard feature. @dependencies Consumes AdminDashboardDateFilterTypes. @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation. @returns The hook’s typed data, state, actions, and recovery handlers. */
export function useAdminDashboardDateRangeSuffix(): string {
  const searchParams = useSearchParams();
  const t = useTranslations('dashboard.AdminAuditRepair');
  const range = (searchParams.get('range') as AdminDashboardDateFilterRange | null) ?? 'this_month';

  const labels: Record<AdminDashboardDateFilterRange, string> = {
    this_month: t('thisMonth'),
    last_month: t('lastMonth'),
    last_3_months: t('last3Months'),
    last_6_months: t('last6Months'),
    this_year: t('thisYear'),
    monthly: t('monthlyAllTime'),
    yearly: t('yearlyAllTime'),
    custom: t('customRange'),
  };

  return ` — ${labels[range] ?? labels.this_month}`;
}
