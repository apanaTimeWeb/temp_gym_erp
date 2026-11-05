// RESPONSIBILITY: Defines runtime validation schemas for usage_analytics; it does not determine server-owned business rules without a verified contract.
// DATA FLOW: API/form boundary → Zod schema → validated typed data or field-level errors → owning hook/view (admin_usage/usage_analytics/schemas/AdminBillingUsageAnalyticsUpgradeSchemas.ts)

import { z } from 'zod';

export const adminUsagePlanTierSchema = z.enum(['Starter', 'Growth', 'Pro', 'Enterprise']);
export const adminUsageUpgradePayloadSchema = z.object({ planName: adminUsagePlanTierSchema }).strict();
export const adminUsageUpgradeRequestSchema = z.object({
  requestId: z.string().min(1),
  planName: adminUsagePlanTierSchema,
  status: z.literal('pending'),
  requestedAt: z.string().datetime({ offset: true }),
});
