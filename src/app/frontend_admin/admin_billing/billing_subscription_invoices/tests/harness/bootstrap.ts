// RESPONSIBILITY: Defines regression tests for bootstrap; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_finance/finance_subscription_invoices/tests/harness/bootstrap.ts)

/** Standalone MSW bootstrap for admin_subscriptions/subscriptions_management; only module-owned handlers are registered. */
import { setupServer } from 'msw/node';
import { adminSubscriptionsMockHandlers as adminSubscriptionsMockHandlersHarnessSource0, resetAdminSubscriptionsMockState } from '@/app/frontend_admin/admin_billing/billing_subscription_invoices/mocks/handlers/AdminBillingSubscriptionInvoicesMockHandlers';

export const adminFeatureMockServer = setupServer(...adminSubscriptionsMockHandlersHarnessSource0);

export function startAdminFeatureMockServer(): void {
  resetAdminSubscriptionsMockState();
  adminFeatureMockServer.listen({ onUnhandledRequest: 'error' });
}
export function resetAdminFeatureMockServer(): void {
  adminFeatureMockServer.resetHandlers();
  resetAdminSubscriptionsMockState();
}
export function stopAdminFeatureMockServer(): void {
  adminFeatureMockServer.close();
}
export const adminFeatureScenarioHandlerCount = 1;
