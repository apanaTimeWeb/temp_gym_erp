// RESPONSIBILITY: Defines regression tests for useAdminAttendanceReportsAnalyticsBranchReference.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_attendance/attendance_reports/tests/hooks/useAdminAttendanceReportsAnalyticsBranchReference.test.ts)

import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { useAdminAttendanceReportsBranchReference } from '@/app/frontend_admin/admin_attendance/attendance_reports/hooks/useAdminAttendanceReportsBranchReference';

vi.mock('@tanstack/react-query', () => ({ useQuery: vi.fn() }));

describe('useAdminAttendanceReportsBranchReference', () => {
  it('uses the reports-owned branch reference query', () => {
    const queryResult = { data: ['branch'], status: 'success' };
    vi.mocked(useQuery).mockReturnValue(queryResult as never);
    const { result } = renderHook(() => useAdminAttendanceReportsBranchReference());
    expect(result.current).toBe(queryResult);
    expect(useQuery).toHaveBeenCalledWith(expect.objectContaining({ queryKey: expect.any(Array), staleTime: 300000 }));
  });
});
