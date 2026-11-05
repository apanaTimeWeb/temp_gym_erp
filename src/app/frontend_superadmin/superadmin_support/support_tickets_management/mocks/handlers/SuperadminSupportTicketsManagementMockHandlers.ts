import { StatusCodes } from 'http-status-codes';
import { http, HttpResponse, delay } from 'msw';

import { SUPERADMIN_SUPPORT_TICKETS_MANAGEMENT_API } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/config/superadmin_support_tickets_management.url_config';
import { SUPERADMIN_SUPPORT_TICKETS_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/constants/superadmin_support_tickets_management.constants';
import { MOCK_TICKETS } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/mocks/fixtures/SuperadminSupportTicketsManagementMockData';
import { TicketAssigneeInputSchema, replySchema } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/schemas/superadmin_support_tickets_management_types.schemas';

import type { SupportTicket } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/types/superadmin_support_tickets_management.types';
import type { ApiResponse } from '@/lib/api';


/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminSupportTicketsMockHandlers owned by the superadmin_support_tickets feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: http-status-codes, msw, @/app/frontend_superadmin/superadmin_support/support_tickets_management/mocks/fixtures/SuperadminSupportTicketsManagementMockData, @/app/frontend_superadmin/superadmin_support/support_tickets_management/constants/superadmin_support_tickets_management.constants, @/app/frontend_superadmin/superadmin_support/support_tickets_management/schemas/superadmin_support_tickets_management_types.schemas, @/app/frontend_superadmin/superadmin_support/support_tickets_management/config/superadmin_support_tickets_management.url_config, @/app/frontend_superadmin/superadmin_support/support_tickets_management/types/superadmin_support_tickets_management.types, @/lib/api
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */


const BASE_URL = `*${SUPERADMIN_SUPPORT_TICKETS_MANAGEMENT_API.BASE}`;
let mockTickets = [...MOCK_TICKETS];
const processedReplyIntents = new Map<string, { fingerprint: string; response: import('msw').JsonBodyType }>();
function idempotentReplay(key: string, fingerprint: string): Response | null {
    const prior = processedReplyIntents.get(key);
    if (!prior) return null;
    if (prior.fingerprint !== fingerprint) return HttpResponse.json({ success: false, message: 'Idempotency key was reused for a different ticket intent', data: null, errorCode: 'CONFLICT', statusCode: StatusCodes.CONFLICT, requestId: crypto.randomUUID()}, { status: StatusCodes.CONFLICT });
    return HttpResponse.json(prior.response);
}
function requireIdempotencyKey(request: Request): string | Response {
    const key = request.headers.get('Idempotency-Key');
    return key || HttpResponse.json({ success: false, message: 'Idempotency-Key is required', data: null, errorCode: 'VALIDATION_ERROR', statusCode: StatusCodes.BAD_REQUEST, requestId: crypto.randomUUID()}, { status: StatusCodes.BAD_REQUEST });
}
export function resetSuperadminSupportTicketsMockState(): void {
    mockTickets = [...MOCK_TICKETS];
    processedReplyIntents.clear();
}

export const superadminTicketsHandlers = [
    http.get(BASE_URL, async ({ request }) => {
        await delay(400);
        const url = new URL(request.url);
        const page = Number(url.searchParams.get('page')) || 1;
        const limit = Number(url.searchParams.get('limit')) || 10;
        const search = url.searchParams.get('search')?.toLowerCase() || '';
        const status = url.searchParams.get('status');
        const priority = url.searchParams.get('priority');
        let filtered = [...mockTickets];
        if (search) {
            filtered = filtered.filter(t => t.tenantName?.toLowerCase().includes(search) ||
                t.subject?.toLowerCase().includes(search) ||
                t.id?.toLowerCase().includes(search));
        }
        if (status) {
            filtered = filtered.filter(t => t.status === status);
        }
        if (priority) {
            filtered = filtered.filter(t => t.priority === priority);
        }
        const total = filtered.length;
        const paginated = filtered.slice((page - 1) * limit, page * limit);
        return HttpResponse.json<ApiResponse<SupportTicket[]>>({
            success: true,
            message: 'Success',
            data: paginated,
            meta: { total, page, limit, totalPages: Math.ceil(total / limit), hasNextPage: page < (Math.ceil(total / limit)), hasPrevPage: page > 1},
            requestId: crypto.randomUUID(),
        });
    }),
    http.get(`${BASE_URL}/:id`, async ({ params }) => {
        await delay(300);
        const id = params.id as string;
        const ticket = mockTickets.find(t => t.id === id);
        if (!ticket) {
            return HttpResponse.json<ApiResponse<SupportTicket>>({ success: false, message: 'Not found', data: null, errorCode: 'NOT_FOUND', statusCode: StatusCodes.NOT_FOUND, requestId: crypto.randomUUID()}, { status: StatusCodes.NOT_FOUND });
        }
        return HttpResponse.json<ApiResponse<SupportTicket>>({
            success: true,
            message: 'Success',
            data: ticket,
            requestId: crypto.randomUUID(),
        });
    }),
    http.patch(`${BASE_URL}/:id`, async ({ params, request }) => {
        await delay(500);
        const id = params.id as string;
        const body = (await request.json()) as Partial<SupportTicket>;
        const keyValue = requireIdempotencyKey(request); if (keyValue instanceof Response) return keyValue;
        const fingerprint = JSON.stringify({ operation: 'update', id, body });
        const replay = idempotentReplay(keyValue, fingerprint); if (replay) return replay;
        let updated: SupportTicket | null = null;
        mockTickets = mockTickets.map(t => {
            if (t.id === id) {
                updated = { ...t, ...body, lastUpdated: new Date().toISOString() };
                return updated;
            }
            return t;
        });
        if (!updated) {
            return HttpResponse.json<ApiResponse<SupportTicket>>({ success: false, message: 'Not found', data: null, errorCode: 'NOT_FOUND', statusCode: StatusCodes.NOT_FOUND, requestId: crypto.randomUUID()}, { status: StatusCodes.NOT_FOUND });
        }
        const response: ApiResponse<SupportTicket> = { success: true, message: 'Updated', data: updated, requestId: crypto.randomUUID()};
        processedReplyIntents.set(keyValue, { fingerprint, response });
        return HttpResponse.json(response);
    }),
    http.post(`${BASE_URL}/:id/close`, async ({ params, request }) => {
        await delay(400);
        const id = params.id as string;
        const keyValue = requireIdempotencyKey(request); if (keyValue instanceof Response) return keyValue;
        const fingerprint = JSON.stringify({ operation: 'close', id });
        const replay = idempotentReplay(keyValue, fingerprint); if (replay) return replay;
        let updated: SupportTicket | null = null;
        mockTickets = mockTickets.map(t => {
            if (t.id === id) {
                updated = { ...t, status: SUPERADMIN_SUPPORT_TICKETS_STATUS_CODES.CLOSED, lastUpdated: new Date().toISOString() };
                return updated;
            }
            return t;
        });
        if (!updated) {
            return HttpResponse.json<ApiResponse<SupportTicket>>({ success: false, message: 'Not found', data: null, errorCode: 'NOT_FOUND', statusCode: StatusCodes.NOT_FOUND, requestId: crypto.randomUUID()}, { status: StatusCodes.NOT_FOUND });
        }
        const response: ApiResponse<SupportTicket> = { success: true, message: 'Closed', data: updated, requestId: crypto.randomUUID()};
        processedReplyIntents.set(keyValue, { fingerprint, response });
        return HttpResponse.json(response);
    }),
    http.post(`${BASE_URL}/:id/reply`, async ({ params, request }) => {
        await delay(400);
        const id = params.id as string;
        const idempotencyKey = request.headers.get('Idempotency-Key');
        if (!idempotencyKey) return HttpResponse.json<ApiResponse<SupportTicket>>({ success: false, message: 'Idempotency-Key is required', data: null, errorCode: 'VALIDATION_ERROR', statusCode: StatusCodes.BAD_REQUEST, requestId: crypto.randomUUID()}, { status: StatusCodes.BAD_REQUEST });
        let body: unknown;
        try { body = await request.json(); } catch { return HttpResponse.json<ApiResponse<SupportTicket>>({ success: false, message: 'Invalid reply payload', data: null, errorCode: 'VALIDATION_ERROR', statusCode: StatusCodes.BAD_REQUEST, requestId: crypto.randomUUID()}, { status: StatusCodes.BAD_REQUEST }); }
        const parsed = replySchema.safeParse(body);
        if (!parsed.success) return HttpResponse.json<ApiResponse<SupportTicket>>({ success: false, message: 'Reply text is required', data: null, errorCode: 'VALIDATION_ERROR', statusCode: StatusCodes.BAD_REQUEST, requestId: crypto.randomUUID()}, { status: StatusCodes.BAD_REQUEST });
        const ticket = mockTickets.find((item) => item.id === id);
        if (!ticket) return HttpResponse.json<ApiResponse<SupportTicket>>({ success: false, message: 'Not found', data: null, errorCode: 'NOT_FOUND', statusCode: StatusCodes.NOT_FOUND, requestId: crypto.randomUUID()}, { status: StatusCodes.NOT_FOUND });
        const replyText = parsed.data.replyText.trim();
        const fingerprint = JSON.stringify({ ticketId: id, replyText });
        const priorIntent = processedReplyIntents.get(idempotencyKey);
        if (priorIntent) {
            if (priorIntent.fingerprint !== fingerprint) return HttpResponse.json<ApiResponse<SupportTicket>>({ success: false, message: 'Idempotency key was reused for a different reply', data: null, errorCode: 'CONFLICT', statusCode: StatusCodes.CONFLICT, requestId: crypto.randomUUID()}, { status: StatusCodes.CONFLICT });
            return HttpResponse.json(priorIntent.response);
        }
        const index = mockTickets.findIndex((item) => item.id === id);
        const now = new Date().toISOString();
        const reply = { id: `msg-${idempotencyKey}`, senderId: 'superadmin', senderName: 'Superadmin', senderRole: 'SUPERADMIN' as const, content: replyText, createdAt: now };
        const updated = { ...ticket, messages: [...(ticket.messages ?? []), reply], status: ticket.status === SUPERADMIN_SUPPORT_TICKETS_STATUS_CODES.CLOSED ? SUPERADMIN_SUPPORT_TICKETS_STATUS_CODES.CLOSED : SUPERADMIN_SUPPORT_TICKETS_STATUS_CODES.IN_PROGRESS, firstResponseAt: ticket.firstResponseAt ?? now, lastUpdated: now };
        mockTickets[index] = updated;
        const response: ApiResponse<SupportTicket> = { success: true, message: 'Reply sent', data: updated, requestId: crypto.randomUUID()};
        processedReplyIntents.set(idempotencyKey, { fingerprint, response });
        return HttpResponse.json(response);
    }),
    http.post(`${BASE_URL}/:id/assign`, async ({ params, request }) => {
        await delay(400);
        const id = params.id as string;
        const parsed = TicketAssigneeInputSchema.safeParse(await request.json());
        if (!parsed.success) {
            return HttpResponse.json<ApiResponse<SupportTicket>>({ success: false, message: 'Assignee is required', data: null, errorCode: 'VALIDATION_ERROR', statusCode: StatusCodes.BAD_REQUEST, requestId: crypto.randomUUID()}, { status: StatusCodes.BAD_REQUEST });
        }
        const assignee = parsed.data.assignee;
        const keyValue = requireIdempotencyKey(request); if (keyValue instanceof Response) return keyValue;
        const fingerprint = JSON.stringify({ operation: 'assign', id, assignee });
        const replay = idempotentReplay(keyValue, fingerprint); if (replay) return replay;
        let updated: SupportTicket | null = null;
        mockTickets = mockTickets.map(t => {
            if (t.id === id) {
                updated = { ...t, assignedTo: assignee, status: SUPERADMIN_SUPPORT_TICKETS_STATUS_CODES.IN_PROGRESS, lastUpdated: new Date().toISOString() };
                return updated;
            }
            return t;
        });
        if (!updated) {
            return HttpResponse.json<ApiResponse<SupportTicket>>({ success: false, message: 'Not found', data: null, errorCode: 'NOT_FOUND', statusCode: StatusCodes.NOT_FOUND, requestId: crypto.randomUUID()}, { status: StatusCodes.NOT_FOUND });
        }
        const response: ApiResponse<SupportTicket> = { success: true, message: 'Assigned', data: updated, requestId: crypto.randomUUID()};
        processedReplyIntents.set(keyValue, { fingerprint, response });
        return HttpResponse.json(response);
    }),
];
