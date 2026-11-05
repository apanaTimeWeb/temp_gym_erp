import { fireEvent, render, screen } from '@testing-library/react';

import { beforeEach, describe, expect, it, vi } from 'vitest';

import TrainerSessionsKPIs from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/components/TrainerCoachingSessionsKPIs';

const mocks = vi.hoisted(() => ({
  query: { sessions: [] as unknown[], isPending: true as boolean, isError: false as boolean, refetch: vi.fn() },
  values: { todayCount: 0, completedThisWeek: 0, noShowsThisMonth: 0, avgAttendanceRate: 0 },
}));

vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_sessions/hooks/useTrainerCoachingSessionsKpisQuery', () => ({
  useTrainerSessionsKpisQuery: () => mocks.query,
}));
vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_sessions/hooks/useTrainerCoachingSessionsKpis', () => ({
  useTrainerSessionsKpis: () => mocks.values,
}));

describe('TrainerSessionsKPIs behavior', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.query.isPending = true;
    mocks.query.isError = false;
    mocks.values = { todayCount: 0, completedThisWeek: 0, noShowsThisMonth: 0, avgAttendanceRate: 0 };
  });

  it('shows pending placeholders rather than misleading zero counts', () => {
    render(<TrainerSessionsKPIs />);

    expect(screen.getAllByText('—')).toHaveLength(4);
    expect(screen.getAllByText('—').every((node) => node.getAttribute('data-state') === 'loading')).toBe(true);
  });

  it('keeps failed KPI values as placeholders and exposes an actionable retry', async () => {
    mocks.query.isPending = false;
    mocks.query.isError = true;
    const { rerender } = render(<TrainerSessionsKPIs />);
    rerender(<TrainerSessionsKPIs />);

    expect(screen.getAllByText('—')).toHaveLength(4);
    expect(screen.getAllByRole('alert')).toHaveLength(1);
    fireEvent.click(screen.getByRole('button', { name: 'TEXT_RETRY' }));
    expect(mocks.query.refetch).toHaveBeenCalledTimes(1);
  });
});
