import { z } from 'zod';

export const FREEZE_REASON_OPTIONS = [
  'Medical / Injury',
  'Travel / Out of Station',
  'Work / Relocation',
  'Personal Emergency',
  'Other',
] as const;

export const managerMembersFreezeFormSchema = z.object({
  freezeStartDate: z.string().min(1, 'Freeze start date is required'),
  freezeDays: z.number().int().min(1, 'Freeze duration must be at least 1 day').max(180, 'Freeze duration cannot exceed 180 days'),
  freezeUntil: z.string().min(1, 'Freeze end date is required'),
  reason: z.string().min(1, 'Please select or enter a reason for freezing'),
  notes: z.string().optional(),
});

export type MemberFreezeFormValues = z.infer<typeof managerMembersFreezeFormSchema>;
