/** Standalone MSW and QueryClient bootstrap for coupons_management; call lifecycle functions from the owning test setup. */
import { QueryClient } from '@tanstack/react-query';
import { setupServer } from 'msw/node';
import { superadminCouponsHandlers as superadminCouponsHandlers } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/mocks/handlers/SuperadminBillingCouponsManagementMockHandlers';
import { resetSuperadminBillingCouponsMockState as resetSuperadminBillingCouponsMockStateForCouponsManagement1 } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/mocks/handlers/SuperadminBillingCouponsManagementMockHandlers';

export const superadminMockServer = setupServer(
  ...superadminCouponsHandlers,
);

export function createIsolatedQueryClient(): QueryClient {
  return new QueryClient({ defaultOptions: { queries: { retry: false, staleTime: 0, gcTime: 0 }, mutations: { retry: false } } });
}

export function startSuperadminMockServer(): void { superadminMockServer.listen({ onUnhandledRequest: 'error' }); }
export function resetSuperadminMockState(): void {
  superadminMockServer.resetHandlers();
  resetSuperadminBillingCouponsMockStateForCouponsManagement1();
}

export function stopSuperadminMockServer(): void { superadminMockServer.close(); }
