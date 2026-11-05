// RESPONSIBILITY: Defines regression tests for useAdminSubscriptionsManagementStore.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_subscriptions/subscriptions_plans/tests/store/useAdminSubscriptionsManagementStore.test.ts)

import { beforeEach, describe, expect, it } from 'vitest';
import { useAdminSubscriptionsStore } from '@/app/frontend_admin/admin_billing/billing_subscription_plans/state/useAdminBillingSubscriptionPlansStore';

describe('useAdminSubscriptionsStore', () => {
  beforeEach(() => useAdminSubscriptionsStore.setState({ activeTab: 'overview', showUpgradeConfirm: null, currentInvoicePage: 1 }));

  it('tracks the selected subscription view and pending upgrade confirmation', () => {
    const store = useAdminSubscriptionsStore.getState();
    store.setActiveTab('invoices');
    store.setShowUpgradeConfirm('plan-pro');
    expect(useAdminSubscriptionsStore.getState()).toMatchObject({ activeTab: 'invoices', showUpgradeConfirm: 'plan-pro' });
  });

  it('never allows the invoice page below one', () => {
    useAdminSubscriptionsStore.getState().setCurrentInvoicePage(0);
    expect(useAdminSubscriptionsStore.getState().currentInvoicePage).toBe(1);
    useAdminSubscriptionsStore.getState().setCurrentInvoicePage(4);
    expect(useAdminSubscriptionsStore.getState().currentInvoicePage).toBe(4);
  });
});
