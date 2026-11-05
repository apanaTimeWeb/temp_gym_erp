/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminBillingPlansMockHandlers owned by the superadmin_billing_plans feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: http-status-codes, msw, @/app/frontend_superadmin/superadmin_billing/billing_plans_management/api/superadmin_billing_plans_management.query_keys, @/app/frontend_superadmin/superadmin_billing/billing_plans_management/schemas/superadmin_billing_plans_management_aliases.schemas, @/app/frontend_superadmin/superadmin_billing/billing_plans_management/config/superadmin_billing_plans_management.url_config, @/app/frontend_superadmin/superadmin_billing/billing_plans_management/mocks/fixtures/SuperadminBillingPlansManagementMockFixtures, @/app/frontend_superadmin/superadmin_billing/billing_plans_management/types/superadmin_billing_plans_management.types
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import { StatusCodes } from 'http-status-codes';
import { http, HttpResponse, delay } from 'msw';

import { SUPERADMIN_BILLING_PLANS_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/api/superadmin_billing_plans_management.query_keys';
import { SUPERADMIN_BILLING_PLANS_MANAGEMENT_API } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/config/superadmin_billing_plans_management.url_config';
import { INITIAL_PLANS } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/mocks/fixtures/SuperadminBillingPlansManagementMockFixtures';
import { CreatePlanPayloadSchema, UpdatePlanPayloadSchema } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/schemas/superadmin_billing_plans_management_aliases.schemas';

import type { SubscriptionPlan } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/types/superadmin_billing_plans_management.types';


const BASE_URL = `*${SUPERADMIN_BILLING_PLANS_MANAGEMENT_API.BASE}`;
const idempotencyResponses = new Map<string, { fingerprint: string; response: Response }>();
function readIdempotencyKey(request: Request): string | null { return request.headers.get('Idempotency-Key'); }
function missingIdempotencyKey(): Response { return HttpResponse.json({ success: false, message: 'Idempotency-Key is required for plan mutations.', data: null, errorCode: 'VALIDATION_ERROR', statusCode: StatusCodes.BAD_REQUEST, requestId: crypto.randomUUID()}, { status: StatusCodes.BAD_REQUEST }); }
function idempotentResponse(key: string | null, fingerprint: string, response: Response): Response {
  if (!key) return response;
  const previous = idempotencyResponses.get(key);
  if (previous) return previous.fingerprint === fingerprint ? previous.response.clone() : HttpResponse.json({ success: false, message: 'Idempotency key was reused with a different request.', data: null, errorCode: 'CONFLICT', statusCode: StatusCodes.CONFLICT, requestId: crypto.randomUUID()}, { status: StatusCodes.CONFLICT });
  idempotencyResponses.set(key, { fingerprint, response: response.clone() });
  return response;
}
export let mockPlansList: SubscriptionPlan[] = [...INITIAL_PLANS];

export function resetSuperadminBillingPlansMockState(): void {
    mockPlansList = [...INITIAL_PLANS];
    idempotencyResponses.clear();
}
export const superadminPlansHandlers = [
    http.get(BASE_URL, async ({ request }) => {
        await delay(250);
        const url = new URL(request.url);
        const page = Math.max(1, Number(url.searchParams.get('page')) || 1);
        const limit = Math.max(1, Number(url.searchParams.get('limit')) || 10);
        const search = (url.searchParams.get('search') || '').toLowerCase();
        const status = url.searchParams.get('status');
        const sortBy = url.searchParams.get('sortBy') || 'name';
        const order = url.searchParams.get('order') === 'desc' ? 'desc' : 'asc';
        const filtered = mockPlansList.filter((plan) => {
            const matchesSearch = !search || plan.name.toLowerCase().includes(search) || plan.id.toLowerCase().includes(search);
            const matchesStatus = !status || status === SUPERADMIN_BILLING_PLANS_STATUS_CODES.ALL || (status === SUPERADMIN_BILLING_PLANS_STATUS_CODES.ARCHIVED ? plan.isArchived : !plan.isArchived);
            return matchesSearch && matchesStatus;
        });
        filtered.sort((a, b) => { const left = String(a[sortBy as keyof SubscriptionPlan] ?? ''); const right = String(b[sortBy as keyof SubscriptionPlan] ?? ''); const cmp = left.localeCompare(right, undefined, { numeric: true, sensitivity: 'base' }); return order === 'asc' ? cmp : -cmp; });
        const total = filtered.length;
        const data = filtered.slice((page - 1) * limit, page * limit);
        return HttpResponse.json({ success: true, message: 'Success', data, meta: { total, page, limit, totalPages: Math.ceil(total / limit), hasNextPage: page < (Math.ceil(total / limit)), hasPrevPage: page > 1}, requestId: crypto.randomUUID()});
    }),
    http.get(`${BASE_URL}/:id`, async ({ params }) => {
        await delay(200);
        const plan = mockPlansList.find((item) => item.id === params.id);
        return plan
            ? HttpResponse.json({ success: true, message: 'Success', data: plan, requestId: crypto.randomUUID()})
            : HttpResponse.json({ success: false, message: 'Plan not found', data: null, errorCode: 'NOT_FOUND', statusCode: StatusCodes.NOT_FOUND, requestId: crypto.randomUUID()}, { status: StatusCodes.NOT_FOUND });
    }),
    http.post(BASE_URL, async ({ request }) => {
        await delay(350);
        let rawBody: unknown;
        try { rawBody = await request.json(); } catch { return HttpResponse.json({ success: false, message: 'Invalid JSON body.', data: null, errorCode: 'VALIDATION_ERROR', statusCode: StatusCodes.BAD_REQUEST, requestId: crypto.randomUUID()}, { status: StatusCodes.BAD_REQUEST }); }
        const parsed = CreatePlanPayloadSchema.safeParse(rawBody);
        if (!parsed.success) return HttpResponse.json({ success: false, message: 'Plan payload is invalid.', data: null, errorCode: 'VALIDATION_ERROR', statusCode: StatusCodes.BAD_REQUEST, requestId: crypto.randomUUID()}, { status: StatusCodes.BAD_REQUEST });
        const key = readIdempotencyKey(request);
        if (!key) return missingIdempotencyKey();
        const fingerprint = JSON.stringify({ method: 'POST', path: new URL(request.url).pathname, payload: parsed.data });
        const prior = key ? idempotencyResponses.get(key) : undefined;
        if (prior) return idempotentResponse(key, fingerprint, prior.response.clone());
        const newPlan: SubscriptionPlan = { ...parsed.data, id: `plan-${Date.now()}-${mockPlansList.length}`, activeTenants: 0, isArchived: false };
        mockPlansList = [...mockPlansList, newPlan];
        return idempotentResponse(key, fingerprint, HttpResponse.json({ success: true, message: 'Created', data: newPlan, requestId: crypto.randomUUID()}));
    }),
    http.patch(`${BASE_URL}/:id`, async ({ params, request }) => {
        await delay(350);
        let rawBody: unknown;
        try { rawBody = await request.json(); } catch { return HttpResponse.json({ success: false, message: 'Invalid JSON body.', data: null, errorCode: 'VALIDATION_ERROR', statusCode: StatusCodes.BAD_REQUEST, requestId: crypto.randomUUID()}, { status: StatusCodes.BAD_REQUEST }); }
        const parsed = UpdatePlanPayloadSchema.safeParse(rawBody);
        if (!parsed.success) return HttpResponse.json({ success: false, message: 'Plan update payload is invalid.', data: null, errorCode: 'VALIDATION_ERROR', statusCode: StatusCodes.BAD_REQUEST, requestId: crypto.randomUUID()}, { status: StatusCodes.BAD_REQUEST });
        const current = mockPlansList.find((item) => item.id === params.id);
        if (!current) return HttpResponse.json({ success: false, message: 'Plan not found', data: null, errorCode: 'NOT_FOUND', statusCode: StatusCodes.NOT_FOUND, requestId: crypto.randomUUID()}, { status: StatusCodes.NOT_FOUND });
        const key = readIdempotencyKey(request);
        if (!key) return missingIdempotencyKey();
        const fingerprint = JSON.stringify({ method: 'PATCH', path: new URL(request.url).pathname, payload: parsed.data });
        const prior = key ? idempotencyResponses.get(key) : undefined;
        if (prior) return idempotentResponse(key, fingerprint, prior.response.clone());
        const updated = { ...current, ...parsed.data };
        mockPlansList = mockPlansList.map((item) => item.id === params.id ? updated : item);
        return idempotentResponse(key, fingerprint, HttpResponse.json({ success: true, message: 'Updated', data: updated, requestId: crypto.randomUUID()}));
    }),
    http.delete(`${BASE_URL}/:id`, async ({ params, request }) => {
        await delay(300);
        const key = readIdempotencyKey(request);
        if (!key) return missingIdempotencyKey();
        const fingerprint = JSON.stringify({ method: 'DELETE', path: new URL(request.url).pathname });
        const prior = key ? idempotencyResponses.get(key) : undefined;
        if (prior) return idempotentResponse(key, fingerprint, prior.response.clone());
        if (!mockPlansList.some((item) => item.id === params.id)) return HttpResponse.json({ success: false, message: 'Plan not found', data: null, errorCode: 'NOT_FOUND', statusCode: StatusCodes.NOT_FOUND, requestId: crypto.randomUUID()}, { status: StatusCodes.NOT_FOUND });
        mockPlansList = mockPlansList.filter((item) => item.id !== params.id);
        return idempotentResponse(key, fingerprint, HttpResponse.json({ success: true, message: 'Deleted', data: null, requestId: crypto.randomUUID()}));
    }),
    http.patch(`${BASE_URL}/:id/archive`, async ({ params, request }) => {
        await delay(300);
        const key = readIdempotencyKey(request);
        if (!key) return missingIdempotencyKey();
        const fingerprint = JSON.stringify({ method: 'PATCH', path: new URL(request.url).pathname, payload: { isArchived: true } });
        const prior = key ? idempotencyResponses.get(key) : undefined;
        if (prior) return idempotentResponse(key, fingerprint, prior.response.clone());
        const current = mockPlansList.find((item) => item.id === params.id);
        if (!current) return HttpResponse.json({ success: false, message: 'Plan not found', data: null, errorCode: 'NOT_FOUND', statusCode: StatusCodes.NOT_FOUND, requestId: crypto.randomUUID()}, { status: StatusCodes.NOT_FOUND });
        const archived = { ...current, isArchived: true };
        mockPlansList = mockPlansList.map((item) => item.id === params.id ? archived : item);
        return idempotentResponse(key, fingerprint, HttpResponse.json({ success: true, message: 'Archived', data: archived, requestId: crypto.randomUUID()}));
    }),
];
