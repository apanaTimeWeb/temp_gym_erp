import { describe, expect, it } from 'vitest';

import { MOCK_SUPERADMIN_BILLING_USAGE_METERS } from '@/app/frontend_superadmin/superadmin_billing/billing_usage_meters_dashboard/mocks/fixtures/SuperadminBillingUsageMetersDashboardMockFixtures';



describe('Superadmin UsageMeters module fixture contract', () => {
  it('provides usage-meter records with measurable limits and consumption', () => {
    expect(Array.isArray(MOCK_SUPERADMIN_BILLING_USAGE_METERS)).toBe(true);
    expect(MOCK_SUPERADMIN_BILLING_USAGE_METERS.length).toBeGreaterThan(0);
    expect(MOCK_SUPERADMIN_BILLING_USAGE_METERS.every((meter) => Boolean(meter.id && meter.tenantName && typeof meter.smsSent === 'number' && typeof meter.smsLimit === 'number'))).toBe(true);
    expect(MOCK_SUPERADMIN_BILLING_USAGE_METERS.every((meter) => meter.smsLimit >= meter.smsSent)).toBe(true);
  });

});
