// RESPONSIBILITY: Owns module-local fixture or mock-state data for hr_performance_analytics; it does not persist production business entities.
// DATA FLOW: seed fixtures → module-owned in-memory mock state → MSW handlers/tests → feature query result (admin_hr/hr_performance_analytics/mocks/fixtures/AdminHrPerformanceAnalyticsMockFixtures.ts)

import { PERFORMANCE_STATUS_VALUES } from '@/app/frontend_admin/admin_hr/hr_performance_analytics/constants/AdminHrPerformanceAnalyticsConstants';
import type { StaffPerformanceRecord } from '@/app/frontend_admin/admin_hr/hr_performance_analytics/types/AdminHrPerformanceAnalyticsTypes';

export const MOCK_ADMIN_STAFF_PERFORMANCE: StaffPerformanceRecord[] = [
  {
    id: 's1', name: 'Rahul Sharma', role: 'Manager', branchName: 'Downtown Main',
    sessionsTaken: 0, membersAdded: 15, attendancePct: 98.5, rating: 4.8, status: PERFORMANCE_STATUS_VALUES.EXCELLENT
  },
  {
    id: 's2', name: 'Priya Singh', role: 'Trainer', branchName: 'Westside Gym',
    sessionsTaken: 45, membersAdded: 5, attendancePct: 95.0, rating: 4.5, status: PERFORMANCE_STATUS_VALUES.EXCELLENT
  }
];
