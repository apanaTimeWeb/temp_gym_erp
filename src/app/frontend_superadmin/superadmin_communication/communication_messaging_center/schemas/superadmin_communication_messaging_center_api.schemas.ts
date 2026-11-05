/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminCommunicationMessagingApiSchema owned by the superadmin_communication_messaging feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: zod, @/app/frontend_superadmin/superadmin_communication/communication_messaging_center/schemas/superadmin_communication_messaging_center_api_response.schema, @/app/frontend_superadmin/superadmin_communication/communication_messaging_center/schemas/superadmin_communication_messaging_center_types.schemas
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import { z } from 'zod';

import { SuperadminCommunicationMessagingCenterApiResponseSchema } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/schemas/superadmin_communication_messaging_center_api_response.schema';
import { MessagingTenantSchema, TenantMessageSchema } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/schemas/superadmin_communication_messaging_center_types.schemas';



export const SuperadminCommunicationMessagingMessagesResponseSchema = SuperadminCommunicationMessagingCenterApiResponseSchema(z.array(TenantMessageSchema));
export const SuperadminCommunicationMessagingTenantsResponseSchema = SuperadminCommunicationMessagingCenterApiResponseSchema(z.array(MessagingTenantSchema));
export const SuperadminCommunicationMessagingMessageResponseSchema = SuperadminCommunicationMessagingCenterApiResponseSchema(TenantMessageSchema);
