"use client";
// RESPONSIBILITY: Renders membership distribution returned by the Dashboard server contract.
// DATA FLOW: Dashboard API → useTrainerDashboardQuery → member-plan distribution → responsive visualization.
import { Users } from 'lucide-react';

import { useTranslations } from 'next-intl';

import TrainerDashboardEmptyState from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/components/TrainerDashboardOverviewEmptyState';

import { useTrainerDashboardQuery } from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/hooks/useTrainerDashboardOverviewQuery';






/**
 * @description Renders membership distribution returned by the Dashboard server contract.
 * @dependencies Dashboard API → useTrainerDashboardQuery → member-plan distribution → responsive visualization.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Renders the dashboard feature's data visualization using the approved chart contract and semantic theme tokens.
 * @dependencies Uses only documented dashboard module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerDashboardMembershipDistribution() {
  const t = useTranslations('TRAINER_DASHBOARD');
  const { data: stats } = useTrainerDashboardQuery();
  if (!stats) return null;
  const data = stats.membersByPlan ?? [];
  const total = data.reduce((sum, item) => sum + item.count, 0);
  return (
    <div className="rounded-xl border border-border p-5 bg-card min-h-72">
      <div className="flex items-center gap-2 mb-5"><Users size={18} className="text-primary"  strokeWidth={2}/><h2 className="font-semibold text-primary">{t("TEXT_MEMBERSHIP_DISTRIBUTION")}</h2></div>
      {data.length === 0 || total === 0 ? <TrainerDashboardEmptyState type="memberships" /> : (
        <div className="space-y-4">
          {data.map((item) => {
            const percentage = Math.round((item.count / total) * 100);
            return (
              <div key={item.plan}>
                <div className="flex justify-between text-sm mb-1"><span className="text-primary">{item.plan}</span><span className="text-secondary">{percentage}%</span></div>
                <div className="h-3 rounded-full bg-input overflow-hidden" aria-hidden="true"><svg viewBox="0 0 100 1" preserveAspectRatio="none" className="h-full w-full" aria-hidden="true"><rect width={percentage} height="1" fill="currentColor" className="text-primary" /></svg></div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
