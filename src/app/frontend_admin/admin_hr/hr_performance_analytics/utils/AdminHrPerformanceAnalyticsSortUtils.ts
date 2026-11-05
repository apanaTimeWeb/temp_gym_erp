// RESPONSIBILITY: Pure sorting for HR staff-performance records so ordering behavior is independently testable.
// DATA FLOW: verified feature data → focused utility → formatted/normalized result → owning component or hook (admin_hr/hr_performance_analytics/utils/AdminHrPerformanceAnalyticsSortUtils.ts)

import type { PerformanceSortDirection, PerformanceSortKey, StaffPerformanceRecord } from '@/app/frontend_admin/admin_hr/hr_performance_analytics/types/AdminHrPerformanceAnalyticsTypes';

/** sortAdminHrPerformanceRecords provides a feature-local utility used by the Admin module without introducing cross-feature business dependencies. @remarks Inputs and outputs stay explicitly typed and deterministic for tests and reuse inside this feature. @description Implements sortAdminHrPerformanceRecords for the owning feature’s explicitly typed data. @param records - Input used by this utility as declared by the signature. @param sortKey - Input used by this utility as declared by the signature. @param sortDir - Input used by this utility as declared by the signature. @returns The typed result declared by the function signature. */
export function sortAdminHrPerformanceRecords(
  records: readonly StaffPerformanceRecord[],
  sortKey: PerformanceSortKey,
  sortDir: PerformanceSortDirection,
): StaffPerformanceRecord[] {
  return [...records].sort((left, right) => {
    const leftValue = left[sortKey];
    const rightValue = right[sortKey];
    const base = typeof leftValue === 'number' && typeof rightValue === 'number'
      ? leftValue - rightValue
      : String(leftValue).localeCompare(String(rightValue), undefined, { numeric: true });
    return sortDir === 'asc' ? base : -base;
  });
}
