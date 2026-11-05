import { z } from 'zod';

import { superadminBroadcastsCampaignsApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/api/superadmin_communication_broadcasts_campaigns_api_fetch.api';
import { SUPERADMIN_COMMUNICATION_BROADCASTS_CAMPAIGNS_API } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/config/superadmin_communication_broadcasts_campaigns.url_config';
import { SuperadminCommunicationBroadcastsRecipientCountResponseSchema, SuperadminCommunicationBroadcastsEmptyResponseSchema } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/schemas/superadmin_communication_broadcasts_campaigns_api.schemas';
import { SuperadminBroadcastDeliveryResultSchema } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/schemas/superadmin_communication_broadcasts_campaigns_broadcast_delivery_contract.schemas';
import { SuperadminCommunicationBroadcastsTenantSchema, BroadcastResponseSchema } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/schemas/superadmin_communication_broadcasts_campaigns_contract.schemas';

import type { SuperadminBroadcastDeliveryResult } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/types/superadmin_communication_broadcasts_campaigns_broadcast_delivery.types';
import type { Broadcast, BroadcastFormData, SuperadminCommunicationBroadcastsTenant } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/types/superadmin_communication_broadcasts_campaigns.types';
import type { ApiResponse } from '@/lib/api';


/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminCommunicationBroadcastsApi owned by the superadmin_communication_broadcasts feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: zod, @/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/schemas/superadmin_communication_broadcasts_campaigns_contract.schemas, @/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/schemas/superadmin_communication_broadcasts_campaigns_api.schemas, @/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/schemas/superadmin_communication_broadcasts_campaigns_broadcast_delivery_contract.schemas, @/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/api/superadmin_communication_broadcasts_campaigns_api_fetch.api, @/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/config/superadmin_communication_broadcasts_campaigns.url_config, @/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/types/superadmin_communication_broadcasts_campaigns_broadcast_delivery.types, @/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/types/superadmin_communication_broadcasts_campaigns.types, @/lib/api
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Modularized API client for the Broadcasts module. All methods import apiFetch from src/lib/api.ts and define only superadmin-scoped endpoints. No UI logic.


export const broadcastsApi = {
    fetchBroadcasts: (params?: Record<string, string>) => {
        const q = params ? '?' + new URLSearchParams(params).toString() : '';
        return apiFetch<Broadcast[]>(`${SUPERADMIN_COMMUNICATION_BROADCASTS_CAMPAIGNS_API.BASE}${q}`, { dataSchema: z.array(BroadcastResponseSchema) });
    },
    createBroadcast: (body: BroadcastFormData, idempotencyKey: string) => apiFetch<Broadcast>(SUPERADMIN_COMMUNICATION_BROADCASTS_CAMPAIGNS_API.BASE, { method: 'POST',
        headers: { 'Idempotency-Key': idempotencyKey }, body: JSON.stringify(body),
        dataSchema: BroadcastResponseSchema
    }),
    deleteBroadcast: (id: string, idempotencyKey: string) => apiFetch<Record<string, unknown>>(SUPERADMIN_COMMUNICATION_BROADCASTS_CAMPAIGNS_API.DETAIL(id), { method: 'DELETE', headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: SuperadminCommunicationBroadcastsEmptyResponseSchema
    }),
    updateBroadcast: (id: string, body: Partial<BroadcastFormData>, idempotencyKey: string) => apiFetch<Broadcast>(SUPERADMIN_COMMUNICATION_BROADCASTS_CAMPAIGNS_API.DETAIL(id), { method: 'PATCH', headers: { 'Idempotency-Key': idempotencyKey }, body: JSON.stringify(body),
        dataSchema: BroadcastResponseSchema
    }),
    fetchTenants: () => apiFetch<SuperadminCommunicationBroadcastsTenant[]>(SUPERADMIN_COMMUNICATION_BROADCASTS_CAMPAIGNS_API.TENANTS, { dataSchema: z.array(SuperadminCommunicationBroadcastsTenantSchema) }),
    fetchRecipientCount: () => apiFetch<{
        count: number;
    }>(SUPERADMIN_COMMUNICATION_BROADCASTS_CAMPAIGNS_API.RECIPIENT_COUNT, { dataSchema: SuperadminCommunicationBroadcastsRecipientCountResponseSchema }),
};

export async function deliverBroadcastToRecipient(broadcastId: string, recipientId: string, idempotencyKey: string): Promise<ApiResponse<SuperadminBroadcastDeliveryResult>> {
    return apiFetch<SuperadminBroadcastDeliveryResult>(SUPERADMIN_COMMUNICATION_BROADCASTS_CAMPAIGNS_API.DELIVER_TO_RECIPIENT(broadcastId, recipientId), {
        method: 'POST',
        headers: { 'Idempotency-Key': idempotencyKey },
        body: JSON.stringify({ broadcastId, recipientId }),
        dataSchema: SuperadminBroadcastDeliveryResultSchema,
    });
}
