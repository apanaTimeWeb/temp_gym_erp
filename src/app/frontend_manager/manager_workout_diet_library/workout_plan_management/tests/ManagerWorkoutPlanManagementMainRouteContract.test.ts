import { describe, expect, it } from 'vitest';
import { MANAGER_WORKOUT_PLANS_ROUTES } from '@/app/frontend_manager/manager_workout_diet_library/workout_plan_management/config/manager_workout_diet_library_workout_plan_management.url_config';

describe('Workout Plan Management route contract', () => { it('declares the owning autonomous leaf route', () => { expect(MANAGER_WORKOUT_PLANS_ROUTES.PATHS.LEAF).toContain('/workout_plan_management'); }); });
