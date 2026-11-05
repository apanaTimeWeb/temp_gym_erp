"use client";
// RESPONSIBILITY: Renders one comparison delta value with semantic trend styling.
import { useLocale } from 'next-intl';

import { TrainerProgressTrackingFormatNumber } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/utils/TrainerCoachingIndividualProgressProgressTrackingDisplayFormatters';

import type { TrainerProgressTrackingComparisonDeltaProps } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/types/TrainerCoachingIndividualProgressProgressTrackingComparisonDeltaProps';






/**
 * @description Renders one comparison delta value with semantic trend styling.
 * @dependencies Consumes owning-module props/state and localized UI configuration.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Owns the progress tracking feature UI responsibility represented by TrainerProgressTrackingComparisonDelta, keeping feature behavior, state, and data ownership inside the Trainer module.
 * @dependencies Uses only documented progress tracking module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerProgressTrackingComparisonDelta({ value, lowerIsBetter }: TrainerProgressTrackingComparisonDeltaProps) {
  const locale = useLocale();
  if (value === null || !Number.isFinite(value)) return <span className="text-secondary">—</span>;
  const positive = lowerIsBetter ? value < 0 : value > 0;
  const neutral = value === 0;
  const sign = value > 0 ? '+' : '';
  return (
    <span className={neutral ? 'text-secondary' : positive ? 'text-success font-semibold' : 'text-danger font-semibold'}>
      {sign}{TrainerProgressTrackingFormatNumber(value, locale)}
    </span>
  );
}
