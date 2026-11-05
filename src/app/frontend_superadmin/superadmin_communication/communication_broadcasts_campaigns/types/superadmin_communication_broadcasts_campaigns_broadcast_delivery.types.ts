/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminCommunicationBroadcastsBroadcastDeliveryTypes owned by the superadmin_communication_broadcasts feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: zod, @/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/schemas/superadmin_communication_broadcasts_campaigns_broadcast_delivery_contract.schemas, @/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/schemas/superadmin_communication_broadcasts_campaigns_contract.schemas
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Defines the runtime-validated delivery result contract for the Superadmin Broadcasts recipient queue.
import { z } from 'zod';

import { SuperadminBroadcastDeliveryStatusSchema, SuperadminBroadcastDeliveryResultSchema } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/schemas/superadmin_communication_broadcasts_campaigns_broadcast_delivery_contract.schemas';



export type SuperadminBroadcastDeliveryStatus = z.infer<typeof SuperadminBroadcastDeliveryStatusSchema>;
export type SuperadminBroadcastDeliveryResult = z.infer<typeof SuperadminBroadcastDeliveryResultSchema>;
