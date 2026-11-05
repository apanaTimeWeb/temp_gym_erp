import { StatusCodes } from 'http-status-codes';
import { http, HttpResponse, delay } from 'msw';

import { SUPERADMIN_BILLING_COUPONS_MANAGEMENT_API } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/config/superadmin_billing_coupons_management.url_config';
import { SUPERADMIN_COUPON_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/constants/superadmin_billing_coupons_management.constants';
import { MOCK_SUPERADMIN_BILLING_COUPONS } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/mocks/fixtures/SuperadminBillingCouponsManagementMockFixtures';
import { CouponStatusSchema, CouponApiPayloadSchema, CouponUpdatePayloadSchema } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/schemas/superadmin_billing_coupons_management_contract.schemas';
import { formatSuperadminCouponDateForInput } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/utils/SuperadminBillingCouponsManagementDateUtils';

import type { Coupon, RedemptionRecord } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/types/superadmin_billing_coupons_management.types';
import type { ApiResponse } from '@/lib/api';


/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminBillingCouponsMockHandlers owned by the superadmin_coupons feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: http-status-codes, msw, @/app/frontend_superadmin/superadmin_billing/billing_coupons_management/mocks/fixtures/SuperadminBillingCouponsManagementMockFixtures, @/app/frontend_superadmin/superadmin_billing/billing_coupons_management/constants/superadmin_billing_coupons_management.constants, @/app/frontend_superadmin/superadmin_billing/billing_coupons_management/schemas/superadmin_billing_coupons_management_contract.schemas, @/app/frontend_superadmin/superadmin_billing/billing_coupons_management/config/superadmin_billing_coupons_management.url_config, @/app/frontend_superadmin/superadmin_billing/billing_coupons_management/utils/SuperadminBillingCouponsManagementDateUtils, @/app/frontend_superadmin/superadmin_billing/billing_coupons_management/types/superadmin_billing_coupons_management.types, @/lib/api
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */


const BASE_URL = `*${SUPERADMIN_BILLING_COUPONS_MANAGEMENT_API.BASE}`;
let mockCoupons: Coupon[] = [...MOCK_SUPERADMIN_BILLING_COUPONS];
export function resetSuperadminBillingCouponsMockState(): void { mockCoupons = MOCK_SUPERADMIN_BILLING_COUPONS.map((coupon) => ({ ...coupon, redemptions: coupon.redemptions ? [...coupon.redemptions] : [] })); }
export const superadminCouponsHandlers = [
    http.get(BASE_URL, async ({ request }) => {
        await delay(400);
        const url = new URL(request.url);
        const requestedPage = url.searchParams.get('page');
        const requestedLimit = url.searchParams.get('limit');
        const page = Math.max(1, Number(requestedPage) || 1);
        const limit = Math.max(1, Number(requestedLimit) || 20);
        const search = url.searchParams.get('search')?.toLowerCase() || '';
        const status = url.searchParams.get('status') ?? url.searchParams.get('statusFilter');
        let filtered = status === SUPERADMIN_COUPON_STATUS_CODES.DELETED ? mockCoupons.filter(c => c.isDeleted) : mockCoupons.filter(c => !c.isDeleted);
        if (search) {
            filtered = filtered.filter(c => c.code?.toLowerCase().includes(search) ||
                c.id?.toLowerCase().includes(search));
        }
        if (status && status !== SUPERADMIN_COUPON_STATUS_CODES.ALL && status !== SUPERADMIN_COUPON_STATUS_CODES.DELETED) {
            filtered = filtered.filter(c => c.status === status);
        }
        const startDate = url.searchParams.get('startDate');
        const endDate = url.searchParams.get('endDate');
        const range = url.searchParams.get('range');
        if (startDate || endDate || range === 'custom') filtered = filtered.filter((coupon) => (!startDate || coupon.expiryDate >= startDate) && (!endDate || coupon.expiryDate <= endDate));
        const total = filtered.length;
        const paginated = requestedPage !== null || requestedLimit !== null ? filtered.slice((page - 1) * limit, page * limit) : filtered;
        return HttpResponse.json<ApiResponse<Coupon[]>>({
            success: true,
            message: 'Success',
            data: paginated,
            meta: { total, page, limit, totalPages: Math.ceil(total / limit), hasNextPage: page < (Math.ceil(total / limit)), hasPrevPage: page > 1},
            requestId: crypto.randomUUID(),
        });
    }),
    http.post(BASE_URL, async ({ request }) => {
        await delay(500);
        const raw = await request.json();
        const candidate = typeof raw === 'object' && raw !== null ? raw as Record<string, unknown> : {};
        const payload = { ...candidate, code: typeof candidate.code === 'string' && candidate.code.trim() ? candidate.code.trim() : `COUPON-${crypto.randomUUID().replace(/-/g, '').slice(0, 10).toUpperCase()}` };
        const parsed = CouponApiPayloadSchema.safeParse(payload);
        if (!parsed.success) return HttpResponse.json<ApiResponse<Coupon> | ApiResponse<null>>({ success: false, message: 'Invalid coupon payload', data: null, errorCode: 'VALIDATION_ERROR', statusCode: StatusCodes.BAD_REQUEST, requestId: crypto.randomUUID()}, { status: StatusCodes.BAD_REQUEST });
        const body = parsed.data;
        const newCoupon: Coupon = {
            ...body,
            id: `c${Date.now()}`,
            currentUses: 0,
            status: SUPERADMIN_COUPON_STATUS_CODES.ACTIVE,
            isDeleted: false,
            code: body.code || `NEW${Date.now()}`,
            discountType: body.discountType || 'PERCENTAGE',
            discountValue: body.discountValue || 10,
            maxUses: body.maxUses || 100,
            expiryDate: body.expiryDate || formatSuperadminCouponDateForInput(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()),
            redemptions: [],
        };
        mockCoupons = [newCoupon, ...mockCoupons];
        return HttpResponse.json<ApiResponse<Coupon> | ApiResponse<null>>({
            success: true,
            message: 'Created',
            data: newCoupon,
            requestId: crypto.randomUUID(),
        });
    }),
    http.patch(`${BASE_URL}/:id`, async ({ params, request }) => {
        await delay(500);
        const id = params.id as string;
        const raw = await request.json();
        const parsed = CouponUpdatePayloadSchema.safeParse(raw);
        if (!parsed.success) return HttpResponse.json<ApiResponse<Coupon> | ApiResponse<null>>({ success: false, message: 'Invalid coupon update payload', data: null, errorCode: 'VALIDATION_ERROR', statusCode: StatusCodes.BAD_REQUEST, requestId: crypto.randomUUID()}, { status: StatusCodes.BAD_REQUEST });
        const body = parsed.data;
        let updated: Coupon | null = null;
        mockCoupons = mockCoupons.map(c => {
            if (c.id === id) {
                const next: Coupon = { ...c, ...body };
                updated = next;
                return next;
            }
            return c;
        });
        if (!updated) {
            return HttpResponse.json<ApiResponse<Coupon> | ApiResponse<null>>({ success: false, message: 'Not found', data: null, errorCode: 'NOT_FOUND', statusCode: StatusCodes.NOT_FOUND, requestId: crypto.randomUUID()}, { status: StatusCodes.NOT_FOUND });
        }
        return HttpResponse.json<ApiResponse<Coupon> | ApiResponse<null>>({
            success: true,
            message: 'Updated',
            data: updated,
            requestId: crypto.randomUUID(),
        });
    }),
    http.post(`${BASE_URL}/:id/restore`, async ({ params }) => {
        await delay(350);
        const id = String(params.id);
        let restored: Coupon | null = null;
        mockCoupons = mockCoupons.map((coupon) => coupon.id === id ? (restored = { ...coupon, isDeleted: false, status: coupon.status === SUPERADMIN_COUPON_STATUS_CODES.EXPIRED ? SUPERADMIN_COUPON_STATUS_CODES.ACTIVE : coupon.status }) : coupon);
        if (!restored) return HttpResponse.json<ApiResponse<Coupon> | ApiResponse<null>>({ success: false, message: 'Not found', data: null, errorCode: 'NOT_FOUND', statusCode: StatusCodes.NOT_FOUND, requestId: crypto.randomUUID()}, { status: StatusCodes.NOT_FOUND });
        return HttpResponse.json<ApiResponse<Coupon> | ApiResponse<null>>({ success: true, message: 'Coupon restored', data: restored, requestId: crypto.randomUUID()});
    }),
    http.patch(`${BASE_URL}/:id/status`, async ({ params, request }) => {
        await delay(300);
        const id = String(params.id);
        const raw = await request.json();
        const statusResult = typeof raw === 'object' && raw !== null && 'status' in raw ? CouponStatusSchema.safeParse((raw as { status: unknown }).status) : { success: false } as const;
        if (!statusResult.success || (statusResult.data !== SUPERADMIN_COUPON_STATUS_CODES.ACTIVE && statusResult.data !== SUPERADMIN_COUPON_STATUS_CODES.INACTIVE)) return HttpResponse.json<ApiResponse<Coupon> | ApiResponse<null>>({ success: false, message: 'Invalid coupon status', data: null, errorCode: 'VALIDATION_ERROR', statusCode: StatusCodes.BAD_REQUEST, requestId: crypto.randomUUID()}, { status: StatusCodes.BAD_REQUEST });
        let updated: Coupon | null = null;
        const nextStatus = statusResult.data;
        mockCoupons = mockCoupons.map((coupon) => coupon.id === id ? (updated = { ...coupon, status: nextStatus }) : coupon);
        if (!updated) return HttpResponse.json<ApiResponse<Coupon> | ApiResponse<null>>({ success: false, message: 'Not found', data: null, errorCode: 'NOT_FOUND', statusCode: StatusCodes.NOT_FOUND, requestId: crypto.randomUUID()}, { status: StatusCodes.NOT_FOUND });
        return HttpResponse.json<ApiResponse<Coupon> | ApiResponse<null>>({ success: true, message: 'Coupon status updated', data: updated, requestId: crypto.randomUUID()});
    }),
    http.get(`${BASE_URL}/:id/redemptions`, async ({ params }) => {
        await delay(250);
        const id = String(params.id);
        const coupon = mockCoupons.find((item) => item.id === id);
        if (!coupon) return HttpResponse.json<ApiResponse<RedemptionRecord[]> | ApiResponse<null>>({ success: false, message: 'Not found', data: null, errorCode: 'NOT_FOUND', statusCode: StatusCodes.NOT_FOUND, requestId: crypto.randomUUID()}, { status: StatusCodes.NOT_FOUND });
        return HttpResponse.json<ApiResponse<RedemptionRecord[]> | ApiResponse<null>>({ success: true, message: 'Coupon redemptions loaded', data: coupon.redemptions ?? [], requestId: crypto.randomUUID()});
    }),
    http.delete(`${BASE_URL}/:id`, async ({ params }) => {
        await delay(400);
        const id = params.id as string;
        let updated: Coupon | null = null;
        mockCoupons = mockCoupons.map((coupon) => coupon.id === id ? (updated = { ...coupon, isDeleted: true }) : coupon);
        if (!updated) return HttpResponse.json<ApiResponse<null>>({ success: false, message: 'Not found', data: null, errorCode: 'NOT_FOUND', statusCode: StatusCodes.NOT_FOUND, requestId: crypto.randomUUID()}, { status: StatusCodes.NOT_FOUND });
        return HttpResponse.json<ApiResponse<null>>({ success: true, message: 'Deleted', data: null, requestId: crypto.randomUUID()});
    }),
];
