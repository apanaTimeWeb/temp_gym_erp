import { describe, expect, it } from 'vitest';

import { FINANCE_METHOD_STYLES, FINANCE_PAYMENT_METHODS, FINANCE_STATUS_STYLES, FINANCE_TABS, PAYMENTS_TABLE_HEADERS } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/constants/manager_finance_payments_and_summary_shared.constants';


describe('ManagerFinancePaymentsAndSummarySharedConstants', () => {
  it('keeps payment modes and status styles complete', () => {
    expect(FINANCE_PAYMENT_METHODS).toEqual(['UPI', 'Cash', 'Card', 'NetBanking', 'Cheque', 'Other']);
    expect(FINANCE_STATUS_STYLES.PENDING?.text).toBe('text-warning-text');
    expect(FINANCE_STATUS_STYLES.PARTIAL?.text).toBe('text-warning-text');
    expect(FINANCE_METHOD_STYLES.UPI?.text).toBe('text-primary');
    expect(FINANCE_STATUS_STYLES.PAID?.text).toBe('text-success-text');
  });

  it('keeps finance tabs and table columns stable', () => {
    expect(FINANCE_TABS).toEqual(['payments', 'summary']);
    expect(PAYMENTS_TABLE_HEADERS).toHaveLength(8);
  });
});
