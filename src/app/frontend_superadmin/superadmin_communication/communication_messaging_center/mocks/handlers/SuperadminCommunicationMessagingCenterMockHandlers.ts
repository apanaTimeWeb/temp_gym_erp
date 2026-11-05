import { StatusCodes } from 'http-status-codes';
import { http, HttpResponse, delay } from 'msw';

import { SUPERADMIN_COMMUNICATION_MESSAGING_CENTER_API } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/config/superadmin_communication_messaging_center.url_config';
import { SUPERADMIN_COMMUNICATION_MESSAGING_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/constants/superadmin_communication_messaging_center.constants';
import { MOCK_SUPERADMIN_COMMUNICATION_MESSAGING_TENANTS, MOCK_SUPERADMIN_COMMUNICATION_MESSAGING_MESSAGES } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/mocks/fixtures/SuperadminCommunicationMessagingCenterMockFixtures';
import { TenantMessageCreatePayloadSchema } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/schemas/superadmin_communication_messaging_center_types.schemas';

import type { TenantMessage } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/types/superadmin_communication_messaging_center.types';
import type { ApiResponse } from '@/lib/api';


/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminCommunicationMessagingMockHandlers owned by the superadmin_communication_messaging feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: http-status-codes, msw, @/app/frontend_superadmin/superadmin_communication/communication_messaging_center/mocks/fixtures/SuperadminCommunicationMessagingCenterMockFixtures, @/app/frontend_superadmin/superadmin_communication/communication_messaging_center/constants/superadmin_communication_messaging_center.constants, @/app/frontend_superadmin/superadmin_communication/communication_messaging_center/config/superadmin_communication_messaging_center.url_config, @/app/frontend_superadmin/superadmin_communication/communication_messaging_center/schemas/superadmin_communication_messaging_center_types.schemas, @/app/frontend_superadmin/superadmin_communication/communication_messaging_center/types/superadmin_communication_messaging_center.types, @/lib/api
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Module-owned mutable MSW state for Superadmin tenant messaging.


const DEFAULT_LIMIT = 10;

let mockMessages = [...MOCK_SUPERADMIN_COMMUNICATION_MESSAGING_MESSAGES];
const processedMessageIntents = new Map<string, { fingerprint: string; response: import('msw').JsonBodyType }>();

export function resetSuperadminCommunicationMessagingMockState(): void {
  mockMessages = [...MOCK_SUPERADMIN_COMMUNICATION_MESSAGING_MESSAGES];
  processedMessageIntents.clear();
}

function parseDateBoundary(value: string | null, endOfDay = false): number | null {
  if (!value) return null;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;
  if (endOfDay) parsed.setHours(23, 59, 59, 999);
  return parsed.getTime();
}

export const superadminMessagingHandlers = [
  http.get(SUPERADMIN_COMMUNICATION_MESSAGING_CENTER_API.MESSAGES, async ({ request }) => {
    await delay(150);
    const url = new URL(request.url);
    const page = Math.max(Number(url.searchParams.get('page') || '1'), 1);
    const limit = Math.max(Number(url.searchParams.get('limit') || String(DEFAULT_LIMIT)), 1);
    const search = (url.searchParams.get('search') || '').trim().toLowerCase();
    const channel = url.searchParams.get('channel');
    const startDate = parseDateBoundary(url.searchParams.get('startDate'));
    const endDate = parseDateBoundary(url.searchParams.get('endDate'), true);

    const filtered = mockMessages.filter((message) => {
      const haystack = `${message.tenantName} ${message.subject} ${message.body}`.toLowerCase();
      const matchesSearch = !search || haystack.includes(search);
      const matchesChannel = !channel || message.channel === channel;
      const effectiveDate = new Date(message.sentAt ?? message.scheduledAt ?? message.createdAt).getTime();
      const matchesStart = startDate === null || effectiveDate >= startDate;
      const matchesEnd = endDate === null || effectiveDate <= endDate;
      return matchesSearch && matchesChannel && matchesStart && matchesEnd;
    });

    const total = filtered.length;
    const data = filtered.slice((page - 1) * limit, page * limit);
    return HttpResponse.json<ApiResponse<TenantMessage[]>>({
      success: true,
      message: 'Messages loaded.',
      data,
      meta: { total, page, limit, totalPages: Math.max(1, Math.ceil(total / limit)), hasNextPage: page < (Math.max(1, Math.ceil(total / limit))), hasPrevPage: page > 1},
      requestId: crypto.randomUUID(),
    });
  }),

  http.get(SUPERADMIN_COMMUNICATION_MESSAGING_CENTER_API.TENANTS, async () => {
    await delay(150);
    return HttpResponse.json<ApiResponse<typeof MOCK_SUPERADMIN_COMMUNICATION_MESSAGING_TENANTS>>({
      success: true,
      message: 'Messaging tenants loaded.',
      data: [...MOCK_SUPERADMIN_COMMUNICATION_MESSAGING_TENANTS],
      requestId: crypto.randomUUID(),
    });
  }),

  http.post(SUPERADMIN_COMMUNICATION_MESSAGING_CENTER_API.MESSAGES, async ({ request }) => {
    await delay(150);
    const rawPayload: unknown = await request.json();
    const parsedPayload = TenantMessageCreatePayloadSchema.safeParse(rawPayload);
    if (!parsedPayload.success) {
      return HttpResponse.json<ApiResponse<TenantMessage>>({ success: false, message: 'Invalid message payload.', data: null, errorCode: 'VALIDATION_ERROR', statusCode: StatusCodes.BAD_REQUEST, requestId: crypto.randomUUID()}, { status: StatusCodes.BAD_REQUEST });
    }
    const payload = parsedPayload.data;
    const idempotencyKey = request.headers.get('Idempotency-Key');
    if (!idempotencyKey) return HttpResponse.json<ApiResponse<TenantMessage>>({ success: false, message: 'Idempotency-Key is required.', data: null, errorCode: 'VALIDATION_ERROR', statusCode: StatusCodes.BAD_REQUEST, requestId: crypto.randomUUID()}, { status: StatusCodes.BAD_REQUEST });
    const fingerprint = JSON.stringify(payload);
    const previous = processedMessageIntents.get(idempotencyKey);
    if (previous) return previous.fingerprint === fingerprint ? HttpResponse.json(previous.response) : HttpResponse.json({ success: false, message: 'Idempotency key was reused for a different message.', data: null, errorCode: 'CONFLICT', statusCode: StatusCodes.CONFLICT, requestId: crypto.randomUUID()}, { status: StatusCodes.CONFLICT });
    const tenant = MOCK_SUPERADMIN_COMMUNICATION_MESSAGING_TENANTS.find((candidate) => candidate.id === payload.tenantId);
    if (!tenant || tenant.name !== payload.tenantName) {
      return HttpResponse.json<ApiResponse<TenantMessage>>({ success: false, message: 'Tenant recipient is invalid.', data: null, errorCode: 'VALIDATION_ERROR', statusCode: StatusCodes.BAD_REQUEST, requestId: crypto.randomUUID()}, { status: StatusCodes.BAD_REQUEST });
    }
    const newMessage: TenantMessage = {
      id: `m${Date.now()}`,
      tenantId: payload.tenantId,
      tenantName: tenant.name,
      channel: payload.channel,
      subject: payload.subject,
      body: payload.body,
      status: SUPERADMIN_COMMUNICATION_MESSAGING_STATUS_CODES.SENT,
      sentAt: new Date().toISOString(),
      scheduledAt: null,
      createdAt: new Date().toISOString(),
    };
    mockMessages = [newMessage, ...mockMessages];
    const response: ApiResponse<TenantMessage> = { success: true, message: 'Message sent.', data: newMessage, requestId: crypto.randomUUID()};
    processedMessageIntents.set(idempotencyKey, { fingerprint, response });
    return HttpResponse.json(response);
  }),
];
