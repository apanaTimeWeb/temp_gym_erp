// RESPONSIBILITY: Owns the typed props contract for this component.
import type { TrainerLibraryDietPlan } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/types/TrainerCoachingDietLibraryAndAssignmentsTypes';

export interface TrainerLibraryDietGridProps {
  dietPlans: TrainerLibraryDietPlan[];
  totalDietPlans: number;
  currentPage: number;
  isPending: boolean;
  isError: boolean;
  search: string;
  onPageChange: (page: number) => void;
  onViewDiet: (plan: TrainerLibraryDietPlan) => void;
}
