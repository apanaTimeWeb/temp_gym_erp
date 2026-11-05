// RESPONSIBILITY: Defines regression tests for useAdminHrPerformanceAnalyticsLogic.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_hr/hr_performance_analytics/tests/useAdminHrPerformanceAnalyticsLogic.test.ts)

import { PERFORMANCE_STATUS_VALUES } from '@/app/frontend_admin/admin_hr/hr_performance_analytics/constants/AdminHrPerformanceAnalyticsConstants';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { useAdminHrPerformanceLogic } from '@/app/frontend_admin/admin_hr/hr_performance_analytics/hooks/useAdminHrPerformanceAnalyticsLogic';

vi.mock('@tanstack/react-query', () => ({ useQuery: vi.fn() }));
vi.mock('@/app/frontend_admin/admin_hr/hr_performance_analytics/hooks/useAdminHrPerformanceAnalyticsDebounce', () => ({ useAdminHrPerformanceDebounce: (value: string) => value }));
vi.mock('@/app/frontend_admin/admin_hr/hr_performance_analytics/hooks/useAdminHrPerformanceAnalyticsUrlQuerySync', () => ({ useAdminHrPerformanceUrlQuerySync: vi.fn() }));

describe('useAdminHrPerformanceLogic', () => {
  beforeEach(() => vi.mocked(useQuery).mockReturnValue({
    data: { data: [
      { id: 's1', name: 'Aman', role: 'Trainer', branchName: 'A', sessionsTaken: 10, membersAdded: 4, attendancePct: 80, rating: 4.5, status: PERFORMANCE_STATUS_VALUES.EXCELLENT },
      { id: 's2', name: 'Riya', role: 'Trainer', branchName: 'B', sessionsTaken: 5, membersAdded: 2, attendancePct: 60, rating: 3.5, status: PERFORMANCE_STATUS_VALUES.POOR },
    ] }, isPending: false, isError: false,
  } as never));

  it('derives KPI aggregates from server records and supports sort-direction toggling', () => {
    const { result } = renderHook(() => useAdminHrPerformanceLogic());
    expect(result.current.aggregates).toEqual({ totalSessions: 15, totalMembersAdded: 6, avgAttendance: 70, avgRating: 4, topPerformersCount: 1, lowPerformersCount: 1 });
    expect(result.current.sortedData[0]?.name).toBe('Aman');
    act(() => result.current.handleSort('rating'));
    expect(result.current.sortDir).toBe('asc');
  });
});
