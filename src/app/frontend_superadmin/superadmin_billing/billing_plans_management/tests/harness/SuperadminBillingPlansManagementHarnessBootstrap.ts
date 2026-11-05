/** Standalone MSW and QueryClient bootstrap for plans_management; call lifecycle functions from the owning test setup. */
import { QueryClient } from '@tanstack/react-query';
import { setupServer } from 'msw/node';
import { superadminPlansHandlers as superadminPlansHandlers } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/mocks/handlers/SuperadminBillingPlansManagementMockHandlers';
import { resetSuperadminBillingPlansMockState as resetSuperadminBillingPlansMockStateForPlansManagement1 } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/mocks/handlers/SuperadminBillingPlansManagementMockHandlers';

export const superadminMockServer = setupServer(
  ...superadminPlansHandlers,
);

export function createIsolatedQueryClient(): QueryClient {
  return new QueryClient({ defaultOptions: { queries: { retry: false, staleTime: 0, gcTime: 0 }, mutations: { retry: false } } });
}

export function startSuperadminMockServer(): void { superadminMockServer.listen({ onUnhandledRequest: 'error' }); }
export function resetSuperadminMockState(): void {
  superadminMockServer.resetHandlers();
  resetSuperadminBillingPlansMockStateForPlansManagement1();
}

export function stopSuperadminMockServer(): void { superadminMockServer.close(); }
