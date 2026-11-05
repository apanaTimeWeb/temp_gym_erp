import { MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API } from '@/app/frontend_manager/manager_staff_hr/staff_attendance/config/manager_staff_hr_staff_attendance.url_config';
import { http, HttpResponse } from 'msw';

import { MANAGER_HTTP_STATUS } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureHttpStatus';
import { ManagerInfrastructureMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureMockApiUrl';

import { MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_STATUS_VALUES } from '@/app/frontend_manager/manager_staff_hr/staff_attendance/constants/manager_staff_payroll_and_attendance.constants';
import { MOCK_STAFF, MOCK_PAYROLLS, MOCK_HR_SUMMARY, MOCK_LEDGER } from '@/app/frontend_manager/manager_staff_hr/staff_attendance/mocks/fixtures/ManagerStaffAttendanceMockData';
import type { Staff, Payroll } from '@/app/frontend_manager/manager_staff_hr/staff_attendance/types/manager_staff_hr_staff_attendance.types';

let mockStaff = [...MOCK_STAFF];
let mockPayrolls = [...MOCK_PAYROLLS];
let mockLedger = [...MOCK_LEDGER];

let mockStaffIdCounter = 1000;
let mockPayrollIdCounter = 1000;

/**
 * @description Provides the ManagerStaffAttendanceMockHandlers implementation for the hr module.
 * @dependencies @/app/frontend_manager/manager_hr/manager_hr_mocks/manager_hr_mocks_fixtures/ManagerStaffAttendanceMockData; @/app/frontend_manager/manager_hr/manager_hr_url_config; @/app/frontend_manager/manager_infrastructure/manager_infrastructure_constants/ManagerHttpStatus; @/app/frontend_manager/manager_infrastructure/manager_infrastructure_utils/ManagerMockApiUrl; @/app/frontend_manager/manager_hr/manager_hr_types/ManagerStaffPayrollAndAttendanceTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export function resetManagerStaffAttendanceMockState(): void {
  mockStaff = [...MOCK_STAFF];
  mockPayrolls = [...MOCK_PAYROLLS];
  mockLedger = [...MOCK_LEDGER];
  mockStaffIdCounter = 1000;
  mockPayrollIdCounter = 1000;
}

export const managerHrHandlers = [
  http.get(ManagerInfrastructureMockApiUrl(MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API.STAFF_BASE), ({ request }) => {
    const url = new URL(request.url);
    const search = (url.searchParams.get('search') || '').trim().toLowerCase();
    const role = (url.searchParams.get('role') || '').trim().toLowerCase();
    const page = Math.max(Number(url.searchParams.get('page') || '1'), 1);
    const limit = Math.max(Number(url.searchParams.get('limit') || '10'), 1);
    const filtered = mockStaff.filter((staff) => {
      const matchesSearch = !search || [staff.name, staff.email, staff.phone].join(' ').toLowerCase().includes(search);
      const matchesRole = !role || role === 'all' || (staff.role || '').toLowerCase().includes(role);
      return matchesSearch && matchesRole;
    });
    const start = (page - 1) * limit;
    return HttpResponse.json({ success: true, message: 'Success', data: { staff: filtered.slice(start, start + limit), total: filtered.length, page, limit } });
  }),
  http.get(ManagerInfrastructureMockApiUrl(MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API.STAFF_ATTENDANCE_BASE(':staffId')), ({ request }) => {
    const _month = new URL(request.url).searchParams.get('month');
    return HttpResponse.json({ 
      success: true, 
      message: 'Success', 
      data: { 
        history: [
          { date: '2024-05-01', status: MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_STATUS_VALUES.PRESENT_DISPLAY, checkIn: '08:00 AM', checkOut: '05:00 PM' },
          { date: '2024-05-02', status: MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_STATUS_VALUES.PRESENT_DISPLAY, checkIn: '08:15 AM', checkOut: '05:05 PM' },
          { date: '2024-05-03', status: 'Absent' },
          { date: '2024-05-04', status: MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_STATUS_VALUES.LEAVE }
        ] 
      } 
    });
  })
];
