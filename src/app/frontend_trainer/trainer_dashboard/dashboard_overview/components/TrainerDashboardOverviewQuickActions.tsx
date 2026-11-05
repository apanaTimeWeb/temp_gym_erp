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
  const toneClassMap = { primary: 'mb-2 text-primary', success: 'mb-2 text-success', info: 'mb-2 text-info', warning: 'mb-2 text-warning' } as const;

  return (
    <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-primary text-lg">{t('TEXT_QUICK_ACTIONS')}</h3>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {TRAINER_DASHBOARD_QUICK_ACTIONS.map(({ href, labelKey, iconKey, tone }) => {
          const Icon = iconMap[iconKey];
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center justify-center p-4 rounded-xl border border-border bg-page motion-safe:transition-colors hover:bg-primary-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
              data-testid={`trainer_dashboard-dashboard-quick-action-${href.split('/').pop() ?? 'root'}`}
            >
              <Icon size={18} strokeWidth={2} className={toneClassMap[tone]} />
              <span className="text-xs font-semibold text-center text-primary">{t(labelKey)}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
