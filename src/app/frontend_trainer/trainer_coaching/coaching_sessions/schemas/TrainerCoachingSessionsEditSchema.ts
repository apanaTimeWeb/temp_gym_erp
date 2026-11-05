import { z } from 'zod';
import { TrainerSessionsCreateSessionDtoSchema } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/schemas/TrainerCoachingSessionsDomainSchemas';

export const TrainerSessionsEditFormSchema = z.object({
  time: TrainerSessionsCreateSessionDtoSchema.shape.time,
  duration: TrainerSessionsCreateSessionDtoSchema.shape.duration,
  location: z.string().optional(),
  room: z.string().optional(),
}).strict();
