// RESPONSIBILITY: Exposes the isolated testing-library bootstrap for staff_payroll_and_attendance.
import { render, type RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';
import { ManagerStaffPayrollAndAttendanceHarness } from '@/app/frontend_manager/manager_staff_hr/staff_directory/tests/harness/ManagerStaffDirectoryHarness';

export function renderManagerStaffPayrollAndAttendance(ui: ReactElement, options: Omit<RenderOptions, 'wrapper'> = {}) {
  return render(ui, { ...options, wrapper: ({ children }) => <ManagerStaffPayrollAndAttendanceHarness>{children}</ManagerStaffPayrollAndAttendanceHarness> });
}
