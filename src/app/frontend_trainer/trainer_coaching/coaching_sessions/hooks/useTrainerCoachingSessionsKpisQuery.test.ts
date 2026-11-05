import { describe, expect, it } from 'vitest';

import { getTrainerSessionsKpiQueryDates } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/hooks/useTrainerCoachingSessionsKpisQuery';

describe('getTrainerSessionsKpiQueryDates', () => {
  it('covers the entire current month and any current-week days outside that month', () => {
    const dates = getTrainerSessionsKpiQueryDates(new Date(2026, 9, 4, 12, 0, 0));
    expect(dates[0]).toBe('2026-09-28');
    expect(dates[dates.length - 1]).toBe('2026-10-31');
    expect(dates).toHaveLength(34);
    expect(dates).toContain('2026-10-04');
    expect(dates).toContain('2026-10-31');
  });

  it('covers a week that crosses into the next month', () => {
    const dates = getTrainerSessionsKpiQueryDates(new Date(2026, 9, 31, 12, 0, 0));
    expect(dates[0]).toBe('2026-10-01');
    expect(dates[dates.length - 1]).toBe('2026-11-01');
    expect(dates).toContain('2026-11-01');
  });
});
