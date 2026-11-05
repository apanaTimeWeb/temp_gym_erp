// RESPONSIBILITY: Validates the paginated server response used by the Trainer Progress table.
import { z } from 'zod';

import { TrainerProgressTrackingProgressEntrySchema } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/schemas/TrainerCoachingIndividualProgressProgressTrackingDomainSchemas';




export const TrainerProgressTrackingEntriesResponseSchema = z.object({
  entries: z.array(TrainerProgressTrackingProgressEntrySchema),
  total: z.number().int().nonnegative(),
  page: z.number().int().positive(),
  limit: z.number().int().positive(),
});
