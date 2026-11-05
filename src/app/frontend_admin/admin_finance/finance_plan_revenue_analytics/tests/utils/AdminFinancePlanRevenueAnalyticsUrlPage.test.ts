import { describe, expect, it } from 'vitest';
import { normalizeAdminFinancePlanRevenueAnalyticsUrlPage } from '@/app/frontend_admin/admin_finance/finance_plan_revenue_analytics/utils/AdminFinancePlanRevenueAnalyticsUrlPage';

describe('AdminFinancePlanRevenueAnalyticsUrlPage: strict pagination boundary', () => {
  it.each(['', '0', '-2', '1.5', '2abc', '1e3', '0x10', '01', 'Infinity', 'NaN', ' 4', '9007199254740992', '', null, undefined])(
    'rejects untrusted value %s', (value) => expect(normalizeAdminFinancePlanRevenueAnalyticsUrlPage(value)).toBe(1),
  );
  it('accepts canonical integers and bounds even safe large pages', () => {
    expect(normalizeAdminFinancePlanRevenueAnalyticsUrlPage('12')).toBe(12);
    expect(normalizeAdminFinancePlanRevenueAnalyticsUrlPage(12)).toBe(12);
    expect(normalizeAdminFinancePlanRevenueAnalyticsUrlPage('99999')).toBe(99999);
    expect(normalizeAdminFinancePlanRevenueAnalyticsUrlPage('100001')).toBe(100000);
    expect(normalizeAdminFinancePlanRevenueAnalyticsUrlPage(0.5)).toBe(1);
  });
});
