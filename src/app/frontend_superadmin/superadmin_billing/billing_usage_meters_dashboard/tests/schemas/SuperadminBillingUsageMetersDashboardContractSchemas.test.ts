import { describe, expect, it } from 'vitest';

import { MOCK_SUPERADMIN_BILLING_USAGE_METERS } from '@/app/frontend_superadmin/superadmin_billing/billing_usage_meters_dashboard/mocks/fixtures/SuperadminBillingUsageMetersDashboardMockFixtures';
import { UsageMeterSchema } from '@/app/frontend_superadmin/superadmin_billing/billing_usage_meters_dashboard/schemas/superadmin_billing_usage_meters_dashboard_contract.schemas';


describe('UsageMeterSchema', () => {
  it('accepts every module-owned fixture', () => {
    for (const meter of MOCK_SUPERADMIN_BILLING_USAGE_METERS) expect(UsageMeterSchema.safeParse(meter).success).toBe(true);
  });
  it('rejects negative usage values and invalid billing-cycle dates', () => {
    expect(UsageMeterSchema.safeParse({ ...MOCK_SUPERADMIN_BILLING_USAGE_METERS[0], smsSent: -1 }).success).toBe(false);
    expect(UsageMeterSchema.safeParse({ ...MOCK_SUPERADMIN_BILLING_USAGE_METERS[0], billingCycleEnd: '2026-02-30' }).success).toBe(false);
    expect(UsageMeterSchema.safeParse({ ...MOCK_SUPERADMIN_BILLING_USAGE_METERS[0], billingCycleEnd: 'next month' }).success).toBe(false);
  });
});
