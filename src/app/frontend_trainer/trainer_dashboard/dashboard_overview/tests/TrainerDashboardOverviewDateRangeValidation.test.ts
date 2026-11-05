import { describe, expect, it } from 'vitest';

import { TrainerDashboardIsRealISODate, TrainerDashboardIsValidDateRange } from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/utils/TrainerDashboardOverviewDateRangeValidation';

describe('TrainerDashboardDateRangeValidation', () => {
  it('accepts real ISO calendar dates only', () => {
    expect(TrainerDashboardIsRealISODate('2026-02-28')).toBe(true);
    expect(TrainerDashboardIsRealISODate('2026-02-30')).toBe(false);
    expect(TrainerDashboardIsRealISODate('not-a-date')).toBe(false);
  });
  it('requires complete chronological custom ranges', () => {
    expect(TrainerDashboardIsValidDateRange('2026-01-01', '2026-01-31')).toBe(true);
    expect(TrainerDashboardIsValidDateRange('2026-02-01', '2026-01-31')).toBe(false);
    expect(TrainerDashboardIsValidDateRange('', '2026-01-31')).toBe(false);
    expect(TrainerDashboardIsValidDateRange('2026-01-01', '')).toBe(false);
    expect(TrainerDashboardIsValidDateRange('', '')).toBe(false);
    expect(TrainerDashboardIsValidDateRange('2026-02-30', '2026-03-01')).toBe(false);
    expect(TrainerDashboardIsValidDateRange('not-a-date', '2026-03-01')).toBe(false);
  });
});
