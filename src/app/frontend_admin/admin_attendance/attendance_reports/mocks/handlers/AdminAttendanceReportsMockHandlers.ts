// RESPONSIBILITY: MSW mocks only the attendance endpoint owned by this leaf; export remains blocked pending a verified binary contract.
import { http, HttpResponse } from 'msw';
import { getAdminAttendanceReportsFixture } from '@/app/frontend_admin/admin_attendance/attendance_reports/mocks/fixtures/AdminAttendanceReportsMockFixtures';

const ok = <T,>(data: T) => HttpResponse.json({ success: true, message: 'Success', data, requestId: globalThis.crypto.randomUUID() });

export const adminAttendanceReportsMockHandlers = [
  http.get('*/admin/reports/attendance', ({ request }) => {
    const url = new URL(request.url);
    const fixture = getAdminAttendanceReportsFixture({ gymId: url.searchParams.get('branchId') ?? 'all', from: url.searchParams.get('from') ?? '', to: url.searchParams.get('to') ?? '' });
    return ok(fixture);
  }),
];
