// RESPONSIBILITY: Owns mock-only time-range scaling used by the Admin Branches MSW transport.
// DATA FLOW: seed fixtures → module-owned in-memory mock state → MSW handlers/tests → feature query result (admin_branches/branches_directory/mocks/fixtures/AdminGymsBranchesDirectoryMockConstants.ts)

import type { AdminBranchesTimeRange } from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/types/AdminGymsBranchesDirectoryTimeRangeTypes';

export const BRANCH_TIME_RANGE_MULTIPLIERS: Record<AdminBranchesTimeRange, number> = {
  weekly: 0.25,
  monthly: 1,
  yearly: 12,
  custom: 0.5,
};
