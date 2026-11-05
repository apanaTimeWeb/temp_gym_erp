// DATA FLOW: URL query -> attendance-history filter state -> query hook -> history table; unrelated route state is preserved.
'use client';
import { MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_ROUTES } from '@/app/frontend_manager/manager_staff_hr/staff_attendance/config/manager_staff_hr_staff_attendance.url_config';
import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { ManagerStaffPayrollAndAttendanceBuildAttendanceHistorySearchParams } from '@/app/frontend_manager/manager_staff_hr/staff_attendance/utils/ManagerStaffAttendanceBuildAttendanceHistorySearchParams';

function getCurrentMonth(): string { return new Date().toISOString().slice(0, 7); }

/**
 * @description Owns month and staff filters for the attendance-history view in shareable URL state.
 * @dependencies Uses Next.js router/path/search hooks, the staff-attendance route contract, and the query-preserving search-parameter builder.
 * @edge-case Empty filter values remove only their own query parameter; unrelated route parameters are preserved and updates use router.replace.
 * @returns The resolved month/staff ID and setters that synchronize both values to the URL.
 */
export function useManagerStaffPayrollAndAttendanceAttendanceHistoryUrlState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const month = searchParams.get(MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_ROUTES.QUERY_PARAMS.ATTENDANCE_HISTORY_MONTH) ?? getCurrentMonth();
  const selectedStaffId = searchParams.get(MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_ROUTES.QUERY_PARAMS.ATTENDANCE_HISTORY_STAFF_ID) ?? '';
  const update = useCallback((key: 'month' | 'staffId', value: string | null) => {
    const query = ManagerStaffPayrollAndAttendanceBuildAttendanceHistorySearchParams(searchParams.toString(), key, value);
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [pathname, router, searchParams]);
  const setMonth = useCallback((value: string) => update('month', value || null), [update]);
  const setSelectedStaffId = useCallback((value: string) => update('staffId', value || null), [update]);
  return { month, setMonth, selectedStaffId, setSelectedStaffId };
}
