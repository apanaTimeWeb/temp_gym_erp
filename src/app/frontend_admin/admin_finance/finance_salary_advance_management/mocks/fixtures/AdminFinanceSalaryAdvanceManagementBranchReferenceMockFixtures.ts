// RESPONSIBILITY: Owns branch reference fixture data for Admin Finance SalaryAdvanceManagement.
// DATA FLOW: seed fixtures → module-owned in-memory mock state → MSW handlers/tests → feature query result (admin_finance/finance_salary_advance_management/mocks/fixtures/AdminFinanceSalaryAdvanceManagementBranchReferenceMockFixtures.ts)

export const MOCK_FINANCE_SALARY_ADVANCE_BRANCH_REFERENCES = [
  { id: 'b1', name: 'Downtown Main' },
  { id: 'b2', name: 'Westside Gym' },
  { id: 'b3', name: 'Northside Arena' },
  { id: 'b4', name: 'Eastside Fitness' },
] as const;
