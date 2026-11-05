"use client";
// RESPONSIBILITY: KPI cards for the Blacklist module.
// DATA FLOW: feature data/state and user input → AdminMembersBlacklistManagementKPIs → accessible UI/events routed to owning hooks (admin_blacklist/blacklist_management/components/kpis/AdminMembersBlacklistManagementKPIs.tsx)

import { useTranslations } from 'next-intl';

import { Ban, Globe, Building2, CalendarPlus } from 'lucide-react';
import AdminNavigationLayoutStatCard from '@/app/frontend_admin/admin_members/members_blacklist_management/components/AdminMembersBlacklistManagementStatCard';
import { useAdminBlacklistLogic } from '@/app/frontend_admin/admin_members/members_blacklist_management/hooks/useAdminMembersBlacklistManagementLogic';

/**
 * AdminMembersBlacklistManagementKPIs renders the admin blacklist kpis UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminMembersBlacklistManagementKPIs: KPI cards for the Blacklist module.
 * @dependencies Consumes AdminNavigationLayoutStatCard, useAdminBlacklistLogic.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminMembersBlacklistManagementKPIs() {
  const t = useTranslations();

  const { kpis, kpiStatus, retryKpis } = useAdminBlacklistLogic();
  if (kpiStatus === 'pending' && !kpis) return <div role="status" aria-live="polite" className="rounded-xl border border-border bg-card p-4 text-sm text-secondary" data-testid="blacklist-management-blacklist-management-kp-is-status-region">{t('blacklist.AdminRepair.loadingSummary')}</div>;
  if (kpiStatus === 'error' && !kpis) return <div role="alert" className="rounded-xl border border-danger bg-danger-bg p-4 text-sm text-danger"><p>{t('blacklist.AdminRepair.summaryLoadError')}</p><button type="button" onClick={() => void retryKpis()} className="mt-3 min-h-11 rounded-lg border border-border px-4" data-testid="blacklist-management-blacklist-management-kp-is-retry-kpis">{t('blacklist.AdminRepair.retry')}</button></div>;
  if (!kpis) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4" data-testid="admin_blacklist-adminblacklistkpis-summary">
      <AdminNavigationLayoutStatCard title={t('blacklist.admin_blacklist_kpis.text_697df5412b')} value={kpis.totalBlacklisted} icon={Ban} iconBg="bg-danger-bg" iconColor="text-danger"  testId="admin_blacklist-adminblacklistkpis-kpi-1"/>
      <AdminNavigationLayoutStatCard title={t('blacklist.admin_blacklist_kpis.text_d0838925b1')} value={kpis.globalBans} change={t('blacklist.admin_blacklist_kpis.auto_acrossAllGyms')} changeType="neutral" icon={Globe} iconBg="bg-danger-bg" iconColor="text-danger"  testId="admin_blacklist-adminblacklistkpis-kpi-2"/>
      <AdminNavigationLayoutStatCard title={t('blacklist.admin_blacklist_kpis.text_d4569d3f03')} value={kpis.gymSpecificBans} change={t('blacklist.admin_blacklist_kpis.auto_targetedBranches')} changeType="neutral" icon={Building2} iconBg="bg-warning-bg" iconColor="text-warning"  testId="admin_blacklist-adminblacklistkpis-kpi-3"/>
      <AdminNavigationLayoutStatCard title={t('blacklist.admin_blacklist_kpis.text_c161761c78')} value={kpis.addedThisMonth} icon={CalendarPlus} iconBg="bg-primary-subtle" iconColor="text-primary"  testId="admin_blacklist-adminblacklistkpis-kpi-4"/>
    </div>
  );
}
