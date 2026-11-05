"use client";
// RESPONSIBILITY: KPI stat cards for the Audit Logs module.
// DATA FLOW: feature data/state and user input → AdminSecurityAuditLogsExplorerKPIs → accessible UI/events routed to owning hooks (admin_audit_logs/audit_logs_explorer/components/kpis/AdminSecurityAuditLogsExplorerKPIs.tsx)

import { useTranslations, useLocale } from 'next-intl';

import { ShieldAlert, CalendarClock, Users, Activity } from 'lucide-react';
import AdminNavigationLayoutStatCard from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/components/AdminSecurityAuditLogsExplorerStatCard';
import { useAdminAuditLogsLogic } from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/hooks/useAdminSecurityAuditLogsExplorerLogic';

/**
 * AdminSecurityAuditLogsExplorerKPIs renders the admin audit logs kpis UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminSecurityAuditLogsExplorerKPIs: KPI stat cards for the Audit Logs module.
 * @dependencies Consumes AdminNavigationLayoutStatCard, useAdminAuditLogsLogic.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminSecurityAuditLogsExplorerKPIs() {
  const t = useTranslations();
  const locale = useLocale();

  const { kpis, kpiStatus, retryKpis } = useAdminAuditLogsLogic();
  if (kpiStatus === 'pending') return <div role="status" className="text-sm text-secondary" data-testid="audit-logs-explorer-audit-logs-explorer-kp-is-status-region">{t('audit_logs.AdminAuditRepair.loadingSummary')}</div>;
  if (kpiStatus === 'error') return <div role="alert" className="rounded-xl border border-border bg-danger-bg p-4 text-sm text-danger"><p>{t('audit_logs.AdminAuditRepair.summaryError')}</p><button type="button" onClick={() => void retryKpis()} className="mt-2 min-h-11 rounded-lg border border-border px-4" data-testid="audit-logs-explorer-audit-logs-explorer-kp-is-retry-kpis">{t('audit_logs.AdminAuditRepair.retry')}</button></div>;
  if (!kpis) return null;
  return (
    <div className="grid grid-cols-2 xl:grid-cols-3 gap-4" data-testid="admin_audit_logs-adminauditlogskpis-summary">
      <AdminNavigationLayoutStatCard title={t('audit_logs.admin_audit_logs_kpis.text_404aaeec8e')} value={new Intl.NumberFormat(locale).format(kpis.totalLogs)} change={t('audit_logs.admin_audit_logs_kpis.auto_allTime')} changeType="neutral" icon={Activity} iconBg="bg-primary-subtle" iconColor="text-primary"  testId="admin_audit_logs-adminauditlogskpis-kpi-1"/>
      <AdminNavigationLayoutStatCard title={t('audit_logs.admin_audit_logs_kpis.text_0d17be1c02')} value={new Intl.NumberFormat(locale).format(kpis.criticalEvents)} change={t('audit_logs.admin_audit_logs_kpis.auto_requiresAttention')} changeType="neutral" icon={ShieldAlert} iconBg="bg-danger-bg" iconColor="text-danger"  testId="admin_audit_logs-adminauditlogskpis-kpi-2"/>
      <AdminNavigationLayoutStatCard title={t('audit_logs.admin_audit_logs_kpis.text_5b038231b3')} value={new Intl.NumberFormat(locale).format(kpis.actionsToday)} icon={CalendarClock} iconBg="bg-info-bg" iconColor="text-info" testId="admin_audit_logs-adminauditlogskpis-kpi-3"/>
      <AdminNavigationLayoutStatCard title={t('audit_logs.admin_audit_logs_kpis.text_a7ad0973cf')} value={new Intl.NumberFormat(locale).format(kpis.uniqueActors)} change={t('audit_logs.admin_audit_logs_kpis.auto_activeActors')} changeType="neutral" icon={Users} iconBg="bg-primary-subtle" iconColor="text-primary"  testId="admin_audit_logs-adminauditlogskpis-kpi-6"/>
    </div>
  );
}
