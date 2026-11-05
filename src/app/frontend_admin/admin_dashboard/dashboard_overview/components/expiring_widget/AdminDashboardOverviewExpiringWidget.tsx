"use client";
// RESPONSIBILITY: Renders the expiring memberships widget showing members expiring this week and month across all branches.
// DATA FLOW: feature data/state and user input → AdminDashboardOverviewExpiringWidget → accessible UI/events routed to owning hooks (admin_dashboard/dashboard_overview/components/expiring_widget/AdminDashboardOverviewExpiringWidget.tsx)

import { useTranslations } from 'next-intl';

import { Clock, AlertTriangle, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { ADMIN_DASHBOARD_ROUTES } from '@/app/frontend_admin/admin_dashboard/dashboard_overview/config/admin_dashboard_overview.url_config';
import { useAdminDashboardLogic } from '@/app/frontend_admin/admin_dashboard/dashboard_overview/hooks/useAdminDashboardOverviewLogic';

/**
 * AdminDashboardOverviewExpiringWidget renders the admin dashboard expiring widget UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminDashboardOverviewExpiringWidget: Renders the expiring memberships widget showing members expiring this week and month across all branches.
 * @dependencies Consumes admin_dashboard_url_config, useAdminDashboardLogic.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminDashboardOverviewExpiringWidget() {
  const t = useTranslations();

  const { stats } = useAdminDashboardLogic();
  const expiring = stats?.expiringMemberships ?? [];
  const critical = expiring.filter((member) => member.daysLeft <= 7);

  return (
    <div className="bg-card backdrop-blur-xl border border-border rounded-2xl shadow-card p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-warning-bg rounded-xl">
            <Clock size={18} strokeWidth={2} className="text-warning" />
          </div>
          <div>
            <h2 className="text-base font-bold text-primary">{t('dashboard.admin_dashboard_expiring_widget.text_8eb6a72b06')}</h2>
            <p className="text-xs text-secondary">{t('dashboard.admin_dashboard_expiring_widget.text_a126722ec0')}</p>
          </div>
        </div>
        {critical.length > 0 && (
          <span className="bg-danger text-on-danger text-xs font-bold px-2 py-0.5 rounded-full" data-testid="admin_dashboard-admindashboardexpiringwidget-status-1">
            {critical.length} {t('dashboard.admin_dashboard_expiring_widget.text_4e68dca8ab')}</span>
        )}
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto pr-1">
        {critical.length > 0 && (
          <p className="text-xs font-bold text-danger uppercase tracking-wider mb-1 flex items-center gap-1" data-testid="admin_dashboard-admindashboardexpiringwidget-status-2">
            <AlertTriangle size={18}  strokeWidth={2}/> {t('dashboard.admin_dashboard_expiring_widget.text_bdf25fc1fa')}</p>
        )}
        {expiring.length === 0 && <p role="status" className="py-8 text-center text-sm text-secondary" data-testid="dashboard-overview-dashboard-overview-expiring-widget-status-region">{t('dashboard.admin_dashboard_expiring_widget.noData')}</p>}
        {expiring.map((m) => (
          <div key={m.id} className={`p-3 rounded-xl border flex items-center justify-between gap-3 motion-safe:transition-colors ${
            m.daysLeft <= 7 ? 'bg-danger-bg border-border' : 'bg-warning-bg border-border'
          }`}>
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-full bg-primary-subtle flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">
                {m.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-primary truncate">{m.name}</p>
                <p className="text-xs text-secondary truncate">{m.branch} · {m.plan}</p>
              </div>
            </div>
            <span className={`text-xs font-bold whitespace-nowrap flex-shrink-0 ${m.daysLeft <= 7 ? 'text-danger' : 'text-warning'}`}>
              {m.daysLeft}{t('dashboard.admin_dashboard_expiring_widget.text_90cc4645c0')}</span>
          </div>
        ))}
      </div>

      <Link data-testid="admin_dashboard-admin_dashboard-expiring-widget-navigate"
        href={`${ADMIN_DASHBOARD_ROUTES.members}?expiryFilter=this_month`}
        className="w-full mt-4 py-2 border border-border rounded-lg text-xs font-bold text-secondary hover:text-primary hover:bg-surface-highlight motion-safe:transition-colors flex items-center justify-center gap-1 motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"
      >
        {t('dashboard.admin_dashboard_expiring_widget.text_6c8c925d4a')}<ChevronRight size={18}  strokeWidth={2}/>
      </Link>
    </div>
  );
}
