"use client";
// RESPONSIBILITY: Renders the progress table sort direction icon for active or inactive columns.
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';

import type { TrainerProgressTrackingSortDirectionIconProps } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/types/TrainerCoachingIndividualProgressProgressTrackingSortDirectionIconProps';




/**
 * @description Renders the progress table sort direction icon for active or inactive columns.
 * @dependencies Consumes owning-module props/state and localized UI configuration.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Renders the progress tracking feature's semantic icon affordance while preserving the approved icon size, stroke, and motion rules.
 * @dependencies Uses only documented progress tracking module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerProgressTrackingSortDirectionIcon({
  active,
  direction,
}: TrainerProgressTrackingSortDirectionIconProps) {
  const Icon = active ? (direction === 'asc' ? ArrowUp : ArrowDown) : ArrowUpDown;
  return <Icon size={18} strokeWidth={2} className={active ? 'text-primary' : 'text-secondary'} aria-hidden="true" />;
}
