/** Standalone MSW and QueryClient bootstrap for billing_coupons_management. */
import { QueryClient } from '@tanstack/react-query';
import { setupServer } from 'msw/node';

import { resetSuperadminBillingCouponsMockState, superadminCouponsHandlers } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/mocks/handlers/SuperadminBillingCouponsManagementMockHandlers';

export const superadminBillingCouponsMockServer = setupServer(...superadminCouponsHandlers);

export function createSuperadminBillingCouponsQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false, staleTime: 0, gcTime: 0 },
      mutations: { retry: false },
    },
  });
}

export function startSuperadminBillingCouponsMockServer(): void {
  superadminBillingCouponsMockServer.listen({ onUnhandledRequest: 'error' });
}

export function resetSuperadminBillingCouponsTestState(): void {
  superadminBillingCouponsMockServer.resetHandlers();
  resetSuperadminBillingCouponsMockState();
}

export function stopSuperadminBillingCouponsMockServer(): void {
  superadminBillingCouponsMockServer.close();
}
