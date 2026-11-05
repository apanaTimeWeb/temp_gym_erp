import { MANAGER_EXPENSE_REGISTER_AND_REPORTING_STATUS_VALUES } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/constants/manager_expense_register_and_reporting.constants';
import type { Expense, ExpenseStats } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/types/manager_expense_register_and_reporting.types';

/**
 * @description Provides the ManagerExpenseRegisterAndReportingMockData implementation for the expenses module.
 * @dependencies @/app/frontend_manager/manager_finance_expenses/manager_expenses_types/ManagerExpenseRegisterAndReportingTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const MOCK_EXPENSES_LIST: Expense[] = [
  {
    id: '1',
    title: 'Electricity Bill - August',
    category: 'Electricity',
    amount: 1250000,
    date: new Date().toISOString().split('T')[0] || '',
    status: MANAGER_EXPENSE_REGISTER_AND_REPORTING_STATUS_VALUES.PAID,
    paymentMode: 'NetBanking',
    vendorName: 'State Electricity Board',
    createdAt: new Date().toISOString(),
    isRecurring: true,
    recurringFrequency: 'Monthly' },
  {
    id: '2',
    title: 'Gym Equipment Maintenance',
    category: 'Equipment Maintenance',
    amount: 800000,
    date: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0] || '',
    status: MANAGER_EXPENSE_REGISTER_AND_REPORTING_STATUS_VALUES.PAID,
    paymentMode: 'Card',
    vendorName: 'FitTech Services',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    isRecurring: false },
  {
    id: '3',
    title: 'Cleaning Supplies',
    category: 'Office Supplies',
    amount: 350000,
    date: new Date(Date.now() - 86400000 * 5).toISOString().split('T')[0] || '',
    status: MANAGER_EXPENSE_REGISTER_AND_REPORTING_STATUS_VALUES.PENDING,
    paymentMode: 'Cash',
    vendorName: 'Local Market',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    isRecurring: true,
    recurringFrequency: 'Weekly' },
  {
    id: '4',
    title: 'Facebook Ads Campaign',
    category: 'Marketing',
    amount: 1500000,
    date: new Date(Date.now() - 86400000 * 10).toISOString().split('T')[0] || '',
    status: MANAGER_EXPENSE_REGISTER_AND_REPORTING_STATUS_VALUES.PAID,
    paymentMode: 'Card',
    vendorName: 'Meta',
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    isRecurring: false },
  {
    id: '5',
    title: 'Trainer Certifications',
    category: 'Miscellaneous',
    amount: 2500000,
    date: new Date(Date.now() - 86400000 * 15).toISOString().split('T')[0] || '',
    status: MANAGER_EXPENSE_REGISTER_AND_REPORTING_STATUS_VALUES.PENDING,
    paymentMode: 'Bank Transfer',
    vendorName: 'ACE Fitness',
    createdAt: new Date(Date.now() - 86400000 * 15).toISOString(),
    isRecurring: false }
];

/** Derives summary values from the same fixture collection consumed by the list handler. */
export function getManagerExpenseMockStats(expenses: Expense[] = MOCK_EXPENSES_LIST): ExpenseStats {
  const today = new Date();
  const currentMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const paidAmount = expenses.filter((expense) => expense.status === MANAGER_EXPENSE_REGISTER_AND_REPORTING_STATUS_VALUES.PAID).reduce((sum, expense) => sum + expense.amount, 0);
  const pendingAmount = expenses.filter((expense) => expense.status === MANAGER_EXPENSE_REGISTER_AND_REPORTING_STATUS_VALUES.PENDING).reduce((sum, expense) => sum + expense.amount, 0);
  const thisMonthAmount = expenses.filter((expense) => expense.date.slice(0, 7) === currentMonth).reduce((sum, expense) => sum + expense.amount, 0);
  return { totalAmount, paidAmount, pendingAmount, thisMonthAmount };
}

export const MOCK_EXPENSES_STATS: ExpenseStats = getManagerExpenseMockStats();
