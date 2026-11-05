// RESPONSIBILITY: Defines TypeScript interfaces and types for the Expenses module.
// CRITICAL additions: vendorName, paymentMode, approvedBy, isRecurring, recurringFrequency,
// taxAmount, categoryBreakdown — these are DB columns needed before backend is built.

import type { EXPENSE_STATUS_VALUES } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/constants/manager_expense_register_and_reporting_shared.constants';
export type ExpenseStatus = typeof EXPENSE_STATUS_VALUES[number];
export type ExpensePaymentMode = 'Cash' | 'UPI' | 'Card' | 'NetBanking' | 'Cheque' | 'Bank Transfer' | 'Other';
export type RecurringFrequency = 'Daily' | 'Weekly' | 'Monthly' | 'Yearly';

export interface Expense {
  id: string;
  title: string;
  category: string;
  amount: number;
  date: string;
  status: ExpenseStatus;
  referenceNo?: string;
  notes?: string;
  receiptUrl?: string;
  createdAt: string;
  updatedAt?: string;
  // CRITICAL — DB columns missing from original schema
  vendorName?: string;
  paymentMode?: ExpensePaymentMode;
  approvedBy?: string;
  isRecurring: boolean;
  recurringFrequency?: RecurringFrequency | null;
  taxAmount?: number;
}

export interface ExpenseStats {
  totalAmount: number;
  paidAmount: number;
  pendingAmount: number;
  thisMonthAmount: number;
}

/** Used for the category breakdown chart in the Expenses module. */
export interface ExpenseCategoryBreakdown {
  category: string;
  totalAmount: number;
  percentage: number;
  count: number;
}

export interface ManagerExpenseRegisterAndReportingViewModel {
  search: string; setSearch: (value: string) => void;
  statusFilter: string; setStatusFilter: (value: string) => void;
  currentPage: number; setCurrentPage: (value: number) => void;
  showModal: boolean; setShowModal: (value: boolean) => void;
  editId: string | null; editData: Partial<Expense> | null;
  openAdd: () => void; openEdit: (expense: Expense) => void;
  saveExpense: (data: Partial<Expense>, idempotencyKey: string) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
  markAsPaid: (id: string) => Promise<void>;
  exportExpenses: () => void;
  saving: boolean;
}

export type ManagerExpenseRegisterAndReportingViewId = 'view-expenses' | 'add-expense' | 'expense-report';
