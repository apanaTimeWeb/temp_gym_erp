import { describe, expect, it } from 'vitest';

import { TRAINER_SESSIONS_ALL_SESSION_FILTER } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/config/TrainerCoachingSessionsConstants';

import { TrainerSessionsIsSpecificFilter } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/utils/TrainerCoachingSessionsIsSpecificFilter';

import type { TrainerSessionsSessionFilter } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/types/TrainerCoachingSessionsTypes';

describe('TrainerSessionsIsSpecificFilter', () => {
  it('rejects the synthetic All filter', () => {
    expect(TrainerSessionsIsSpecificFilter(TRAINER_SESSIONS_ALL_SESSION_FILTER)).toBe(false);
  });

  it('accepts documented specific session types', () => {
    expect(TrainerSessionsIsSpecificFilter('PT' as TrainerSessionsSessionFilter)).toBe(true);
    expect(TrainerSessionsIsSpecificFilter('Group' as TrainerSessionsSessionFilter)).toBe(true);
  });
});
