import { z } from 'zod';

import { TrainerInfrastructureApiResponseSchema } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/schemas/TrainerCoachingDietLibraryAndAssignmentsTrainerInfrastructureApiResponseSchema';

import { TrainerLibraryDietPlanSchema } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/schemas/TrainerCoachingDietLibraryAndAssignmentsDomainSchemas';




export const TrainerLibraryDietPlansResponseSchema = TrainerInfrastructureApiResponseSchema(z.object({ dietPlans: z.array(TrainerLibraryDietPlanSchema), total: z.number() }));
export const TrainerLibraryAssignedMembersResponseSchema = TrainerInfrastructureApiResponseSchema(z.array(z.object({ id: z.string(), name: z.string(), assignedDietPlanId: z.string().nullable() })));
export const TrainerLibraryMutationResponseSchema = TrainerInfrastructureApiResponseSchema(z.unknown());
