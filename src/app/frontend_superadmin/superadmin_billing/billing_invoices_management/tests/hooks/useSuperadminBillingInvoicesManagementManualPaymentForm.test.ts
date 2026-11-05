import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useSuperadminBillingInvoicesManagementManualPaymentForm } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/hooks/useSuperadminBillingInvoicesManagementManualPaymentForm';



describe('useSuperadminBillingInvoicesManagementManualPaymentForm', () => {
  it('registers the validated amount field and exposes submitting/error state', () => {
    const onSave = vi.fn().mockResolvedValue(true);
    const { result } = renderHook(() => useSuperadminBillingInvoicesManagementManualPaymentForm(onSave));
    expect(result.current.register('amount').name).toBe('amount');
    expect(result.current.errors).toEqual({});
    expect(result.current.isSubmitting).toBe(false);
  });
});
