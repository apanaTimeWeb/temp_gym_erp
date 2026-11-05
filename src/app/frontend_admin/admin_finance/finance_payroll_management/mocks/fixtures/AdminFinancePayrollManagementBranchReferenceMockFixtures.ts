// RESPONSIBILITY: Owns branch reference fixture data for Admin Finance PayrollManagement.
// DATA FLOW: seed fixtures → module-owned in-memory mock state → MSW handlers/tests → feature query result (admin_finance/finance_payroll_management/mocks/fixtures/AdminFinancePayrollManagementBranchReferenceMockFixtures.ts)

export const MOCK_FINANCE_PAYROLL_BRANCH_REFERENCES = [
  { id: 'b1', name: 'Downtown Main' },
  { id: 'b2', name: 'Westside Gym' },
  { id: 'b3', name: 'Northside Arena' },
  { id: 'b4', name: 'Eastside Fitness' },
] as const;
