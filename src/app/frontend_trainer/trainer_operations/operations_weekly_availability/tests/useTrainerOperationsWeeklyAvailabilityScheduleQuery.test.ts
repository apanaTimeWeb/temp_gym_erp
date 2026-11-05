import { describe, expect, it } from 'vitest';

import * as moduleUnderTest from '@/app/frontend_trainer/trainer_operations/operations_weekly_availability/hooks/useTrainerOperationsWeeklyAvailabilityScheduleQuery';




describe('useTrainerScheduleQuery', () => {
  it('exposes the module hook contract for co-located verification', () => {
    expect(moduleUnderTest.useTrainerScheduleQuery).toBeTypeOf('function');
  });
});
