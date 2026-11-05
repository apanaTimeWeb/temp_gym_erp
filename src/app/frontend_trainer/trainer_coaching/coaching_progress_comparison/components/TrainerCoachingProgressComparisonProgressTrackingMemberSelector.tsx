"use client";
// RESPONSIBILITY: Multi-member selector for the comparison view.
// DATA FLOW: useTrainerProgressTrackingLogic → TrainerProgressTrackingMemberSelector
// Max TRAINER_PROGRESS_TRACKING_COMPARISON_MAX_MEMBERS members can be selected at once.

import { Users } from 'lucide-react';

import { useTranslations } from 'next-intl';

import { TRAINER_PROGRESS_TRACKING_COMPARISON_MAX_MEMBERS } from '@/app/frontend_trainer/trainer_coaching/coaching_progress_comparison/utils/TrainerCoachingProgressComparisonProgressTrackingConstants';

import type { TrainerProgressTrackingMemberSelectorProps } from '@/app/frontend_trainer/trainer_coaching/coaching_progress_comparison/types/TrainerCoachingProgressComparisonProgressTrackingMemberSelectorProps';








/**
 * @description Multi-member selector for the comparison view.
 * @dependencies useTrainerProgressTrackingLogic → TrainerProgressTrackingMemberSelector
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Renders an accessible selection control for the progress tracking feature while keeping option values and business labels module-owned.
 * @dependencies Uses only documented progress tracking module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerProgressTrackingMemberSelector({ allMembers, selectedIds, onToggle }: TrainerProgressTrackingMemberSelectorProps) {
  const t = useTranslations('TRAINER_PROGRESS_TRACKING');
  return (
    <div className="bg-card rounded-xl border border-border p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users size={18} className="text-primary"  strokeWidth={2}/>
          <span className="text-sm font-semibold text-primary">{t("TEXT_SELECT_MEMBERS_TO_COMPARE")}</span>
          <span className="text-xs text-secondary bg-input px-2 py-0.5 rounded-full">
            {selectedIds.length} / {TRAINER_PROGRESS_TRACKING_COMPARISON_MAX_MEMBERS}
          </span>
        </div>
        {selectedIds.length > 0 && (
          <button type="button"
            onClick={() => selectedIds.forEach(id => onToggle(id))}
            className="min-h-11 text-xs text-secondary hover:text-danger motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:ease-in-out motion-safe:active:scale-95"
           data-testid="trainer_progress_tracking-trainerprogresstrackingmemberselector-button_1">
            {t("TEXT_CLEAR_ALL")}</button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {allMembers.map((m) => {
          const isSelected = selectedIds.includes(m.id);
          const isDisabled = !isSelected && selectedIds.length >= TRAINER_PROGRESS_TRACKING_COMPARISON_MAX_MEMBERS;
          return (
            <button type="button"
              key={m.id}
              onClick={() => !isDisabled && onToggle(m.id)}
              disabled={isDisabled}
              aria-pressed={isSelected}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border motion-safe:transition-all ${
                isSelected
                  ? 'bg-primary text-on-primary border-focus shadow-card'
                  : isDisabled
                  ? 'bg-input text-secondary border-border cursor-not-allowed'
                  : 'bg-input text-secondary border-border hover:border-focus hover:text-primary'
              } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95`}
             data-testid={`trainer_progress_tracking-progress-member-selector-${m.id}`}>
              {m.name}
            </button>
          );
        })}
      </div>

      {selectedIds.length < 2 && (
        <p className="text-xs text-disabled italic">{t("TEXT_SELECT_AT_LEAST_2_MEMBERS_TO_COMPARE")}</p>
      )}
    </div>
  );
}
