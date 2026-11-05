import { describe, expect, it } from 'vitest';

import { formatUsageStorage, getPercentage, getProgressColor, isValidUsageDate } from '@/app/frontend_superadmin/superadmin_billing/billing_usage_meters_dashboard/utils/SuperadminBillingUsageMetersDashboardUtils';



describe('SuperadminBillingUsageMetersUtils', () => {
  it('maps usage thresholds to semantic progress colors', () => {
    expect(getProgressColor(95, 100)).toBe('fill-danger');
    expect(getProgressColor(80, 100)).toBe('fill-warning');
    expect(getProgressColor(40, 100)).toBe('fill-primary');
    expect(getProgressColor(0, 0)).toBe('fill-primary');
  });

  it('clamps usage percentage to the documented 0–100 range', () => {
    expect(getPercentage(50, 100)).toBe(50);
    expect(getPercentage(200, 100)).toBe(100);
    expect(getPercentage(-20, 100)).toBe(0);
    expect(getPercentage(1, 0)).toBe(0);
  });

  it('accepts only real ISO calendar dates from URL state', () => {
    expect(isValidUsageDate('2026-10-11')).toBe(true);
    expect(isValidUsageDate('2026-02-30')).toBe(false);
    expect(isValidUsageDate('11-10-2026')).toBe(false);
    expect(isValidUsageDate('')).toBe(false);
  });

  it('formats storage through the module formatter', () => {
    expect(formatUsageStorage(12.345)).toContain('12.35');
  });
});
