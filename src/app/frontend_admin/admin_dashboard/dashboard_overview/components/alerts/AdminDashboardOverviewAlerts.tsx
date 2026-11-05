"use client";
// RESPONSIBILITY: Renders/orchestrates AdminDashboardAlerts for the admin module; UI composition stays here and business/API logic remains in dedicated hooks and APIs.
// DATA FLOW: feature data/state and user input → AdminDashboardOverviewAlerts → accessible UI/events routed to owning hooks (admin_dashboard/dashboard_overview/components/alerts/AdminDashboardOverviewAlerts.tsx)

import { useTranslations } from 'next-intl';
import { formatDate } from '@/app/frontend_admin/admin_dashboard/dashboard_overview/utils/AdminDashboardOverviewFormatters';
import { useLocale } from 'next-intl';
import { useAdminDashboardLogic } from '@/app/frontend_admin/admin_dashboard/dashboard_overview/hooks/useAdminDashboardOverviewLogic';
import { ShieldAlert, AlertTriangle, Info, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ADMIN_DASHBOARD_ROUTES } from '@/app/frontend_admin/admin_dashboard/dashboard_overview/config/admin_dashboard_overview.url_config';

/**
 * AdminDashboardOverviewAlerts renders the admin dashboard alerts UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminDashboardOverviewAlerts: Renders/orchestrates AdminDashboardAlerts for the admin module; UI composition stays here and business/API logic remains in dedicated hooks and APIs.
 * @dependencies Consumes AdminDashboardFormatters, useAdminDashboardLogic, admin_dashboard_url_config.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminDashboardOverviewAlerts() {
  const t = useTranslations();
  const locale = useLocale();

  const { stats } = useAdminDashboardLogic();
  const router = useRouter();
  if (!stats?.systemAlerts) return null;

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertCircle size={18} className="text-danger"  strokeWidth={2}/>;
      case 'medium': return <AlertTriangle size={18} className="text-warning"  strokeWidth={2}/>;
      default: return <Info size={18} className="text-primary"  strokeWidth={2}/>;
    }
  };

  const getSeverityStyle = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-danger-bg border-border';
      case 'medium': return 'bg-warning-bg border-border';
      default: return 'bg-primary-subtle border-border';
    }
  };

  return (
    <div className="bg-card backdrop-blur-xl border border-border rounded-2xl shadow-card p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-danger text-on-danger rounded-xl">
            <ShieldAlert size={18}  strokeWidth={2}/>
          </div>
          <div>
            <h2 className="text-lg font-bold text-primary">{t('dashboard.admin_dashboard_alerts.text_f663d709ad')}</h2>
            <p className="text-xs text-secondary">{t('dashboard.admin_dashboard_alerts.text_a5f995a220')}</p>
          </div>
        </div>
        <span className="bg-danger text-on-danger text-xs font-bold px-2 py-0.5 rounded-full" data-testid="admin_dashboard-admindashboardalerts-status-1">
          {stats.systemAlerts.filter(a => a.severity === 'high').length} {t('dashboard.admin_dashboard_alerts.text_04b7b26c8c')}</span>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto pr-2">
        {stats.systemAlerts.length === 0 ? (
          <p className="text-sm text-secondary text-center py-4">{t('dashboard.admin_dashboard_alerts.text_3409e17794')}</p>
        ) : (
          stats.systemAlerts.map(alert => (
            <div key={alert.id} className={`p-3 rounded-xl border flex items-start gap-3 motion-safe:transition-colors ${getSeverityStyle(alert.severity)}`}>
              <div className="mt-0.5 shrink-0">
                {getSeverityIcon(alert.severity)}
              </div>
              <div>
                <p className="text-sm font-medium text-primary">{alert.message}</p>
                <p className="text-xs text-secondary mt-1 uppercase font-semibold">
                  {formatDate(alert.date, locale)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
      
      {stats.systemAlerts.length > 0 && (
        <button type="button" onClick={() => router.push(ADMIN_DASHBOARD_ROUTES.auditLogs)} className="w-full mt-4 py-2 border border-border rounded-lg text-xs font-bold text-secondary hover:text-primary hover:bg-surface-hover motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95" data-testid="admin_dashboard-admin_dashboard-alerts-click">
          {t('dashboard.admin_dashboard_alerts.text_5590566204')}</button>
      )}
    </div>
  );
}
