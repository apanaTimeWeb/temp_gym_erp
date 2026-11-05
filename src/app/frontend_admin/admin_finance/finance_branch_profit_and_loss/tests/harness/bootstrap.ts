// RESPONSIBILITY: Defines regression tests for bootstrap; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_finance/finance_branch_profit_and_loss/tests/harness/bootstrap.ts)

/** Standalone MSW bootstrap for admin_finance/finance_branch_profit_and_loss; only module-owned handlers are registered. */
import { setupServer } from 'msw/node';
import { adminFinancePnlMockHandlers as adminFinancePnlMockHandlersHarnessSource0 } from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/mocks/handlers/AdminFinanceBranchProfitAndLossMockHandlers';

export const adminFeatureMockServer = setupServer(...adminFinancePnlMockHandlersHarnessSource0);

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
