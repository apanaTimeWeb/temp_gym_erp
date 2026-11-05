"use client";
// RESPONSIBILITY: Renders the 4 KPI cards for the Coupons module — total, active, redeemed, revenue lost. Derived from live coupon data.
// DATA FLOW: feature data/state and user input → AdminBillingCouponsManagementKPIs → accessible UI/events routed to owning hooks (admin_coupons/coupons_management/components/kpis/AdminBillingCouponsManagementKPIs.tsx)

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { AdminCouponsFormatCurrency } from '@/app/frontend_admin/admin_billing/billing_coupons_management/utils/AdminBillingCouponsManagementFormatCurrency';
import { formatNumber } from '@/app/frontend_admin/admin_billing/billing_coupons_management/utils/AdminBillingCouponsManagementFormatters';

import { Tag, CheckCircle, BarChart2, TrendingDown } from 'lucide-react';
import AdminNavigationLayoutStatCard from '@/app/frontend_admin/admin_billing/billing_coupons_management/components/AdminBillingCouponsManagementStatCard';
import { useAdminCouponsLogic } from '@/app/frontend_admin/admin_billing/billing_coupons_management/hooks/useAdminBillingCouponsManagementLogic';
import { COUPON_STATUS } from '@/app/frontend_admin/admin_billing/billing_coupons_management/constants/AdminBillingCouponsManagementConstants';

/**
 * AdminBillingCouponsManagementKPIs renders the admin coupons kpis UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminBillingCouponsManagementKPIs: Renders the 4 KPI cards for the Coupons module — total, active, redeemed, revenue lost. Derived from live coupon data.
 * @dependencies Consumes AdminCouponsFormatCurrency, AdminCouponsFormatters, AdminNavigationLayoutStatCard, useAdminCouponsLogic.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminBillingCouponsManagementKPIs() {
  const t = useTranslations();

  const locale = useLocale();
  const { kpis, kpiStatus, kpiError, retryKpis, statusFilter, setStatusFilter } = useAdminCouponsLogic();
  const totalCoupons = kpis?.totalCoupons ?? '—';
  const activeCoupons = kpis?.activeCoupons ?? '—';
  const totalRedeemed = kpis?.totalRedeemed ?? null;
  const revenueLost = kpis?.revenueLost ?? null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4" data-testid="admin_coupons-admincouponskpis-summary">
      <AdminNavigationLayoutStatCard title={t('coupons.admin_coupons_kpis.text_7d485b4ab7')} value={totalCoupons} icon={Tag} iconBg="bg-primary-subtle" iconColor="text-primary"  testId="admin_coupons-admincouponskpis-kpi-1"/>
      <button type="button" aria-pressed={statusFilter === COUPON_STATUS.ACTIVE} aria-label={t('coupons.admin_coupons_kpis.filterActive')} onClick={() => setStatusFilter(statusFilter === COUPON_STATUS.ACTIVE ? 'all' : COUPON_STATUS.ACTIVE)} className="min-w-0 rounded-xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="coupons-management-coupons-management-kp-is-admin-coupons-kpis-filter-active"><AdminNavigationLayoutStatCard title={t('coupons.admin_coupons_kpis.text_9ca2d93313')} value={activeCoupons} change={t('coupons.admin_coupons_kpis.auto_currentlyLive')} changeType="neutral" icon={CheckCircle} iconBg="bg-success-bg" iconColor="text-success" testId="admin_coupons-admincouponskpis-kpi-2"/></button>
      <AdminNavigationLayoutStatCard title={t('coupons.admin_coupons_kpis.text_fb84cffc14')} value={totalRedeemed === null ? '—' : formatNumber(totalRedeemed, locale)} change={t('coupons.admin_coupons_kpis.auto_allTime')} changeType="neutral" icon={BarChart2} iconBg="bg-info-bg" iconColor="text-info"  testId="admin_coupons-admincouponskpis-kpi-3"/>
      <AdminNavigationLayoutStatCard title={t('coupons.admin_coupons_kpis.text_38070154ce')} value={revenueLost === null ? '—' : AdminCouponsFormatCurrency(revenueLost, locale)} change={t('coupons.admin_coupons_kpis.auto_toDiscounts')} changeType="down" icon={TrendingDown} iconBg="bg-danger-bg" iconColor="text-danger"  testId="admin_coupons-admincouponskpis-kpi-4"/>
      {kpiStatus === 'error' && <div role="alert" className="sm:col-span-2 xl:col-span-4 flex items-center justify-between gap-3 text-sm text-danger">{t('coupons.admin_coupons_kpis.loadError')}<button type="button" onClick={() => void retryKpis()} className="min-h-11 rounded-md border border-border px-3 text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="coupons-management-coupons-management-kp-is-retry-kpis">{t('coupons.admin_coupons_kpis.retry')}</button></div>}
    </div>
  );
}
