"use client";
// RESPONSIBILITY: Owns React Hook Form state and session-edit submission orchestration; the modal remains a view layer.
// DATA FLOW: Session edit form input → React Hook Form + Zod → Sessions mutation → updated server response → parent UI.
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';

import { useTrainerInfrastructureIdempotencyKey } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/hooks/TrainerCoachingSessionsuseTrainerInfrastructureIdempotencyKey';

import { useTrainerSessionsMutations } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/hooks/useTrainerCoachingSessionsMutations';

import { TrainerSessionsEditFormSchema } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/schemas/TrainerCoachingSessionsEditSchema';

import type { TrainerSessionsEditFormValues } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/types/TrainerCoachingSessionsTypes';

import type { TrainerSessionsTrainerSession } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/types/TrainerCoachingSessionsTypes';









/**
 * @description Owns useTrainerSessionsEditForm behavior in the Trainer module.
 * @dependencies Uses only the module-owned dependencies declared by this artifact.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
/**
 * @description Manages TrainerSessionsEditForm state and data flow for the sessions feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented sessions module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
export function useTrainerSessionsEditForm(session: TrainerSessionsTrainerSession, onSuccess: (updated: TrainerSessionsTrainerSession, message: string) => void) {
  const { updateSession, updateSessionPending } = useTrainerSessionsMutations();
  const actionKeys = useTrainerInfrastructureIdempotencyKey();
  const form = useForm<TrainerSessionsEditFormValues>({ resolver: zodResolver(TrainerSessionsEditFormSchema) as any, defaultValues: { time: session.time ?? '', duration: (session.duration as any) ?? '60m', location: session.location ?? '', room: session.room ?? '' }, mode: 'onTouched' });
  const submit = form.handleSubmit(async (values) => { const actionId = `update-session-${session.id}`; const idempotencyKey = actionKeys.begin(actionId); try { const response = await updateSession({ id: session.id, dto: values, idempotencyKey }); onSuccess(response.data, response.message); form.clearErrors('root.serverError'); actionKeys.clear(actionId); } catch { form.setError('root.serverError', { type: 'server', message: 'TEXT_UNABLE_TO_UPDATE_SESSION' }); } });
  return { ...form, submit, isSubmitting: updateSessionPending };
}

export const useTrainerCoachingSessionsEditForm = useTrainerSessionsEditForm;
