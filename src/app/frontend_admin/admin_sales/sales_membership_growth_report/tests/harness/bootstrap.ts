// RESPONSIBILITY: Defines regression tests for bootstrap; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_sales/sales_membership_growth_report/tests/harness/bootstrap.ts)

/** Standalone MSW bootstrap for admin_sales/sales_membership_growth_report; only module-owned handlers are registered. */
import { setupServer } from 'msw/node';
import { adminSalesMembershipGrowthReportBranchReferenceMockHandlers as AdminSalesMembershipGrowthReportBranchReferenceMockHandlersHarnessSource0 } from '@/app/frontend_admin/admin_sales/sales_membership_growth_report/mocks/handlers/AdminSalesMembershipGrowthReportBranchReferenceMockHandlers';
import { adminSalesMembershipGrowthReportMockHandlers as AdminSalesMembershipGrowthReportMockHandlersHarnessSource1 } from '@/app/frontend_admin/admin_sales/sales_membership_growth_report/mocks/handlers/AdminSalesMembershipGrowthReportMockHandlers';

export const adminFeatureMockServer = setupServer(...AdminSalesMembershipGrowthReportBranchReferenceMockHandlersHarnessSource0, ...AdminSalesMembershipGrowthReportMockHandlersHarnessSource1);

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
