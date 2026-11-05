'use client';
// DATA FLOW: Inputs enter useSuperadminPlatformConfigurationWhiteLabelingSettingsStore, flow through its feature-owned state/API dependencies, and return typed UI state/actions to the owning Superadmin feature.
// RESPONSIBILITY: Owns UI-only White-labeling selection state. Search/filter state belongs to the URL.
import { create } from 'zustand';

interface SuperadminPlatformConfigurationWhiteLabelingState {
  selectedDomainId: string | null;
  setSelectedDomainId: (id: string | null) => void;
}

/**
 * @description Owns UI-only selected-domain state for White-labeling drawers and row actions.
 * @dependencies Consumed only by White-labeling client components; server data remains in TanStack Query.
 * @edge-case Clears selection by accepting null so closing/reopening a drawer cannot retain a deleted domain identifier.
 */
export const useSuperadminPlatformConfigurationWhiteLabelingSettingsStore = create<SuperadminPlatformConfigurationWhiteLabelingState>((set) => ({
  selectedDomainId: null,
  setSelectedDomainId: (selectedDomainId) => set({ selectedDomainId }),
}));
