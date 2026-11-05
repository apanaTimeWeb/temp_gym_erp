// RESPONSIBILITY: Zustand store for Reports module UI state — active tab, date range, gym filter.
// DATA FLOW: user interaction → module-scoped UI state action → subscribing feature components (admin_attendance/attendance_reports/state/useAdminAttendanceReportsAnalyticsStore.ts)

import { create } from 'zustand';
import type { AdminAttendanceReportsStore } from '@/app/frontend_admin/admin_attendance/attendance_reports/types/AdminAttendanceReportsStoreTypes';
/**
 * @description useAdminAttendanceReportsStore: Zustand store for Reports module UI state — active tab, date range, gym filter.
 * @dependencies Consumes AdminAttendanceReportsStoreTypes, AdminAttendanceReportsTypes.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export const useAdminAttendanceReportsStore = create<AdminAttendanceReportsStore>((set) => ({
  dateRange: 'this_month',
  setDateRange: (range) => set({ dateRange: range }),
  startDate: '',
  endDate: '',
  setCustomDateRange: (startDate, endDate) => set({ startDate, endDate }),
  selectedGymId: 'all',
  setSelectedGymId: (id) => set({ selectedGymId: id }),
}));
