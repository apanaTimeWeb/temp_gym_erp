import { renderHook, act } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useSuperadminBillingPlansManagementStore } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/state/useSuperadminBillingPlansManagementStore';

import type { SubscriptionPlan } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/types/superadmin_billing_plans_management.types';



describe('useSuperadminBillingPlansManagementStore', () => {
  it('opens create/edit modals and clears selected plan on close', async () => {
    const { result } = renderHook(() => useSuperadminBillingPlansManagementStore());
    const plan = { id: 'plan-1', name: 'Pro' } as SubscriptionPlan;
    act(() => result.current.openCreateModal());
    expect(result.current.isCreateModalOpen).toBe(true);
    act(() => result.current.closeCreateModal());
    expect(result.current.isCreateModalOpen).toBe(false);
    act(() => result.current.openEditModal(plan));
    expect(result.current.isEditModalOpen).toBe(true);
    expect(result.current.selectedPlan).toBe(plan);
    act(() => result.current.closeEditModal());
    expect(result.current.isEditModalOpen).toBe(false);
    await new Promise((resolve) => setTimeout(resolve, 220));
    expect(result.current.selectedPlan).toBeNull();
  });
});
