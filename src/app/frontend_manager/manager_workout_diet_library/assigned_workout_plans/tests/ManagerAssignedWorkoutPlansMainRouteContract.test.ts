import { describe, expect, it } from 'vitest';
import { MANAGER_WORKOUT_PLANS_ROUTES } from '@/app/frontend_manager/manager_workout_diet_library/assigned_workout_plans/config/manager_workout_diet_library_assigned_workout_plans.url_config';

describe('Assigned Workout Plans route contract', () => { it('declares the owning autonomous leaf route', () => { expect(MANAGER_WORKOUT_PLANS_ROUTES.PATHS.LEAF).toContain('/assigned_workout_plans'); }); });
