"use client";
// RESPONSIBILITY: Renders one workout-plan card with isolated edit/delete actions and localized metadata labels.
// DATA FLOW: Parent query result → supplied plan props → edit/delete callbacks; parent owns server state and mutation lifecycle.

import { Dumbbell, Edit2, Trash2, Loader2, UserPlus } from 'lucide-react';

import { useLocale, useTranslations } from 'next-intl';

import { displayValue } from '@/lib/display_value';
import TrainerInfrastructureTooltip from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/components/TrainerCoachingWorkoutPlansTrainerInfrastructureTooltip';

import { TRAINER_WORKOUT_DIFFICULTY_STYLES } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/config/TrainerCoachingWorkoutPlansConstants';

import { TrainerWorkoutFormatNumber } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/utils/TrainerCoachingWorkoutPlansDisplayFormatters';

import type { TrainerWorkoutPlanCardProps } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/types/TrainerCoachingWorkoutPlansPlanCardProps';








/**
 * @description Renders one workout-plan card with isolated edit/delete actions and localized metadata labels.
 * @dependencies Parent query result → supplied plan props → edit/delete callbacks; parent owns server state and mutation lifecycle.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Renders a focused card representation for the workout feature using semantic surfaces and responsive interaction patterns.
 * @dependencies Uses only documented workout module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerWorkoutPlanCard({
  plan,
  onEdit,
  onDelete,
  onAssign,
  deleting,
}: TrainerWorkoutPlanCardProps) {
  const locale = useLocale();
  const t = useTranslations('TRAINER_WORKOUT');
  const rawTags = plan.tags as unknown;
  const tags: string[] = Array.isArray(rawTags)
    ? (rawTags as string[])
    : typeof rawTags === 'string'
      ? rawTags.split(',').map((tag: string) => tag.trim()).filter(Boolean)
      : [];

  return (
    <article className="border border-border rounded-xl p-4 hover:border-focus hover:shadow-card motion-safe:transition-all bg-card">
      <div className="flex items-start justify-between mb-3 gap-3">
        <div className="min-w-10 min-h-10 bg-info-bg rounded-xl flex items-center justify-center shrink-0" data-testid={"trainer_workout-plan-card-info-state-33-1"}>
          <Dumbbell size={18} strokeWidth={2} className="text-info" aria-hidden="true" />
        </div>
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${TRAINER_WORKOUT_DIFFICULTY_STYLES[plan.level as keyof typeof TRAINER_WORKOUT_DIFFICULTY_STYLES] ?? 'bg-input text-secondary'}`}>
          {displayValue(plan.level)}
        </span>
      </div>

      <div className="flex items-start justify-between gap-2 mb-3">
        <TrainerInfrastructureTooltip content={String(displayValue(plan.name))}><h3 className="font-semibold text-primary truncate min-w-0">{displayValue(plan.name)}</h3></TrainerInfrastructureTooltip>
        <div className="flex gap-1 shrink-0">
          {onAssign && (
            <button
              type="button"
              onClick={onAssign}
              aria-label={`Assign ${plan.name} to members`}
              title="Assign to members"
              className="min-w-11 min-h-11 inline-flex items-center justify-center p-1.5 text-secondary hover:text-primary hover:bg-input rounded-md motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95"
              data-testid="trainer_workout-trainerworkoutplancard-button_assign"
            >
              <UserPlus size={18} strokeWidth={2} aria-hidden="true" />
            </button>
          )}
          <button
            type="button"
            onClick={onEdit}
            aria-label={t('TEXT_EDIT_WORKOUT_PLAN_ARIA', { name: plan.name })}
            title={t('TEXT_EDIT_WORKOUT_PLAN_ARIA', { name: plan.name })}
            className="min-w-11 min-h-11 inline-flex items-center justify-center p-1.5 text-secondary hover:text-primary hover:bg-input rounded-md motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95"
            data-testid="trainer_workout-trainerworkoutplancard-button_1"
          >
            <Edit2 size={18} strokeWidth={2} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={onDelete}
            disabled={deleting}
            aria-label={t('TEXT_DELETE_WORKOUT_PLAN_ARIA', { name: plan.name })}
            title={t('TEXT_DELETE_WORKOUT_PLAN_ARIA', { name: plan.name })}
            className="min-w-11 min-h-11 inline-flex items-center justify-center p-1.5 text-secondary hover:text-danger hover:bg-danger-bg rounded-md motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring disabled:opacity-60 motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95"
            data-testid="trainer_workout-trainerworkoutplancard-button_2"
          >
            {deleting ? (
              <Loader2 size={18} className="motion-safe:animate-spin" aria-hidden="true" strokeWidth={2} />
            ) : (
              <Trash2 size={18} strokeWidth={2} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-3">
        {[
          [t('TEXT_DAYS'), plan.days],
          [t('TEXT_EXERCISES'), plan.exercises],
          [t('TEXT_DURATION'), plan.duration],
        ].map(([label, value]) => (
          <div key={String(label)} className="bg-input rounded-lg p-2 text-center border border-border">
            <p className="text-sm font-bold text-primary">
              {typeof value === 'number' ? TrainerWorkoutFormatNumber(value, locale) : displayValue(value as string | null)}
            </p>
            <p className="text-xs text-secondary">{label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-1 mb-3">
        {tags.map((tag) => (
          <span key={String(tag).trim()} className="text-xs bg-input text-secondary px-2 py-0.5 rounded-full">
            {String(tag).trim()}
          </span>
        ))}
      </div>

      <p className="text-xs text-secondary">
        {t('TEXT_FOCUS')} <span className="font-medium text-primary">{displayValue(plan.focus)}</span>
      </p>
    </article>
  );
}

