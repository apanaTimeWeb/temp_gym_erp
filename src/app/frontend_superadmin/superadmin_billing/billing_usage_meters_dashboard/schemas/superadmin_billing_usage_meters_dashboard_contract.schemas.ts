/** Runtime validation for the authoritative Usage Meters response shape. */
import { z } from 'zod';

const UsageDateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Expected YYYY-MM-DD').refine((value) => {
  const [year = 0, month = 0, day = 0] = value.split('-').map(Number);
  const date = new Date(0);
  date.setUTCHours(0, 0, 0, 0);
  date.setUTCFullYear(year, month - 1, day);
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}, 'Expected a real calendar date');
const NonNegativeNumberSchema = z.number().finite().nonnegative();
const NonNegativeIntegerSchema = z.number().int().nonnegative();

export const UsageMeterSchema = z.object({
  id: z.string().min(1),
  tenantId: z.string().min(1),
  tenantName: z.string().min(1),
  smsSent: NonNegativeIntegerSchema,
  smsLimit: NonNegativeIntegerSchema,
  whatsappMessagesSent: NonNegativeIntegerSchema,
  whatsappLimit: NonNegativeIntegerSchema,
  emailsSent: NonNegativeIntegerSchema,
  emailLimit: NonNegativeIntegerSchema,
  apiCallsCount: NonNegativeIntegerSchema,
  apiCallsLimit: NonNegativeIntegerSchema.optional(),
  databaseGb: NonNegativeNumberSchema,
  mediaGb: NonNegativeNumberSchema,
  storageLimitGb: NonNegativeNumberSchema,
  activeMembers: NonNegativeIntegerSchema,
  totalMembers: NonNegativeIntegerSchema,
  memberLimit: NonNegativeIntegerSchema,
  staffCount: NonNegativeIntegerSchema,
  staffLimit: NonNegativeIntegerSchema,
  billingCycleEnd: UsageDateSchema,
});
export const UsageMetersResponseSchema = z.array(UsageMeterSchema);
