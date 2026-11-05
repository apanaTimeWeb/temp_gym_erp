// RESPONSIBILITY: Owns Trainer Sessions schedule form type contracts derived from the feature validation schema.
import { z } from 'zod';

import { TrainerSessionsScheduleFormSchema } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/schemas/TrainerCoachingSessionsScheduleFormSchema';

import type { TrainerSessionsSessionType } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/types/TrainerCoachingSessionsTypes';





export type TrainerSessionsScheduleFormValues = z.infer<typeof TrainerSessionsScheduleFormSchema>;
export type TrainerSessionsScheduleFormSubmission = { type: TrainerSessionsSessionType; memberId: string; date: string; time: string; duration: string };
