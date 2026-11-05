import { describe, expect, it } from 'vitest';

import { resolveManagerWorkoutPlansView } from '@/app/frontend_manager/manager_workout_diet_library/workout_plan_management/utils/ManagerWorkoutPlansResolveView';
describe('Manager Workout view URL contract', () => { it.each(['view-workout-plans','view-assigned-plans','exercise-library'])('accepts %s', (view) => expect(resolveManagerWorkoutPlansView(view)).toBe(view)); it('defaults invalid values safely', () => expect(resolveManagerWorkoutPlansView('invalid')).toBe('view-workout-plans')); });
