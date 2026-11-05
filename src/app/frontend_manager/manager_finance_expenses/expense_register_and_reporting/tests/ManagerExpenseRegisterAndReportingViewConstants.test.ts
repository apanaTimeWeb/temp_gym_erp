import { describe, expect, it } from 'vitest';

import { resolveManagerExpenseRegisterAndReportingView } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/utils/ManagerExpenseRegisterAndReportingResolveView';
describe('Manager Expenses view URL contract', () => { it.each(['view-expenses','add-expense','expense-report'])('accepts %s', (view) => expect(resolveManagerExpenseRegisterAndReportingView(view)).toBe(view)); it('defaults invalid values safely', () => expect(resolveManagerExpenseRegisterAndReportingView('invalid')).toBe('view-expenses')); });
