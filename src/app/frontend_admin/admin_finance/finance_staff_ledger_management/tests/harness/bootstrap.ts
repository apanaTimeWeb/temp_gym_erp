// RESPONSIBILITY: Defines regression tests for bootstrap; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_finance/finance_staff_ledger_management/tests/harness/bootstrap.ts)

/** Standalone MSW bootstrap for admin_finance/finance_staff_ledger_management; only module-owned handlers are registered. */
import { setupServer } from 'msw/node';
import { adminFinanceStaffLedgerManagementBranchReferenceMockHandlers as adminFinanceStaffLedgerManagementBranchReferenceMockHandlersHarnessSource0 } from '@/app/frontend_admin/admin_finance/finance_staff_ledger_management/mocks/handlers/AdminFinanceStaffLedgerManagementBranchReferenceMockHandlers';
import { adminFinanceStaffLedgerManagementMockHandlers as adminFinanceStaffLedgerManagementMockHandlersHarnessSource1 } from '@/app/frontend_admin/admin_finance/finance_staff_ledger_management/mocks/handlers/AdminFinanceStaffLedgerManagementMockHandlers';

export const adminFeatureMockServer = setupServer(...adminFinanceStaffLedgerManagementBranchReferenceMockHandlersHarnessSource0, ...adminFinanceStaffLedgerManagementMockHandlersHarnessSource1);

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
