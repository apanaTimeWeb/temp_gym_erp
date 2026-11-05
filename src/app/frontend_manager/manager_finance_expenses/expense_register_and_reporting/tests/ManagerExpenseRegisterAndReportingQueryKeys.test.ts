import { describe, expect, it } from 'vitest';

import { ManagerExpenseRegisterAndReportingQueryKeys } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/api/manager_expense_register_and_reporting.query_keys';

describe('manager_expenses query-key namespace', () => {
  it('uses a stable, feature-specific root for every cache entry', () => {
    expect(ManagerExpenseRegisterAndReportingQueryKeys.all).toEqual(['manager_expenses']);
  });
});
