// DATA FLOW: seed fixtures → module-owned in-memory mock state → MSW handlers/tests → feature query result (admin_profile/profile_overview/mocks/fixtures/AdminProfileOverviewMockFixtures.ts)
// RESPONSIBILITY: Owns module-specific MSW fixture data for the Admin profile feature.
import type { AdminProfileData } from '@/app/frontend_admin/admin_profile/profile_overview/types/AdminProfileOverviewTypes';

// RESPONSIBILITY: Owns module-specific MSW fixture data for the Admin profile feature.

export const MOCK_ADMIN_PROFILE: AdminProfileData = {
  id: 'admin1',
  name: 'Admin User',
  email: 'admin@smartgym.com',
  phone: '9876543210',
  role: 'Admin',
  branchName: 'All Branches',
  joinedAt: '2026-01-01T00:00:00Z',
  avatarInitial: 'A',
};


// --- From AdminReportsMockData.ts ---
