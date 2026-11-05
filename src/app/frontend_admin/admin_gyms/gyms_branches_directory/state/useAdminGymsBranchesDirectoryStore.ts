"use client";
// RESPONSIBILITY: Owns UI-only branch filter, date-range, selection, and drawer-view state.
// DATA FLOW: feature API/schema → hook/context → useAdminBranchesStore consumers.

import type { AdminBranchesStore } from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/types/AdminGymsBranchesDirectoryStoreTypes';

import { create } from 'zustand';
import type { AdminBranchesTimeRange } from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/types/AdminGymsBranchesDirectoryTimeRangeTypes';
import type { AdminBranchesStatusFilter, DetailView } from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/types/AdminGymsBranchesDirectoryUiTypes';
/**
 * @description useAdminBranchesStore: Owns UI-only branch filter, date-range, selection, and drawer-view state.
 * @dependencies Consumes AdminBranchesStoreTypes, AdminBranchesTimeRangeTypes, AdminBranchesUiTypes.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export const useAdminBranchesStore = create<AdminBranchesStore>((set) => ({
  search: '',
  setSearch: (value) => set({ search: value }),
  statusFilter: 'all',
  setStatusFilter: (value) => set({ statusFilter: value }),
  timeRange: 'monthly',
  setTimeRange: (range) => set({ timeRange: range }),
  startDate: '',
  setStartDate: (date) => set({ startDate: date }),
  endDate: '',
  setEndDate: (date) => set({ endDate: date }),
  selectedBranchId: null,
  setSelectedBranchId: (id) => set({ selectedBranchId: id }),
  detailView: null,
  setDetailView: (view) => set({ detailView: view }),
}));
