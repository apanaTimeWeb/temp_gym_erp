import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { toast } from 'sonner';
import { describe, expect, it, vi } from 'vitest';

import { invoicesApi } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/api/superadmin_billing_invoices_management.api';
import { useSuperadminBillingInvoicesManagementInvoiceActions } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/hooks/useSuperadminBillingInvoicesManagementInvoiceActions';

import type { ReactNode } from 'react';

vi.mock('@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/api/superadmin_billing_invoices_management.api', () => ({ invoicesApi: { exportInvoiceReport: vi.fn(), fetchInvoiceDownloadUrl: vi.fn(), resendInvoiceEmail: vi.fn() } }));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

describe('useSuperadminBillingInvoicesManagementInvoiceActions', () => {
  it('exports a report only after the feature API returns a download URL', async () => {
    vi.mocked(invoicesApi.exportInvoiceReport).mockResolvedValue({ success: true, message: 'Ready', data: { downloadUrl: 'https://example.test/export.csv' } , requestId: 'test-request-id'} as never);
    const windowOpen = vi.fn();
    Object.defineProperty(globalThis, 'window', { value: { open: windowOpen, location: { origin: 'http://localhost' } }, configurable: true });
    const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminBillingInvoicesManagementInvoiceActions(), { wrapper });
    await result.current.exportInvoices({ period: 'current' });
    expect(invoicesApi.exportInvoiceReport).toHaveBeenCalledWith({ period: 'current' });
    expect(windowOpen).toHaveBeenCalledWith('https://example.test/export.csv', '_blank', 'noopener,noreferrer');
  });
});


it('uses localized fallback copy for unexpected export errors', async () => {
  vi.mocked(invoicesApi.exportInvoiceReport).mockRejectedValue(new Error('raw internal transport detail'));
  const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
  const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
  const { result } = renderHook(() => useSuperadminBillingInvoicesManagementInvoiceActions(), { wrapper });
  await result.current.exportInvoices();
  expect(toast.error).toHaveBeenCalledWith('ui.invoice_export_error_retry_7c4e1b8d', { id: 'invoice-export' });
  expect(toast.error).not.toHaveBeenCalledWith(expect.stringContaining('raw internal transport detail'), expect.anything());
});
