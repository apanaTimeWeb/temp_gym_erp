// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// RESPONSIBILITY: Stores only transient shared UI state; URL and TanStack Query own server/filter state.
// DATA FLOW: Manager Referrals UI-only modal state → owning Referrals components.
import { create } from 'zustand';

interface ManagerReferralsRewardsStore {
  isAddModalOpen: boolean;
  setIsAddModalOpen: (isOpen: boolean) => void;
}

/**
 * @description Coordinates referrals feature state and its documented UI/API boundary through useManagerReferralsRewardsStore.
 * @dependencies Uses the owning module state and infrastructure contracts.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
export const useManagerReferralsRewardsStore = create<ManagerReferralsRewardsStore>((set) => ({
  isAddModalOpen: false,
  setIsAddModalOpen: (isOpen) => set({ isAddModalOpen: isOpen }),
}));
