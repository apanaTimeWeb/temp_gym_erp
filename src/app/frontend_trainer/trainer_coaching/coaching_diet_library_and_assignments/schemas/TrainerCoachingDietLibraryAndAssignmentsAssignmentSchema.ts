import { z } from 'zod';

// The only values submitted by this assignment form; response entities remain API owned.
export const trainerDietAssignmentSchema = z.object({ memberId: z.string().trim().min(1) });
export type TrainerDietAssignmentValues = z.infer<typeof trainerDietAssignmentSchema>;
