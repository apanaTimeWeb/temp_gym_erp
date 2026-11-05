// RESPONSIBILITY: Validates Library view identifiers against the canonical view registry.
import type { LibraryView } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/types/manager_library_diet_plans.types';
import { MANAGER_LIBRARY_DIET_PLANS_DEFAULT_VIEW, MANAGER_LIBRARY_DIET_PLANS_VIEW_IDS } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/constants/manager_library_diet_plans_view.constants';

export function isManagerLibraryDietPlansView(value: string | null | undefined): value is LibraryView {
  return value !== null && value !== undefined && (MANAGER_LIBRARY_DIET_PLANS_VIEW_IDS as readonly string[]).includes(value);
}

export function resolveManagerLibraryDietPlansView(value: string | null | undefined): LibraryView {
  return isManagerLibraryDietPlansView(value) ? value : MANAGER_LIBRARY_DIET_PLANS_DEFAULT_VIEW;
}
