import { describe, expect, it } from 'vitest';

import { EXPENSE_CATEGORIES, EXPENSES_TABLE_HEADERS, EXPENSE_STATUS_LABELS, EXPENSE_STATUS_STYLES } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/constants/manager_expense_register_and_reporting_shared.constants';


describe('ManagerExpenseRegisterAndReportingSharedConstants', () => {
  it('exposes the documented expense categories', () => {
    expect(EXPENSE_CATEGORIES).toContain('Rent');
    expect(EXPENSE_CATEGORIES).toContain('Salary/Payroll');
  });

  it('keeps statuses and table columns aligned', () => {
    expect(EXPENSE_STATUS_LABELS.PAID).toBe('Paid');
    expect(EXPENSE_STATUS_STYLES.PENDING?.text).toBe('text-danger-text');
    expect(EXPENSES_TABLE_HEADERS).toEqual(['ID', 'Title', 'Category', 'Amount', 'Date', 'Status', 'Actions']);
  });
});
