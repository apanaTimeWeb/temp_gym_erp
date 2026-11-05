// RESPONSIBILITY: Exposes the isolated testing-library bootstrap for attendance_tracking.
import { render, type RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';
import { ManagerAttendanceTrackingHarness } from '@/app/frontend_manager/manager_attendance/attendance_tracking/tests/harness/ManagerAttendanceTrackingHarness';

export function renderManagerAttendanceTracking(ui: ReactElement, options: Omit<RenderOptions, 'wrapper'> = {}) {
  return render(ui, { ...options, wrapper: ({ children }) => <ManagerAttendanceTrackingHarness>{children}</ManagerAttendanceTrackingHarness> });
}
