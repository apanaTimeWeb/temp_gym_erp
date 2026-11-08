import { z } from 'zod';

// The values submitted by this assignment form; supports single and batch assignment.
export const trainerDietAssignmentSchema = z.object({
  memberIds: z.array(z.string().trim().min(1)),
  memberId: z.string().trim().optional(),
}).refine(
  (data) => data.memberIds.length > 0 || Boolean(data.memberId && data.memberId.trim().length > 0),
  { message: 'ERR_SELECT_AT_LEAST_ONE_MEMBER', path: ['memberIds'] }
);

export type TrainerDietAssignmentValues = z.infer<typeof trainerDietAssignmentSchema>;
