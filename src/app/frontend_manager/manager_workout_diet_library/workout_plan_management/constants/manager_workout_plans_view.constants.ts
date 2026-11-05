import type { ManagerWorkoutPlansViewId } from '@/app/frontend_manager/manager_workout_diet_library/workout_plan_management/types/manager_workout_diet_library_workout_plan_management.types';
export const MANAGER_WORKOUT_PLANS_VIEW_IDS = ['view-workout-plans', 'view-assigned-plans', 'exercise-library'] as const satisfies readonly ManagerWorkoutPlansViewId[];
export const MANAGER_WORKOUT_PLANS_DEFAULT_VIEW: ManagerWorkoutPlansViewId = 'view-workout-plans';
