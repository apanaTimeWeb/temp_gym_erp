"use client";
// RESPONSIBILITY: Owns the exercise-library empty result presentation for desktop and mobile surfaces.
import { useTranslations } from 'next-intl';

/**
 * @description Renders the owning exercise feature's empty-result message without changing query/filter semantics.
 * @dependencies Uses the existing exercise search term and localized message.
 * @edge-case Empty search results and filtered search results retain the existing localized wording.
 */
export default function TrainerWorkoutExerciseEmptyState({ search }: { search: string }) {
  const t = useTranslations('TRAINER_WORKOUT');
  return <p className="text-center py-8 text-secondary" data-testid="trainer_workout-exercise-empty-state">{t('TEXT_NO_EXERCISES_FOUND_MATCHING_QUOT', { search })}</p>;
}
