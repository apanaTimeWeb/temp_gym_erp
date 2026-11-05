import { describe, expect, it } from 'vitest';

import { ManagerTrainerScheduleQueryKeys } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/api/manager_trainer_schedule.query_keys';

describe('manager_schedule query-key namespace', () => {
  it('uses a stable, feature-specific root for every cache entry', () => {
    expect(ManagerTrainerScheduleQueryKeys.all).toEqual(['manager_schedule']);
  });
});
