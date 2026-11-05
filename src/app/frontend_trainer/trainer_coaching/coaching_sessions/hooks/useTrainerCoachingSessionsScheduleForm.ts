"use client";
// RESPONSIBILITY: Owns Trainer Sessions scheduling form orchestration; the view consumes the returned form and submit handler.
// DATA FLOW: Form input -> React Hook Form + module Zod schema -> submit callback -> mutation/API -> reset only after successful completion.

import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';

import { TRAINER_SESSIONS_SESSION_TYPE } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/config/TrainerCoachingSessionsConstants';

import { TrainerSessionsScheduleFormSchema } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/schemas/TrainerCoachingSessionsScheduleFormSchema';

import type { TrainerSessionsScheduleFormValues } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/types/TrainerCoachingSessionsScheduleFormTypes';

import type { TrainerSessionsCreateSessionDto } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/types/TrainerCoachingSessionsTypes';








/**
 * @description Owns useTrainerSessionsScheduleForm behavior in the Trainer module.
 * @dependencies Uses only the module-owned dependencies declared by this artifact.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
/**
 * @description Manages TrainerSessionsScheduleForm state and data flow for the sessions feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented sessions module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
export const useTrainerSessionsScheduleForm = (onSubmit: (dto: TrainerSessionsCreateSessionDto) => Promise<boolean>) => {
  const form = useForm<TrainerSessionsScheduleFormValues>({
    resolver: zodResolver(TrainerSessionsScheduleFormSchema),
    defaultValues: {
      type: TRAINER_SESSIONS_SESSION_TYPE.PT,
      memberId: '',
      date: '',
      time: '',
      duration: '60m',
    },
    mode: 'onTouched',
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    const succeeded = await onSubmit({
      type: data.type,
      memberId: data.memberId || '',
      date: data.date,
      time: data.time,
      duration: data.duration,
    });
    if (succeeded) form.reset();
  });

  return { form, handleSubmit };
};
