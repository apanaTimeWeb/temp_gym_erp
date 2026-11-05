// RESPONSIBILITY: Defines regression tests for useAdminSubscriptionsManagementStore.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_finance/finance_subscription_invoices/tests/store/useAdminSubscriptionsManagementStore.test.ts)

import { beforeEach, describe, expect, it } from 'vitest';
import { useAdminSubscriptionsStore } from '@/app/frontend_admin/admin_billing/billing_subscription_invoices/state/useAdminBillingSubscriptionInvoicesStore';

describe('useAdminSubscriptionsStore', () => {
  beforeEach(() => useAdminSubscriptionsStore.setState({ activeTab: 'overview', showUpgradeConfirm: null }));

  it('tracks the selected subscription view and pending upgrade confirmation', () => {
    const store = useAdminSubscriptionsStore.getState();
    store.setActiveTab('invoices');
    store.setShowUpgradeConfirm('plan-pro');
    expect(useAdminSubscriptionsStore.getState()).toMatchObject({ activeTab: 'invoices', showUpgradeConfirm: 'plan-pro' });
  });

});
