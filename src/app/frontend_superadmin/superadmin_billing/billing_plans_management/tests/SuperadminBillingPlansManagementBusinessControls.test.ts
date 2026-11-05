import {describe, expect, it, beforeEach} from 'vitest';

import { SUPERADMIN_BILLING_PLANS_BUSINESS_CONTROLS_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/mocks/fixtures/SuperadminBillingPlansManagementV1MockFixtures';
import { resetSuperadminBillingPlansMockState } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/mocks/handlers/SuperadminBillingPlansManagementMockHandlers';
import { SuperadminBillingPlansV1ResponseSchema } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/schemas/superadmin_billing_plans_management_v1_contract.schemas';
import { SuperadminBillingPlansV1DataSchema } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/schemas/superadmin_billing_plans_management_v1_contract.schemas';

beforeEach(() => {
  resetSuperadminBillingPlansMockState();
});

describe('Plan Comparison & Pricing Control contract', () => {
    it('accepts the complete module fixture', () => {
        const result = SuperadminBillingPlansV1DataSchema.safeParse(SUPERADMIN_BILLING_PLANS_BUSINESS_CONTROLS_MOCK_FIXTURE);
        expect(result.success).toBe(true);
    });
});
describe('Billing Plans V1 response discriminant', () => {
  it('accepts the complete success fixture and failure without data', () => {
    expect(SuperadminBillingPlansV1ResponseSchema.safeParse({ success: true, message: 'ok', data: SUPERADMIN_BILLING_PLANS_BUSINESS_CONTROLS_MOCK_FIXTURE, requestId: 'test-request' }).success).toBe(true);
    expect(SuperadminBillingPlansV1ResponseSchema.safeParse({ success: false, message: 'unavailable', data: null, errorCode: 'UNAVAILABLE', requestId: 'test-request', statusCode: 503 }).success).toBe(true);
  });
  it('rejects a success branch without data and failure with object data', () => {
    expect(SuperadminBillingPlansV1ResponseSchema.safeParse({ success: true, message: 'missing data' }).success).toBe(false);
    expect(SuperadminBillingPlansV1ResponseSchema.safeParse({ success: false, message: 'failure', data: {} }).success).toBe(false);
  });
});
