// RESPONSIBILITY: Defines regression tests for bootstrap; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_finance/finance_salary_advance_management/tests/harness/bootstrap.ts)

/** Standalone MSW bootstrap for admin_finance/finance_salary_advance_management; only module-owned handlers are registered. */
import { setupServer } from 'msw/node';
import { adminFinanceSalaryAdvanceManagementBranchReferenceMockHandlers as adminFinanceSalaryAdvanceManagementBranchReferenceMockHandlersHarnessSource0 } from '@/app/frontend_admin/admin_finance/finance_salary_advance_management/mocks/handlers/AdminFinanceSalaryAdvanceManagementBranchReferenceMockHandlers';
import { adminFinanceSalaryAdvanceManagementMockHandlers as adminFinanceSalaryAdvanceManagementMockHandlersHarnessSource1 } from '@/app/frontend_admin/admin_finance/finance_salary_advance_management/mocks/handlers/AdminFinanceSalaryAdvanceManagementMockHandlers';

export const adminFeatureMockServer = setupServer(...adminFinanceSalaryAdvanceManagementBranchReferenceMockHandlersHarnessSource0, ...adminFinanceSalaryAdvanceManagementMockHandlersHarnessSource1);

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
