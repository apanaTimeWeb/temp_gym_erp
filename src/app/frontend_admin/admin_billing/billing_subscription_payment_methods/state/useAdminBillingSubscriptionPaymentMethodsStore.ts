// RESPONSIBILITY: Zustand store for Subscriptions UI state.
// DATA FLOW: user interaction → module-scoped UI state action → subscribing feature components (admin_finance/finance_subscription_payment_methods/state/useAdminSubscriptionsManagementStore.ts)

import { create } from 'zustand';
import type { AdminSubscriptionsStore } from '@/app/frontend_admin/admin_billing/billing_subscription_payment_methods/types/AdminBillingSubscriptionPaymentMethodsStoreTypes';
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
  setCurrentInvoicePage: (page) => set({ currentInvoicePage: Math.max(1, page) }),
}));
