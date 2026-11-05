import { describe, expect, it } from 'vitest';
import { normalizeAdminFinancePlanRevenueAnalyticsMockPagination } from '@/app/frontend_admin/admin_finance/finance_plan_revenue_analytics/utils/AdminFinancePlanRevenueAnalyticsMockPagination';

describe('AdminFinancePlanRevenueAnalytics mock HTTP pagination', () => {
  it('retains valid positive integer pagination and existing default values', () => {
    expect(normalizeAdminFinancePlanRevenueAnalyticsMockPagination(null, 10)).toBe(10);
    expect(normalizeAdminFinancePlanRevenueAnalyticsMockPagination('2', 1)).toBe(2);
    expect(normalizeAdminFinancePlanRevenueAnalyticsMockPagination('3', 8)).toBe(3);
  });
  it('rejects malformed values without unsafe offsets or infinite metadata', () => {
    for (const raw of ['0', '-1', '1.5', '1e5', 'Infinity', 'NaN', '', ' 2 ', '9007199254740992']) {
      expect(normalizeAdminFinancePlanRevenueAnalyticsMockPagination(raw, 8)).toBe(8);
    }
  });
});
