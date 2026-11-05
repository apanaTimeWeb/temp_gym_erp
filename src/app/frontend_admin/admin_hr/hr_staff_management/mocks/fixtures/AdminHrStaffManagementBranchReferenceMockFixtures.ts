// RESPONSIBILITY: Owns branch reference fixture data for Admin hr.
// DATA FLOW: seed fixtures → module-owned in-memory mock state → MSW handlers/tests → feature query result (admin_hr/hr_staff_management/mocks/fixtures/AdminHrManagementBranchReferenceMockFixtures.ts)

export const MOCK_HR_BRANCH_REFERENCES = [
  { id: 'b1', name: 'Downtown Main' },
  { id: 'b2', name: 'Westside Gym' },
  { id: 'b3', name: 'Northside Arena' },
  { id: 'b4', name: 'Eastside Fitness' },
] as const;
