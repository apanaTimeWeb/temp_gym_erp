// RESPONSIBILITY: Provides the implementation for manager_finance_payments_and_summary.types.ts functionality within its module.
// Includes Indian GST compliance fields: gstAmount, discountAmount, couponCode on Payment,
// and gstCollected, totalRefunds on FinanceSummary.

import type { ManagerToastType } from '@/components/ui/manager_toast/ManagerToastTypes';

import type { FINANCE_PAYMENT_STATUS_VALUES } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/constants/manager_finance_payments_and_summary_shared.constants';
export type PaymentStatus = typeof FINANCE_PAYMENT_STATUS_VALUES[number];
export type ManagerFinancePaymentsAndSummaryExportFormat = 'csv' | 'pdf';
export type PaymentMethod = 'UPI' | 'Cash' | 'Card' | 'NetBanking' | 'Cheque' | 'Other';

export interface FinanceInitialData {
  payments: Payment[];
  totalPayments: number;
  summary: FinanceSummary | null;
}

export interface ManagerFinancePaymentsAndSummaryViewModel {
  payments: Payment[];
  totalPayments: number;
  summary: FinanceSummary | null;
  isPending: boolean;
  isError: boolean;
  errorMessage: string;
  saving: boolean;
  error: string;
  toast: { message: string; type: ManagerToastType } | null;
  showToast: (msg: string, t: ManagerToastType) => void;
  hideToast: () => void;
  loadAll: () => Promise<void>;
  showModal: boolean;
  setShowModal: (show: boolean) => boolean | void;
  search: string;
  setSearch: (s: string) => void;
  currentPage: number;
  setCurrentPage: (p: number) => void;
  // GST / Date-range filtering (CRITICAL)
  startDate: string;
  endDate: string;
  setDateRange: (start: string, end: string) => void;
  // Export
  exportPayments: (format: ManagerFinancePaymentsAndSummaryExportFormat) => void;
}

// ─── Payment ─────────────────────────────────────────────────────────────────
export interface Payment {
  id: string;
  memberId: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  notes?: string;
  invoiceNumber: string;
  receiptNumber?: string;
  taxId?: string;
  paidAt: string;
  // Indian GST compliance fields (CRITICAL — DB columns)
  gstAmount: number;
  discountAmount: number;
  couponCode?: string;
  taxableAmount: number;
  member?: { name: string; email: string; phone: string; plan?: { name: string } };
}

// ─── Finance Summary ──────────────────────────────────────────────────────────
export interface FinanceSummary {
  totalRevenue: number;
  monthlyRevenue: number;
  pendingAmount: number;
  totalPayments: number;
  // Indian GST compliance fields (CRITICAL — DB columns)
  gstCollected: number;
  totalRefunds: number;
  netRevenue: number;
  revenueByMethod: Record<PaymentMethod, number>;
  monthlyData: { month: string; revenue: number; expenses?: number }[];
}

export type ManagerFinancePaymentsAndSummaryDateRange = 'this_month' | 'last_month' | 'last_3_months' | 'last_6_months' | 'this_year' | 'monthly' | 'yearly' | 'custom';
