// RESPONSIBILITY: Renders ManagerDashboardOverviewMembershipDistribution's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useTranslations } from 'next-intl';

import { DASHBOARD_PLAN_BG_COLORS } from '@/app/frontend_manager/manager_dashboard/dashboard_overview/constants/manager_dashboard_overview_shared.constants';
import { useDashboardStatsQuery } from '@/app/frontend_manager/manager_dashboard/dashboard_overview/hooks/useManagerDashboardOverviewQueries';
import { useManagerDashboardOverviewUrlState } from '@/app/frontend_manager/manager_dashboard/dashboard_overview/hooks/useManagerDashboardOverviewUrlState';


/** @description Renders the ManagerDashboardOverviewMembershipDistribution component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (3 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerDashboardOverviewMembershipDistribution() {
  const t = useTranslations('MANAGER_DASHBOARD');

  const { range } = useManagerDashboardOverviewUrlState();
  const { data: stats } = useDashboardStatsQuery({ range });
  if (!stats) return null;
  const data = stats?.membersByPlan || [];
 const s = stats;

 const total = (s.membersByPlan || []).reduce((a, b) => a + b.count, 0);

 return (
 <div className="rounded-xl shadow-card border p-5 bg-card border-border motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:hover:-translate-y-1">
 <h2 className="font-semibold mb-4 text-text-primary">{t("COPY_MEMBERSHIP_DISTRIBUTION")}</h2>
 <div className="flex flex-wrap gap-3">
 {(s.membersByPlan || []).map((p, __testIdIndex0) => {
 const scaledCount = p.count;
 const pct = total > 0 ? Math.round((scaledCount / total) * 100) : 0;
 const bgStyle = DASHBOARD_PLAN_BG_COLORS[p.plan] || 'bg-input';
 return (
 <div key={p.plan} className="flex-1 min-w-40 rounded-lg p-4 bg-input">
 <div className="flex items-center gap-2 mb-2">
 <div className={`w-3 h-3 rounded-full ${bgStyle}`} />
 <span className="text-sm font-medium text-text-primary">{p.plan}</span>
 </div>
 <div className="text-2xl font-bold text-text-primary">{scaledCount}</div>
 <div className="mt-2 h-1.5 rounded-full overflow-hidden bg-border">
 <progress data-testid={`manager_dashboard-manager-dashboard-membership-distribution-button-close-${__testIdIndex0}`} value={pct} max={100} aria-label={t("COPY_PROGRESS")} className={`h-full w-full overflow-hidden rounded-full ${bgStyle}`} />
 </div>
 <div className="text-xs mt-1 text-text-secondary">{pct}{t("COPY_TOTAL")}</div>
 </div>
 );
 })}
 {(s.membersByPlan || []).length === 0 && (
 <p className="text-sm py-4 text-text-secondary">{t("COPY_NO_DATA_AVAILABLE_YET")}</p>
 )}
 </div>
 </div>
 );
}
