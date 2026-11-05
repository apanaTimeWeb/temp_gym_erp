import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { TRAINER_SESSIONS_SESSION_STATUS } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/config/TrainerCoachingSessionsConstants';

import { useTrainerSessionsKpis } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/hooks/useTrainerCoachingSessionsKpis';

import type { TrainerSessionsTrainerSession } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/types/TrainerCoachingSessionsTypes';






beforeEach(() => { vi.useFakeTimers(); vi.setSystemTime(new Date('2026-10-04T12:00:00')); });
afterEach(() => { vi.useRealTimers(); });

describe('useTrainerSessionsKpis', () => {
  it('derives today, completed, no-show and average-attendance KPIs', () => {
    const sessions = [
      { id: 's1', sessionDate: '2026-10-04', status: TRAINER_SESSIONS_SESSION_STATUS.COMPLETED, attendees: 8, maxAttendees: 10 },
      { id: 's2', sessionDate: '2026-10-04', status: TRAINER_SESSIONS_SESSION_STATUS.NO_SHOW, attendees: 0, maxAttendees: 10 },
      { id: 's3', sessionDate: '2026-09-20', status: TRAINER_SESSIONS_SESSION_STATUS.COMPLETED, attendees: 5, maxAttendees: 10 },
    ] as TrainerSessionsTrainerSession[];

    expect(useTrainerSessionsKpis(sessions)).toEqual({
      todayCount: 2,
      completedThisWeek: 1,
      noShowsThisMonth: 1,
      avgAttendanceRate: 40,
    });
  });



  it('excludes completed sessions outside the current week and no-shows outside the current month', () => {
    const sessions = [
      { id: 'current-week', sessionDate: '2026-10-02', status: TRAINER_SESSIONS_SESSION_STATUS.COMPLETED, attendees: 4, maxAttendees: 8 },
      { id: 'prior-week', sessionDate: '2026-09-20', status: TRAINER_SESSIONS_SESSION_STATUS.COMPLETED, attendees: 4, maxAttendees: 8 },
      { id: 'prior-month', sessionDate: '2026-09-30', status: TRAINER_SESSIONS_SESSION_STATUS.NO_SHOW, attendees: 0, maxAttendees: 8 },
    ] as TrainerSessionsTrainerSession[];
    const result = useTrainerSessionsKpis(sessions);
    expect(result.completedThisWeek).toBe(1);
    expect(result.noShowsThisMonth).toBe(0);
  });

  it('returns zero average attendance when no sessions have capacity data', () => {
    const sessions = [
      { id: 's1', sessionDate: '2026-10-04', status: TRAINER_SESSIONS_SESSION_STATUS.COMPLETED, attendees: 0, maxAttendees: 0 },
    ] as TrainerSessionsTrainerSession[];

    expect(useTrainerSessionsKpis(sessions).avgAttendanceRate).toBe(0);
  });
});
