import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useManagerFinancePaymentsAndSummaryPaymentForm } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/hooks/useManagerFinancePaymentsAndSummaryPaymentForm';

const mocks = vi.hoisted(() => ({
  setShowModal: vi.fn(),
  mutateAsync: vi.fn(),
  confirmAndClose: vi.fn(),
  successToast: vi.fn(),
  errorToast: vi.fn(),
  createPayment: { isPending: false, mutateAsync: vi.fn() },
}));

vi.mock('@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/state/useManagerFinancePaymentsAndSummaryUiStore', () => ({
  useManagerFinancePaymentsAndSummaryUiStore: () => ({ setShowModal: mocks.setShowModal }),
}));
vi.mock('@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/hooks/useManagerFinancePaymentsAndSummaryMutations', () => ({
  useManagerFinancePaymentsAndSummaryMutations: () => ({ createPayment: mocks.createPayment }),
}));
vi.mock('@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureIdempotency', () => ({
  ManagerInfrastructureIdempotency: () => 'finance-payment-idempotency-key',
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

describe('useManagerFinancePaymentsAndSummaryPaymentForm', () => {
  beforeEach(() => {
    mocks.setShowModal.mockReset();
    mocks.createPayment.isPending = false;
    mocks.createPayment.mutateAsync.mockReset();
    mocks.confirmAndClose.mockReset();
    mocks.confirmAndClose.mockImplementation(async (onClose: () => void) => {
      onClose();
      return true;
    });
    mocks.successToast.mockReset();
    mocks.errorToast.mockReset();
  });

  it('initializes the validated payment form without closing or submitting', () => {
    const { result } = renderHook(() => useManagerFinancePaymentsAndSummaryPaymentForm());

    expect(result.current.form.getValues()).toMatchObject({
      memberId: '',
      amount: 0,
      method: 'UPI',
      notes: '',
    });
    expect(mocks.setShowModal).not.toHaveBeenCalled();
    expect(mocks.createPayment.mutateAsync).not.toHaveBeenCalled();
  });

  it('routes a dirty close through the unsaved-changes confirmation', async () => {
    const { result } = renderHook(() => useManagerFinancePaymentsAndSummaryPaymentForm());
    act(() => {
      result.current.form.setValue('memberId', 'member-42', { shouldDirty: true });
    });

    await act(async () => {
      result.current.close();
    });

    expect(mocks.confirmAndClose).toHaveBeenCalledTimes(1);
    expect(mocks.setShowModal).toHaveBeenCalledWith(false);
  });

  it('persists a valid payment and closes only after successful mutation', async () => {
    mocks.createPayment.mutateAsync.mockResolvedValue({
      message: 'Payment recorded',
      data: { id: 'payment-1' },
    });
    const { result } = renderHook(() => useManagerFinancePaymentsAndSummaryPaymentForm());

    act(() => {
      result.current.form.setValue('memberId', 'member-42', { shouldDirty: true });
      result.current.form.setValue('amount', 499.5, { shouldDirty: true });
      result.current.form.setValue('method', 'UPI', { shouldDirty: true });
      result.current.form.setValue('notes', 'Monthly fee', { shouldDirty: true });
      result.current.form.setValue('paidAt', '2026-10-16', { shouldDirty: true });
    });
    await act(async () => {
      await result.current.submit();
    });

    expect(mocks.createPayment.mutateAsync).toHaveBeenCalledWith(expect.objectContaining({
      payload: expect.objectContaining({ memberId: 'member-42', amount: 499.5, notes: 'Monthly fee' }),
      idempotencyKey: 'finance-payment-idempotency-key',
    }));
    expect(mocks.successToast).toHaveBeenCalledWith('Payment recorded', 'manager-finance-payment-success');
    expect(mocks.setShowModal).toHaveBeenCalledWith(false);
    expect(result.current.form.getValues()).toMatchObject({ memberId: '', amount: 0, method: 'UPI', notes: '' });
  });

  it('keeps the draft open and reports errors when the mutation fails', async () => {
    const failure = new Error('network failure');
    mocks.createPayment.mutateAsync.mockRejectedValue(failure);
    const { result } = renderHook(() => useManagerFinancePaymentsAndSummaryPaymentForm());
    act(() => {
      result.current.form.setValue('memberId', 'member-42', { shouldDirty: true });
      result.current.form.setValue('amount', 499.5, { shouldDirty: true });
      result.current.form.setValue('paidAt', '2026-10-16', { shouldDirty: true });
    });

    await act(async () => {
      await result.current.submit();
    });

    expect(mocks.errorToast).toHaveBeenCalledWith(failure, 'manager-finance-payment-error');
    expect(mocks.setShowModal).not.toHaveBeenCalled();
    expect(result.current.form.getValues().memberId).toBe('member-42');
  });
});
