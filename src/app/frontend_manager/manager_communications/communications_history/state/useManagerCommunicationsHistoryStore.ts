// DATA FLOW: Feature-owned UI actions → module-scoped Zustand state → selectors → module-owned components.
import { create } from 'zustand';

import type { ManagerCommunicationsHistoryStore } from '@/app/frontend_manager/manager_communications/communications_history/types/manager_communications_history_store.types';



/**
 * @description Coordinates communications feature state and its documented UI/API boundary through useManagerCommunicationsCampaignsStore.
 * @dependencies Uses ManagerCommunicationsCampaignsTypes.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerCommunicationsCampaignsStore owns the communications feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export const useManagerCommunicationsCampaignsStore = create<ManagerCommunicationsHistoryStore>((set) => ({
  selectedSegment: 'expiring_7_days',
  setSelectedSegment: (selectedSegment) => set({ selectedSegment }),
  selectedChannel: 'whatsapp',
  setSelectedChannel: (selectedChannel) => set({ selectedChannel }),
  resetComposer: () => set({ selectedSegment: 'expiring_7_days', selectedChannel: 'whatsapp' }),
}));
