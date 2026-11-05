import { describe, expect, it } from 'vitest';

import { ManagerFinancePaymentsAndSummaryQueryKeys } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/api/manager_finance_payments_and_summary.query_keys';

describe('manager_finance query-key namespace', () => {
  it('uses a stable, feature-specific root for every cache entry', () => {
    expect(ManagerFinancePaymentsAndSummaryQueryKeys.all).toEqual(['manager_finance']);
  });
});
