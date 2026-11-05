// RESPONSIBILITY: Owns MSW handlers for the Admin Usage workflow.
// DATA FLOW: Usage API client → module-owned MSW handler → module-owned fixture/state → TanStack Query/UI.

import { adminUsageUpgradePayloadSchema } from '@/app/frontend_admin/admin_billing/billing_usage_analytics/schemas/AdminBillingUsageAnalyticsUpgradeSchemas';
import { USAGE_UPGRADE_REQUEST_STATUS } from '@/app/frontend_admin/admin_billing/billing_usage_analytics/constants/AdminBillingUsageAnalyticsConstants';
import { http, HttpResponse } from 'msw';
import { StatusCodes } from 'http-status-codes';
import { MOCK_ADMIN_USAGE_DATA } from '@/app/frontend_admin/admin_billing/billing_usage_analytics/mocks/fixtures/AdminBillingUsageAnalyticsMockFixtures';
import type { AdminUsageUpgradeRequest } from '@/app/frontend_admin/admin_billing/billing_usage_analytics/types/AdminBillingUsageAnalyticsUpgradeTypes';

let latestUpgradeRequest: AdminUsageUpgradeRequest | null = null;
const upgradeRequestsByIdempotencyKey = new Map<string, AdminUsageUpgradeRequest>();
let usageMockScenario: 'normal' | 'error' = 'normal';
export function setAdminUsageMockScenario(scenario: 'normal' | 'error'): void { usageMockScenario = scenario; }
/** Reset state between standalone mock runs without mutating immutable fixture data. */
export function resetAdminUsageMockState(): void {
  latestUpgradeRequest = null;
  upgradeRequestsByIdempotencyKey.clear();
  usageMockScenario = 'normal';
}

export const adminUsageMockHandlers = [
  http.get('*/admin/usage', () => { if (usageMockScenario === 'error') return HttpResponse.json({ data: null, errorCode: 'ADMIN_API_INTERNAL_SERVER_ERROR', statusCode: StatusCodes.INTERNAL_SERVER_ERROR, requestId: globalThis.crypto.randomUUID(), success: false, message: 'Usage data unavailable.' }, { status: StatusCodes.INTERNAL_SERVER_ERROR }); return HttpResponse.json({
    success: true,
    message: 'Usage data loaded',
    data: MOCK_ADMIN_USAGE_DATA,
   requestId: globalThis.crypto.randomUUID() }); }),
  http.post('*/admin/usage/upgrade-request', async ({ request }) => {
    const idempotencyKey = request.headers.get('Idempotency-Key');
    if (!idempotencyKey) return HttpResponse.json({ data: null, errorCode: 'ADMIN_API_BAD_REQUEST', statusCode: StatusCodes.BAD_REQUEST, requestId: globalThis.crypto.randomUUID(), success: false, message: 'Idempotency key required.' }, { status: StatusCodes.BAD_REQUEST });
    const existing = upgradeRequestsByIdempotencyKey.get(idempotencyKey);
    if (existing) return HttpResponse.json({ success: true, message: `Upgrade request for ${existing.planName} already recorded.`, data: existing , requestId: globalThis.crypto.randomUUID() });
    const parsed = adminUsageUpgradePayloadSchema.safeParse(await request.json().catch(() => null));
    if (!parsed.success) return HttpResponse.json({ data: null, errorCode: 'ADMIN_API_BAD_REQUEST', statusCode: StatusCodes.BAD_REQUEST, requestId: globalThis.crypto.randomUUID(), success: false, message: 'A valid plan tier must be selected.', validationErrors: parsed.error.issues.map((issue) => ({ field: issue.path.join('.'), message: issue.message })) }, { status: StatusCodes.BAD_REQUEST });
    const body: AdminUsageUpgradeRequest = {
      requestId: `upgrade-${globalThis.crypto.randomUUID()}`,
      planName: parsed.data.planName,
      status: USAGE_UPGRADE_REQUEST_STATUS.PENDING,
      requestedAt: new Date().toISOString(),
    };
    latestUpgradeRequest = body;
    upgradeRequestsByIdempotencyKey.set(idempotencyKey, body);
    return HttpResponse.json({ success: true, message: `Upgrade request for ${body.planName} sent to Superadmin.`, data: body , requestId: globalThis.crypto.randomUUID() });
  }),
];

/**
 * getAdminUsageMockUpgradeRequest is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
export function getAdminUsageMockUpgradeRequest(): AdminUsageUpgradeRequest | null {
  return latestUpgradeRequest;
}
