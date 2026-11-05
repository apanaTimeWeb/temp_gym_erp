import { beforeEach, describe, expect, it, vi } from 'vitest';

const useQuery = vi.fn();
const useSearchParams = vi.fn();
const fetchDashboardStats = vi.fn();

vi.mock('@tanstack/react-query', () => ({ useQuery }));
vi.mock('next/navigation', () => ({ useSearchParams }));
vi.mock('@/app/frontend_trainer/trainer_dashboard/dashboard_overview/api/TrainerDashboardOverviewApi', () => ({ TrainerDashboardApi: { fetchDashboardStats } }));

describe('useTrainerDashboardQuery', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useQuery.mockImplementation((options) => options);
  });

  it('defaults a missing URL range to this_month', async () => {
    useSearchParams.mockReturnValue(new URLSearchParams(''));
    const { useTrainerDashboardQuery } = await import('@/app/frontend_trainer/trainer_dashboard/dashboard_overview/hooks/useTrainerDashboardOverviewQuery');

    const result = useTrainerDashboardQuery();

    expect(JSON.stringify(result.queryKey)).toContain('this_month');
    expect(result.enabled).toBe(true);
  });

  it.each(['this_month', 'last_month', 'last_3_months', 'last_6_months', 'this_year'])('preserves the supported preset %s', async (range) => {
    useSearchParams.mockReturnValue(new URLSearchParams(`range=${range}`));
    const { useTrainerDashboardQuery } = await import('@/app/frontend_trainer/trainer_dashboard/dashboard_overview/hooks/useTrainerDashboardOverviewQuery');

    const result = useTrainerDashboardQuery();

    expect(JSON.stringify(result.queryKey)).toContain(range);
    expect(result.enabled).toBe(true);
  });

  it('normalizes unsupported URL range values before query key or API use', async () => {
    useSearchParams.mockReturnValue(new URLSearchParams('range=last_30_days&startDate=2026-09-01&endDate=2026-09-30'));
    const { useTrainerDashboardQuery } = await import('@/app/frontend_trainer/trainer_dashboard/dashboard_overview/hooks/useTrainerDashboardOverviewQuery');

    const result = useTrainerDashboardQuery();
    const serializedKey = JSON.stringify(result.queryKey);

    expect(serializedKey).toContain('this_month');
    expect(serializedKey).not.toContain('last_30_days');
    expect(result.enabled).toBe(true);
    expect(result.queryFn).toBeTypeOf('function');
  });

  it('does not execute the query for an incomplete custom date range', async () => {
    useSearchParams.mockReturnValue(new URLSearchParams('range=custom&startDate=2026-09-01'));
    const { useTrainerDashboardQuery } = await import('@/app/frontend_trainer/trainer_dashboard/dashboard_overview/hooks/useTrainerDashboardOverviewQuery');

    const result = useTrainerDashboardQuery();

    expect(result.queryKey).toEqual(['trainer_dashboard', 'stats', { range: 'custom', startDate: '2026-09-01', endDate: '' }]);
    expect(result.enabled).toBe(false);
  });

  it('does not execute the query for a reversed custom date range', async () => {
    useSearchParams.mockReturnValue(new URLSearchParams('range=custom&startDate=2026-10-01&endDate=2026-09-30'));
    const { useTrainerDashboardQuery } = await import('@/app/frontend_trainer/trainer_dashboard/dashboard_overview/hooks/useTrainerDashboardOverviewQuery');

    const result = useTrainerDashboardQuery();

    expect(result.enabled).toBe(false);
  });

  it('allows a complete chronological custom date range', async () => {
    useSearchParams.mockReturnValue(new URLSearchParams('range=custom&startDate=2026-09-01&endDate=2026-09-30'));
    const { useTrainerDashboardQuery } = await import('@/app/frontend_trainer/trainer_dashboard/dashboard_overview/hooks/useTrainerDashboardOverviewQuery');

    const result = useTrainerDashboardQuery();

    expect(result.enabled).toBe(true);
    expect(JSON.stringify(result.queryKey)).toContain('2026-09-01');
    expect(JSON.stringify(result.queryKey)).toContain('2026-09-30');
  });


  it.each([
    'range=custom',
    'range=custom&startDate=2026-02-30&endDate=2026-03-01',
    'range=custom&startDate=not-a-date&endDate=2026-03-01',
  ])('does not execute custom-range queries for incomplete or invalid dates (%s)', async (query) => {
    useSearchParams.mockReturnValue(new URLSearchParams(query));
    const { useTrainerDashboardQuery } = await import('@/app/frontend_trainer/trainer_dashboard/dashboard_overview/hooks/useTrainerDashboardOverviewQuery');

    const result = useTrainerDashboardQuery();

    expect(result.enabled).toBe(false);
  });

});
