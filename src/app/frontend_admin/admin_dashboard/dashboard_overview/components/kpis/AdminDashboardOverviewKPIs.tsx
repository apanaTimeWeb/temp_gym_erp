"use client";
// RESPONSIBILITY: Renders the two rows of KPI metric stat cards on the dashboard using live data from useAdminDashboardLogic.
// DATA FLOW: feature data/state and user input → AdminDashboardOverviewKPIs → accessible UI/events routed to owning hooks (admin_dashboard/dashboard_overview/components/kpis/AdminDashboardOverviewKPIs.tsx)

import { useLocale, useTranslations } from 'next-intl';

import { useAdminDashboardLogic } from '@/app/frontend_admin/admin_dashboard/dashboard_overview/hooks/useAdminDashboardOverviewLogic';
import { useAdminDashboardDateRangeSuffix } from '@/app/frontend_admin/admin_dashboard/dashboard_overview/hooks/useAdminDashboardOverviewDateRangeSuffix';
import AdminNavigationLayoutStatCard from '@/app/frontend_admin/admin_dashboard/dashboard_overview/components/AdminDashboardOverviewStatCard';
import { AdminDashboardFormatCurrency } from '@/app/frontend_admin/admin_dashboard/dashboard_overview/utils/AdminDashboardOverviewFormatCurrency';
import { formatNumber } from '@/app/frontend_admin/admin_dashboard/dashboard_overview/utils/AdminDashboardOverviewFormatters';
import { displayValue } from '@/app/frontend_admin/admin_dashboard/dashboard_overview/utils/AdminDashboardOverviewDisplayValue';
import { Users, DollarSign, TrendingUp, AlertCircle, Clock, UserCheck } from 'lucide-react';

/**
 * AdminDashboardOverviewKPIs renders the admin dashboard kpis UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminDashboardOverviewKPIs: Renders the two rows of KPI metric stat cards on the dashboard using live data from useAdminDashboardLogic.
 * @dependencies Consumes useAdminDashboardLogic, AdminNavigationLayoutStatCard, AdminDashboardFormatCurrency, AdminDashboardFormatters, useAdminDashboardDateRangeSuffix.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminDashboardOverviewKPIs() {
  const locale = useLocale();
  const t = useTranslations();
  const suffix = useAdminDashboardDateRangeSuffix();
  const { stats } = useAdminDashboardLogic();
  
  if (!stats) return null;
  
  const s = stats;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-4" data-testid="admin_dashboard-admindashboardkpis-summary">
      <AdminNavigationLayoutStatCard
        title={t('dashboard.admin_dashboard_kpis.auto_avgAttendance', { suffix })}
        value={s.avgAttendance == null ? displayValue(s.avgAttendance) : formatNumber(s.avgAttendance, locale)}
        change={t('admin_dashboard_kpis.auto_thisMonth')}
        changeType="neutral"
        icon={Users}
        iconBg="bg-primary-subtle"
        iconColor="text-primary"
       testId="admin_dashboard-admindashboardkpis-kpi-1"/>
      <AdminNavigationLayoutStatCard
        title={t('dashboard.admin_dashboard_kpis.auto_renewalsPending', { suffix })}
        value={s.renewalsPending == null ? displayValue(s.renewalsPending) : formatNumber(s.renewalsPending, locale)}
        change={t('admin_dashboard_kpis.auto_next7Days')}
        changeType="neutral"
        icon={Clock}
        iconBg="bg-warning-bg"
        iconColor="text-warning"
       testId="admin_dashboard-admindashboardkpis-kpi-2"/>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <AdminNavigationLayoutStatCard
        title={t('dashboard.admin_dashboard_kpis.auto_totalIncome', { suffix })}
        value={AdminDashboardFormatCurrency(s.totalRevenue || 0, s.currency, locale)}
        change={t('admin_dashboard_kpis.auto_allTime')}
        changeType="neutral"
        icon={DollarSign}
        iconBg="bg-primary-subtle"
        iconColor="text-primary"
       testId="admin_dashboard-admindashboardkpis-kpi-3"/>
      <AdminNavigationLayoutStatCard
        title={t('dashboard.admin_dashboard_kpis.auto_netProfit', { suffix })}
        value={AdminDashboardFormatCurrency(s.netProfit || 0, s.currency, locale)}
        change={t('admin_dashboard_kpis.auto_allTime')}
        changeType="neutral"
        icon={TrendingUp}
        iconBg="bg-success-bg"
        iconColor="text-success"
       testId="admin_dashboard-admindashboardkpis-kpi-4"/>
      <AdminNavigationLayoutStatCard
        title={t('dashboard.admin_dashboard_kpis.auto_activeMembers', { suffix })}
        value={formatNumber(s.activeMembers || 0, locale)}
        change={t('admin_dashboard_kpis.auto_capacity', { percent: s.totalMembers ? Math.round((s.activeMembers / s.totalMembers) * 100) : 0 })}
        changeType="neutral"
        icon={UserCheck}
        iconBg="bg-info-bg"
        iconColor="text-info"
       testId="admin_dashboard-admindashboardkpis-kpi-5"/>
      <AdminNavigationLayoutStatCard
        title={t('dashboard.admin_dashboard_kpis.auto_totalOutstanding', { suffix })}
        value={AdminDashboardFormatCurrency(s.pendingPayments || 0, s.currency, locale)}
        change={t('admin_dashboard_kpis.auto_membersDue', { count: s.membersByStatus?.pending || 0 })}
        changeType="neutral"
        icon={AlertCircle}
        iconBg="bg-danger-bg"
        iconColor="text-danger"
       testId="admin_dashboard-admindashboardkpis-kpi-6"/>
    </div>
    </>
  );
}
