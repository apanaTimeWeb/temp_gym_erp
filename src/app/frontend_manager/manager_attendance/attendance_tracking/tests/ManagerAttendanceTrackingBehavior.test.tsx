// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
import { MANAGER_ATTENDANCE_TRACKING_API } from '@/app/frontend_manager/manager_attendance/attendance_tracking/config/manager_attendance_tracking.url_config';
import { render, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';

import { MANAGER_HTTP_STATUS } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureHttpStatus';
import { ManagerInfrastructureMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureMockApiUrl';
import { ManagerMocksTestProviders } from '@/app/frontend_manager/manager_infrastructure/mocks/ManagerMocksTestProviders';
import { managerMswServer } from '@/app/frontend_manager/manager_infrastructure/mocks/ManagerMocksMswTestServer';



import { ManagerAttendanceTrackingApi } from '@/app/frontend_manager/manager_attendance/attendance_tracking/api/manager_attendance_tracking.api';
import ManagerAttendanceTrackingMain from '@/app/frontend_manager/manager_attendance/attendance_tracking/components/ManagerAttendanceTrackingMain';

beforeAll(() => managerMswServer.listen({ onUnhandledRequest: 'error' }));
afterEach(() => managerMswServer.resetHandlers());
afterAll(() => managerMswServer.close());

describe('Manager Attendance user-visible behavior', () => {
  it('renders the real feature UI against module MSW handlers', async () => {
    render(<ManagerMocksTestProviders><ManagerAttendanceTrackingMain /></ManagerMocksTestProviders>);
    expect(await screen.findByText('Attendance')).toBeInTheDocument();
    expect(await screen.findByText('Rahul Sharma')).toBeInTheDocument();
  });

  it('proves module MSW supplies non-placeholder API data', async () => {
    const response = await ManagerAttendanceTrackingApi.fetchAttendanceRecords({ page: '1', limit: '10' });
    expect(response.success).toBe(true);
    expect(response.data?.attendances?.length ?? 0).toBeGreaterThan(0);
  });
it('renders the attendance empty state from an MSW response', async () => {
    managerMswServer.use(
      http.get(ManagerInfrastructureMockApiUrl(MANAGER_ATTENDANCE_TRACKING_API.BASE), () => HttpResponse.json({ success: true, message: 'Empty result', data: { attendances: [], total: 0, page: 1, limit: 10 } }))
    );
    render(<ManagerMocksTestProviders><ManagerAttendanceTrackingMain /></ManagerMocksTestProviders>);
    expect(await screen.findByText('No attendance records')).toBeInTheDocument();
  });

  it('renders the attendance error state from an MSW failure', async () => {
    managerMswServer.use(
      http.get(ManagerInfrastructureMockApiUrl(MANAGER_ATTENDANCE_TRACKING_API.BASE), () => HttpResponse.json({ success: false, message: 'Simulated failure', data: null }, { status: MANAGER_HTTP_STATUS.SERVER_ERROR }))
    );
    render(<ManagerMocksTestProviders><ManagerAttendanceTrackingMain /></ManagerMocksTestProviders>);
    expect(await screen.findByText('Failed to load attendance records.')).toBeInTheDocument();
  });

  it('proves attendance search changes the rendered dataset through the real UI', async () => {
    const { default: userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    render(<ManagerMocksTestProviders><ManagerAttendanceTrackingMain /></ManagerMocksTestProviders>);
    expect(await screen.findByText('Rahul Sharma')).toBeInTheDocument();
    const search = await screen.findByPlaceholderText('Search Member...');
    await user.clear(search);
    await user.type(search, 'ZZZ-No-Such-Member');
    expect(await screen.findByText('No attendance records')).toBeInTheDocument();
    expect(screen.queryByText('Rahul Sharma')).not.toBeInTheDocument();
  });

});
