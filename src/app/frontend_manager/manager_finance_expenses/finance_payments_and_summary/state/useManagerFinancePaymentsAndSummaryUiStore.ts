// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
'use client';
// DATA FLOW: Manager feature UI/state → owning custom hook → approved API/query/mutation layer → observable UI state.
/** Coordinates the Manager / feature. */
import { create } from 'zustand';

import type { ManagerToastType } from '@/components/ui/manager_toast/ManagerToastTypes';


export interface FinancePaymentPrefill {
  memberId?: string;
  amount?: number;
  paymentType?: 'FULL' | 'PARTIAL' | 'DUE_SETTLEMENT';
  notes?: string;
}

interface ManagerFinancePaymentsAndSummaryUiState {
  toast: { message: string; type: ManagerToastType } | null;
  showModal: boolean;
  paymentPrefill: FinancePaymentPrefill | null;
  setToast: (toast: ManagerFinancePaymentsAndSummaryUiState['toast']) => void;
  setShowModal: (show: boolean) => void;
  setPaymentPrefill: (prefill: FinancePaymentPrefill | null) => void;
  showToast: (message: string, type: ManagerToastType) => void;
  hideToast: () => void;
}
/**
 * @description Coordinates finance feature state and its documented UI/API boundary through useManagerFinancePaymentsAndSummaryUiStore.
 * @dependencies Uses ManagerToastTypes.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
export const useManagerFinancePaymentsAndSummaryUiStore = create<ManagerFinancePaymentsAndSummaryUiState>((set) => ({
  toast: null, showModal: false, paymentPrefill: null,
  setToast: (toast) => set({ toast }),
  setShowModal: (showModal) => set((state) => ({ showModal, paymentPrefill: showModal ? state.paymentPrefill : null })),
  setPaymentPrefill: (paymentPrefill) => set({ paymentPrefill }),
  showToast: (message, type) => set({ toast: { message, type } }), hideToast: () => set({ toast: null }) }));
