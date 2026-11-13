"use client";
// RESPONSIBILITY: Zustand store for Admin Members UI state — filters, pagination, selected member.
// DATA FLOW: feature API/schema → hook/context → useAdminMembersStore consumers.

import type { AdminMembersStoreState } from '@/app/frontend_admin/admin_members/members_directory/types/AdminMembersDirectoryStoreStateTypes';

import { create } from 'zustand';
import type { AdminMembersExpiryFilter } from '@/app/frontend_admin/admin_members/members_directory/types/AdminMembersDirectoryUiTypes';
import type { MemberStatus } from '@/app/frontend_admin/admin_members/members_directory/types/AdminMembersDirectoryTypes';
/**
 * @description useAdminMembersStore: Zustand store for Admin Members UI state — filters, pagination, selected member.
 * @dependencies Consumes AdminMembersStoreStateTypes, AdminMembersUiTypes, AdminMembersTypes.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export const useAdminMembersStore = create<AdminMembersStoreState>((set) => ({
  search: '',
  setSearch: (s) => set({ search: s, currentPage: 1 }),
  statusFilter: 'all',
  setStatusFilter: (s) => set({ statusFilter: s, currentPage: 1 }),
  branchFilter: 'all',
  setBranchFilter: (s) => set({ branchFilter: s, currentPage: 1 }),
  expiryFilter: 'all',
  setExpiryFilter: (s) => set({ expiryFilter: s, currentPage: 1 }),
  expiryFrom: '',
  expiryTo: '',
  setExpiryRange: (from, to) => set({ expiryFrom: from, expiryTo: to, currentPage: 1 }),
  genderFilter: 'all',
  setGenderFilter: (s) => set({ genderFilter: s, currentPage: 1 }),
  planFilter: 'all',
  setPlanFilter: (s) => set({ planFilter: s, currentPage: 1 }),
  currentPage: 1,
  setCurrentPage: (p) => set({ currentPage: p }),
}));
