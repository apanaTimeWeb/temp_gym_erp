import { MANAGER_EXPENSE_REGISTER_AND_REPORTING_API } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/config/manager_expense_register_and_reporting.url_config';
import { describe, expect, it } from 'vitest';



describe('manager_expenses API URL contract', () => {
  it('matches the feature API contract for BASE', () => { expect(MANAGER_EXPENSE_REGISTER_AND_REPORTING_API.BASE).toBe("/api/v1/manager/expenses"); });
  it('matches the feature API contract for GET_ONE', () => { expect(MANAGER_EXPENSE_REGISTER_AND_REPORTING_API.GET_ONE('sample-id')).toBe("/api/v1/manager/expenses/sample-id"); });
  it('matches the feature API contract for STATS', () => { expect(MANAGER_EXPENSE_REGISTER_AND_REPORTING_API.STATS).toBe("/api/v1/manager/expenses/stats"); });
});
