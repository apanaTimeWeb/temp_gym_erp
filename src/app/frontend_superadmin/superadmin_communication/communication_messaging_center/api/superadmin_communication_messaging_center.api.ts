import { superadminMessagingCenterApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/api/superadmin_communication_messaging_center_api_fetch.api';
import { SUPERADMIN_COMMUNICATION_MESSAGING_CENTER_API } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/config/superadmin_communication_messaging_center.url_config';
import { SuperadminCommunicationMessagingMessageResponseSchema, SuperadminCommunicationMessagingMessagesResponseSchema, SuperadminCommunicationMessagingTenantsResponseSchema } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/schemas/superadmin_communication_messaging_center_api.schemas';
import { TenantMessageCreatePayloadSchema } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/schemas/superadmin_communication_messaging_center_types.schemas';

import type { MessagingTenant, TenantMessage, TenantMessageCreatePayload } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/types/superadmin_communication_messaging_center.types';


/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminCommunicationMessagingApi owned by the superadmin_communication_messaging feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_communication/communication_messaging_center/schemas/superadmin_communication_messaging_center_types.schemas, @/app/frontend_superadmin/superadmin_communication/communication_messaging_center/schemas/superadmin_communication_messaging_center_api.schemas, @/app/frontend_superadmin/superadmin_communication/communication_messaging_center/api/superadmin_communication_messaging_center_api_fetch.api, @/app/frontend_superadmin/superadmin_communication/communication_messaging_center/config/superadmin_communication_messaging_center.url_config, @/app/frontend_superadmin/superadmin_communication/communication_messaging_center/types/superadmin_communication_messaging_center.types, @/lib/api
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Owns the Superadmin tenant messaging API boundary, query encoding, and runtime Zod validation.


function withQuery(path: string, params?: Record<string, string>): string {
  if (!params) return path;
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) searchParams.set(key, value);
  });
  const query = searchParams.toString();
  return query ? `${path}?${query}` : path;
}

export const superadminMessagingApi = {
  fetchMessages: (params?: Record<string, string>) => apiFetch<TenantMessage[]>(withQuery(SUPERADMIN_COMMUNICATION_MESSAGING_CENTER_API.MESSAGES, params), {
    responseSchema: SuperadminCommunicationMessagingMessagesResponseSchema,
  }),
  fetchTenants: () => apiFetch<MessagingTenant[]>(SUPERADMIN_COMMUNICATION_MESSAGING_CENTER_API.TENANTS, {
    responseSchema: SuperadminCommunicationMessagingTenantsResponseSchema,
  }),
  sendMessage: (payload: TenantMessageCreatePayload, idempotencyKey: string) => {
    const validatedPayload = TenantMessageCreatePayloadSchema.parse(payload);
    return apiFetch<TenantMessage>(SUPERADMIN_COMMUNICATION_MESSAGING_CENTER_API.MESSAGES, {
      method: 'POST',
      body: JSON.stringify(validatedPayload),
      headers: { 'Idempotency-Key': idempotencyKey },
      responseSchema: SuperadminCommunicationMessagingMessageResponseSchema,
    });
  },
};
