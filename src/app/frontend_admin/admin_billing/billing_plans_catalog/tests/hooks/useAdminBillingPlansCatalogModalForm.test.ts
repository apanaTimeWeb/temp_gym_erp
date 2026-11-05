// RESPONSIBILITY: Defines regression tests for useAdminBillingPlansCatalogModalForm.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_plans/plans_catalog/tests/hooks/useAdminBillingPlansCatalogModalForm.test.ts)

import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useAdminPlansModalForm } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/hooks/useAdminBillingPlansCatalogModalForm';
import { useAdminPlansStore } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/state/useAdminBillingPlansCatalogStore';
import { useAdminPlansUnsavedChangesGuard } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/hooks/useAdminBillingPlansCatalogUnsavedChangesGuard';

vi.mock('@/app/frontend_admin/admin_billing/billing_plans_catalog/state/useAdminBillingPlansCatalogStore', () => ({ useAdminPlansStore: vi.fn() }));
vi.mock('@/app/frontend_admin/admin_billing/billing_plans_catalog/hooks/useAdminBillingPlansCatalogUnsavedChangesGuard', () => ({ useAdminPlansUnsavedChangesGuard: vi.fn() }));

const savePlan = vi.fn();
const clearIntentKey = vi.fn();
const setShowModal = vi.fn();
const confirmDiscardIfDirty = vi.fn();

describe('useAdminPlansModalForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAdminPlansStore).mockReturnValue({
      showModal: true,
      setShowModal,
      editId: 'plan-1',
      form: { name: 'Gold', tier: 'PREMIUM', price1Month: '100', price3Month: '270', price6Month: '500', price12Month: '900', priceCustom: '1200', features: 'A' },
    } as never);
    vi.mocked(useAdminPlansUnsavedChangesGuard).mockReturnValue({ confirmDiscardIfDirty: () => confirmDiscardIfDirty() } as never);
    confirmDiscardIfDirty.mockResolvedValue(true);
  });

  it('initializes the form from the feature draft and closes only after the discard guard allows it', async () => {
    const { result } = renderHook(() => useAdminPlansModalForm({ savePlan, saving: false, clearIntentKey } as never));

    expect(result.current.showModal).toBe(true);
    expect(result.current.editId).toBe('plan-1');

    await act(async () => result.current.handleClose());
    expect(confirmDiscardIfDirty).toHaveBeenCalledTimes(1);
    expect(setShowModal).toHaveBeenCalledWith(false);
    expect(clearIntentKey).toHaveBeenCalledWith('update-plan:plan-1');
  });
});
