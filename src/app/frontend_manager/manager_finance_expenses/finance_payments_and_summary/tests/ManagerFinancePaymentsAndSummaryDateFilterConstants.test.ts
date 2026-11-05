import { describe, expect, it } from 'vitest';

import { MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_DATE_RANGE_OPTIONS } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/constants/manager_finance_payments_and_summary_date_filter.constants';


describe('ManagerFinancePaymentsAndSummaryDateFilterConstants', () => {
  it('exports deterministic feature configuration', () => {
  expect(MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_DATE_RANGE_OPTIONS).toBeDefined();
  });
});
