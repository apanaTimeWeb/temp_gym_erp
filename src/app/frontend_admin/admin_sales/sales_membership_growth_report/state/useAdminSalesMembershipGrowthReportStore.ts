// RESPONSIBILITY: Zustand store for Reports module UI state — active tab, date range, gym filter.
// DATA FLOW: user interaction → module-scoped UI state action → subscribing feature components (admin_sales/sales_membership_growth_report/state/useAdminSalesMembershipGrowthReportAnalyticsStore.ts)

import { create } from 'zustand';
import type { AdminSalesMembershipGrowthReportStore } from '@/app/frontend_admin/admin_sales/sales_membership_growth_report/types/AdminSalesMembershipGrowthReportStoreTypes';
/**
 * @description useAdminSalesMembershipGrowthReportStore: Zustand store for Reports module UI state — active tab, date range, gym filter.
 * @dependencies Consumes AdminSalesMembershipGrowthReportStoreTypes, AdminSalesMembershipGrowthReportTypes.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export const useAdminSalesMembershipGrowthReportStore = create<AdminSalesMembershipGrowthReportStore>((set) => ({
  dateRange: 'this_month',
  setDateRange: (range) => set({ dateRange: range }),
  startDate: '',
  endDate: '',
  setCustomDateRange: (startDate, endDate) => set({ startDate, endDate }),
  selectedGymId: 'all',
  setSelectedGymId: (id) => set({ selectedGymId: id }),
}));
