/**
 * RESPONSIBILITY: Defines TypeScript domain contracts for the feature.
 * AI BOUNDARY: Types/interfaces only; runtime validation schemas live in the owning _schemas folder.
 */
import type {
  GymStatsSchema,
  SubscriptionHistoryItemSchema,
  TenantSchema,
  TenantStatusSchema,
  UsageStatsSchema,
} from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/schemas/superadmin_gyms_directory_contract.schemas';
import type { z } from 'zod';


export type TenantStatus = z.infer<typeof TenantStatusSchema>;
export type SubscriptionHistoryItem = z.infer<typeof SubscriptionHistoryItemSchema>;
export type UsageStats = z.infer<typeof UsageStatsSchema>;
export type Tenant = z.infer<typeof TenantSchema>;
export type GymStats = z.infer<typeof GymStatsSchema>;
