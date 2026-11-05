"use client";
// RESPONSIBILITY: Zustand store for Payouts module UI state.
// DATA FLOW: feature API/schema → hook/context → useAdminPayoutsStore consumers.

import type { AdminPayoutsStore } from '@/app/frontend_admin/admin_finance/finance_payouts_management/types/AdminFinancePayoutsManagementStoreTypes';

import { create } from 'zustand';
import type { PayoutTab } from '@/app/frontend_admin/admin_finance/finance_payouts_management/types/AdminFinancePayoutsManagementTypes';
/**
 * @description useAdminPayoutsStore: Zustand store for Payouts module UI state.
 * @dependencies Consumes AdminPayoutsStoreTypes, AdminPayoutsTypes.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export const useAdminPayoutsStore = create<AdminPayoutsStore>((set) => ({
  activeTab: 'summary',
  setActiveTab: (t) => set({ activeTab: t }),
  monthFilter: 'all',
  setMonthFilter: (m) => set({ monthFilter: m, currentPage: 1 }),
  gymFilter: 'all',
  setGymFilter: (g) => set({ gymFilter: g, currentPage: 1 }),
  statusFilter: 'all',
  setStatusFilter: (s) => set({ statusFilter: s, currentPage: 1 }),
  currentPage: 1,
  setCurrentPage: (p) => set({ currentPage: p }),
}));
