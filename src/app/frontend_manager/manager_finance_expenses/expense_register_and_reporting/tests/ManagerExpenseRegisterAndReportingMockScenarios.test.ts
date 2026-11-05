// RESPONSIBILITY: Guards the required eight-state mock catalog for expense_register_and_reporting.
import { describe, expect, it } from 'vitest';
import { MANAGEREXPENSESMANAGEMENT_MOCK_SCENARIOS } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/mocks/scenarios/ManagerExpenseRegisterAndReportingMockScenarios';

describe('ManagerExpenseRegisterAndReporting mock scenario catalog', () => {
  it('declares all required transport and UI states', () => {
    expect(Object.keys(MANAGEREXPENSESMANAGEMENT_MOCK_SCENARIOS)).toEqual(['ACTIVE', 'EMPTY', 'SERVER_500', 'TIMEOUT', 'UNAUTHORIZED', 'INVALID', 'CANCELLED', 'RETRY']);
  });
});
