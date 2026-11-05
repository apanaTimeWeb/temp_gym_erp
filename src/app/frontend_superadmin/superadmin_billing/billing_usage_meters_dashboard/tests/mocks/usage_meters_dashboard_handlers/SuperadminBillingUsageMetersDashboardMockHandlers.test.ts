import { describe, expect, it } from 'vitest';

import { MOCK_SUPERADMIN_BILLING_USAGE_METERS } from '@/app/frontend_superadmin/superadmin_billing/billing_usage_meters_dashboard/mocks/fixtures/SuperadminBillingUsageMetersDashboardMockFixtures';
import { filterSuperadminBillingUsageMetersByDateRange } from '@/app/frontend_superadmin/superadmin_billing/billing_usage_meters_dashboard/mocks/handlers/SuperadminBillingUsageMetersDashboardMockHandlers';


describe('filterSuperadminBillingUsageMetersByDateRange', () => {
  it('filters using the supplied custom interval', () => {
    const result = filterSuperadminBillingUsageMetersByDateRange(MOCK_SUPERADMIN_BILLING_USAGE_METERS, new URLSearchParams({ range: 'custom', from: '2026-10-01', to: '2026-10-03' }));
    expect(result.map((meter) => meter.id)).toEqual(['um5']);
  });
  it('returns an empty result for an inverted range', () => {
    expect(filterSuperadminBillingUsageMetersByDateRange(MOCK_SUPERADMIN_BILLING_USAGE_METERS, new URLSearchParams({ range: 'custom', from: '2026-10-03', to: '2026-10-01' }))).toEqual([]);
  });
  it('applies the current month-to-date preset deterministically', () => {
    const result = filterSuperadminBillingUsageMetersByDateRange(MOCK_SUPERADMIN_BILLING_USAGE_METERS, new URLSearchParams({ range: 'this_month' }), new Date('2026-10-15T12:00:00Z'));
    expect(result.map((meter) => meter.id)).toEqual(['um5']);
  });
  it('excludes records dated after today from the month-to-date mock range', () => {
    const futureMeter = { ...MOCK_SUPERADMIN_BILLING_USAGE_METERS[4], billingCycleEnd: '2026-10-20' };
    expect(filterSuperadminBillingUsageMetersByDateRange([futureMeter], new URLSearchParams({ range: 'this_month' }), new Date('2026-10-15T12:00:00Z'))).toEqual([]);
  });
});
