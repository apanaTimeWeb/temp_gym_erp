import {describe, expect, it, beforeEach} from 'vitest';

import { SUPERADMIN_BILLING_INVOICES_RECOVERY_CENTER_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/mocks/fixtures/SuperadminBillingInvoicesManagementV1MockFixtures';
import { resetSuperadminBillingInvoicesMockState } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/mocks/handlers/SuperadminBillingInvoicesManagementMockHandlers';
import { SuperadminBillingInvoicesV1ResponseSchema } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/schemas/superadmin_billing_invoices_management_v1_contract.schemas';
import { SuperadminBillingInvoicesV1DataSchema } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/schemas/superadmin_billing_invoices_management_v1_contract.schemas';

beforeEach(() => {
  resetSuperadminBillingInvoicesMockState();
});

describe('Legacy Recovery Center API-only fixture contract', () => {
    it('validates the supplied API fixture shape without claiming a rendered UI flow', () => {
        const result = SuperadminBillingInvoicesV1DataSchema.safeParse(SUPERADMIN_BILLING_INVOICES_RECOVERY_CENTER_MOCK_FIXTURE);
        expect(result.success).toBe(true);
    });
});
describe('Invoices V1 response discriminant', () => {
  it('accepts the complete success fixture and failure without data', () => {
    expect(SuperadminBillingInvoicesV1ResponseSchema.safeParse({ success: true, message: 'ok', data: SUPERADMIN_BILLING_INVOICES_RECOVERY_CENTER_MOCK_FIXTURE, requestId: 'req-1' }).success).toBe(true);
    expect(SuperadminBillingInvoicesV1ResponseSchema.safeParse({ success: false, message: 'unavailable', data: null, errorCode: 'UNAVAILABLE', statusCode: 503, requestId: 'req-2' }).success).toBe(true);
  });
  it('rejects a success branch without data and failure with object data', () => {
    expect(SuperadminBillingInvoicesV1ResponseSchema.safeParse({ success: true, message: 'missing data', requestId: 'req-3' }).success).toBe(false);
    expect(SuperadminBillingInvoicesV1ResponseSchema.safeParse({ success: false, message: 'failure', data: {}, errorCode: 'DOWN', statusCode: 500, requestId: 'req-4' }).success).toBe(false);
  });
});
