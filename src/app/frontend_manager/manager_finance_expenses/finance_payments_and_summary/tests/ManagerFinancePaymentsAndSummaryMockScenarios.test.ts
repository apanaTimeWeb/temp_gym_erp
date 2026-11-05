// RESPONSIBILITY: Guards the required eight-state mock catalog for finance_payments_and_summary.
import { describe, expect, it } from 'vitest';
import { MANAGERFINANCEPAYMENTSANDSUMMARY_MOCK_SCENARIOS } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/mocks/scenarios/ManagerFinancePaymentsAndSummaryMockScenarios';

describe('ManagerFinancePaymentsAndSummary mock scenario catalog', () => {
  it('declares all required transport and UI states', () => {
    expect(Object.keys(MANAGERFINANCEPAYMENTSANDSUMMARY_MOCK_SCENARIOS)).toEqual(['ACTIVE', 'EMPTY', 'SERVER_500', 'TIMEOUT', 'UNAUTHORIZED', 'INVALID', 'CANCELLED', 'RETRY']);
  });
});
