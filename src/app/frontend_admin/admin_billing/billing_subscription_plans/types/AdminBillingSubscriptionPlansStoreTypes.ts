// RESPONSIBILITY: Defines feature-local TypeScript contracts for subscriptions_management; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_subscriptions/subscriptions_plans/types/AdminSubscriptionsManagementStoreTypes.ts)

// Type contract owned by this module; kept outside implementation files for AI isolation.

import type { AdminSubscriptionsTab } from '@/app/frontend_admin/admin_billing/billing_subscription_plans/types/AdminBillingSubscriptionPlansUiTypes';
export interface AdminSubscriptionsStore {
  activeTab: AdminSubscriptionsTab;
  setActiveTab: (t: AdminSubscriptionsTab) => void;
  showUpgradeConfirm: string | null;
  setShowUpgradeConfirm: (planId: string | null) => void;
  currentInvoicePage: number;
  setCurrentInvoicePage: (page: number) => void;
}
