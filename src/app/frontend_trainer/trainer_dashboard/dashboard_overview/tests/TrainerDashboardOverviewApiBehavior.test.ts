import { describe, expect, it, vi } from 'vitest';

import { TrainerDashboardApi } from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/api/TrainerDashboardOverviewApi';

import { TRAINER_DASHBOARD_MOCK_DASHBOARD_STATS } from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/mocks/TrainerDashboardOverviewMockData';




const apiFetch = vi.hoisted(() => vi.fn());
vi.mock('@/lib/api', () => ({ apiFetch }));

describe('Trainer dashboard API behavior', () => {
  it('forwards the selected reporting range and date window', async () => {
    apiFetch.mockResolvedValueOnce({ success: true, requestId: 'dashboard-stats-success', message: 'OK', data: TRAINER_DASHBOARD_MOCK_DASHBOARD_STATS });
    await TrainerDashboardApi.fetchDashboardStats('custom', '2026-09-01', '2026-09-17');
    expect(apiFetch.mock.calls[0][0]).toContain('range=custom');
    expect(apiFetch.mock.calls[0][0]).toContain('startDate=2026-09-01');
    expect(apiFetch.mock.calls[0][0]).toContain('endDate=2026-09-17');
  });
});
