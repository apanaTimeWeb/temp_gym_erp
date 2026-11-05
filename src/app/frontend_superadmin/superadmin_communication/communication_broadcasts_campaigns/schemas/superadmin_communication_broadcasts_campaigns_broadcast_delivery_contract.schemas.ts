/**
 * RESPONSIBILITY: Owns runtime validation schemas for the feature data contracts defined in this module.
 * AI BOUNDARY: Schema-only runtime validation; no UI, API calls, or state management.
 */
import { z } from 'zod';

import { BroadcastResponseSchema } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/schemas/superadmin_communication_broadcasts_campaigns_contract.schemas';


export const SuperadminBroadcastDeliveryStatusSchema = z.enum(['DELIVERED', 'FAILED']);
export const SuperadminBroadcastDeliveryResultSchema = z.object({
  broadcast: BroadcastResponseSchema,
  recipientId: z.string().min(1),
  deliveryStatus: SuperadminBroadcastDeliveryStatusSchema,
  deliveredAt: z.string().nullable().optional(),
});
