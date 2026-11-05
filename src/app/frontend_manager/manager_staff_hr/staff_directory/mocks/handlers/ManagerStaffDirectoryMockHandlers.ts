import { MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API } from '@/app/frontend_manager/manager_staff_hr/staff_directory/config/manager_staff_hr_staff_directory.url_config';
import { http, HttpResponse } from 'msw';

import { MANAGER_HTTP_STATUS } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureHttpStatus';
import { ManagerInfrastructureMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureMockApiUrl';

import { MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_STATUS_VALUES } from '@/app/frontend_manager/manager_staff_hr/staff_directory/constants/manager_staff_payroll_and_attendance.constants';
import { MOCK_STAFF, MOCK_PAYROLLS, MOCK_HR_SUMMARY, MOCK_LEDGER } from '@/app/frontend_manager/manager_staff_hr/staff_directory/mocks/fixtures/ManagerStaffDirectoryMockData';
import type { Staff, Payroll } from '@/app/frontend_manager/manager_staff_hr/staff_directory/types/manager_staff_hr_staff_directory.types';

let mockStaff = [...MOCK_STAFF];
let mockPayrolls = [...MOCK_PAYROLLS];
let mockLedger = [...MOCK_LEDGER];

let mockStaffIdCounter = 1000;
let mockPayrollIdCounter = 1000;

/**
 * @description Provides the ManagerStaffDirectoryMockHandlers implementation for the hr module.
 * @dependencies @/app/frontend_manager/manager_hr/manager_hr_mocks/manager_hr_mocks_fixtures/ManagerStaffDirectoryMockData; @/app/frontend_manager/manager_hr/manager_hr_url_config; @/app/frontend_manager/manager_infrastructure/manager_infrastructure_constants/ManagerHttpStatus; @/app/frontend_manager/manager_infrastructure/manager_infrastructure_utils/ManagerMockApiUrl; @/app/frontend_manager/manager_hr/manager_hr_types/ManagerStaffPayrollAndAttendanceTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export function resetManagerStaffDirectoryMockState(): void {
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
  http.get(ManagerInfrastructureMockApiUrl(MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API.STAFF_GET_ONE(':id')), ({ params }) => {
    const staff = mockStaff.find(s => s.id === params.id) || mockStaff[0];
    return HttpResponse.json({ success: true, message: 'Success', data: staff });
  }),
  http.post(ManagerInfrastructureMockApiUrl(MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API.STAFF_BASE), async ({ request }) => {
    const body = await request.json() as Partial<Staff>;
    const newStaff = { ...mockStaff[0], ...body, id: `stf-${mockStaffIdCounter++}` } as Staff;
    mockStaff = [newStaff, ...mockStaff];
    return HttpResponse.json({ success: true, message: 'Created', data: newStaff });
  }),
  http.patch(ManagerInfrastructureMockApiUrl(MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API.STAFF_GET_ONE(':id')), async ({ request, params }) => {
    const body = await request.json() as Partial<Staff>;
    const idx = mockStaff.findIndex(s => s.id === params.id);
    if (idx === -1) return HttpResponse.json({ success: false, message: 'Not found' }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
    mockStaff[idx] = { ...mockStaff[idx], ...body } as Staff;
    return HttpResponse.json({ success: true, message: 'Updated', data: mockStaff[idx] });
  }),
  http.delete(ManagerInfrastructureMockApiUrl(MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API.STAFF_GET_ONE(':id')), ({ params }) => {
    mockStaff = mockStaff.filter(s => s.id !== params.id);
    return HttpResponse.json({ success: true, message: 'Removed', data: { id: params.id } });
  })
];
