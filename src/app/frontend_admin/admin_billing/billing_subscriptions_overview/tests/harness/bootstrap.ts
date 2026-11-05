// RESPONSIBILITY: Defines regression tests for bootstrap; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_subscriptions/subscriptions_overview/tests/harness/bootstrap.ts)

/** Standalone MSW bootstrap for admin_subscriptions/subscriptions_management; only module-owned handlers are registered. */
import { setupServer } from 'msw/node';
import { adminSubscriptionsMockHandlers as adminSubscriptionsMockHandlersHarnessSource0 } from '@/app/frontend_admin/admin_billing/billing_subscriptions_overview/mocks/handlers/AdminBillingSubscriptionsOverviewMockHandlers';

export const adminFeatureMockServer = setupServer(...adminSubscriptionsMockHandlersHarnessSource0);

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
