import { describe, expect, it } from 'vitest';
import { formatSuperadminUsageMeterBillingDate } from '@/app/frontend_superadmin/superadmin_billing/billing_usage_meters_dashboard/utils/SuperadminBillingUsageMetersDashboardDateFormatter';

describe('formatSuperadminUsageMeterBillingDate', () => {
  it('formats valid calendar dates and falls back for invalid values', () => {
    expect(formatSuperadminUsageMeterBillingDate('2026-10-01', 'en', 'Unavailable')).toBe('Oct 1, 2026');
    expect(formatSuperadminUsageMeterBillingDate('invalid', 'en', 'Unavailable')).toBe('Unavailable');
  });
});
