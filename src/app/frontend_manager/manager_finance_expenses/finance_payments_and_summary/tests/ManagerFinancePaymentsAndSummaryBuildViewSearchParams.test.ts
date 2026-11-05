import { describe, expect, it } from 'vitest';
import { ManagerFinancePaymentsAndSummaryBuildViewSearchParams } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/utils/ManagerFinancePaymentsAndSummaryBuildViewSearchParams';

describe('Manager Finance view URL updates', () => {
  it('preserves unrelated filters and pagination while replacing the legacy tab key', () => {
    const params = new URLSearchParams(ManagerFinancePaymentsAndSummaryBuildViewSearchParams('tab=Summary&range=last_30_days&page=3&status=paid', 'summary'));
    expect(params.get('view')).toBe('summary');
    expect(params.get('tab')).toBeNull();
    expect(params.get('range')).toBe('last_30_days');
    expect(params.get('page')).toBe('3');
    expect(params.get('status')).toBe('paid');
  });
});
