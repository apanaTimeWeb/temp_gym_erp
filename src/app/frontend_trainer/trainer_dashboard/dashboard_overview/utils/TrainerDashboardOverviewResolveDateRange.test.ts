import { describe, expect, it } from 'vitest';

import { TrainerDashboardResolveDateRange } from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/utils/TrainerDashboardOverviewResolveDateRange';




describe('TrainerDashboardResolveDateRange', () => {
  it('returns a deterministic current-month range', () => {
    const result = TrainerDashboardResolveDateRange('this_month', new Date('2026-09-19T12:00:00Z'));
    expect(result.startDate).toBe('2026-09-01');
    expect(result.endDate).toBe('2026-09-19');
  });

  it('returns the previous month range for last_month', () => {
    const result = TrainerDashboardResolveDateRange('last_month', new Date('2026-09-19T12:00:00Z'));
    expect(result.startDate).toBe('2026-08-01');
    expect(result.endDate).toBe('2026-08-31');
  });
});
