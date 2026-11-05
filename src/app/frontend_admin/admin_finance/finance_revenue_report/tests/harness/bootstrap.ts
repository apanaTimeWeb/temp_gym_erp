// RESPONSIBILITY: Defines regression tests for bootstrap; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_finance/finance_revenue_report/tests/harness/bootstrap.ts)

/** Standalone MSW bootstrap for admin_reports/finance_revenue_report; only module-owned handlers are registered. */
import { setupServer } from 'msw/node';
import { adminFinanceRevenueReportBranchReferenceMockHandlers as AdminFinanceRevenueReportBranchReferenceMockHandlersHarnessSource0 } from '@/app/frontend_admin/admin_finance/finance_revenue_report/mocks/handlers/AdminFinanceRevenueReportBranchReferenceMockHandlers';
import { adminFinanceRevenueReportMockHandlers as AdminFinanceRevenueReportMockHandlersHarnessSource1 } from '@/app/frontend_admin/admin_finance/finance_revenue_report/mocks/handlers/AdminFinanceRevenueReportMockHandlers';

export const adminFeatureMockServer = setupServer(...AdminFinanceRevenueReportBranchReferenceMockHandlersHarnessSource0, ...AdminFinanceRevenueReportMockHandlersHarnessSource1);

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
