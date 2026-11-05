// RESPONSIBILITY: Owns Trainer Sessions schedule form validation contract.
import { z } from 'zod';

import { TRAINER_SESSIONS_SESSION_TYPE, TRAINER_SESSIONS_SESSION_TYPES } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/config/TrainerCoachingSessionsConstants';
import { TrainerSessionsCreateSessionDtoSchema } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/schemas/TrainerCoachingSessionsDomainSchemas';




export const TrainerSessionsScheduleFormSchema = z.object({
  type: z.enum(TRAINER_SESSIONS_SESSION_TYPES),
  memberId: z.string().optional().or(z.literal('')),
  date: TrainerSessionsCreateSessionDtoSchema.shape.date,
  time: TrainerSessionsCreateSessionDtoSchema.shape.time,
  duration: TrainerSessionsCreateSessionDtoSchema.shape.duration,
}).refine(
  (data) => data.type === TRAINER_SESSIONS_SESSION_TYPE.GROUP || (data.type === TRAINER_SESSIONS_SESSION_TYPE.PT && data.memberId && data.memberId.length > 0),
  { message: 'TEXT_MEMBER_REQUIRED_PT', path: ['memberId'] },
);
