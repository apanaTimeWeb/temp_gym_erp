// RESPONSIBILITY: Zustand store for Reports module UI state — active tab, date range, gym filter.
// DATA FLOW: user interaction → module-scoped UI state action → subscribing feature components (admin_finance/finance_revenue_report/state/useAdminFinanceRevenueReportStore.ts)

import { create } from 'zustand';
import type { AdminFinanceRevenueReportStore } from '@/app/frontend_admin/admin_finance/finance_revenue_report/types/AdminFinanceRevenueReportStoreTypes';
/**
 * @description useAdminFinanceRevenueReportStore: Zustand store for Reports module UI state — active tab, date range, gym filter.
 * @dependencies Consumes AdminReportsStoreTypes, AdminReportsTypes.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export const useAdminFinanceRevenueReportStore = create<AdminFinanceRevenueReportStore>((set) => ({
  dateRange: 'this_month',
  setDateRange: (range) => set({ dateRange: range }),
  startDate: '',
  endDate: '',
  setCustomDateRange: (startDate, endDate) => set({ startDate, endDate }),
  selectedGymId: 'all',
  setSelectedGymId: (id) => set({ selectedGymId: id }),
}));
