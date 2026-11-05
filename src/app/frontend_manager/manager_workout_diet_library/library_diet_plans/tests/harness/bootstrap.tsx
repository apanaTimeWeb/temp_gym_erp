// RESPONSIBILITY: Exposes the isolated testing-library bootstrap for library_diet_plans.
import { render, type RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';
import { ManagerLibraryDietPlansHarness } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/tests/harness/ManagerLibraryDietPlansHarness';

export function renderManagerLibraryDietPlans(ui: ReactElement, options: Omit<RenderOptions, 'wrapper'> = {}) {
  return render(ui, { ...options, wrapper: ({ children }) => <ManagerLibraryDietPlansHarness>{children}</ManagerLibraryDietPlansHarness> });
}
