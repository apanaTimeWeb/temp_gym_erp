// RESPONSIBILITY: Verifies plan-revenue currency formatting never infers a missing currency code.
// DATA FLOW: API amount in integer minor units plus explicit ISO currency/locale → plan formatter → display string/fallback.

import { describe, expect, it } from 'vitest';
import { AdminPlansFormatCurrency } from '@/app/frontend_admin/admin_finance/finance_plan_revenue_analytics/utils/AdminFinancePlanRevenueAnalyticsFormatCurrency';

describe('AdminPlansFormatCurrency', () => {
  it('formats explicit currency and minor units', () => {
    expect(AdminPlansFormatCurrency(12345, 'USD', 'en-US')).toBe('$123.45');
  });

  it('returns a safe fallback for missing identity and invalid amount/currency', () => {
    expect(AdminPlansFormatCurrency(12345, undefined, 'en-US')).toBe('—');
    expect(AdminPlansFormatCurrency(12345, 'usd', 'en-US')).toBe('—');
    expect(AdminPlansFormatCurrency(1.5, 'USD', 'en-US')).toBe('—');
  });
});
