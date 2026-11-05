import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useSuperadminBillingInvoicesManagementMain } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/hooks/useSuperadminBillingInvoicesManagementMain';



const setShowAddModal = vi.fn();
const handleLogManualPayment = vi.fn().mockResolvedValue(true);
vi.mock('@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/hooks/useSuperadminBillingInvoicesManagementPage', () => ({ useSuperadminBillingInvoicesManagementPage: () => ({ selectedGym: { id: 'GYM-1', plan: 'PRO' }, setShowAddModal, handleLogManualPayment }) }));

describe('useSuperadminBillingInvoicesManagementMain', () => {
  beforeEach(() => { setShowAddModal.mockClear(); handleLogManualPayment.mockReset().mockResolvedValue(true); });
  it('retains the modal when the recording flow reports failure', async () => {
    handleLogManualPayment.mockResolvedValue(false);
    const { result } = renderHook(() => useSuperadminBillingInvoicesManagementMain());
    await act(async () => { expect(await result.current.handleSavePayment(5000)).toBe(false); });
    expect(setShowAddModal).not.toHaveBeenCalled();
  });
  it('closes the payment modal only after the recording flow completes', async () => {
    const { result } = renderHook(() => useSuperadminBillingInvoicesManagementMain());
    await act(async () => { await result.current.handleSavePayment(5000); });
    expect(handleLogManualPayment).toHaveBeenCalledWith('GYM-1', 5000, 'PRO');
    expect(setShowAddModal).toHaveBeenCalledWith(false);
  });
});
