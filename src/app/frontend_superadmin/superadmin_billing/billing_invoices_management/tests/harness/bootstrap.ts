/**
 * Canonical standalone test bootstrap for invoices_management.
 * Promoted from the module's existing mock harness and rebased to local paths.
 * Use the lifecycle functions below from the owning Vitest setup.
 */
/** Standalone MSW and QueryClient bootstrap for invoices_management; call lifecycle functions from the owning test setup. */
import { QueryClient } from '@tanstack/react-query';
import { setupServer } from 'msw/node';
import { superadminInvoicesHandlers as superadminInvoicesHandlers } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/mocks/handlers/SuperadminBillingInvoicesManagementMockHandlers';
import { resetSuperadminBillingInvoicesMockState as resetSuperadminBillingInvoicesMockStateForInvoicesManagement1 } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/mocks/handlers/SuperadminBillingInvoicesManagementMockHandlers';

export const superadminMockServer = setupServer(
  ...superadminInvoicesHandlers,
);

export function createIsolatedQueryClient(): QueryClient {
  return new QueryClient({ defaultOptions: { queries: { retry: false, staleTime: 0, gcTime: 0 }, mutations: { retry: false } } });
}

export function startSuperadminMockServer(): void { superadminMockServer.listen({ onUnhandledRequest: 'error' }); }
export function resetSuperadminMockState(): void {
  superadminMockServer.resetHandlers();
  resetSuperadminBillingInvoicesMockStateForInvoicesManagement1();
}

export function stopSuperadminMockServer(): void { superadminMockServer.close(); }
