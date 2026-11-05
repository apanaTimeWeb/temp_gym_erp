import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useManagerMembershipLifecycleCrudForm } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/hooks/useManagerMembershipLifecycleCrudForm';
import type { Plan } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/types/manager_membership_lifecycle.types';

const mocks = vi.hoisted(() => ({
  createPlan: { isPending: false, mutateAsync: vi.fn() },
  updatePlan: { isPending: false, mutateAsync: vi.fn() },
  confirmAndClose: vi.fn(),
  successToast: vi.fn(),
  errorToast: vi.fn(),
}));

vi.mock('@/app/frontend_manager/manager_membership_plans/manager_plans_hooks/useManagerMembershipLifecycleMutations', () => ({
  useManagerMembershipLifecycleMutations: () => ({ createPlan: mocks.createPlan, updatePlan: mocks.updatePlan }),
}));
vi.mock('@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureIdempotency', () => ({
  ManagerInfrastructureIdempotency: () => 'manager-plan-idempotency-key',
}));
vi.mock('@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureFromManagerMinorUnits', () => ({
  ManagerInfrastructureFromManagerMinorUnits: (value: number) => value / 100,
}));
vi.mock('@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureToManagerMinorUnits', () => ({
  ManagerInfrastructureToManagerMinorUnits: (value: number) => Math.round(value * 100),
}));
vi.mock('@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureShowSuccessToast', () => ({
  ManagerInfrastructureShowSuccessToast: (...args: unknown[]) => mocks.successToast(...args),
}));
vi.mock('@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureShowErrorToast', () => ({
  ManagerInfrastructureShowErrorToast: (...args: unknown[]) => mocks.errorToast(...args),
}));
vi.mock('@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureUnsavedChangesGuard', () => ({
  useManagerInfrastructureUnsavedChangesGuard: () => ({ confirmAndClose: mocks.confirmAndClose }),
}));

const samplePlan: Plan = {
  id: 'plan-1', name: 'Gold', tier: 'GOLD', price1Month: 150000, price3Month: 420000,
  price6Month: 780000, price12Month: 1440000, features: ['Pool access'], isActive: true,
};

describe('useManagerMembershipLifecycleCrudForm', () => {
  beforeEach(() => {
    mocks.createPlan.isPending = false;
    mocks.updatePlan.isPending = false;
    mocks.createPlan.mutateAsync.mockReset();
    mocks.updatePlan.mutateAsync.mockReset();
    mocks.confirmAndClose.mockReset();
    mocks.confirmAndClose.mockImplementation(async (onClose: () => void) => { onClose(); return true; });
    mocks.successToast.mockReset();
    mocks.errorToast.mockReset();
  });

  it('initializes a create form with the canonical tier and no side effects', () => {
    const { result } = renderHook(() => useManagerMembershipLifecycleCrudForm(null, true, vi.fn()));
    expect(result.current.form.getValues()).toMatchObject({ name: '', tier: 'BASIC', price1Month: 0, isActive: true });
    expect(mocks.createPlan.mutateAsync).not.toHaveBeenCalled();
  });

  it('hydrates an edit form from minor-unit prices', () => {
    const { result } = renderHook(() => useManagerMembershipLifecycleCrudForm(samplePlan, true, vi.fn()));
    expect(result.current.form.getValues()).toMatchObject({ name: 'Gold', tier: 'GOLD', price1Month: 1500, price3Month: 4200, featuresText: 'Pool access' });
  });

  it('routes a dirty cancellation through unsaved-draft confirmation', async () => {
    const onClose = vi.fn();
    const { result } = renderHook(() => useManagerMembershipLifecycleCrudForm(null, true, onClose));
    act(() => result.current.form.setValue('name', 'Gold Plus', { shouldDirty: true }));
    await act(async () => { result.current.close(); });
    expect(mocks.confirmAndClose).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('rehydrates the same plan after the editor is closed and reopened', () => {
    const { result, rerender } = renderHook(({ open }) => useManagerMembershipLifecycleCrudForm(samplePlan, open, vi.fn()), { initialProps: { open: true } });
    act(() => result.current.form.setValue('name', 'Unsaved draft', { shouldDirty: true }));
    expect(result.current.form.getValues('name')).toBe('Unsaved draft');
    rerender({ open: false });
    rerender({ open: true });
    expect(result.current.form.getValues('name')).toBe('Gold');
    expect(result.current.form.getValues('price1Month')).toBe(1500);
  });

  it('creates a plan with integer minor units and only closes after success', async () => {
    const onClose = vi.fn();
    mocks.createPlan.mutateAsync.mockResolvedValue({ message: 'Plan created', data: { id: 'plan-new' } });
    const { result } = renderHook(() => useManagerMembershipLifecycleCrudForm(null, true, onClose));
    act(() => {
      result.current.form.setValue('name', 'Gold Plus', { shouldDirty: true });
      result.current.form.setValue('tier', 'GOLD', { shouldDirty: true });
      result.current.form.setValue('price1Month', 1500.50, { shouldDirty: true });
      result.current.form.setValue('price3Month', 4200, { shouldDirty: true });
      result.current.form.setValue('price6Month', 7800, { shouldDirty: true });
      result.current.form.setValue('price12Month', 14400, { shouldDirty: true });
      result.current.form.setValue('featuresText', 'Pool access\nSauna access', { shouldDirty: true });
    });
    await act(async () => { await result.current.submit(); });
    expect(mocks.createPlan.mutateAsync).toHaveBeenCalledWith({
      payload: expect.objectContaining({ name: 'Gold Plus', tier: 'GOLD', price1Month: 150050, features: ['Pool access', 'Sauna access'] }),
      idempotencyKey: 'manager-plan-idempotency-key',
    });
    expect(mocks.successToast).toHaveBeenCalledWith('Plan created', 'manager-plans-create-success');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('updates the selected plan and retains user input after a mutation failure', async () => {
    const failure = new Error('network failure');
    mocks.updatePlan.mutateAsync.mockRejectedValue(failure);
    const onClose = vi.fn();
    const { result } = renderHook(() => useManagerMembershipLifecycleCrudForm(samplePlan, true, onClose));
    act(() => result.current.form.setValue('name', 'Gold Plus', { shouldDirty: true }));
    await act(async () => { await result.current.submit(); });
    expect(mocks.updatePlan.mutateAsync).toHaveBeenCalledWith(expect.objectContaining({ id: 'plan-1', payload: expect.objectContaining({ name: 'Gold Plus' }) }));
    expect(mocks.errorToast).toHaveBeenCalledWith(failure, 'manager-plans-crud-error');
    expect(onClose).not.toHaveBeenCalled();
    expect(result.current.form.getValues('name')).toBe('Gold Plus');
  });
});
