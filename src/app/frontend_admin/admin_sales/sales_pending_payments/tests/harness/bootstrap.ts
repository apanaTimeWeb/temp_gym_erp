// RESPONSIBILITY: Defines regression tests for bootstrap; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_finance/finance_pending_sales_payments/tests/harness/bootstrap.ts)

/** Standalone MSW bootstrap for admin_sales/sales_analytics; only module-owned handlers are registered. */
import { setupServer } from 'msw/node';
import { adminSalesMockHandlers as adminSalesMockHandlersHarnessSource0 } from '@/app/frontend_admin/admin_sales/sales_pending_payments/mocks/handlers/AdminSalesPendingPaymentsMockHandlers';

export const adminFeatureMockServer = setupServer(...adminSalesMockHandlersHarnessSource0);

export function startAdminFeatureMockServer(): void {
  adminFeatureMockServer.listen({ onUnhandledRequest: 'error' });
}
export function resetAdminFeatureMockServer(): void {
  adminFeatureMockServer.resetHandlers();
}
export function stopAdminFeatureMockServer(): void {
  adminFeatureMockServer.close();
}
export const adminFeatureScenarioHandlerCount = 1;
