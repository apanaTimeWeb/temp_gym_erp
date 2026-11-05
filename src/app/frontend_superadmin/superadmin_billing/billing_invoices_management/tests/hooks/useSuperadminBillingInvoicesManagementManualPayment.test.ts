import { createElement } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook } from '@testing-library/react';
import { toast } from 'sonner';
import { describe, expect, it, vi } from 'vitest';

import { invoicesApi } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/api/superadmin_billing_invoices_management.api';
import { useSuperadminBillingInvoicesManagementManualPayment } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/hooks/useSuperadminBillingInvoicesManagementManualPayment';

vi.mock('@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/api/superadmin_billing_invoices_management.api', () => ({ invoicesApi: { createManualPayment: vi.fn() } }));
vi.mock('@/components/ui/Feedback/ConfirmProvider', () => ({ useConfirm: () => ({ confirm: vi.fn().mockResolvedValue(true) }) }));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

describe('useSuperadminBillingInvoicesManagementManualPayment', () => {
  it('records the manual payment through the feature API and invalidates invoices', async () => {
    vi.mocked(invoicesApi.createManualPayment).mockResolvedValue({ success: true, message: 'Recorded', data: { id: 'INV-1' } , requestId: 'test-request-id'} as never);
    const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const invalidate = vi.spyOn(client, 'invalidateQueries');
    const wrapper = ({ children }: { children: React.ReactNode }) => createElement(QueryClientProvider, { client }, children);
    const { result } = renderHook(() => useSuperadminBillingInvoicesManagementManualPayment(), { wrapper });
    await act(async () => { await result.current.handleLogManualPayment('GYM-1', 5000, 'PRO'); });
    expect(invoicesApi.createManualPayment).toHaveBeenCalledWith(expect.objectContaining({ gymId: 'GYM-1', amount: 5000, planName: 'PRO' }), expect.any(String));
    expect(invalidate).toHaveBeenCalled();
  });
});


it('uses localized fallback copy for unexpected runtime errors', async () => {
  vi.mocked(invoicesApi.createManualPayment).mockRejectedValue(new Error('raw internal transport stack'));
  const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
  const wrapper = ({ children }: { children: React.ReactNode }) => createElement(QueryClientProvider, { client }, children);
  const { result } = renderHook(() => useSuperadminBillingInvoicesManagementManualPayment(), { wrapper });
  await act(async () => { await expect(result.current.handleLogManualPayment('GYM-1', 5000, 'PRO')).rejects.toThrow('raw internal transport stack'); });
  expect(toast.error).toHaveBeenCalledWith('ui.manual_payment_failed_retry', { id: 'superadmin-invoices-manual-payment-error' });
  expect(toast.error).not.toHaveBeenCalledWith(expect.stringContaining('raw internal transport stack'), expect.anything());
});
