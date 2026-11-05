"use client";
// RESPONSIBILITY: Renders the TrainerScheduleEmptyState UI for the owning Trainer feature; data access remains in the feature API/query layer.
import { CalendarX } from 'lucide-react';

import { useTranslations } from 'next-intl';




/**
 * @description Renders the TrainerScheduleEmptyState UI for the owning Trainer feature; data access remains in the feature API/query layer.
 * @dependencies Consumes owning-module props/state and localized UI configuration.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Renders the schedule feature's empty-result state with an actionable recovery or creation path when the documented flow permits one.
 * @dependencies Uses only documented schedule module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Keeps the no-data state distinct from a transport/API error state.
 */
export default function TrainerScheduleEmptyState() {
  const t = useTranslations('TRAINER_SCHEDULE');
  return (
    <div data-testid="trainer_schedule-empty-state" className="flex flex-col items-center justify-center p-10 bg-card border border-border rounded-xl">
      <div className="w-16 h-16 rounded-full bg-input flex items-center justify-center mb-4">
        <CalendarX className="text-secondary" size={18}  strokeWidth={2}/>
      </div>
      <h3 className="text-lg font-bold text-primary mb-1">{t("TEXT_NO_ITEMS_FOUND")}</h3>
      <p className="text-sm text-secondary text-center max-w-sm mb-6">
        {t("TEXT_THERE_ARE_NO_ITEMS_IN_THIS_VIEW_CHECK_BA_8CBF3D04")}</p>
    </div>
  );
}
