import { describe, expect, it } from 'vitest';

import { SUPERADMIN_ANALYTICS_DATE_FILTER_OPTIONS } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/constants/superadmin_analytics_dashboard_date_filter.constants';
import { SUPERADMIN_ANALYTICS_DATE_RANGES } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/constants/superadmin_analytics_dashboard_date_range.constants';

describe('Superadmin Analytics date-filter contract', () => {
  it('keeps the dropdown option set identical to the accepted date-range enum', () => {
    const optionValues = SUPERADMIN_ANALYTICS_DATE_FILTER_OPTIONS.map(({ value }) => value);
    expect(optionValues).toEqual([...SUPERADMIN_ANALYTICS_DATE_RANGES]);
    expect(new Set(optionValues).size).toBe(optionValues.length);
    expect(SUPERADMIN_ANALYTICS_DATE_FILTER_OPTIONS.every(({ labelKey }) => labelKey.startsWith('ui.date_'))).toBe(true);
  });
});
