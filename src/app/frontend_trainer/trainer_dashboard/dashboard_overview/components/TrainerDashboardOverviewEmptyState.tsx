"use client";
// RESPONSIBILITY: Renders the empty state for the dashboard recent members list.
import { Users } from 'lucide-react';

import { useTranslations } from 'next-intl';

import type { TrainerDashboardEmptyStateProps } from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/types/TrainerDashboardOverviewEmptyStateProps';





/**
 * @description Renders the empty state for the dashboard recent members list.
 * @dependencies Uses only the module-owned dependencies declared by this artifact.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
/**
 * @description Renders the dashboard feature's empty-result state with an actionable recovery or creation path when the documented flow permits one.
 * @dependencies Uses only documented dashboard module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Keeps the no-data state distinct from a transport/API error state.
 */
export default function TrainerDashboardEmptyState({ type = 'members' }: TrainerDashboardEmptyStateProps) {
  const t = useTranslations('TRAINER_DASHBOARD');
  return (
    <div data-testid="trainer_dashboard-empty-state" className="flex flex-col items-center justify-center py-8 text-center px-4">
      <div className="w-10 h-10 rounded-full bg-surface-highlight flex items-center justify-center mb-3">
        <Users className="text-secondary"  strokeWidth={2} size={18}/>
      </div>
      <p className="text-sm text-secondary font-medium">{t('TEXT_NO_RECENT_RESOURCE', { resource: type === 'members' ? t('TEXT_MEMBERS') : type })}</p>
    </div>
  );
}

