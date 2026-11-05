import { StatusCodes } from 'http-status-codes';
import { http, HttpResponse, delay } from 'msw';

import { SUPERADMIN_AFFILIATES_MANAGEMENT_API } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/config/superadmin_affiliates_management.url_config';
import { SUPERADMIN_AFFILIATE_STATUS_CODES, SUPERADMIN_AFFILIATE_ALL_FILTER } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/constants/superadmin_affiliates_management.constants';
import { MOCK_SUPERADMIN_AFFILIATES } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/mocks/fixtures/SuperadminAffiliatesManagementMockFixtures';
import { MOCK_SUPERADMIN_AFFILIATE_PAYOUT_HISTORY } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/mocks/fixtures/SuperadminAffiliatesManagementPayoutHistoryMockFixtures';
import { AffiliateSchema } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/schemas/superadmin_affiliates_management_types.schemas';

import type { Affiliate, AffiliatePayoutRecord } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/types/superadmin_affiliates_management.types';
import type { ApiResponse } from '@/lib/api';


/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminAffiliatesMockHandlers owned by the superadmin_affiliates feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: http-status-codes, msw, @/app/frontend_superadmin/superadmin_affiliates/affiliates_management/mocks/fixtures/SuperadminAffiliatesManagementMockFixtures, @/app/frontend_superadmin/superadmin_affiliates/affiliates_management/schemas/superadmin_affiliates_management_types.schemas, @/app/frontend_superadmin/superadmin_affiliates/affiliates_management/constants/superadmin_affiliates_management.constants, @/app/frontend_superadmin/superadmin_affiliates/affiliates_management/mocks/fixtures/SuperadminAffiliatesManagementPayoutHistoryMockFixtures, @/app/frontend_superadmin/superadmin_affiliates/affiliates_management/config/superadmin_affiliates_management.url_config, @/app/frontend_superadmin/superadmin_affiliates/affiliates_management/types/superadmin_affiliates_management.types, @/lib/api
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Owns MSW handlers for Superadmin affiliate list and mutation contracts.


const BASE_URL = SUPERADMIN_AFFILIATES_MANAGEMENT_API.BASE;
let mockAffiliates: Affiliate[] = [...MOCK_SUPERADMIN_AFFILIATES];
let mockPayoutHistory: AffiliatePayoutRecord[] = [...MOCK_SUPERADMIN_AFFILIATE_PAYOUT_HISTORY];

export function resetSuperadminAffiliatesMockState(): void {
  mockAffiliates = [...MOCK_SUPERADMIN_AFFILIATES];
  mockPayoutHistory = [...MOCK_SUPERADMIN_AFFILIATE_PAYOUT_HISTORY];
}

export const superadminAffiliatesHandlers = [
  http.get('*' + BASE_URL, async ({ request }) => {
    await delay(400);
    const url = new URL(request.url);
    const requestedPage = Number(url.searchParams.get('page'));
    const requestedLimit = Number(url.searchParams.get('limit'));
    const page = Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;
    const limit = Number.isInteger(requestedLimit) && requestedLimit > 0 ? requestedLimit : 10;
    const search = url.searchParams.get('search')?.toLowerCase() || '';
    const status = url.searchParams.get('status');
    let filtered = [...mockAffiliates];
    if (search) {
      filtered = filtered.filter((affiliate) => affiliate.name.toLowerCase().includes(search) || affiliate.email.toLowerCase().includes(search) || affiliate.referralCode.toLowerCase().includes(search));
    }
    if (status && status !== SUPERADMIN_AFFILIATE_ALL_FILTER) filtered = filtered.filter((affiliate) => affiliate.status === status);
    const startDate = url.searchParams.get('startDate');
    const endDate = url.searchParams.get('endDate');
    if (startDate || endDate) {
      filtered = filtered.filter((affiliate) => {
        const joined = affiliate.joinedAt.slice(0, 10);
        return (!startDate || joined >= startDate) && (!endDate || joined <= endDate);
      });
    }
    const total = filtered.length;
    const paginated = filtered.slice((page - 1) * limit, page * limit);
    return HttpResponse.json<ApiResponse<Affiliate[]>>({ success: true, message: 'Success', data: paginated, meta: { total, page, limit, totalPages: Math.ceil(total / limit), hasNextPage: page < (Math.ceil(total / limit)), hasPrevPage: page > 1}, requestId: crypto.randomUUID()});
  }),
  http.post('*' + BASE_URL, async ({ request }) => {
    await delay(500);
    const raw = await request.json();
    const parsed = AffiliateSchema.safeParse(raw);
    if (!parsed.success) return HttpResponse.json<ApiResponse<Affiliate> | ApiResponse<null>>({ success: false, message: 'Invalid affiliate payload', data: null, errorCode: 'VALIDATION_ERROR', statusCode: StatusCodes.BAD_REQUEST, requestId: crypto.randomUUID()}, { status: StatusCodes.BAD_REQUEST });
    const { bankDetails, ...restParsedData } = parsed.data;
    const newAffiliate: Affiliate = {
      ...restParsedData,
      id: `a${Date.now()}`,
      totalReferred: 0,
      commissionEarned: 0,
      pendingPayout: 0,
      status: SUPERADMIN_AFFILIATE_STATUS_CODES.ACTIVE,
      joinedAt: new Date().toISOString(),
      phone: '',
      currency: parsed.data.currency || 'INR',
      commissionRate: 10,
      referralCount: 0,
      conversionRate: 0,
      bankDetails: bankDetails ? JSON.stringify(bankDetails) : undefined,
    };
    mockAffiliates = [newAffiliate, ...mockAffiliates];
    return HttpResponse.json<ApiResponse<Affiliate> | ApiResponse<null>>({ success: true, message: 'Affiliate created successfully', data: newAffiliate, requestId: crypto.randomUUID()});
  }),
  http.patch('*' + `${BASE_URL}/:id`, async ({ params, request }) => {
    await delay(500);
    const raw = await request.json();
    if (typeof raw !== 'object' || raw === null) return HttpResponse.json<ApiResponse<Affiliate> | ApiResponse<null>>({ success: false, message: 'Invalid affiliate payload', data: null, errorCode: 'VALIDATION_ERROR', statusCode: StatusCodes.BAD_REQUEST, requestId: crypto.randomUUID()}, { status: StatusCodes.BAD_REQUEST });
    const parsed = AffiliateSchema.partial().safeParse(raw);
    if (!parsed.success) return HttpResponse.json<ApiResponse<Affiliate> | ApiResponse<null>>({ success: false, message: 'Invalid affiliate payload', data: null, errorCode: 'VALIDATION_ERROR', statusCode: StatusCodes.BAD_REQUEST, requestId: crypto.randomUUID()}, { status: StatusCodes.BAD_REQUEST });
    const id = String(params.id);
    let updatedAffiliate: Affiliate | null = null;
    mockAffiliates = mockAffiliates.map((affiliate) => {
      if (affiliate.id === id) {
        const { bankDetails, ...restParsedData } = parsed.data;
        updatedAffiliate = {
          ...affiliate,
          ...restParsedData,
        };
        if (bankDetails !== undefined) {
          updatedAffiliate.bankDetails = bankDetails ? JSON.stringify(bankDetails) : undefined;
        }
        return updatedAffiliate;
      }
      return affiliate;
    });
    if (!updatedAffiliate) return HttpResponse.json<ApiResponse<Affiliate> | ApiResponse<null>>({ success: false, message: 'Not found', data: null, errorCode: 'NOT_FOUND', statusCode: StatusCodes.NOT_FOUND, requestId: crypto.randomUUID()}, { status: StatusCodes.NOT_FOUND });
    return HttpResponse.json<ApiResponse<Affiliate> | ApiResponse<null>>({ success: true, message: 'Affiliate updated', data: updatedAffiliate, requestId: crypto.randomUUID()});
  }),
  http.patch('*' + `${BASE_URL}/:id/status`, async ({ params, request }) => {
    await delay(300);
    const raw = await request.json();
    if (typeof raw !== 'object' || raw === null || !('status' in raw)) return HttpResponse.json<ApiResponse<Affiliate> | ApiResponse<null>>({ success: false, message: 'Invalid status payload', data: null, errorCode: 'VALIDATION_ERROR', statusCode: StatusCodes.BAD_REQUEST, requestId: crypto.randomUUID()}, { status: StatusCodes.BAD_REQUEST });
    const status = (raw as { status: unknown }).status;
    if (status !== SUPERADMIN_AFFILIATE_STATUS_CODES.ACTIVE && status !== SUPERADMIN_AFFILIATE_STATUS_CODES.INACTIVE) return HttpResponse.json<ApiResponse<Affiliate> | ApiResponse<null>>({ success: false, message: 'Invalid status', data: null, errorCode: 'VALIDATION_ERROR', statusCode: StatusCodes.BAD_REQUEST, requestId: crypto.randomUUID()}, { status: StatusCodes.BAD_REQUEST });
    const id = String(params.id);
    let updatedAffiliate: Affiliate | null = null;
    mockAffiliates = mockAffiliates.map((affiliate) => affiliate.id === id ? (updatedAffiliate = { ...affiliate, status }) : affiliate);
    if (!updatedAffiliate) return HttpResponse.json<ApiResponse<Affiliate> | ApiResponse<null>>({ success: false, message: 'Not found', data: null, errorCode: 'NOT_FOUND', statusCode: StatusCodes.NOT_FOUND, requestId: crypto.randomUUID()}, { status: StatusCodes.NOT_FOUND });
    return HttpResponse.json<ApiResponse<Affiliate> | ApiResponse<null>>({ success: true, message: 'Status updated', data: updatedAffiliate, requestId: crypto.randomUUID()});
  }),
  http.delete('*' + `${BASE_URL}/:id`, async ({ params }) => {
    await delay(400);
    const id = String(params.id);
    const exists = mockAffiliates.some((affiliate) => affiliate.id === id);
    if (!exists) return HttpResponse.json<ApiResponse<null>>({ success: false, message: 'Not found', data: null, errorCode: 'NOT_FOUND', statusCode: StatusCodes.NOT_FOUND, requestId: crypto.randomUUID()}, { status: StatusCodes.NOT_FOUND });
    mockAffiliates = mockAffiliates.filter((affiliate) => affiliate.id !== id);
    return HttpResponse.json<ApiResponse<null>>({ success: true, message: 'Deleted successfully', data: null, requestId: crypto.randomUUID()});
  }),
  http.post('*' + `${BASE_URL}/:id/pay`, async ({ params }) => {
    await delay(600);
    const id = String(params.id);
    const affiliate = mockAffiliates.find((item) => item.id === id);
    if (!affiliate) return HttpResponse.json<ApiResponse<Affiliate> | ApiResponse<null>>({ success: false, message: 'Not found', data: null, errorCode: 'NOT_FOUND', statusCode: StatusCodes.NOT_FOUND, requestId: crypto.randomUUID()}, { status: StatusCodes.NOT_FOUND });
    if (!Number.isFinite(affiliate.pendingPayout) || (affiliate.pendingPayout ?? 0) <= 0) return HttpResponse.json<ApiResponse<Affiliate> | ApiResponse<null>>({ success: false, message: 'No pending commission is available to pay.', data: null, errorCode: 'CONFLICT', statusCode: StatusCodes.CONFLICT, requestId: crypto.randomUUID()}, { status: StatusCodes.CONFLICT });
    const amount = affiliate.pendingPayout;
    const updatedAffiliate = { ...affiliate, pendingPayout: 0 };
    mockAffiliates = mockAffiliates.map((item) => item.id === id ? updatedAffiliate : item);
    mockPayoutHistory = [{ id: `p-${Date.now()}`, affiliateId: id, affiliateName: affiliate.name, amount, currency: affiliate.currency || 'INR', method: 'BANK_TRANSFER', referenceId: `REF-${id}-${Date.now()}`, status: 'COMPLETED', paidAt: new Date().toISOString() } as AffiliatePayoutRecord, ...mockPayoutHistory];
    return HttpResponse.json<ApiResponse<Affiliate>>({ success: true, message: 'Commission paid successfully', data: updatedAffiliate, requestId: crypto.randomUUID()});
  }),
  http.get('*' + `${BASE_URL}/payout-history`, async () => {
    await delay(300);
    return HttpResponse.json<ApiResponse<AffiliatePayoutRecord[]>>({ success: true, message: 'Affiliate payout history loaded', data: mockPayoutHistory, requestId: crypto.randomUUID()});
  }),
];
