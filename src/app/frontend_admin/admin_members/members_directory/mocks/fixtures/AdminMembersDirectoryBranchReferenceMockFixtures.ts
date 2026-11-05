// RESPONSIBILITY: Owns branch reference fixture data for Admin members.
// DATA FLOW: seed fixtures → module-owned in-memory mock state → MSW handlers/tests → feature query result (admin_members/members_directory/mocks/fixtures/AdminMembersDirectoryBranchReferenceMockFixtures.ts)

export const MOCK_MEMBERS_BRANCH_REFERENCES = [
  { id: 'b1', name: 'Downtown Main' },
  { id: 'b2', name: 'Westside Gym' },
  { id: 'b3', name: 'Northside Arena' },
  { id: 'b4', name: 'Eastside Fitness' },
] as const;
