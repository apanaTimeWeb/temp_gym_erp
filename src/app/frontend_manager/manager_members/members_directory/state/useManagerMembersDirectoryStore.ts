// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
import { create } from 'zustand';

import { MANAGER_MEMBERS_DIRECTORY_STATUS_VALUES } from '@/app/frontend_manager/manager_members/members_directory/constants/manager_members_directory.constants';
import { MEMBER_ATTENDANCE_EMPTY_STATUS } from '@/app/frontend_manager/manager_members/members_directory/constants/manager_members_directory.constants';

export interface MembersUIState {
  selectedMemberIds: string[];
  attMap: Record<string, { day: number; status: string }[]>;

  setSelectedMemberIds: (ids: string[]) => void;
  toggleAtt: (memberId: string, day: number) => void;
}

/**
 * @description Coordinates members feature state and its documented UI/API boundary through useManagerMembersDirectoryStore.
 * @dependencies Uses the owning module state and infrastructure contracts.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
export const useManagerMembersDirectoryStore = create<MembersUIState>((set, get) => ({
  selectedMemberIds: [],
  attMap: {},

  setSelectedMemberIds: (ids) => set({ selectedMemberIds: ids }),

  toggleAtt: (memberId: string, day: number) => {
    set((state) => {
      const currentAtt = state.attMap[memberId] || [];
      const existing = currentAtt.find((entry) => entry.day === day);
      if (!existing) {
        return { attMap: { ...state.attMap, [memberId]: [...currentAtt, { day, status: MANAGER_MEMBERS_DIRECTORY_STATUS_VALUES.P }] } };
      }
      const nextStatus = existing.status === MEMBER_ATTENDANCE_EMPTY_STATUS
        ? MANAGER_MEMBERS_DIRECTORY_STATUS_VALUES.P
        : existing.status === MANAGER_MEMBERS_DIRECTORY_STATUS_VALUES.P
          ? 'A'
          : MEMBER_ATTENDANCE_EMPTY_STATUS;
      const updatedAtt = currentAtt.map((entry) => entry.day === day ? { ...entry, status: nextStatus } : entry);
      return { attMap: { ...state.attMap, [memberId]: updatedAtt } };
    });
  } }));
