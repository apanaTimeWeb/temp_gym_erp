// RESPONSIBILITY: Verifies the date-range options consumed by the Usage Meters URL/query boundary.
import { describe, expect, it } from 'vitest';

import { SUPERADMIN_BILLING_USAGE_METERS_DATE_RANGE_OPTIONS } from '@/app/frontend_superadmin/superadmin_billing/billing_usage_meters_dashboard/constants/superadmin_billing_usage_meters_dashboard.constants';

describe('SUPERADMIN_BILLING_USAGE_METERS_DATE_RANGE_OPTIONS', () => {
  it('defines supported values and feature-owned translation keys', () => {
    expect(SUPERADMIN_BILLING_USAGE_METERS_DATE_RANGE_OPTIONS.map(({ value }) => value)).toEqual(['this_week', 'this_month', 'custom']);
    expect(SUPERADMIN_BILLING_USAGE_METERS_DATE_RANGE_OPTIONS.every(({ labelKey }) => labelKey.startsWith('ui.date_range_'))).toBe(true);
  });
});
