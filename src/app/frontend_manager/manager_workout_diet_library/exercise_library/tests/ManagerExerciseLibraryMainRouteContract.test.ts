import { describe, expect, it } from 'vitest';
import { MANAGER_WORKOUT_PLANS_ROUTES } from '@/app/frontend_manager/manager_workout_diet_library/exercise_library/config/manager_workout_diet_library_exercise_library.url_config';

describe('Exercise Library route contract', () => { it('declares the owning autonomous leaf route', () => { expect(MANAGER_WORKOUT_PLANS_ROUTES.PATHS.LEAF).toContain('/exercise_library'); }); });
