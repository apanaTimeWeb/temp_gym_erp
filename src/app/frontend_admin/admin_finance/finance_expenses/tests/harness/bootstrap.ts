// RESPONSIBILITY: Defines regression tests for bootstrap; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_finance/finance_expenses/tests/harness/bootstrap.ts)

/** Standalone MSW bootstrap for admin_finance/finance_expenses; only module-owned handlers are registered. */
import { setupServer } from 'msw/node';
import { adminFinanceMockHandlers as adminFinanceMockHandlersHarnessSource0 } from '@/app/frontend_admin/admin_finance/finance_expenses/mocks/handlers/AdminFinanceExpensesMockHandlers';

export const adminFeatureMockServer = setupServer(...adminFinanceMockHandlersHarnessSource0);

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
