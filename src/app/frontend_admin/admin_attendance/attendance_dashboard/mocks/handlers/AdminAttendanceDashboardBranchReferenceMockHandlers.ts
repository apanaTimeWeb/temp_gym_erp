// RESPONSIBILITY: Owns module-local MSW branch reference handling for Admin attendance.
// DATA FLOW: AdminAttendanceBranchReferenceApi → module-owned handler → module-owned fixture.

import { http, HttpResponse } from 'msw';
import { MOCK_ATTENDANCE_BRANCH_REFERENCES } from '@/app/frontend_admin/admin_attendance/attendance_dashboard/mocks/fixtures/AdminAttendanceDashboardBranchReferenceMockFixtures';
export const adminAttendanceBranchReferenceMockHandlers = [
  http.get('*/admin/branches/fetchBranches', ({ request }) => {
    const url = new URL(request.url);
    if (url.searchParams.get('consumer') !== 'attendance') return;
    return HttpResponse.json({ success: true, message: 'Success', data: { items: MOCK_ATTENDANCE_BRANCH_REFERENCES } , requestId: globalThis.crypto.randomUUID() });
  }),
];
