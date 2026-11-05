import { describe, expect, it, vi } from 'vitest';

import { TrainerEarningsApi } from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/api/TrainerEarningsOverviewAndLedgerEarningsApi';

import { TRAINER_EARNINGS_MOCK_EARNINGS_DATA } from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/mocks/fixtures/TrainerEarningsOverviewAndLedgerEarningsMockData';




const apiFetch = vi.hoisted(() => vi.fn());
vi.mock('@/lib/api', () => ({ apiFetch }));

describe('Trainer earnings API behavior', () => {
  it('forwards the selected earnings date window and returns server data', async () => {
    apiFetch.mockResolvedValueOnce({ success: true, requestId: 'earnings-data-success', message: 'OK', data: { ...TRAINER_EARNINGS_MOCK_EARNINGS_DATA, historyTotal: 12, historyPage: 1, historyLimit: 10 } });
    const result = await TrainerEarningsApi.fetchEarningsData('2026-09-01', '2026-09-17');
    expect(apiFetch.mock.calls[0][0]).toContain('startDate=2026-09-01');
    expect(apiFetch.mock.calls[0][0]).toContain('endDate=2026-09-17');
    expect(result.kpis.totalEarnings).toBe(4550000);
  });
});
