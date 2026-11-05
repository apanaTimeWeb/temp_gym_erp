// RESPONSIBILITY: Zustand mirror for URL-synchronized member selection plus ephemeral Members UI state.
// DATA FLOW: Canonical URL view state → member/tab mirror; local interactions → edit/message modal state.
import { create } from 'zustand';

import type { TrainerMembersState } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/types/TrainerMembersDirectoryAndProfileStoreTypes';




/**
 * Stores Members UI state shared across the list/profile/message surfaces.
 * Selection and profile tab mirror the canonical URL; edit drafts and messaging modal state remain UI-only. Member server data stays in TanStack Query.
 */
/**
 * @description Manages TrainerMembersStore state and data flow for the members feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented members module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
export const useTrainerMembersStore = create<TrainerMembersState>((set) => ({
  selectedMemberId: null,
  setSelectedMemberId: (id) => set({ selectedMemberId: id }),
  setSelectedMember: (memberId) => set({ selectedMemberId: memberId }),

  profileTab: 'overview',
  setProfileTab: (tab) => set({ profileTab: tab }),


  editId: null,
  editData: null,
  setEditState: (id, data) => set({ editId: id, editData: data }),


  msgModal: null,
  openMsg: (recipient, type, message) => set({ msgModal: { open: true, recipient, type, message } }),
  closeMsg: () => set({ msgModal: null }),
}));
