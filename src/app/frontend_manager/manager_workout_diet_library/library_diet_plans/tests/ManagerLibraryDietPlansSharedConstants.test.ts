import { describe, expect, it } from 'vitest';

import { GOALS } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/constants/manager_library_diet_plans_shared.constants';


describe('ManagerLibraryDietPlansSharedConstants', () => {
  it('contains the supported diet-plan goals', () => {
    expect(GOALS).toEqual(['Weight Loss', 'Muscle Gain', 'Maintenance', 'Endurance', 'Flexibility']);
  });
});
