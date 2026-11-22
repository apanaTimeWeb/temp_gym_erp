import { z } from 'zod';

export const REFUND_REASON_OPTIONS = [
  'Membership Cancellation',
  'Medical Reasons',
  'Customer Dissatisfied',
  'Duplicate Payment / Overcharge',
  'Relocation / Shifted',
  'Other',
] as const;

export const REFUND_METHOD_OPTIONS = [
  'Original Payment Method',
  'Cash',
  'UPI',
  'Bank Transfer',
] as const;

export const managerMembersRefundFormSchema = z.object({
  refundAmount: z.number().positive('Refund amount must be greater than zero'),
  refundMethod: z.string().min(1, 'Please select a refund method'),
  reason: z.string().min(1, 'Please select or specify a reason for the refund'),
  notes: z.string().optional(),
});

export type MemberRefundFormValues = z.infer<typeof managerMembersRefundFormSchema>;
