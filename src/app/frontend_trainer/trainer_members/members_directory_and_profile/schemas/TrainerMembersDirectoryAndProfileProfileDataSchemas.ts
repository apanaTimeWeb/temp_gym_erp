import { z } from 'zod';

import { TrainerInfrastructureApiResponseSchema } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/schemas/TrainerMembersDirectoryAndProfileTrainerInfrastructureApiResponseSchema';




export const TrainerMembersTrainerMemberAttendanceDaySchema = z.object({
  day: z.number().int().nonnegative(),
  status: z.string(),
});

export const TrainerMembersTrainerMemberAttendanceResponseSchema = TrainerInfrastructureApiResponseSchema(z.array(TrainerMembersTrainerMemberAttendanceDaySchema));

export const TrainerMembersTrainerMemberDietPlanListItemSchema = z.object({
  id: z.string(), name: z.string(), goal: z.string().optional(), calories: z.number().optional(),
  protein: z.number().optional(), carbs: z.number().optional(), fats: z.number().optional(),
  description: z.string().optional(), meals: z.array(z.union([z.string(), z.object({ name: z.string().optional(), time: z.string().optional(), items: z.string().optional(), description: z.string().optional() })])).optional(),
});

export const TrainerMembersTrainerMemberDietPlansResponseSchema = TrainerInfrastructureApiResponseSchema(z.object({ dietPlans: z.array(TrainerMembersTrainerMemberDietPlanListItemSchema), total: z.number().int().nonnegative() }));

export const TrainerMembersTrainerMemberWorkoutExerciseSchema = z.object({
  id: z.string().optional(), name: z.string(), sets: z.number(), reps: z.union([z.string(), z.number()]), restTime: z.string().optional(), weight: z.string().optional(),
});

export const TrainerMembersTrainerMemberWorkoutPlanSchema = z.object({
  id: z.string(), name: z.string(), level: z.string().optional(), duration: z.string().optional(), focus: z.string().optional(), days: z.number().optional(),
  instructions: z.string().optional(),
  workoutExercises: z.array(TrainerMembersTrainerMemberWorkoutExerciseSchema).optional(),
});

export const TrainerMembersTrainerMemberWorkoutPlansResponseSchema = TrainerInfrastructureApiResponseSchema(z.object({ workouts: z.array(TrainerMembersTrainerMemberWorkoutPlanSchema), total: z.number().int().nonnegative() }));

export const TrainerMembersTrainerMemberProgressEntrySchema = z.object({
  id: z.string(), memberId: z.string(), date: z.string(), weightKg: z.number(), heightCm: z.number().nullable().optional(), bmi: z.number().nullable().optional(),
  bodyFatPercent: z.number().nullable().optional(), muscleMassKg: z.number().nullable().optional(), chestCm: z.number().nullable().optional(), waistCm: z.number().nullable().optional(),
  recordedBy: z.string().optional(), progressPhotos: z.array(z.string()).optional(),
});

export const TrainerMembersTrainerMemberProgressEntriesResponseSchema = TrainerInfrastructureApiResponseSchema(z.array(TrainerMembersTrainerMemberProgressEntrySchema));
