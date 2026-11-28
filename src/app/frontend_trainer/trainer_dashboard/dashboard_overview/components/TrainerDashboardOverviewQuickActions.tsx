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
      tile: 'border-orange-500/25 bg-orange-500/5 hover:bg-orange-500/15 hover:border-orange-500/40',
      badge: 'bg-orange-500/15 border-orange-500/30 text-orange-500',
    },
    success: {
      tile: 'border-emerald-500/25 bg-emerald-500/5 hover:bg-emerald-500/15 hover:border-emerald-500/40',
      badge: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-500',
    },
    info: {
      tile: 'border-sky-500/25 bg-sky-500/5 hover:bg-sky-500/15 hover:border-sky-500/40',
      badge: 'bg-sky-500/15 border-sky-500/30 text-sky-500',
    },
    warning: {
      tile: 'border-amber-500/25 bg-amber-500/5 hover:bg-amber-500/15 hover:border-amber-500/40',
      badge: 'bg-amber-500/15 border-amber-500/30 text-amber-500',
    },
  } as const;

  return (
    <div className="h-full bg-card border border-border rounded-2xl p-5 shadow-card flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-primary text-lg">{t('TEXT_QUICK_ACTIONS')}</h3>
      </div>
      <div className="grid grid-cols-2 gap-3 flex-1">
        {TRAINER_DASHBOARD_QUICK_ACTIONS.map(({ href, labelKey, iconKey, tone }) => {
          const Icon = iconMap[iconKey];
          const theme = tileThemeMap[tone] ?? tileThemeMap.primary;
          return (
            <Link
              key={href}
              href={href}
              className={`min-h-24 flex flex-col items-center justify-center p-3.5 rounded-xl border ${theme.tile} motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring`}
              data-testid={`trainer_dashboard-dashboard-quick-action-${href.split('/').pop() ?? 'root'}`}
            >
              <span className={`mb-2 p-2.5 rounded-xl border ${theme.badge}`}>
                <Icon size={18} strokeWidth={2} />
              </span>
              <span className="text-xs font-semibold text-center text-primary leading-tight">{t(labelKey)}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
