// AUTONOMOUS COPY: Module-local, WET-isolated copy of original trainer-infrastructure primitive.
"use client";
// RESPONSIBILITY: Exposes the Trainer-wide confirm() API without owning dialog state.
// DATA FLOW: TrainerInfrastructureConfirmContext → useTrainerInfrastructureConfirm → feature action handler.
import { useContext } from 'react';

import { TrainerInfrastructureConfirmContext } from '@/app/frontend_trainer/trainer_coaching/coaching_progress_comparison/components/TrainerCoachingProgressComparisonTrainerInfrastructureConfirmProvider';




/**
 * @description Exposes the Trainer-wide confirm() API from TrainerInfrastructureConfirmContext without owning dialog state.
 * @dependencies ConfirmContext → useTrainerInfrastructureConfirm → feature action handler.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
/**
 * @description Manages TrainerInfrastructureConfirm state and data flow for the infrastructure feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented infrastructure module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
export function useTrainerInfrastructureConfirm() {
  const context = useContext(TrainerInfrastructureConfirmContext);
  if (!context) throw new Error('useTrainerInfrastructureConfirm must be used within TrainerInfrastructureConfirmProvider');
  return context;
}
