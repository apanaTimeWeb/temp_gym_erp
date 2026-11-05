import type { ManagerToastType } from '@/components/ui/manager_toast/ManagerToastTypes';

import type { ManagerFinancePaymentsAndSummaryViewId } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/types/manager_finance_payments_and_summary_view.types';
import type { Payment, FinanceSummary } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/types/manager_finance_payments_and_summary.types';


export interface ManagerFinancePaymentsAndSummaryViewModel {
  tab: ManagerFinancePaymentsAndSummaryViewId;
  setTab: (tab: ManagerFinancePaymentsAndSummaryViewId) => void;
  search: string;
  setSearch: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  methodFilter: string;
  setMethodFilter: (value: string) => void;
  currentPage: number;
  setCurrentPage: (value: number) => void;
  startDate: string;
  setStartDate: (value: string) => void;
  endDate: string;
  setEndDate: (value: string) => void;
  payments: Payment[];
  summary: FinanceSummary | null;
  totalPayments: number;
  isPending: boolean;
  isError: boolean;
  errorMessage: string;
  reload: () => void;
  exportCSV: () => void;
  exportPDF: () => void;
  printReceipt: (id: string) => void;
  toast: { message: string; type: ManagerToastType } | null;
  showToast: (message: string, type: ManagerToastType) => void;
  hideToast: () => void;
}
