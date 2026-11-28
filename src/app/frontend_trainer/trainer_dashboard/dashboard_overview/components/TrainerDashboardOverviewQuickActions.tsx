"use client";
// RESPONSIBILITY: Renders permission-aware Trainer dashboard shortcuts and navigates only to supported Trainer routes.
import { CalendarCheck, Dumbbell, Utensils, Users } from 'lucide-react';

import { useTranslations } from 'next-intl';

import Link from 'next/link';

import { TRAINER_DASHBOARD_QUICK_ACTIONS } from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/config/TrainerDashboardOverviewConstants';






/**
 * @description Renders permission-aware Trainer dashboard shortcuts and navigates only to supported Trainer routes.
 * @dependencies Consumes module-owned static quick-action configuration and localized UI copy.
 * @edge-case Preserves supported route identities without inventing additional dashboard destinations.
 */
/**
 * @description Owns the dashboard feature UI responsibility represented by TrainerDashboardQuickActions, keeping feature behavior, state, and data ownership inside the Trainer module.
 * @dependencies Uses only documented dashboard module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerDashboardQuickActions() {
  const t = useTranslations('TRAINER_DASHBOARD');
  const iconMap = { workout: Dumbbell, attendance: CalendarCheck, members: Users, library: Utensils } as const;
  const tileThemeMap = {
    primary: {
      tile: 'border-orange-500/30 bg-orange-500/10 dark:bg-gradient-to-br dark:from-[#2A1714]/90 dark:to-[#131929]/90 hover:bg-orange-500/20 hover:border-orange-400/60',
      badge: 'bg-orange-500/20 border-orange-500/35 text-orange-500 dark:text-orange-400',
    },
    success: {
      tile: 'border-emerald-500/30 bg-emerald-500/10 dark:bg-gradient-to-br dark:from-[#0E2621]/90 dark:to-[#131929]/90 hover:bg-emerald-500/20 hover:border-emerald-400/60',
      badge: 'bg-emerald-500/20 border-emerald-500/35 text-emerald-500 dark:text-emerald-400',
    },
    info: {
      tile: 'border-sky-500/30 bg-sky-500/10 dark:bg-gradient-to-br dark:from-[#0F2236]/90 dark:to-[#131929]/90 hover:bg-sky-500/20 hover:border-sky-400/60',
      badge: 'bg-sky-500/20 border-sky-500/35 text-sky-500 dark:text-sky-400',
    },
    warning: {
      tile: 'border-amber-500/30 bg-amber-500/10 dark:bg-gradient-to-br dark:from-[#261D10]/90 dark:to-[#131929]/90 hover:bg-amber-500/20 hover:border-amber-400/60',
      badge: 'bg-amber-500/20 border-amber-500/35 text-amber-500 dark:text-amber-400',
    },
  } as const;

  return (
    <div className="relative overflow-hidden h-full rounded-2xl border border-amber-500/35 bg-card dark:bg-gradient-to-br dark:from-[#281E10] dark:via-[#141B2D] dark:to-[#0C1220] p-5 shadow-card flex flex-col">
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#F59E0B] via-[#FF5A1F] to-transparent" />
      <span aria-hidden="true" className="pointer-events-none absolute -right-8 -bottom-8 h-28 w-28 rounded-full bg-amber-500/20 blur-3xl" />
      <div className="relative flex items-center justify-between pb-3 mb-4 border-b border-amber-500/20">
        <h3 className="font-bold text-text-primary text-lg">{t('TEXT_QUICK_ACTIONS')}</h3>
      </div>
      <div className="relative grid grid-cols-2 gap-3 flex-1">
        {TRAINER_DASHBOARD_QUICK_ACTIONS.map(({ href, labelKey, iconKey, tone }) => {
          const Icon = iconMap[iconKey];
          const theme = tileThemeMap[tone] ?? tileThemeMap.primary;
          return (
            <Link
              key={href}
              href={href}
              className={`min-h-24 flex flex-col items-center justify-center p-3.5 rounded-xl border ${theme.tile} motion-safe:transition-all motion-safe:hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring`}
              data-testid={`trainer_dashboard-dashboard-quick-action-${href.split('/').pop() ?? 'root'}`}
            >
              <span className={`mb-2 p-2.5 rounded-xl border shadow-sm ${theme.badge}`}>
                <Icon size={18} strokeWidth={2.2} />
              </span>
              <span className="text-xs font-semibold text-center text-text-primary leading-tight">{t(labelKey)}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
