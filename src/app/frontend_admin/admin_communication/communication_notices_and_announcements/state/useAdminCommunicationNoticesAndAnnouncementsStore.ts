"use client";
// RESPONSIBILITY: Zustand store for Announcements UI state — filters, pagination, modal.
// DATA FLOW: feature API/schema → hook/context → useAdminAnnouncementsStore consumers.

import type { AdminAnnouncementsStore } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/types/AdminCommunicationNoticesAndAnnouncementsStoreTypes';

import { create } from 'zustand';
import type { AnnouncementFormValues } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/types/AdminCommunicationNoticesAndAnnouncementsTypes';
import { EMPTY_ANNOUNCEMENT_FORM } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/constants/AdminCommunicationNoticesAndAnnouncementsConstants';
/**
 * @description useAdminAnnouncementsStore: Zustand store for Announcements UI state — filters, pagination, modal.
 * @dependencies Consumes AdminAnnouncementsStoreTypes, AdminAnnouncementsTypes, AdminAnnouncementsConstants.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export const useAdminAnnouncementsStore = create<AdminAnnouncementsStore>((set) => ({
  search: '',
  setSearch: (v) => set({ search: v, currentPage: 1 }),
  statusFilter: 'all',
  setStatusFilter: (v) => set({ statusFilter: v, currentPage: 1 }),
  priorityFilter: 'all',
  setPriorityFilter: (v) => set({ priorityFilter: v, currentPage: 1 }),
  gymFilter: 'all',
  setGymFilter: (v) => set({ gymFilter: v, currentPage: 1 }),
  currentPage: 1,
  setCurrentPage: (v) => set({ currentPage: v }),
  showModal: false,
  setShowModal: (v) => set({ showModal: v }),
  editingAnnouncementId: null,
  setEditingAnnouncementId: (id) => set({ editingAnnouncementId: id }),
  form: EMPTY_ANNOUNCEMENT_FORM,
  setForm: (f) => set({ form: f }),
}));
