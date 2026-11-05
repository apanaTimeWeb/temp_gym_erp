// RESPONSIBILITY: Owns canonical initial/default values for module form state.
import { MANAGER_EXPENSE_REGISTER_AND_REPORTING_STATUS_VALUES } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/constants/manager_expense_register_and_reporting.constants';
import type { ExpenseFormValues } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/types/manager_expense_register_and_reporting_form.types';

export const EMPTY_EXPENSE_FORM: ExpenseFormValues = {
  title: '', category: 'Miscellaneous', amount: 0, date: '', status: MANAGER_EXPENSE_REGISTER_AND_REPORTING_STATUS_VALUES.PENDING, referenceNo: '', notes: '', receiptUrl: '',
};
