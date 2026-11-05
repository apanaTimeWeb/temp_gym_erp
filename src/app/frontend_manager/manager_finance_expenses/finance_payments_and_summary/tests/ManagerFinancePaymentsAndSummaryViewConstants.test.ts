import { describe, expect, it } from 'vitest';
import { MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_VIEW_IDS } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/constants/manager_finance_payments_and_summary_view.constants';
import { resolveManagerFinancePaymentsAndSummaryView } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/utils/ManagerFinancePaymentsAndSummaryResolveView';

describe('Manager Finance URL view contract', () => {
  it('exposes unique canonical screen IDs', () => {
    expect(MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_VIEW_IDS).toEqual(['payments', 'summary']);
    expect(new Set(MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_VIEW_IDS).size).toBe(MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_VIEW_IDS.length);
  });
  it.each([['payments', null, 'payments'], ['summary', null, 'summary'], ['unknown', null, 'payments'], [null, 'Summary', 'summary'], [null, 'Payments', 'payments'], [null, null, 'payments']] as const)('resolves view=%s legacyTab=%s', (view, legacyTab, expected) => {
    expect(resolveManagerFinancePaymentsAndSummaryView(view, legacyTab)).toBe(expected);
  });
});
