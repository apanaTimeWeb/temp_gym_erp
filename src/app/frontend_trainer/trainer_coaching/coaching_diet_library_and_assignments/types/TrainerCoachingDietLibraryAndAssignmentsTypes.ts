import { z } from 'zod';

import { TRAINER_LIBRARY_GOALS } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/config/TrainerCoachingDietLibraryAndAssignmentsConstants';

import { TrainerLibraryDietPlanSchema } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/schemas/TrainerCoachingDietLibraryAndAssignmentsDomainSchemas';






// RESPONSIBILITY: Owns TypeScript domain and form contracts derived from Trainer library validation schemas.
export type TrainerLibraryDietPlan = z.infer<typeof TrainerLibraryDietPlanSchema>;



export type TrainerLibraryFilterGoal = (typeof TRAINER_LIBRARY_GOALS)[number]['value'];
export interface TrainerLibraryAssignedMember { id: string; name: string; email?: string; phone?: string; assignedDietPlanId?: string | null; }
export interface TrainerLibraryLogicReturn {
  dietPlans: TrainerLibraryDietPlan[];
  totalDietPlans: number;
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
  search: string;
  debouncedSearch: string;
  setSearch: (value: string) => void;
  filterGoal: TrainerLibraryFilterGoal | 'All';
  setFilterGoal: (value: TrainerLibraryFilterGoal | 'All') => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  loadAll: () => Promise<void>;
  showDietModal: boolean;
  editDietId: string | null;
  editDietData: TrainerLibraryDietPlan | null;
  openEditDiet: (diet: TrainerLibraryDietPlan) => void;
  closeDietModal: () => void;
  showFormModal: boolean;
  formDietPlan: TrainerLibraryDietPlan | null;
  openCreateDiet: () => void;
  openEditPlan: (diet: TrainerLibraryDietPlan) => void;
  closeFormModal: () => void;
  showDeleteRequestModal: boolean;
  deleteRequestPlan: TrainerLibraryDietPlan | null;
  openDeleteRequest: (diet: TrainerLibraryDietPlan) => void;
  closeDeleteRequestModal: () => void;
  saveDietPlan: (data: Record<string, unknown>, idempotencyKey: string) => Promise<void>;
  requestDietPlanDeletion: (id: string, reason: string, idempotencyKey: string) => Promise<void>;
  isSavingPlan: boolean;
  saveErrorMessage?: string;
}
