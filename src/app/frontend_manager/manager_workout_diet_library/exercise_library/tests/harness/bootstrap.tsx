// RESPONSIBILITY: Exposes the isolated testing-library bootstrap for workout_plans.
import { render, type RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';
import { ManagerWorkoutPlansHarness } from '@/app/frontend_manager/manager_workout_diet_library/exercise_library/tests/harness/ManagerWorkoutPlansHarness';

export function renderManagerWorkoutPlans(ui: ReactElement, options: Omit<RenderOptions, 'wrapper'> = {}) {
  return render(ui, { ...options, wrapper: ({ children }) => <ManagerWorkoutPlansHarness>{children}</ManagerWorkoutPlansHarness> });
}
