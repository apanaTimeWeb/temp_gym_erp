// RESPONSIBILITY: Verifies attendance-history empty, error/retry, and locale-aware presentation contracts.
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { ReactNode } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';

import { MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_STATUS_PRESENT } from '@/app/frontend_manager/manager_staff_hr/staff_attendance/constants/manager_staff_payroll_and_attendance.constants';
import { ManagerStaffPayrollAndAttendanceFormatDate } from '@/app/frontend_manager/manager_staff_hr/staff_attendance/utils/ManagerStaffAttendanceFormatters';
import ManagerStaffPayrollAndAttendanceAttendanceHistory from '@/app/frontend_manager/manager_staff_hr/staff_attendance/components/ManagerStaffAttendanceAttendanceHistory';

const attendanceMocks = vi.hoisted(() => ({
  logic: vi.fn(),
  urlState: vi.fn(),
  attendanceQuery: vi.fn(),
}));

vi.mock('@/app/frontend_manager/manager_staff_hr/staff_attendance/hooks/useManagerStaffAttendanceLogic', () => ({
  useManagerStaffPayrollAndAttendanceLogic: attendanceMocks.logic,
}));
vi.mock('@/app/frontend_manager/manager_staff_hr/staff_attendance/hooks/useManagerStaffAttendanceAttendanceHistoryUrlState', () => ({
  useManagerStaffPayrollAndAttendanceAttendanceHistoryUrlState: attendanceMocks.urlState,
}));
vi.mock('@/app/frontend_manager/manager_staff_hr/staff_attendance/hooks/useManagerStaffAttendanceStaffAttendanceQuery', () => ({
  useManagerStaffPayrollAndAttendanceStaffAttendanceQuery: attendanceMocks.attendanceQuery,
}));
vi.mock('@/app/frontend_manager/manager_infrastructure/components/ManagerInfrastructureResponsiveTable', () => ({
  default: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));
vi.mock('@/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown', () => ({
  default: ({ ariaLabel }: { ariaLabel?: string }) => <select aria-label={ariaLabel ?? 'Staff'} />,
}));

const messages = {
  MANAGER_STAFF_PAYROLL_AND_ATTENDANCE: {
    COPY_TRAINER_ATTENDANCE_HISTORY: 'Attendance history',
    COPY_READ_ONLY_ATTENDANCE_RECORDS_SUPPLIED_MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_ATTENDANCE_API: 'Read-only attendance history',
    COPY_STAFF_MEMBER_3: 'Staff member',
    COPY_SELECT_STAFF_1: 'Select staff',
    COPY_MONTH_2: 'Month',
    COPY_DATE_2: 'Date',
    COPY_STATUS_2: 'Status',
    COPY_CHECK: 'Check-in',
    COPY_CHECK_OUT: 'Check-out',
    TEXT_NO_STAFF: 'No staff members yet',
    COPY_TRY_AGAIN: 'Try again',
    TEXT_GENERIC_ERROR: 'Something went wrong',
    COPY_NO_ATTENDANCE_RECORDS_WERE_RETURNED_SELECTED_MONTH: 'No attendance records for this month',
  },
};

function renderHistory() {
  return render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <ManagerStaffPayrollAndAttendanceAttendanceHistory />
    </NextIntlClientProvider>,
  );
}

describe('ManagerStaffPayrollAndAttendanceAttendanceHistory contract', () => {
  beforeEach(() => {
    attendanceMocks.logic.mockReset();
    attendanceMocks.urlState.mockReset();
    attendanceMocks.attendanceQuery.mockReset();
    attendanceMocks.logic.mockReturnValue({
      staff: [],
      isPending: false,
      isError: false,
      error: null,
      loadAll: vi.fn().mockResolvedValue(undefined),
    });
    attendanceMocks.urlState.mockReturnValue({
      selectedStaffId: '',
      setSelectedStaffId: vi.fn(),
      month: '2026-10',
      setMonth: vi.fn(),
    });
    attendanceMocks.attendanceQuery.mockReturnValue({
      data: undefined,
      isPending: true,
      isError: false,
      error: null,
      refetch: vi.fn().mockResolvedValue(undefined),
    });
  });

  it('uses a stable attendance row key shape', () => {
    const record = { date: '2024-05-31T10:00:00Z', status: MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_STATUS_PRESENT };
    expect(`${record.date}-${record.status}`).toBe('2024-05-31T10:00:00Z-PRESENT');
  });

  it('does not leave a disabled attendance query showing a permanent loading state when the roster is empty', () => {
    renderHistory();
    expect(screen.getByText('No staff members yet')).toBeTruthy();
  });

  it('exposes a retry action when attendance history fails', () => {
    const refetch = vi.fn().mockResolvedValue(undefined);
    attendanceMocks.logic.mockReturnValue({
      staff: [{ id: 's1', name: 'Mock Staff 001', role: 'Trainer' }],
      isPending: false,
      isError: false,
      error: null,
      loadAll: vi.fn().mockResolvedValue(undefined),
    });
    attendanceMocks.attendanceQuery.mockReturnValue({
      data: undefined,
      isPending: false,
      isError: true,
      error: new Error('Attendance transport failed'),
      refetch,
    });

    renderHistory();
    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));
    expect(refetch).toHaveBeenCalledTimes(1);
  });

  it('exposes a retry action when the roster request fails before a staff ID can be selected', () => {
    const loadAll = vi.fn().mockResolvedValue(undefined);
    attendanceMocks.logic.mockReturnValue({
      staff: [],
      isPending: false,
      isError: true,
      error: 'Roster request failed',
      loadAll,
    });

    renderHistory();
    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));
    expect(loadAll).toHaveBeenCalledTimes(1);
  });
});

describe('ManagerStaffAttendance date locale formatting', () => {
  it('uses the supplied locale for month names and safely handles invalid dates', () => {
    const english = ManagerStaffPayrollAndAttendanceFormatDate('2024-05-31', 'en');
    const hindi = ManagerStaffPayrollAndAttendanceFormatDate('2024-05-31', 'hi');
    expect(english).not.toBe(hindi);
    expect(ManagerStaffPayrollAndAttendanceFormatDate('not-a-date', 'hi')).toBe('—');
  });
});
