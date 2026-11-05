// RESPONSIBILITY: Owns validated Attendance view URL state and legacy QR scanner bookmark migration.
// DATA FLOW: URL query -> validated resolver -> canonical router.replace; closing the scanner preserves unrelated query parameters.
'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';

import { MANAGER_ATTENDANCE_TRACKING_DEFAULT_VIEW, MANAGER_ATTENDANCE_TRACKING_LEGACY_SCANNER_QUERY_PARAM, MANAGER_ATTENDANCE_TRACKING_QR_SCANNER_VIEW_ID, MANAGER_ATTENDANCE_TRACKING_VIEW_QUERY_PARAM } from '@/app/frontend_manager/manager_attendance/attendance_tracking/constants/manager_attendance_tracking_view.constants';
import { isManagerAttendanceTrackingView, resolveManagerAttendanceTrackingView } from '@/app/frontend_manager/manager_attendance/attendance_tracking/utils/ManagerAttendanceTrackingResolveView';

/**
 * @description Resolves the Attendance sub-view from URL state and migrates the legacy QR-scanner bookmark parameter to the canonical view parameter.
 * @dependencies Uses Next.js pathname/router/search params plus the Attendance view constants and resolver.
 * @edge-case Invalid view values and legacy scanner bookmarks are normalized with router.replace while unrelated query parameters are retained; closing the scanner returns to the default view.
 * @returns The resolved view ID, whether the scanner is open, and a URL-preserving closeScanner command.
 */
export function useManagerAttendanceTrackingViewState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const requestedView = searchParams.get(MANAGER_ATTENDANCE_TRACKING_VIEW_QUERY_PARAM);
  const legacyScanner = searchParams.get(MANAGER_ATTENDANCE_TRACKING_LEGACY_SCANNER_QUERY_PARAM) === 'open';
  const view = resolveManagerAttendanceTrackingView(requestedView, legacyScanner);
  const scannerOpen = view === MANAGER_ATTENDANCE_TRACKING_QR_SCANNER_VIEW_ID;

  // Effect rationale: canonicalize invalid/legacy URL state after hydration while preserving unrelated query parameters; router.replace avoids adding a duplicate history entry.
  useEffect(() => {
    const invalidView = requestedView !== null && !isManagerAttendanceTrackingView(requestedView);
    if (!legacyScanner && !invalidView) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set(MANAGER_ATTENDANCE_TRACKING_VIEW_QUERY_PARAM, resolveManagerAttendanceTrackingView(requestedView, legacyScanner));
    params.delete(MANAGER_ATTENDANCE_TRACKING_LEGACY_SCANNER_QUERY_PARAM);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [legacyScanner, pathname, requestedView, router, searchParams]);

  const closeScanner = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(MANAGER_ATTENDANCE_TRACKING_VIEW_QUERY_PARAM, MANAGER_ATTENDANCE_TRACKING_DEFAULT_VIEW);
    params.delete(MANAGER_ATTENDANCE_TRACKING_LEGACY_SCANNER_QUERY_PARAM);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, router, searchParams]);

  return { view, scannerOpen, closeScanner };
}
