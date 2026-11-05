import { describe, expect, it } from 'vitest';
import { z } from 'zod';

import { MOCK_SUPERADMIN_ANALYTICS_REPORTS_REVENUE } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/mocks/fixtures/SuperadminAnalyticsReportsCenterMockFixtures';
import { SuperadminAnalyticsReportsCenterApiResponseSchema } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/schemas/superadmin_analytics_reports_center_api_response.schema';
import { RevenueRowSchema } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/schemas/superadmin_analytics_reports_center_contract.schemas';

describe('Superadmin Reports module fixture contract', () => {
  it('provides revenue rows accepted by the authoritative contract schema', () => {
    expect(MOCK_SUPERADMIN_ANALYTICS_REPORTS_REVENUE.length).toBeGreaterThan(0);
    for (const row of MOCK_SUPERADMIN_ANALYTICS_REPORTS_REVENUE) {
      expect(RevenueRowSchema.safeParse(row).success).toBe(true);
      expect(row.month).toEqual(expect.any(String));
      expect(Number.isInteger(row.mrr)).toBe(true);
      expect(Number.isInteger(row.newRevenue)).toBe(true);
      expect(Number.isInteger(row.cancelledRevenue)).toBe(true);
      expect(Number.isInteger(row.netRevenue)).toBe(true);
      expect(row.tenantCount).toEqual(expect.any(Number));
    }
  });
});
describe('Reports Center monetary minor-unit validation', () => {
  it('rejects fractional minor-unit revenue values', () => {
    expect(RevenueRowSchema.safeParse({ month: '2026-01', mrr: 100, newRevenue: 20, cancelledRevenue: 10, netRevenue: 10, tenantCount: 2 }).success).toBe(true);
    expect(RevenueRowSchema.safeParse({ month: '2026-01', mrr: 100.5, newRevenue: 20, cancelledRevenue: 10, netRevenue: 10, tenantCount: 2 }).success).toBe(false);
  });
});

describe('Analytics Reports API response envelope', () => {
  const schema = SuperadminAnalyticsReportsCenterApiResponseSchema(z.object({ id: z.string() }));
  it('accepts success data and failure without success payload', () => {
    expect(schema.safeParse({ success: true, message: 'ok', data: { id: 'report-1' }, requestId: 'req-1' }).success).toBe(true);
    expect(schema.safeParse({ success: false, message: 'unavailable', data: null, errorCode: 'SERVICE_UNAVAILABLE', statusCode: 503, requestId: 'req-1', error: 'service-down' }).success).toBe(true);
  });
  it('rejects invalid success and failure payload combinations', () => {
    expect(schema.safeParse({ success: true, message: 'missing data' }).success).toBe(false);
    expect(schema.safeParse({ success: false, message: 'failure', data: { id: 'report-1' } }).success).toBe(false);
  });
});
