import { normalizeAdminBillingPlansCatalogMockPagination } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/utils/AdminBillingPlansCatalogMockPagination';
// RESPONSIBILITY: Owns MSW handlers for the Admin plans feature.
// DATA FLOW: plans API client → module-owned MSW handler → module-owned fixture → TanStack Query/UI.

import { StatusCodes } from 'http-status-codes';
import { http, HttpResponse } from 'msw';

import type { AdminPlansJsonObject, PlanRecord } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/types/AdminBillingPlansCatalogMockHandlerTypes';
/**
 * parseRequestBody is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
async function parseRequestBody(request: Request): Promise<unknown> {
  try { return await request.clone().json(); } catch { return undefined; }
}

/**
 * asRecord is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : {};
}

const ok = <T>(data: T, message = 'Success') =>
  HttpResponse.json({ success: true, message, data  , requestId: globalThis.crypto.randomUUID()});

const paged = <T>(data: T[], page: number, limit: number, message = 'Success') => {
  const safeLimit = Math.max(1, Math.min(100, limit));
  const totalPages = Math.max(1, Math.ceil(data.length / safeLimit));
  const safePage = Math.max(1, Math.min(page, totalPages));
  const start = (safePage - 1) * safeLimit;
  const pageData = data.slice(start, start + safeLimit);
  return HttpResponse.json({ success: true, message, data: pageData, meta: { total: data.length, page: safePage, limit: safeLimit, totalPages, hasNextPage: safePage < totalPages, hasPrevPage: safePage > 1 }  , requestId: globalThis.crypto.randomUUID()});
};

import { MOCK_ADMIN_PLANS } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/mocks/fixtures/AdminBillingPlansCatalogMockFixtures';


let plansState: PlanRecord[] = structuredClone(MOCK_ADMIN_PLANS);
let planSequence = 0;
export const resetAdminPlansMockState = () => { plansState = structuredClone(MOCK_ADMIN_PLANS); planSequence = 0; };

/**
 * toNumber is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
function toNumber(value: unknown, fallback = 0): number { const n = Number(value); return Number.isFinite(n) ? n : fallback; }

/**
 * buildPlanRecord is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
function buildPlanRecord(input: Record<string, unknown>): PlanRecord {
  return {
    id: `p-demo-${++planSequence}`,
    name: String(input.name ?? 'New Plan'),
    tier: String(input.tier ?? 'Bronze'),
    price1Month: toNumber(input.price1Month),
    price3Month: toNumber(input.price3Month),
    price6Month: toNumber(input.price6Month),
    price12Month: toNumber(input.price12Month),
    priceCustom: input.priceCustom !== undefined ? toNumber(input.priceCustom) : undefined,
    features: Array.isArray(input.features) ? (input.features as string[]) : [],
    isActive: input.isActive === undefined ? true : Boolean(input.isActive),
    freezeAllowed: input.freezeAllowed === undefined ? false : Boolean(input.freezeAllowed),
    joiningFee: input.joiningFee !== undefined ? toNumber(input.joiningFee) : undefined,
    ptSessionsIncluded: input.ptSessionsIncluded !== undefined ? toNumber(input.ptSessionsIncluded) : undefined,
    taxRate: input.taxRate !== undefined ? toNumber(input.taxRate) : undefined,
  };
}

/**
 * applyPlanUpdate is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
function applyPlanUpdate(record: PlanRecord, input: Record<string, unknown>): PlanRecord {
  return {
    ...record,
    name: input.name !== undefined ? String(input.name) : record.name,
    tier: input.tier !== undefined ? String(input.tier) : record.tier,
    price1Month: input.price1Month !== undefined ? toNumber(input.price1Month, record.price1Month) : record.price1Month,
    price3Month: input.price3Month !== undefined ? toNumber(input.price3Month, record.price3Month) : record.price3Month,
    price6Month: input.price6Month !== undefined ? toNumber(input.price6Month, record.price6Month) : record.price6Month,
    price12Month: input.price12Month !== undefined ? toNumber(input.price12Month, record.price12Month) : record.price12Month,
    priceCustom: input.priceCustom !== undefined ? toNumber(input.priceCustom, record.priceCustom) : record.priceCustom,
    features: Array.isArray(input.features) ? (input.features as string[]) : record.features,
    isActive: input.isActive !== undefined ? Boolean(input.isActive) : record.isActive,
    freezeAllowed: input.freezeAllowed !== undefined ? Boolean(input.freezeAllowed) : record.freezeAllowed,
    joiningFee: input.joiningFee !== undefined ? toNumber(input.joiningFee) : record.joiningFee,
    ptSessionsIncluded: input.ptSessionsIncluded !== undefined ? toNumber(input.ptSessionsIncluded) : record.ptSessionsIncluded,
    taxRate: input.taxRate !== undefined ? toNumber(input.taxRate) : record.taxRate,
  };
}

export const adminPlansMockHandlers = [
  http.get('*/admin/plans/fetchAllPlans', ({ request }) => {
    const url = new URL(request.url);
    const search = (url.searchParams.get('search') ?? '').trim().toLowerCase();
    const tier = url.searchParams.get('tier');
    const page = normalizeAdminBillingPlansCatalogMockPagination(url.searchParams.get('page'), 1);
    const limit = normalizeAdminBillingPlansCatalogMockPagination(url.searchParams.get('limit'), 10);
    const filtered = plansState.filter((plan) =>
      (!search || plan.name.toLowerCase().includes(search)) &&
      (!tier || tier === 'All' || plan.tier === tier),
    );
    return paged(filtered, page, limit);
  }),
  http.get('*/admin/plans/fetchPlanById', async ({ request }) => {
    const body = asRecord(await parseRequestBody(request));
    const record = plansState.find((p) => p.id === String(body.id));
    if (!record) return HttpResponse.json({ errorCode: 'ADMIN_API_NOT_FOUND', statusCode: StatusCodes.NOT_FOUND, requestId: globalThis.crypto.randomUUID(), success: false, message: 'Plan not found', data: null }, { status: StatusCodes.NOT_FOUND });
    return ok(record);
  }),
  http.post('*/admin/plans/createPlan', async ({ request }) => {
    const record = buildPlanRecord(asRecord(await parseRequestBody(request)));
    plansState.push(record);
    return ok(record, 'Plan created');
  }),
  http.post('*/admin/plans/updatePlan', async ({ request }) => {
    const body = asRecord(await parseRequestBody(request));
    const index = plansState.findIndex((p) => p.id === String(body.id));
    if (index === -1) return HttpResponse.json({ data: null, errorCode: 'ADMIN_API_NOT_FOUND', statusCode: StatusCodes.NOT_FOUND, requestId: globalThis.crypto.randomUUID(), success: false, message: 'Plan not found' }, { status: StatusCodes.NOT_FOUND });
    const updated = applyPlanUpdate(plansState[index]!, body);
    plansState[index] = updated;
    return ok(updated, 'Plan updated');
  }),
  http.delete('*/admin/plans/deletePlan', async ({ request }) => {
    const body = asRecord(await parseRequestBody(request));
    const index = plansState.findIndex((p) => p.id === String(body.id));
    if (index === -1) return HttpResponse.json({ data: null, errorCode: 'ADMIN_API_NOT_FOUND', statusCode: StatusCodes.NOT_FOUND, requestId: globalThis.crypto.randomUUID(), success: false, message: 'Plan not found' }, { status: StatusCodes.NOT_FOUND });
    plansState.splice(index, 1);
    return ok(null, 'Plan deleted');
  }),
  http.head('*/admin/plans/__mock-reset', () => { resetAdminPlansMockState(); return new HttpResponse(null, { status: StatusCodes.NO_CONTENT }); })
];
