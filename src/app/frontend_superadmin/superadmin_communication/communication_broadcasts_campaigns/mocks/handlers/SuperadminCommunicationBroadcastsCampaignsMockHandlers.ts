import { StatusCodes } from 'http-status-codes';
import { http, HttpResponse, delay } from 'msw';

import { SUPERADMIN_COMMUNICATION_BROADCASTS_CAMPAIGNS_API } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/config/superadmin_communication_broadcasts_campaigns.url_config';
import { SUPERADMIN_BROADCAST_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/constants/superadmin_communication_broadcasts_campaigns_broadcast.constants';
import { SUPERADMIN_BROADCAST_TENANTS, SUPERADMIN_COMMUNICATION_BROADCASTS_UNSCOPED_RECIPIENT_COUNT, MOCK_SUPERADMIN_COMMUNICATION_BROADCASTS } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/mocks/fixtures/SuperadminCommunicationBroadcastsCampaignsMockFixtures';

import type { SuperadminBroadcastDeliveryResult } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/types/superadmin_communication_broadcasts_campaigns_broadcast_delivery.types';
import type { Broadcast } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/types/superadmin_communication_broadcasts_campaigns.types';
import type { ApiResponse } from '@/lib/api';


/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminCommunicationBroadcastsMockHandlers owned by the superadmin_communication_broadcasts feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: http-status-codes, msw, @/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/mocks/fixtures/SuperadminCommunicationBroadcastsCampaignsMockFixtures, @/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/constants/superadmin_communication_broadcasts_campaigns_broadcast.constants, @/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/config/superadmin_communication_broadcasts_campaigns.url_config, @/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/types/superadmin_communication_broadcasts_campaigns_broadcast_delivery.types, @/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/types/superadmin_communication_broadcasts_campaigns.types, @/lib/api
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */


type SuperadminBroadcastMutationResponse = ApiResponse<Broadcast> | ApiResponse<SuperadminBroadcastDeliveryResult> | ApiResponse<Record<string, unknown>>;
const BASE_URL = `*${SUPERADMIN_COMMUNICATION_BROADCASTS_CAMPAIGNS_API.BASE}`;
let mockBroadcasts = [...MOCK_SUPERADMIN_COMMUNICATION_BROADCASTS];
const deliveredRecipientsByBroadcast = new Map<string, Set<string>>();
const idempotentBroadcastResponses = new Map<string, SuperadminBroadcastMutationResponse>();
export function resetSuperadminCommunicationBroadcastsMockState(): void {
  mockBroadcasts = [...MOCK_SUPERADMIN_COMMUNICATION_BROADCASTS];
  deliveredRecipientsByBroadcast.clear();
  idempotentBroadcastResponses.clear();
}
export const superadminBroadcastsHandlers = [
    http.get(`*${SUPERADMIN_COMMUNICATION_BROADCASTS_CAMPAIGNS_API.TENANTS}`, async () => HttpResponse.json({ success: true, message: 'Success', data: SUPERADMIN_BROADCAST_TENANTS, requestId: crypto.randomUUID()})),
    http.get(BASE_URL, async ({ request }) => {
        await delay(350);
        const url = new URL(request.url);
        const page = Number(url.searchParams.get('page') || '1');
        const limit = Number(url.searchParams.get('limit') || '10');
        const search = (url.searchParams.get('search') || '').toLowerCase();
        const status = url.searchParams.get('status') || 'ALL';
        let filtered = [...mockBroadcasts];
        if (search)
            filtered = filtered.filter((b) => b.title.toLowerCase().includes(search) || b.content.toLowerCase().includes(search));
        if (status !== SUPERADMIN_BROADCAST_STATUS_CODES.ALL && status !== SUPERADMIN_BROADCAST_STATUS_CODES.FAILED)
            filtered = filtered.filter((b) => b.status === status);
        if (status === SUPERADMIN_BROADCAST_STATUS_CODES.FAILED)
            filtered = filtered.filter((b) => (b.failedCount ?? 0) > 0);
        const total = filtered.length;
        const data = filtered.slice((page - 1) * limit, page * limit);
        return HttpResponse.json<ApiResponse<Broadcast[]>>({ success: true, message: 'Success', data, meta: { total, page, limit, totalPages: Math.max(1, Math.ceil(total / limit)), hasNextPage: page < (Math.max(1, Math.ceil(total / limit))), hasPrevPage: page > 1}, requestId: crypto.randomUUID()});
    }),
    http.post(BASE_URL, async ({ request }) => {
        await delay(300);
        const key = request.headers.get('Idempotency-Key');
        if (key && idempotentBroadcastResponses.has(`create:${key}`)) return HttpResponse.json(idempotentBroadcastResponses.get(`create:${key}`));
        const body = await request.json() as Partial<Broadcast>;
        const newBroadcast: Broadcast = { id: `b${Date.now()}`, title: body.title ?? 'New broadcast', content: body.content ?? 'Broadcast content', status: body.status ?? SUPERADMIN_BROADCAST_STATUS_CODES.DRAFT, targetGymIds: body.targetGymIds ?? [], scheduledDate: body.scheduledDate ?? null, sentDate: body.status === SUPERADMIN_BROADCAST_STATUS_CODES.SENT ? new Date().toISOString() : null, totalRecipients: SUPERADMIN_COMMUNICATION_BROADCASTS_UNSCOPED_RECIPIENT_COUNT, deliveredCount: 0, failedCount: 0, audience: 'ALL_TENANTS' };
        mockBroadcasts = [newBroadcast, ...mockBroadcasts];
        const response: ApiResponse<Broadcast> = { success: true, message: 'Broadcast created', data: newBroadcast, requestId: crypto.randomUUID()};
        if (key) idempotentBroadcastResponses.set(`create:${key}`, response);
        return HttpResponse.json(response);
    }),
    http.patch(`*${SUPERADMIN_COMMUNICATION_BROADCASTS_CAMPAIGNS_API.DETAIL_PATTERN}`, async ({ params, request }) => {
        await delay(300);
        const key = request.headers.get('Idempotency-Key');
        const responseKey = `update:${String(params.id)}:${key ?? 'none'}`;
        if (key && idempotentBroadcastResponses.has(responseKey)) return HttpResponse.json(idempotentBroadcastResponses.get(responseKey));
        const body = await request.json() as Partial<Broadcast>;
        let updated: Broadcast | undefined;
        mockBroadcasts = mockBroadcasts.map((b) => b.id === params.id ? (updated = { ...b, ...body, sentDate: body.status === SUPERADMIN_BROADCAST_STATUS_CODES.SENT && !b.sentDate ? new Date().toISOString() : b.sentDate }) : b);
        if (!updated) return HttpResponse.json({ success: false, message: 'Broadcast not found', data: null, errorCode: 'NOT_FOUND', statusCode: StatusCodes.NOT_FOUND, requestId: crypto.randomUUID()}, { status: StatusCodes.NOT_FOUND });
        const response: ApiResponse<Broadcast> = { success: true, message: 'Broadcast updated', data: updated, requestId: crypto.randomUUID()};
        if (key) idempotentBroadcastResponses.set(responseKey, response);
        return HttpResponse.json(response);
    }),
    http.delete(`*${SUPERADMIN_COMMUNICATION_BROADCASTS_CAMPAIGNS_API.DETAIL_PATTERN}`, async ({ params, request }) => {
        await delay(250);
        const key = request.headers.get('Idempotency-Key');
        const responseKey = `delete:${String(params.id)}:${key ?? 'none'}`;
        if (key && idempotentBroadcastResponses.has(responseKey)) return HttpResponse.json(idempotentBroadcastResponses.get(responseKey));
        const exists = mockBroadcasts.some((b) => b.id === params.id);
        if (!exists) return HttpResponse.json({ success: false, message: 'Broadcast not found', data: null, errorCode: 'NOT_FOUND', statusCode: StatusCodes.NOT_FOUND, requestId: crypto.randomUUID()}, { status: StatusCodes.NOT_FOUND });
        mockBroadcasts = mockBroadcasts.filter((b) => b.id !== params.id);
        const response: ApiResponse<Record<string, unknown>> = { success: true, message: 'Broadcast deleted', data: {}, requestId: crypto.randomUUID()};
        if (key) idempotentBroadcastResponses.set(responseKey, response);
        return HttpResponse.json(response);
    }),
    http.post(`*${SUPERADMIN_COMMUNICATION_BROADCASTS_CAMPAIGNS_API.DELIVER_TO_RECIPIENT_PATTERN}`, async ({ params, request }) => {
        await delay(250);
        const key = request.headers.get('Idempotency-Key');
        const responseKey = `delivery:${String(params.id)}:${String(params.recipientId)}:${key ?? 'none'}`;
        if (key && idempotentBroadcastResponses.has(responseKey)) return HttpResponse.json(idempotentBroadcastResponses.get(responseKey));
        const broadcastId = String(params.id);
        const recipientId = String(params.recipientId);
        const broadcast = mockBroadcasts.find((item) => item.id === broadcastId);
        if (!broadcast) {
            return HttpResponse.json<ApiResponse<null>>({ success: false, message: 'Broadcast not found', data: null, errorCode: 'NOT_FOUND', statusCode: StatusCodes.NOT_FOUND, requestId: crypto.randomUUID()}, { status: StatusCodes.NOT_FOUND });
        }
        if (broadcast.targetGymIds.length > 0 && !broadcast.targetGymIds.includes(recipientId)) {
            return HttpResponse.json<ApiResponse<null>>({ success: false, message: 'Recipient is not part of this broadcast', data: null, errorCode: 'VALIDATION_ERROR', statusCode: StatusCodes.BAD_REQUEST, requestId: crypto.randomUUID()}, { status: StatusCodes.BAD_REQUEST });
        }
        const delivered = deliveredRecipientsByBroadcast.get(broadcastId) ?? new Set<string>();
        if (delivered.has(recipientId)) {
            return HttpResponse.json<ApiResponse<SuperadminBroadcastDeliveryResult>>({
                success: true,
                message: 'Broadcast recipient already delivered',
                data: { broadcast, recipientId, deliveryStatus: 'DELIVERED', deliveredAt: broadcast.sentDate ?? new Date().toISOString() },
                requestId: crypto.randomUUID(),
            });
        }
        delivered.add(recipientId);
        deliveredRecipientsByBroadcast.set(broadcastId, delivered);
        const updated: Broadcast = { ...broadcast, deliveredCount: Math.min(broadcast.totalRecipients ?? (broadcast.targetGymIds.length || SUPERADMIN_BROADCAST_TENANTS.length), (broadcast.deliveredCount ?? 0) + 1) };
        mockBroadcasts = mockBroadcasts.map((item) => item.id === broadcastId ? updated : item);
        const response: ApiResponse<SuperadminBroadcastDeliveryResult> = {
            success: true,
            message: 'Broadcast recipient delivered',
            data: { broadcast: updated, recipientId, deliveryStatus: 'DELIVERED', deliveredAt: new Date().toISOString() },
            requestId: crypto.randomUUID(),
        };
        if (key) idempotentBroadcastResponses.set(responseKey, response);
        return HttpResponse.json(response);
    }),
    http.get(`*${SUPERADMIN_COMMUNICATION_BROADCASTS_CAMPAIGNS_API.RECIPIENT_COUNT}`, async () => HttpResponse.json({ success: true, message: 'Success', data: { count: SUPERADMIN_COMMUNICATION_BROADCASTS_UNSCOPED_RECIPIENT_COUNT }, requestId: crypto.randomUUID()})),
];
