// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
import { MANAGER_TRAINER_SCHEDULE_API } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/config/manager_trainer_schedule.url_config';
import { render, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';

import { MANAGER_HTTP_STATUS } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureHttpStatus';
import { ManagerInfrastructureMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureMockApiUrl';
import { ManagerMocksTestProviders } from '@/app/frontend_manager/manager_infrastructure/mocks/ManagerMocksTestProviders';
import { managerMswServer } from '@/app/frontend_manager/manager_infrastructure/mocks/ManagerMocksMswTestServer';



import { ManagerTrainerScheduleApi } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/api/manager_trainer_schedule.api';
import ManagerTrainerScheduleMain from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/components/ManagerTrainerScheduleMain';

beforeAll(() => managerMswServer.listen({ onUnhandledRequest: 'error' }));
afterEach(() => managerMswServer.resetHandlers());
afterAll(() => managerMswServer.close());

describe('Manager Schedule user-visible behavior', () => {
  it('renders the real feature UI against module MSW handlers', async () => {
    render(<ManagerMocksTestProviders><ManagerTrainerScheduleMain /></ManagerMocksTestProviders>);
    expect(await screen.findByText('Trainer Schedule')).toBeInTheDocument();
    expect(await screen.findByText('Vikram Singh')).toBeInTheDocument();
  });

  it('proves module MSW supplies non-placeholder API data', async () => {
    const response = await ManagerTrainerScheduleApi.fetchSchedule({ page: '1', limit: '10' });
    expect(response.success).toBe(true);
    expect(response.data?.trainers?.length ?? 0).toBeGreaterThan(0);
  });
it('renders the schedule empty search state from an MSW response', async () => {
    managerMswServer.use(
      http.get(ManagerInfrastructureMockApiUrl(MANAGER_TRAINER_SCHEDULE_API.BASE), () => HttpResponse.json({ success: true, message: 'Empty result', data: { trainers: [], kpis: { totalTrainers: 0, trainersOnDutyToday: 0, trainersOnLeaveToday: 0, totalShiftsThisWeek: 0, totalClassesThisWeek: 0, avgOccupancyRate: 0, totalEnrolledMembers: 0 } } }))
    );
    render(<ManagerMocksTestProviders><ManagerTrainerScheduleMain /></ManagerMocksTestProviders>);
    expect(await screen.findByText('No trainers found')).toBeInTheDocument();
  });

  it('renders the schedule error state from an MSW failure', async () => {
    managerMswServer.use(
      http.get(ManagerInfrastructureMockApiUrl(MANAGER_TRAINER_SCHEDULE_API.BASE), () => HttpResponse.json({ success: false, message: 'Simulated failure', data: null }, { status: MANAGER_HTTP_STATUS.SERVER_ERROR }))
    );
    render(<ManagerMocksTestProviders><ManagerTrainerScheduleMain /></ManagerMocksTestProviders>);
    expect((await screen.findAllByText(/Simulated failure|Unable to complete the request/i)).length).toBeGreaterThan(0);
  });

  it('proves schedule search changes the rendered trainer cards', async () => {
    const { default: userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    render(<ManagerMocksTestProviders><ManagerTrainerScheduleMain /></ManagerMocksTestProviders>);
    expect(await screen.findByText('Vikram Singh')).toBeInTheDocument();
    const search = await screen.findByPlaceholderText('Search trainer...');
    await user.clear(search);
    await user.type(search, 'ZZZ-No-Such-Trainer', { delay: 1 });
    expect(await screen.findByText('No trainers match your search.', {}, { timeout: 3000 })).toBeInTheDocument();
  }, 10000);

});
