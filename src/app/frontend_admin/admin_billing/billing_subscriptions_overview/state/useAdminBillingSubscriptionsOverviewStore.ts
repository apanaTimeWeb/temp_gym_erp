// RESPONSIBILITY: Zustand store for Subscriptions UI state.
// DATA FLOW: user interaction → module-scoped UI state action → subscribing feature components (admin_subscriptions/subscriptions_overview/state/useAdminSubscriptionsManagementStore.ts)

import { create } from 'zustand';
import type { AdminSubscriptionsStore } from '@/app/frontend_admin/admin_billing/billing_subscriptions_overview/types/AdminBillingSubscriptionsOverviewStoreTypes';
/**
 * @description useAdminSubscriptionsStore: Zustand store for Subscriptions UI state.
 * @dependencies Consumes AdminSubscriptionsStoreTypes, AdminSubscriptionsUiTypes.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export const useAdminSubscriptionsStore = create<AdminSubscriptionsStore>((set) => ({
  activeTab: 'overview',
  setActiveTab: (t) => set({ activeTab: t }),
  showUpgradeConfirm: null,
  setShowUpgradeConfirm: (planId) => set({ showUpgradeConfirm: planId }),
  currentInvoicePage: 1,
  setCurrentInvoicePage: (page) => set({ currentInvoicePage: Number.isSafeInteger(page) && page >= 1 ? Math.min(page, 100000) : 1 }),
}));
