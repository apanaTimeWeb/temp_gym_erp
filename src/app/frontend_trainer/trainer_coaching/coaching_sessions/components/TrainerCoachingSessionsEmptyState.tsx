"use client";
// RESPONSIBILITY: Renders the empty state for the sessions list when no sessions are found for the selected date/filter.
import { Calendar } from 'lucide-react';

import { useTranslations } from 'next-intl';

import type { TrainerSessionsEmptyStateProps } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/types/TrainerCoachingSessionsEmptyStateProps';





/**
 * @description Renders the empty state for the sessions list when no sessions are found for the selected date/filter.
 * @dependencies Consumes owning-module props/state and localized UI configuration.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Renders the sessions feature's empty-result state with an actionable recovery or creation path when the documented flow permits one.
 * @dependencies Uses only documented sessions module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Keeps the no-data state distinct from a transport/API error state.
 */
export default function TrainerSessionsEmptyState({ onSchedule }: TrainerSessionsEmptyStateProps) {
  const t = useTranslations('TRAINER_SESSIONS');
  return (
    <div className="bg-card rounded-xl border border-dashed border-border p-12 flex flex-col items-center justify-center text-center space-y-4">
      <div className="w-16 h-16 rounded-full bg-primary-subtle flex items-center justify-center">
        <Calendar size={18} className="text-primary"  strokeWidth={2}/>
      </div>
      <div>
        <h3 className="text-lg font-bold text-primary">{t("TEXT_NO_SESSIONS_SCHEDULED")}</h3>
        <p className="text-sm text-secondary mt-1 max-w-xs mx-auto">
          {t("TEXT_YOU_HAVE_NO_SESSIONS_FOR_THIS_DAY_OR_FIL_3B7805DE")}</p>
      </div>
      <button
        type="button"
        onClick={onSchedule}
        className="min-h-11 mt-2 flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary rounded-xl text-sm font-semibold hover:bg-primary-hover motion-safe:transition-all motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:ease-in-out motion-safe:active:scale-95"
       data-testid="trainer_sessions-trainersessionsemptystate-button_2">
        {t("TEXT_SCHEDULE_SESSION")}</button>
    </div>
  );
}
