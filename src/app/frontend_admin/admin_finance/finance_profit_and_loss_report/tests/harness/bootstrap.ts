// RESPONSIBILITY: Defines regression tests for bootstrap; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_finance/finance_profit_and_loss_report/tests/harness/bootstrap.ts)

/** Standalone MSW bootstrap for admin_reports/finance_profit_and_loss_report; only module-owned handlers are registered. */
import { setupServer } from 'msw/node';
import { adminFinanceProfitAndLossReportBranchReferenceMockHandlers as AdminFinanceProfitAndLossReportBranchReferenceMockHandlersHarnessSource0 } from '@/app/frontend_admin/admin_finance/finance_profit_and_loss_report/mocks/handlers/AdminFinanceProfitAndLossReportBranchReferenceMockHandlers';
import { adminFinanceProfitAndLossReportMockHandlers as AdminFinanceProfitAndLossReportMockHandlersHarnessSource1 } from '@/app/frontend_admin/admin_finance/finance_profit_and_loss_report/mocks/handlers/AdminFinanceProfitAndLossReportMockHandlers';

export const adminFeatureMockServer = setupServer(...AdminFinanceProfitAndLossReportBranchReferenceMockHandlersHarnessSource0, ...AdminFinanceProfitAndLossReportMockHandlersHarnessSource1);

export function startAdminFeatureMockServer(): void {
  adminFeatureMockServer.listen({ onUnhandledRequest: 'error' });
}
export function resetAdminFeatureMockServer(): void {
  adminFeatureMockServer.resetHandlers();
}
export function stopAdminFeatureMockServer(): void {
  adminFeatureMockServer.close();
}
export const adminFeatureScenarioHandlerCount = 2;
