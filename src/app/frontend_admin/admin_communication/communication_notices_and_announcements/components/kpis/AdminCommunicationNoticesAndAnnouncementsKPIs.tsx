"use client";
// RESPONSIBILITY: KPI stat cards for the Announcements module.
// DATA FLOW: feature data/state and user input → AdminCommunicationNoticesAndAnnouncementsKPIs → accessible UI/events routed to owning hooks (admin_communication/communication_notices_and_announcements/components/kpis/AdminCommunicationNoticesAndAnnouncementsKPIs.tsx)

import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import { formatNumber } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/utils/AdminCommunicationNoticesAndAnnouncementsFormatters';

import { Megaphone, CheckCircle, Clock, XCircle, Eye, Pin } from 'lucide-react';
import AdminNavigationLayoutStatCard from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/components/AdminCommunicationNoticesAndAnnouncementsStatCard';
import AdminNavigationLayoutTableSkeleton from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/components/AdminCommunicationNoticesAndAnnouncementsTableSkeleton';
import { useAdminAnnouncementsLogic } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/hooks/useAdminCommunicationNoticesAndAnnouncementsLogic';

/**
 * AdminCommunicationNoticesAndAnnouncementsKPIs renders the admin announcements kpis UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminCommunicationNoticesAndAnnouncementsKPIs: KPI stat cards for the Announcements module.
 * @dependencies Consumes AdminAnnouncementsFormatters, AdminNavigationLayoutStatCard, useAdminAnnouncementsLogic.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminCommunicationNoticesAndAnnouncementsKPIs() {
  const locale = useLocale();
  const t = useTranslations();

  const { kpis, kpisStatus, retryKpis } = useAdminAnnouncementsLogic();
  if (kpisStatus === 'pending' && !kpis) return <div aria-label={t('announcements.admin_announcements_kpis.loadingLabel')}><AdminNavigationLayoutTableSkeleton rows={2} columns={3} /></div>;
  if (kpisStatus === 'error' && !kpis) return <div role="alert" className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-danger bg-danger-bg p-4 text-sm text-danger"><span>{t('announcements.admin_announcements_kpis.loadError')}</span><button type="button" onClick={() => { void retryKpis(); }} className="min-h-11 rounded-lg border border-danger px-3 font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="announcements-management-announcements-management-kp-is-retry-kpis">{t('announcements.admin_announcements_kpis.retry')}</button></div>;
  if (!kpis) return <p role="status" className="text-sm text-secondary" data-testid="announcements-management-announcements-management-kp-is-status-region">{t('announcements.admin_announcements_kpis.unavailable')}</p>;
  return (
    <div className="grid grid-cols-2 xl:grid-cols-3 gap-4" data-testid="admin_announcements-adminannouncementskpis-summary">
      <AdminNavigationLayoutStatCard title={t('announcements.admin_announcements_kpis.text_4e68410f3b')} value={kpis.total} icon={Megaphone} iconBg="bg-primary-subtle" iconColor="text-primary"  testId="admin_announcements-adminannouncementskpis-kpi-1"/>
      <AdminNavigationLayoutStatCard title={t('announcements.admin_announcements_kpis.text_9644b22eec')} value={kpis.active} change={t('announcements.admin_announcements_kpis.auto_liveVisible')} changeType="up" icon={CheckCircle} iconBg="bg-success-bg" iconColor="text-success"  testId="admin_announcements-adminannouncementskpis-kpi-2"/>
      <AdminNavigationLayoutStatCard title={t('announcements.admin_announcements_kpis.text_1cd1bdad46')} value={kpis.scheduled} change={t('announcements.admin_announcements_kpis.auto_upcoming')} changeType="neutral" icon={Clock} iconBg="bg-info-bg" iconColor="text-info"  testId="admin_announcements-adminannouncementskpis-kpi-3"/>
      <AdminNavigationLayoutStatCard title={t('announcements.admin_announcements_kpis.text_a689a999a5')} value={kpis.expired} icon={XCircle} iconBg="bg-danger-bg" iconColor="text-danger"  testId="admin_announcements-adminannouncementskpis-kpi-4"/>
      <AdminNavigationLayoutStatCard title={t('announcements.admin_announcements_kpis.text_d7f83b735d')} value={formatNumber(kpis.totalViews, locale)} change={t('announcements.admin_announcements_kpis.auto_acrossAll')} changeType="up" icon={Eye} iconBg="bg-primary-subtle" iconColor="text-primary"  testId="admin_announcements-adminannouncementskpis-kpi-5"/>
      <AdminNavigationLayoutStatCard title={t('announcements.admin_announcements_kpis.text_f9312169ef')} value={kpis.pinned} change={t('announcements.admin_announcements_kpis.auto_alwaysOnTop')} changeType="neutral" icon={Pin} iconBg="bg-warning-bg" iconColor="text-warning"  testId="admin_announcements-adminannouncementskpis-kpi-6"/>
    </div>
  );
}
