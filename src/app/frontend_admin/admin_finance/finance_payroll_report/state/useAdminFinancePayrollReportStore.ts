// RESPONSIBILITY: Zustand store for Reports module UI state — active tab, date range, gym filter.
// DATA FLOW: user interaction → module-scoped UI state action → subscribing feature components (admin_finance/finance_payroll_report/state/useAdminFinancePayrollReportStore.ts)

import { create } from 'zustand';
import type { AdminFinancePayrollReportStore } from '@/app/frontend_admin/admin_finance/finance_payroll_report/types/AdminFinancePayrollReportStoreTypes';
/**
 * @description useAdminFinancePayrollReportStore: Zustand store for Reports module UI state — active tab, date range, gym filter.
 * @dependencies Consumes AdminReportsStoreTypes, AdminReportsTypes.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export const useAdminFinancePayrollReportStore = create<AdminFinancePayrollReportStore>((set) => ({
  dateRange: 'this_month',
  setDateRange: (range) => set({ dateRange: range }),
  startDate: '',
  endDate: '',
  setCustomDateRange: (startDate, endDate) => set({ startDate, endDate }),
  selectedGymId: 'all',
  setSelectedGymId: (id) => set({ selectedGymId: id }),
}));
