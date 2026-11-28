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
  const barColors = ['text-orange-500', 'text-sky-500', 'text-emerald-500', 'text-purple-500', 'text-amber-500'];
  const pillColors = [
    'border-orange-500/30 bg-orange-500/15 text-orange-600 dark:text-orange-300',
    'border-sky-500/30 bg-sky-500/15 text-sky-600 dark:text-sky-300',
    'border-emerald-500/30 bg-emerald-500/15 text-emerald-600 dark:text-emerald-300',
    'border-purple-500/30 bg-purple-500/15 text-purple-600 dark:text-purple-300',
    'border-amber-500/30 bg-amber-500/15 text-amber-600 dark:text-amber-300',
  ];
  return (
    <div className="relative overflow-hidden h-full rounded-2xl border border-purple-500/30 bg-card dark:bg-gradient-to-br dark:from-[#211535] dark:via-[#151c2c] dark:to-[#0f1624] p-5 min-h-72 shadow-card flex flex-col">
      <span aria-hidden="true" className="pointer-events-none absolute -right-8 -bottom-8 h-28 w-28 rounded-full bg-purple-500/20 blur-3xl" />
      <div className="relative flex items-center justify-between gap-2 pb-3 mb-4 border-b border-purple-500/15">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="p-2 rounded-xl border border-purple-500/30 bg-purple-500/15 text-purple-500 shrink-0">
            <Users size={16} strokeWidth={2.2} />
          </span>
          <h2 className="font-bold text-primary truncate">{t("TEXT_MEMBERSHIP_DISTRIBUTION")}</h2>
        </div>
        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full border border-purple-500/30 bg-purple-500/15 text-purple-600 dark:text-purple-300 tabular-nums shrink-0">
          {total}
        </span>
      </div>
      {data.length === 0 || total === 0 ? <TrainerDashboardEmptyState type="memberships" /> : (
        <div className="relative space-y-4 my-auto">
          {data.map((item, idx) => {
            const percentage = Math.round((item.count / total) * 100);
            const barClass = barColors[idx % barColors.length]!;
            const pillClass = pillColors[idx % pillColors.length]!;
            return (
              <div key={item.plan}>
                <div className="flex justify-between items-center gap-2 text-sm mb-1.5">
                  <span className="text-primary font-semibold truncate">{item.plan}</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full border tabular-nums shrink-0 ${pillClass}`}>{percentage}%</span>
                </div>
                <div className="h-3 rounded-full bg-input border border-border/50 overflow-hidden" aria-hidden="true"><svg viewBox="0 0 100 1" preserveAspectRatio="none" className="h-full w-full" aria-hidden="true"><rect width={percentage} height="1" fill="currentColor" className={barClass} /></svg></div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
