// RESPONSIBILITY: Validates and resolves Workout view identifiers.
import type { ManagerWorkoutPlansViewId } from '@/app/frontend_manager/manager_workout_diet_library/workout_plan_management/types/manager_workout_diet_library_workout_plan_management.types';
import { MANAGER_WORKOUT_PLANS_DEFAULT_VIEW, MANAGER_WORKOUT_PLANS_VIEW_IDS } from '@/app/frontend_manager/manager_workout_diet_library/workout_plan_management/constants/manager_workout_plans_view.constants';

export function resolveManagerWorkoutPlansView(value: string | null | undefined): ManagerWorkoutPlansViewId {
  return MANAGER_WORKOUT_PLANS_VIEW_IDS.includes(value as ManagerWorkoutPlansViewId) ? value as ManagerWorkoutPlansViewId : MANAGER_WORKOUT_PLANS_DEFAULT_VIEW;
}
