// AUTONOMOUS COPY: Module-local, WET-isolated copy of original trainer-infrastructure primitive.
"use client";
// RESPONSIBILITY: Provides the single Trainer-wide success/error feedback API with stable toast deduplication IDs.
// DATA FLOW: Feature mutation result/error → useTrainerInfrastructureFeedback → sonner → Trainer-wide Toaster host.
import { useCallback } from 'react';

import { toast } from 'sonner';

import { useTranslations } from 'next-intl';

import { TrainerInfrastructureUserSafeError } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/utils/TrainerCoachingIndividualProgressTrainerInfrastructureUserSafeError';





/**
 * @description Provides the single Trainer-wide success/error feedback API with stable toast deduplication IDs.
 * @dependencies Feature mutation result/error → useTrainerInfrastructureFeedback → sonner → Trainer-wide Toaster host.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
/**
 * @description Manages TrainerInfrastructureFeedback state and data flow for the infrastructure feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented infrastructure module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
export function useTrainerInfrastructureFeedback() {
  const t = useTranslations('TRAINER_SHELL');
  const showSuccess = useCallback((message: string, id: string) => {
    toast.success(message, { id });
  }, []);

  const showError = useCallback((error: unknown, id: string) => {
    const message = TrainerInfrastructureUserSafeError(error, t('TEXT_GENERIC_REQUEST_ERROR'));
    toast.error(message, { id });
  }, [t]);

  return { showSuccess, showError };
}
