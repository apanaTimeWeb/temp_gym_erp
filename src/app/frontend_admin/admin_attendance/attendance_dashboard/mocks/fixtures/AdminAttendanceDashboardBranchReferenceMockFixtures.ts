// RESPONSIBILITY: Owns branch reference fixture data for Admin attendance.
// DATA FLOW: seed fixtures → module-owned in-memory mock state → MSW handlers/tests → feature query result (admin_attendance/attendance_dashboard/mocks/fixtures/AdminAttendanceDashboardBranchReferenceMockFixtures.ts)

export const MOCK_ATTENDANCE_BRANCH_REFERENCES = [
  { id: 'b1', name: 'Andheri East' },
  { id: 'b2', name: 'Bandra West' },
  { id: 'b3', name: 'Powai' },
  { id: 'b4', name: 'Thane' },
] as const;
