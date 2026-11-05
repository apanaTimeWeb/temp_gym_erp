// RESPONSIBILITY: Provides the implementation for AdminFinanceTypes.ts functionality within its module.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_finance/finance_summary/types/AdminFinanceOverviewTypes.ts)

import type { QueryStatus } from '@tanstack/react-query';
import { FINANCE_PAYMENT_STATUSES } from '@/app/frontend_admin/admin_finance/finance_summary/constants/AdminFinanceSummaryConstants';


export type AdminFinanceExpenseUrlParamKey = 'expenseCategory' | 'expensePage';
export type AdminFinancePaymentMode = 'CASH' | 'UPI' | 'CARD' | 'ONLINE';
export type AdminFinancePaymentType = 'PAYMENT' | 'REFUND' | 'ADJUSTMENT';
export type FinancePaymentMethod = 'UPI' | 'Cash' | 'Card' | 'NetBanking';
export type FinancePaymentStatus = typeof FINANCE_PAYMENT_STATUSES[number];


export interface FinanceInitialData {
  payments: Payment[];
  totalPayments: number;
  summary: FinanceSummary | null;
}

export interface FinanceContextType {
  payments: Payment[];
  totalPayments: number;
  summary: FinanceSummary | null;
  status: QueryStatus;
  error: string;
  loadAll: () => Promise<void>;
  search: string;
  setSearch: (search: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  methodFilter: string;
  setMethodFilter: (method: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
}

export interface Payment {
  id: string; 
  memberId: string; 
  amount: number; 
  method: string;
  paymentMode?: AdminFinancePaymentMode;
  gstAmount?: number;
  taxRate?: number;
  invoiceNumber?: string;
  hsn_code?: string;
  planId?: string;
  type?: AdminFinancePaymentType;
  status: string; 
  notes?: string; 
  invoiceNo: string; 
  paidAt: string;
  member?: { name: string; email: string; phone: string; plan?: { name: string } };
  refundReason?: string;
  receiptNumber?: string;
  discountApplied?: number;
  couponCode?: string;
}
export interface FinanceSummary {
  totalRevenue: number; monthlyRevenue: number; pendingAmount: number;
  totalPayments: number;
  totalExpenses: number;
  netProfit: number;
  revenueByMethod: { UPI: number; Cash: number; Card: number; NetBanking: number };
  monthlyData: { month: string; revenue: number }[];
}

export interface Expense {
  id: string;
  amount: number;
  category: string;
  branchId: string;
  branchName?: string;
  date: string;
  notes?: string;
  recordedBy: string;
  vendor?: string;
  billNumber?: string;
  approvedBy?: string;
  receiptUrl?: string;
}
