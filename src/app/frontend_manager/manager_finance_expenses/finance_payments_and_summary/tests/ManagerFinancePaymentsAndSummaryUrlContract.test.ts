import { MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_API } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/config/manager_finance_payments_and_summary.url_config';
import { describe, expect, it } from 'vitest';



describe('manager_finance API URL contract', () => {
  it('matches the feature API contract for EXPORT', () => { expect(MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_API.EXPORT).toBe("/api/v1/manager/finance/export"); });
  it('matches the feature API contract for PAYMENTS_BASE', () => { expect(MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_API.PAYMENTS_BASE).toBe("/api/v1/manager/finance/payments"); });
  it('matches the feature API contract for PAYMENTS_BY_MEMBER', () => { expect(MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_API.PAYMENTS_BY_MEMBER('sample-id')).toBe("/api/v1/manager/finance/payments/member/sample-id"); });
  it('matches the feature API contract for SUMMARY', () => { expect(MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_API.SUMMARY).toBe("/api/v1/manager/finance/summary"); });
});
