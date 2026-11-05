// RESPONSIBILITY: Defines regression tests for AdminHrPerformanceAnalyticsSortUtils.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_hr/hr_performance_analytics/tests/AdminHrPerformanceAnalyticsSortUtils.test.ts)

import { PERFORMANCE_STATUS_VALUES } from '@/app/frontend_admin/admin_hr/hr_performance_analytics/constants/AdminHrPerformanceAnalyticsConstants';
import { describe, expect, it } from 'vitest';
import { sortAdminHrPerformanceRecords } from '@/app/frontend_admin/admin_hr/hr_performance_analytics/utils/AdminHrPerformanceAnalyticsSortUtils';
import type { StaffPerformanceRecord } from '@/app/frontend_admin/admin_hr/hr_performance_analytics/types/AdminHrPerformanceAnalyticsTypes';

const records: StaffPerformanceRecord[] = [
  { id: '1', name: 'Asha', role: 'Trainer', branchName: 'A', sessionsTaken: 12, membersAdded: 4, attendancePct: 92, rating: 4.2, status: PERFORMANCE_STATUS_VALUES.EXCELLENT },
  { id: '2', name: 'Bharat', role: 'Manager', branchName: 'B', sessionsTaken: 20, membersAdded: 2, attendancePct: 81, rating: 3.8, status: PERFORMANCE_STATUS_VALUES.AVERAGE },
];

describe('sortAdminHrPerformanceRecords', () => {
  it('sorts numeric columns ascending and preserves the input array', () => {
    const sorted = sortAdminHrPerformanceRecords(records, 'sessionsTaken', 'asc');
    expect(sorted.map((record) => record.id)).toEqual(['1', '2']);
    expect(records.map((record) => record.id)).toEqual(['1', '2']);
  });

  it('sorts numeric columns descending', () => {
    const sorted = sortAdminHrPerformanceRecords(records, 'rating', 'desc');
    expect(sorted.map((record) => record.id)).toEqual(['1', '2']);
  });

  it('sorts text columns deterministically', () => {
    const sorted = sortAdminHrPerformanceRecords(records, 'name', 'desc');
    expect(sorted.map((record) => record.name)).toEqual(['Bharat', 'Asha']);
  });
});
