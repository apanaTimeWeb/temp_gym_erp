// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
'use client';
// DATA FLOW: Manager feature UI/state → owning custom hook → approved API/query/mutation layer → observable UI state.
/** Coordinates the Manager / feature. */
import { create } from 'zustand';

import type { ReportTab } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/types/manager_reports_overview.types';


interface ManagerReportsOverviewUiState {
  tab: ReportTab;
  setTab: (tab: ReportTab) => void;
}

/**
 * @description Coordinates reports feature state and its documented UI/API boundary through useManagerReportsOverviewUiStore.
 * @dependencies Uses ManagerReportsOverviewTypes.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
export const useManagerReportsOverviewUiStore = create<ManagerReportsOverviewUiState>((set) => ({
  tab: 'Revenue',
  setTab: (tab) => set({ tab }) }));
