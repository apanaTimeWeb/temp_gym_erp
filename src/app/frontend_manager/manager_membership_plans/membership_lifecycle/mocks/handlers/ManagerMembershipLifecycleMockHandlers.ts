import { MANAGER_MEMBERSHIP_LIFECYCLE_API } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/config/manager_membership_lifecycle.url_config';
import { http, HttpResponse } from 'msw';

import { MANAGER_HTTP_STATUS } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureHttpStatus';
import { ManagerInfrastructureMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureMockApiUrl';



import { MANAGER_MEMBERSHIP_LIFECYCLE_STATUS_VALUES } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/constants/manager_membership_lifecycle.constants';
import { MOCK_PLANS_MEMBERSHIP_OVERVIEW } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/mocks/fixtures/ManagerMembershipLifecycleMembershipMockData';
import { MOCK_PLANS } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/mocks/fixtures/ManagerMembershipLifecycleMockData';
import type { Plan } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/types/manager_membership_lifecycle.types';


let mockPlans = [...MOCK_PLANS];
let mockMembershipOverview = structuredClone(MOCK_PLANS_MEMBERSHIP_OVERVIEW);

let mockChangeRequestIdCounter = 1000;
let mockPlanIdCounter = 1000;
const idempotencyLedger = new Map<string, { fingerprint: string; body: Record<string, unknown>; status: number }>();
function beginIdempotency(request: Request, payload: unknown) {
  const key = request.headers.get('Idempotency-Key');
  if (!key) return { scope: '', fingerprint: '', response: HttpResponse.json({ success: false, message: 'Idempotency-Key is required', data: null, errorCode: 'IDEMPOTENCY_KEY_REQUIRED', statusCode: 400, requestId: 'mock-membership-idempotency-required' }, { status: 400 }) };
  const scope = `${request.method}:${new URL(request.url).pathname}:${key}`;
  const fingerprint = JSON.stringify(payload);
  const prior = idempotencyLedger.get(scope);
  if (prior) return { scope, fingerprint, response: prior.fingerprint === fingerprint ? HttpResponse.json(prior.body, { status: prior.status }) : HttpResponse.json({ success: false, message: 'Idempotency key was reused with a different payload', data: null, errorCode: 'IDEMPOTENCY_CONFLICT', statusCode: 409, requestId: 'mock-membership-idempotency-conflict' }, { status: 409 }) };
  return { scope, fingerprint, response: null };
}
function rememberIdempotency(scope: string, fingerprint: string, body: Record<string, unknown>, status = 200) { idempotencyLedger.set(scope, { fingerprint, body, status }); }
/**
 * @description Provides the ManagerMembershipLifecycleMockHandlers implementation for the plans module.
 * @dependencies @/app/frontend_manager/manager_infrastructure/manager_infrastructure_constants/ManagerHttpStatus; @/app/frontend_manager/manager_infrastructure/manager_infrastructure_utils/ManagerMockApiUrl; @/app/frontend_manager/manager_membership_plans/manager_plans_mocks/manager_plans_mocks_fixtures/ManagerMembershipLifecycleMembershipMockData; @/app/frontend_manager/manager_membership_plans/manager_plans_mocks/manager_plans_mocks_fixtures/ManagerMembershipLifecycleMockData; @/app/frontend_manager/manager_membership_plans/manager_plans_url_config
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export function resetManagerMembershipLifecycleMockState(): void {
  mockPlans = [...MOCK_PLANS];
  mockMembershipOverview = structuredClone(MOCK_PLANS_MEMBERSHIP_OVERVIEW);
  mockChangeRequestIdCounter = 1000;
  mockPlanIdCounter = 1000;
  idempotencyLedger.clear();
}

export const managerPlansHandlers = [
  http.get(ManagerInfrastructureMockApiUrl(MANAGER_MEMBERSHIP_LIFECYCLE_API.MEMBERSHIP_OVERVIEW), () =>
    HttpResponse.json({ success: true, message: 'Membership overview fetched', data: mockMembershipOverview, requestId: 'mock-membership-overview' })
  ),
  http.post(ManagerInfrastructureMockApiUrl(MANAGER_MEMBERSHIP_LIFECYCLE_API.MEMBERSHIP_ACTIVATE), async ({ request }) => {
    const body = await request.json() as { memberId: string; planId: string; startDate: string };
    const idem = beginIdempotency(request, body); if (idem.response) return idem.response;
    if (!mockMembershipOverview.memberOptions.some((member) => member.id === body.memberId) || !mockPlans.some((plan) => plan.id === body.planId)) return HttpResponse.json({ success: false, message: 'Membership or plan not found', data: null, errorCode: 'NOT_FOUND', statusCode: 404, requestId: 'mock-membership-activate-not-found' }, { status: 404 });
    mockMembershipOverview = { ...mockMembershipOverview, memberOptions: mockMembershipOverview.memberOptions.map((member) => member.id === body.memberId ? { ...member, planId: body.planId, status: MANAGER_MEMBERSHIP_LIFECYCLE_STATUS_VALUES.ACTIVE, expiryDate: body.startDate } : member) };
    const result = { success: true, message: 'Membership activated successfully', data: {}, requestId: 'mock-membership-action' }; rememberIdempotency(idem.scope, idem.fingerprint, result); return HttpResponse.json(result);
  }),
  http.post(ManagerInfrastructureMockApiUrl(MANAGER_MEMBERSHIP_LIFECYCLE_API.MEMBERSHIP_RENEW), async ({ request }) => {
    const body = await request.json() as { memberId: string; planId: string; newExpiryDate: string };
    const idem = beginIdempotency(request, body); if (idem.response) return idem.response;
    const update = (member: typeof mockMembershipOverview.memberOptions[number]) => member.id === body.memberId ? { ...member, planId: body.planId, expiryDate: body.newExpiryDate, status: MANAGER_MEMBERSHIP_LIFECYCLE_STATUS_VALUES.ACTIVE } : member;
    mockMembershipOverview = { memberOptions: mockMembershipOverview.memberOptions.map(update), renewalCandidates: mockMembershipOverview.renewalCandidates.map(update) };
    const result = { success: true, message: 'Membership renewed successfully', data: {}, requestId: 'mock-membership-action' }; rememberIdempotency(idem.scope, idem.fingerprint, result); return HttpResponse.json(result);
  }),
  http.post(ManagerInfrastructureMockApiUrl(MANAGER_MEMBERSHIP_LIFECYCLE_API.MEMBERSHIP_FREEZE), async ({ request }) => {
    const body = await request.json() as { memberId: string; freezeFrom: string; freezeUntil: string };
    const idem = beginIdempotency(request, body); if (idem.response) return idem.response;
    if (!mockMembershipOverview.memberOptions.some((member) => member.id === body.memberId) || !Number.isFinite(Date.parse(body.freezeFrom)) || !Number.isFinite(Date.parse(body.freezeUntil)) || body.freezeUntil < body.freezeFrom) return HttpResponse.json({ success: false, message: 'Invalid membership freeze request', data: null, errorCode: 'INVALID_FREEZE', statusCode: 400, requestId: 'mock-membership-freeze-invalid' }, { status: 400 });
    mockMembershipOverview = { ...mockMembershipOverview, memberOptions: mockMembershipOverview.memberOptions.map((member) => member.id === body.memberId ? { ...member, status: MANAGER_MEMBERSHIP_LIFECYCLE_STATUS_VALUES.FROZEN, expiryDate: body.freezeUntil } : member) };
    const result = { success: true, message: 'Membership freeze applied successfully', data: {}, requestId: 'mock-membership-action' }; rememberIdempotency(idem.scope, idem.fingerprint, result); return HttpResponse.json(result);
  }),
  http.post(ManagerInfrastructureMockApiUrl(MANAGER_MEMBERSHIP_LIFECYCLE_API.CHANGE_REQUESTS), async ({ request }) => {
    const body = await request.json(); const idem = beginIdempotency(request, body); if (idem.response) return idem.response;
    const result = { success: true, message: 'Plan change request submitted', data: { requestId: `change-${mockChangeRequestIdCounter++}`, status: MANAGER_MEMBERSHIP_LIFECYCLE_STATUS_VALUES.PENDING }, requestId: 'mock-membership-change-request' }; rememberIdempotency(idem.scope, idem.fingerprint, result); return HttpResponse.json(result);
  }),

  http.get(ManagerInfrastructureMockApiUrl(MANAGER_MEMBERSHIP_LIFECYCLE_API.BASE), ({ request }) => {
    const url = new URL(request.url);
    const search = (url.searchParams.get('search') || '').trim().toLowerCase();
    const tier = (url.searchParams.get('tier') || '').trim();
    const status = (url.searchParams.get('status') || '').trim().toUpperCase();
    const filtered = mockPlans.filter((plan) => {
      const matchesSearch = !search || plan.name.toLowerCase().includes(search) || plan.tier.toLowerCase().includes(search);
      const matchesTier = !tier || tier.toUpperCase() === 'ALL' || plan.tier.toUpperCase() === tier.toUpperCase();
      const matchesStatus = !status || status === MANAGER_MEMBERSHIP_LIFECYCLE_STATUS_VALUES.ALL || (status === MANAGER_MEMBERSHIP_LIFECYCLE_STATUS_VALUES.ACTIVE ? plan.isActive : !plan.isActive);
      return matchesSearch && matchesTier && matchesStatus;
    });
    const requestedPage = Number(url.searchParams.get('page') || '1');
    const requestedLimit = Number(url.searchParams.get('limit') || '10');
    const page = Number.isSafeInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;
    const limit = Number.isSafeInteger(requestedLimit) && requestedLimit > 0 && requestedLimit <= 100 ? requestedLimit : 10;
    const start = (page - 1) * limit;
    return HttpResponse.json({ success: true, message: 'Success', data: { plans: filtered.slice(start, start + limit), total: filtered.length }, requestId: 'mock-membership-plans-list' });
  }),

  http.get(ManagerInfrastructureMockApiUrl(`${MANAGER_MEMBERSHIP_LIFECYCLE_API.BASE}/:id`), ({ params }) => {
    const plan = mockPlans.find(p => p.id === params.id);
    if (!plan) return HttpResponse.json({ success: false, message: 'Plan not found', data: null, errorCode: 'NOT_FOUND', statusCode: MANAGER_HTTP_STATUS.NOT_FOUND, requestId: 'mock-plan-not-found' }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
    return HttpResponse.json({ success: true, message: 'Success', data: plan, requestId: `mock-plan-${plan.id}` });
  }),

  http.post(ManagerInfrastructureMockApiUrl(MANAGER_MEMBERSHIP_LIFECYCLE_API.BASE), async ({ request }) => {
    const body = await request.json() as Partial<Plan>;
    const idem = beginIdempotency(request, body); if (idem.response) return idem.response;
    const newPlan = { ...mockPlans[0], ...body, id: `plan-${mockPlanIdCounter++}` } as Plan;
    mockPlans = [newPlan, ...mockPlans];
    const result = { success: true, message: 'Created', data: newPlan, requestId: `mock-plan-created-${newPlan.id}` }; rememberIdempotency(idem.scope, idem.fingerprint, result); return HttpResponse.json(result);
  }),

  http.patch(ManagerInfrastructureMockApiUrl(`${MANAGER_MEMBERSHIP_LIFECYCLE_API.BASE}/:id`), async ({ request, params }) => {
    const body = await request.json() as Partial<Plan>;
    const idem = beginIdempotency(request, { id: params.id, body }); if (idem.response) return idem.response;
    const idx = mockPlans.findIndex(p => p.id === params.id);
    if (idx === -1) return HttpResponse.json({ success: false, message: 'Not found', data: null, errorCode: 'NOT_FOUND', statusCode: MANAGER_HTTP_STATUS.NOT_FOUND, requestId: 'mock-plan-delete-not-found' }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
    mockPlans[idx] = { ...mockPlans[idx], ...body } as Plan;
    const result = { success: true, message: 'Updated', data: mockPlans[idx], requestId: `mock-plan-updated-${params.id}` }; rememberIdempotency(idem.scope, idem.fingerprint, result); return HttpResponse.json(result);
  }),

  http.delete(ManagerInfrastructureMockApiUrl(`${MANAGER_MEMBERSHIP_LIFECYCLE_API.BASE}/:id`), ({ params, request }) => {
    const idem = beginIdempotency(request, { id: params.id }); if (idem.response) return idem.response;
    const exists = mockPlans.some((plan) => plan.id === params.id);
    if (!exists) return HttpResponse.json({ success: false, message: 'Plan not found', data: null, errorCode: 'NOT_FOUND', statusCode: MANAGER_HTTP_STATUS.NOT_FOUND, requestId: 'mock-plan-delete-not-found' }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
    mockPlans = mockPlans.filter(p => p.id !== params.id);
    const result = { success: true, message: 'Removed', data: { id: params.id }, requestId: `mock-plan-deleted-${params.id}` }; rememberIdempotency(idem.scope, idem.fingerprint, result); return HttpResponse.json(result);
  }),
];
