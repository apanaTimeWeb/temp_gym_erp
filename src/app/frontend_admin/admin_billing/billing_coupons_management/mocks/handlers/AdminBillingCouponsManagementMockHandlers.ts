// RESPONSIBILITY: Owns MSW handlers for the Admin coupons feature.
// DATA FLOW: coupons API client → module-owned MSW handler → module-owned fixture → TanStack Query/UI.

import { COUPON_STATUS } from '@/app/frontend_admin/admin_billing/billing_coupons_management/constants/AdminBillingCouponsManagementConstants';
import { couponFormSchema, couponUpdatePayloadSchema } from '@/app/frontend_admin/admin_billing/billing_coupons_management/schemas/AdminBillingCouponsManagementSchemas';
import { StatusCodes } from 'http-status-codes';
import { adminBillingCouponsManagementSafeMockPage } from '@/app/frontend_admin/admin_billing/billing_coupons_management/utils/AdminBillingCouponsManagementMockPagination';
import { http, HttpResponse } from 'msw';

import type { AdminCouponsJsonObject, CouponRecord } from '@/app/frontend_admin/admin_billing/billing_coupons_management/types/AdminBillingCouponsManagementMockHandlerTypes';
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
  const safeLimit = Math.max(1, Math.min(limit, 100));
  const totalPages = Math.max(1, Math.ceil(data.length / safeLimit));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * safeLimit;
  const pageData = data.slice(start, start + safeLimit);
  return HttpResponse.json({ success: true, message, data: pageData, meta: { total: data.length, page: safePage, limit: safeLimit, totalPages, hasNextPage: safePage < totalPages, hasPrevPage: data.length > 0 && safePage > 1 }  , requestId: globalThis.crypto.randomUUID()});
};

import { getAdminCouponsMockState } from '@/app/frontend_admin/admin_billing/billing_coupons_management/mocks/fixtures/AdminBillingCouponsManagementMockState';

const gymNameById: Record<string, string> = { g1: 'Andheri East', g2: 'Bandra West', g3: 'Powai', g4: 'Thane' };
const b = { 1: 'Andheri East', 2: 'Bandra West', 3: 'Powai', 4: 'Thane' } as Record<string, string>;

/**
 * toNumber is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
function toNumber(value: unknown, fallback = 0): number { const n = Number(value); return Number.isFinite(n) ? n : fallback; }

/**
 * gymNamesFor is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
function gymNamesFor(ids: string[]): { ids: string[]; names: string[] } {
  const mapped = ids.map((id) => ({ id, name: id === 'all' ? 'All Gyms' : (gymNameById[id] ?? b[id.replace(/^b/, '')] ?? id) }));
  return { ids: mapped.map((g) => g.id), names: mapped.map((g) => g.name) };
}

/**
 * buildCouponRecord is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
function buildCouponRecord(input: Record<string, unknown>): CouponRecord {
  const gyms = Array.isArray(input.assignedGyms) ? (input.assignedGyms as string[]) : ['all'];
  const names = gymNamesFor(gyms);
  return {
    id: `c${globalThis.crypto.randomUUID()}`,
    code: String(input.code ?? 'NEWCODE'),
    description: String(input.description ?? ''),
    type: input.type === 'flat' ? 'flat' : 'percentage',
    value: toNumber(input.value),
    minOrderAmount: toNumber(input.minOrderAmount),
    maxDiscount: toNumber(input.maxDiscount),
    usageLimit: toNumber(input.usageLimit),
    usedCount: 0,
    assignedGyms: names.ids,
    assignedGymNames: names.names,
    validFrom: String(input.validFrom ?? '2026-01-01'),
    validUntil: String(input.validUntil ?? '2026-12-31'),
    status: COUPON_STATUS.ACTIVE,
    createdAt: new Date().toISOString(),
  };
}

/**
 * applyCouponUpdate is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
function applyCouponUpdate(record: CouponRecord, input: Record<string, unknown>): CouponRecord {
  const gyms = Array.isArray(input.assignedGyms) ? (input.assignedGyms as string[]) : record.assignedGyms;
  const names = gymNamesFor(gyms);
  return {
    ...record,
    code: input.code !== undefined ? String(input.code) : record.code,
    description: input.description !== undefined ? String(input.description) : record.description,
    type: input.type === 'flat' ? 'flat' : input.type === 'percentage' ? 'percentage' : record.type,
    value: input.value !== undefined ? toNumber(input.value, record.value) : record.value,
    minOrderAmount: input.minOrderAmount !== undefined ? toNumber(input.minOrderAmount, record.minOrderAmount) : record.minOrderAmount,
    maxDiscount: input.maxDiscount !== undefined ? toNumber(input.maxDiscount, record.maxDiscount) : record.maxDiscount,
    usageLimit: input.usageLimit !== undefined ? toNumber(input.usageLimit, record.usageLimit) : record.usageLimit,
    assignedGyms: names.ids,
    assignedGymNames: names.names,
    validFrom: input.validFrom !== undefined ? String(input.validFrom) : record.validFrom,
    validUntil: input.validUntil !== undefined ? String(input.validUntil) : record.validUntil,
  };
}

export const adminCouponsMockHandlers = [
  http.get('*/admin/coupons/kpis', () => {
    const records = getAdminCouponsMockState();
    const totalCoupons = records.length;
    const activeCoupons = records.filter((record) => record.status === COUPON_STATUS.ACTIVE && record.validUntil >= new Date().toISOString().slice(0, 10)).length;
    const totalRedeemed = records.reduce((total, record) => total + record.usedCount, 0);
    const revenueLost = records.reduce((total, record) => {
      const averageDiscount = record.type === 'flat' ? record.value : Math.min(record.value * 10, record.maxDiscount || record.value * 10);
      return total + record.usedCount * averageDiscount;
    }, 0);
    return ok({ totalCoupons, activeCoupons, totalRedeemed, revenueLost });
  }),
  http.get('*/admin/coupons', ({ request }) => {
    const url = new URL(request.url);
    const search = (url.searchParams.get('search') ?? '').trim().toLowerCase();
    const status = url.searchParams.get('status');
    const dateRange = url.searchParams.get('dateRange') ?? 'all_time';
    const startDate = url.searchParams.get('startDate') ?? '';
    const endDate = url.searchParams.get('endDate') ?? '';
    const today = new Date();
    const todayKey = today.toISOString().slice(0, 10);
    const weekStart = new Date(today);
    weekStart.setUTCDate(weekStart.getUTCDate() - 6);
    const weekStartKey = weekStart.toISOString().slice(0, 10);
    const monthStartKey = `${todayKey.slice(0, 7)}-01`;
    if (dateRange === 'custom' && (!/^\d{4}-\d{2}-\d{2}$/.test(startDate) || !/^\d{4}-\d{2}-\d{2}$/.test(endDate) || startDate > endDate)) {
      return HttpResponse.json({ errorCode: 'ADMIN_API_BAD_REQUEST', statusCode: StatusCodes.BAD_REQUEST, requestId: globalThis.crypto.randomUUID(), success: false, message: 'A valid custom date range is required.', data: null }, { status: StatusCodes.BAD_REQUEST });
    }
    const records = getAdminCouponsMockState();
    records.forEach((coupon) => { if (coupon.validUntil < todayKey) coupon.status = COUPON_STATUS.EXPIRED; });
    const filtered = records.filter((coupon) => {
      const matchesSearch = !search || `${coupon.code} ${coupon.description}`.toLowerCase().includes(search);
      const matchesStatus = !status || status === 'all' || coupon.status === status;
      let matchesRange = dateRange === 'all_time' || !dateRange;
      if (dateRange === 'today') matchesRange = coupon.validFrom <= todayKey && coupon.validUntil >= todayKey;
      else if (dateRange === 'this_week') matchesRange = coupon.validFrom <= todayKey && coupon.validUntil >= weekStartKey;
      else if (dateRange === 'this_month') matchesRange = coupon.validFrom <= todayKey && coupon.validUntil >= monthStartKey;
      else if (dateRange === 'custom') matchesRange = coupon.validFrom <= endDate && coupon.validUntil >= startDate;
      return matchesSearch && matchesStatus && matchesRange;
    });
    const page = adminBillingCouponsManagementSafeMockPage(url.searchParams.get('page'), 1);
    const limit = adminBillingCouponsManagementSafeMockPage(url.searchParams.get('limit'), 10);
    return paged(filtered, page, limit);
  }),
  http.post('*/admin/coupons', async ({ request }) => {
    const raw = await parseRequestBody(request);
    const parsed = couponFormSchema.safeParse(raw);
    if (!parsed.success) return HttpResponse.json({ data: null, errorCode: 'ADMIN_API_BAD_REQUEST', statusCode: StatusCodes.BAD_REQUEST, requestId: globalThis.crypto.randomUUID(), success: false, message: 'Invalid coupon payload' }, { status: StatusCodes.BAD_REQUEST });
    const record = buildCouponRecord({ ...parsed.data, value: Number(parsed.data.value), minOrderAmount: Number(parsed.data.minOrderAmount), maxDiscount: Number(parsed.data.maxDiscount), usageLimit: Number(parsed.data.usageLimit) });
    getAdminCouponsMockState().unshift(record);
    return ok(record, 'Coupon created');
  }),
  http.patch('*/admin/coupons/:id', async ({ request }) => {
    const raw = await parseRequestBody(request);
    const parsed = couponUpdatePayloadSchema.safeParse(raw);
    if (!parsed.success) return HttpResponse.json({ data: null, errorCode: 'ADMIN_API_BAD_REQUEST', statusCode: StatusCodes.BAD_REQUEST, requestId: globalThis.crypto.randomUUID(), success: false, message: 'Invalid coupon payload' }, { status: StatusCodes.BAD_REQUEST });
    const body = parsed.data as Record<string, unknown>;
    const id = decodeURIComponent(new URL(request.url).pathname.split('/').filter(Boolean).at(-1) ?? '');
    const index = getAdminCouponsMockState().findIndex((coupon) => coupon.id === id);
    if (index === -1) return HttpResponse.json({ data: null, errorCode: 'ADMIN_API_NOT_FOUND', statusCode: StatusCodes.NOT_FOUND, requestId: globalThis.crypto.randomUUID(), success: false, message: 'Coupon not found' }, { status: StatusCodes.NOT_FOUND });
    const target = getAdminCouponsMockState()[index]!;
    if (target.status === COUPON_STATUS.EXPIRED) return HttpResponse.json({ data: null, errorCode: 'ADMIN_API_CONFLICT', statusCode: StatusCodes.CONFLICT, requestId: globalThis.crypto.randomUUID(), success: false, message: 'Expired coupons cannot be edited' }, { status: StatusCodes.CONFLICT });
    const updated = applyCouponUpdate(target, body);
    // Keep lifecycle status unchanged; editing content must not silently reactivate an inactive coupon.
    getAdminCouponsMockState()[index] = updated;
    return ok(updated, 'Coupon updated');
  }),
  http.delete('*/admin/coupons/:id', ({ request }) => {
    const id = decodeURIComponent(new URL(request.url).pathname.split('/').filter(Boolean).at(-1) ?? '');
    const index = getAdminCouponsMockState().findIndex((coupon) => coupon.id === id);
    if (index === -1) return HttpResponse.json({ data: null, errorCode: 'ADMIN_API_NOT_FOUND', statusCode: StatusCodes.NOT_FOUND, requestId: globalThis.crypto.randomUUID(), success: false, message: 'Coupon not found' }, { status: StatusCodes.NOT_FOUND });
    getAdminCouponsMockState().splice(index, 1);
    return ok(null, 'Coupon deleted');
  }),
  http.patch('*/admin/coupons/:id/toggle', ({ request }) => {
    const id = decodeURIComponent(new URL(request.url).pathname.split('/').filter(Boolean).at(-2) ?? '');
    const record = getAdminCouponsMockState().find((coupon) => coupon.id === id);
    if (!record) return HttpResponse.json({ data: null, errorCode: 'ADMIN_API_NOT_FOUND', statusCode: StatusCodes.NOT_FOUND, requestId: globalThis.crypto.randomUUID(), success: false, message: 'Coupon not found' }, { status: StatusCodes.NOT_FOUND });
    if (record.status === COUPON_STATUS.EXPIRED) return HttpResponse.json({ data: null, errorCode: 'ADMIN_API_CONFLICT', statusCode: StatusCodes.CONFLICT, requestId: globalThis.crypto.randomUUID(), success: false, message: 'Expired coupons cannot be toggled' }, { status: StatusCodes.CONFLICT });
    record.status = record.status === COUPON_STATUS.ACTIVE ? COUPON_STATUS.INACTIVE : COUPON_STATUS.ACTIVE;
    return ok(record, 'Coupon status updated');
  })
];
