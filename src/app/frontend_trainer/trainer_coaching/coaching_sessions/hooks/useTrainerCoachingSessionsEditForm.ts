"use client";
// RESPONSIBILITY: Owns React Hook Form state and session-edit submission orchestration; the modal remains a view layer.
// DATA FLOW: Session edit form input → React Hook Form + Zod → Sessions mutation → updated server response → parent UI.
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm, type Resolver } from 'react-hook-form';

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
function normalizeTimeForInput(value?: string): string {
  if (!value) return '';
  const trimmed = value.trim();
  const match12 = /^(\d{1,2}):(\d{2})\s?(AM|PM)$/i.exec(trimmed);
  if (match12) {
    let h = Number(match12[1]);
    const m = match12[2];
    const period = match12[3].toUpperCase();
    if (period === 'PM' && h !== 12) h += 12;
    if (period === 'AM' && h === 12) h = 0;
    return `${String(h).padStart(2, '0')}:${m}`;
  }
  if (/^\d{2}:\d{2}$/.test(trimmed)) return trimmed;
  return trimmed;
}

function normalizeDurationOption(value?: string): string {
  if (!value) return '60m';
  const cleaned = value.trim().toLowerCase();
  if (cleaned === '30m' || cleaned === '30 min') return '30m';
  if (cleaned === '45m' || cleaned === '45 min') return '45m';
  if (cleaned === '60m' || cleaned === '60 min') return '60m';
  return value;
}

export function useTrainerSessionsEditForm(session: TrainerSessionsTrainerSession, onSuccess: (updated: TrainerSessionsTrainerSession, message: string) => void) {
  const { updateSession, updateSessionPending } = useTrainerSessionsMutations();
  const actionKeys = useTrainerInfrastructureIdempotencyKey();
  const form = useForm<TrainerSessionsEditFormValues>({
    resolver: zodResolver(TrainerSessionsEditFormSchema) as unknown as Resolver<TrainerSessionsEditFormValues>,
    defaultValues: {
      time: normalizeTimeForInput(session.time),
      duration: normalizeDurationOption(session.duration) as TrainerSessionsEditFormValues['duration'],
      location: session.location ?? '',
      room: session.room ?? '',
    },
    mode: 'onTouched',
  });
  const submit = form.handleSubmit(async (values) => { const actionId = `update-session-${session.id}`; const idempotencyKey = actionKeys.begin(actionId); try { const response = await updateSession({ id: session.id, dto: values, idempotencyKey }); onSuccess(response.data, response.message); form.clearErrors('root.serverError'); actionKeys.clear(actionId); } catch { form.setError('root.serverError', { type: 'server', message: 'TEXT_UNABLE_TO_UPDATE_SESSION' }); } });
  return { ...form, submit, isSubmitting: updateSessionPending };
}

export const useTrainerCoachingSessionsEditForm = useTrainerSessionsEditForm;
