"use client";
// RESPONSIBILITY: Renders the four interactive alert-summary KPI cards and updates the severity filter on activation.
// DATA FLOW: feature data/state and user input → AdminGymsHealthAlertsMonitoringKPIs → accessible UI/events routed to owning hooks (admin_gym_health_alerts/gym_health_alerts_monitoring/components/kpis/AdminGymsHealthAlertsMonitoringKPIs.tsx)

/**
 * @description AdminGymsHealthAlertsMonitoringKPIs: Renders the four interactive alert-summary KPI cards and updates the severity filter on activation.
 * @dependencies Consumes AdminNavigationLayoutStatCard, useAdminGymHealthAlertsLogic.
 * @edge-case Preserves the owning feature's documented loading, empty, error, permission, and recovery states without taking API ownership.
 */
import { useTranslations } from 'next-intl';
import { AlertCircle, AlertOctagon, AlertTriangle, Info } from 'lucide-react';
import AdminNavigationLayoutStatCard from '@/app/frontend_admin/admin_gyms/gyms_health_alerts_monitoring/components/AdminGymsHealthAlertsMonitoringStatCard';
import { useAdminGymHealthAlertsLogic } from '@/app/frontend_admin/admin_gyms/gyms_health_alerts_monitoring/hooks/useAdminGymsHealthAlertsMonitoringLogic';

/** Renders Total/Critical/Warning/Info counters as interactive severity filters.
 */
/**
 * @description Renders the / GymHealthAlertsKPIs UI section using feature-owned data and semantic design tokens.
 * @dependencies Uses feature-owned hooks, props, and semantic global design tokens; API transport remains outside the view declaration.
 * @edge-case Preserves documented loading, empty, error, disabled, nullable, and retry behavior without inventing fallback business data.
 */
export default function AdminGymsHealthAlertsMonitoringKPIs() {
  const t = useTranslations();
  const { kpis, severityFilter, setSeverityFilter, summaryStatus, retrySummary } = useAdminGymHealthAlertsLogic();
  if (summaryStatus === 'pending') return <div className="grid grid-cols-2 xl:grid-cols-4 gap-4" aria-busy="true" aria-label={t('admin_layout.AdminNavigationLayoutTableSkeleton.text_loading_table')}>{[0, 1, 2, 3].map((item) => <div key={item} className="min-h-28 rounded-xl border border-border bg-card p-5 motion-safe:animate-pulse"><div className="h-3 w-2/3 rounded bg-skeleton-base"/><div className="mt-5 h-7 w-1/3 rounded bg-skeleton-base"/></div>)}</div>;
  if (summaryStatus === 'error') return <div role="alert" className="rounded-xl border border-border bg-card p-4 text-sm text-danger"><span>{t('gym-health-alerts.GymHealthAlertsError.text_7716400a2c')}</span><button type="button" onClick={() => void retrySummary()} className="ml-3 underline text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="gym-health-alerts-monitoring-gym-health-alerts-monitoring-kp-is-retry-summary">{t('gym-health-alerts.GymHealthAlertsError.text_cef2fe093b')}</button></div>;
  if (!kpis) return null;
  const items = [
    { key: 'all' as const, title: t('gym-health-alerts.AdminAuditRepair.totalActiveAlerts'), value: kpis.totalAlerts, icon: AlertTriangle, iconBg: 'bg-warning-bg', iconColor: 'text-warning' },
    { key: 'critical' as const, title: t('gym-health-alerts.AdminAuditRepair.criticalAlerts'), value: kpis.criticalAlerts, icon: AlertOctagon, iconBg: 'bg-danger-bg', iconColor: 'text-danger' },
    { key: 'warning' as const, title: t('gym-health-alerts.AdminAuditRepair.warningAlerts'), value: kpis.warningAlerts, icon: AlertCircle, iconBg: 'bg-warning-bg', iconColor: 'text-warning' },
    { key: 'info' as const, title: t('gym-health-alerts.AdminAuditRepair.infoAlerts'), value: kpis.infoAlerts, icon: Info, iconBg: 'bg-info-bg', iconColor: 'text-info' },
  ];
  return <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">{items.map((item , __testIdIndex30) => <button key={item.key} type="button" onClick={() => setSeverityFilter(item.key === 'all' ? 'all' : item.key)} aria-pressed={severityFilter === item.key} className={`focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11 min-w-11 motion-safe:active:scale-95 text-left rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out ${severityFilter === item.key ? 'ring-2 ring-primary' : ''}`} data-testid={`admin_gym_health_alerts-admin_gym_health_alerts-kpis-click-map30-${__testIdIndex30}-1`}><AdminNavigationLayoutStatCard title={item.title} value={item.value} icon={item.icon} iconBg={item.iconBg} iconColor={item.iconColor}  testId={`admin_gym_health_alerts-admingymhealthalertskpis-kpi-${item.key}`}/></button>)}</div>;
}
