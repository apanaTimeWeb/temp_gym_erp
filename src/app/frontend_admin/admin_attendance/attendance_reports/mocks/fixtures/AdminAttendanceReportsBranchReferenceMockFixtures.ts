// RESPONSIBILITY: Owns branch reference fixture data for Admin reports.
// DATA FLOW: seed fixtures → module-owned in-memory mock state → MSW handlers/tests → feature query result (admin_attendance/attendance_reports/mocks/fixtures/AdminAttendanceReportsAnalyticsBranchReferenceMockFixtures.ts)

// Mock-only scope options match the three declared attendance fixtures; these are NOT production branch/gym identity assertions.
export const MOCK_REPORTS_BRANCH_REFERENCES = [
  { id: 'g1', name: 'Downtown Main' },
  { id: 'g2', name: 'Westside Gym' },
  { id: 'g3', name: 'Northside Arena' },
] as const;
