// RESPONSIBILITY: Owns static Diet Library values only. Validation and domain types live in trainer_library_types.
import { TRAINER_INFRASTRUCTURE_ITEMS_PER_PAGE } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/utils/TrainerCoachingDietLibraryAndAssignmentsTrainerInfrastructureConstants';

export const TRAINER_LIBRARY_GOALS = [
  { value: 'Weight Loss', labelKey: 'TEXT_GOAL_WEIGHT_LOSS' },
  { value: 'Muscle Gain', labelKey: 'TEXT_GOAL_MUSCLE_GAIN' },
  { value: 'Maintenance', labelKey: 'TEXT_GOAL_MAINTENANCE' },
  { value: 'Endurance', labelKey: 'TEXT_GOAL_ENDURANCE' },
  { value: 'Flexibility', labelKey: 'TEXT_GOAL_FLEXIBILITY' },
] as const;
export const TRAINER_LIBRARY_ITEMS_PER_PAGE = TRAINER_INFRASTRUCTURE_ITEMS_PER_PAGE;
export const TRAINER_LIBRARY_EMPTY_DIET_FORM = {
  name: '', goal: 'Weight Loss', calories: '', protein: '', carbs: '', fats: '',
  description: '', meals: '', waterTarget: '', supplements: '',
} as const;
