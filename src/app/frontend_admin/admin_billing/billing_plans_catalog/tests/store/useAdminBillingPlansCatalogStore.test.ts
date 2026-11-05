// RESPONSIBILITY: Defines regression tests for useAdminBillingPlansCatalogStore.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_plans/plans_catalog/tests/store/useAdminBillingPlansCatalogStore.test.ts)

import { beforeEach, describe, expect, it } from 'vitest';
import { useAdminPlansStore } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/state/useAdminBillingPlansCatalogStore';

describe('useAdminPlansStore', () => {
  beforeEach(() => useAdminPlansStore.setState({ showModal: false, editId: null }));

  it('opens the plan modal for creating and editing', () => {
    const store = useAdminPlansStore.getState();
    store.setShowModal(true);
    expect(useAdminPlansStore.getState().showModal).toBe(true);
    store.setEditId('plan-pro');
    expect(useAdminPlansStore.getState().editId).toBe('plan-pro');
  });

  it('clears edit identity when requested', () => {
    useAdminPlansStore.getState().setEditId('plan-pro');
    useAdminPlansStore.getState().setEditId(null);
    expect(useAdminPlansStore.getState().editId).toBeNull();
  });
});
