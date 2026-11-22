import { z } from 'zod';

export const TRANSFER_REASON_OPTIONS = [
  'Member Request',
  'Trainer Schedule Conflict',
  'Trainer Resignation / Leave',
  'Specialization Change',
  'Trainer Performance / Chemistry',
  'Other',
] as const;

export const managerMembersTransferFormSchema = z.object({
  trainerId: z.string().min(1, 'Please select a new trainer'),
  isPT: z.boolean().default(false),
  reason: z.string().min(1, 'Please select or enter a transfer reason'),
  handoffNotes: z.string().optional(),
});

export type MemberTransferFormValues = z.infer<typeof managerMembersTransferFormSchema>;
