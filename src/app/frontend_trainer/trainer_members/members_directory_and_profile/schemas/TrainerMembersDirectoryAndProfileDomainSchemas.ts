// RESPONSIBILITY: Owns Trainer Members domain/API Zod schemas.
import { z } from 'zod';

import { TrainerInfrastructureApiResponseSchema } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/schemas/TrainerMembersDirectoryAndProfileTrainerInfrastructureApiResponseSchema';

import { TRAINER_MEMBERS_MEMBER_PROGRESS_STATUS_VALUES } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/config/TrainerMembersDirectoryAndProfileConstants';

import { TrainerMembersDietSnapshotSchema } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/schemas/TrainerMembersDirectoryAndProfileSnapshotSchemas';

import { TrainerMembersWorkoutSnapshotSchema } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/schemas/TrainerMembersDirectoryAndProfileSnapshotSchemas';






export const TrainerMembersTrainerMemberAssessmentSchema = z.object({
  medicalHistory: z.string().optional(),
  pastInjuries: z.string().optional(),
  vo2Max: z.number().finite().optional(),
  flexibility: z.number().finite().optional(),
  coreStrength: z.string().optional(),
  fitnessGoals: z.string().optional(),
  parqHeartCondition: z.boolean().optional(),
  parqChestPainActivity: z.boolean().optional(),
  parqChestPainRest: z.boolean().optional(),
  parqDizzinessOrBalance: z.boolean().optional(),
  parqBoneOrJointIssue: z.boolean().optional(),
  parqMedicationPrescribed: z.boolean().optional(),
  parqOtherReason: z.boolean().optional(),
  parqCleared: z.boolean().optional(),
  medicalClearanceRequired: z.boolean().optional()
});

export const TrainerMembersPtPackageSchema = z.object({
  packageName: z.string().optional(),
  totalSessions: z.number().int().nonnegative().optional(),
  completedSessions: z.number().int().nonnegative().optional(),
  remainingSessions: z.number().int().nonnegative().optional(),
  startDate: z.string().optional(),
  expiryDate: z.string().optional()
});

export const TrainerMembersMemberSchema = z.object({ id:z.string(), name:z.string(), email:z.string(), phone:z.string(), gender:z.string(), address:z.string().optional(), branch:z.string(), planId:z.string(), plan:z.object({id:z.string(),name:z.string(),tier:z.string()}).optional(), billingCycle:z.string(), status:z.string(), joinDate:z.string(), expiryDate:z.string(), photo:z.string().optional(), createdAt:z.string(), age:z.number().optional(), heightCm:z.number().optional(), weightKg:z.number().optional(), lastWorkout:z.string().optional(), progressStatus:z.enum(TRAINER_MEMBERS_MEMBER_PROGRESS_STATUS_VALUES).optional(), assignedTrainerId:z.string().optional(), assignedTrainerName:z.string().optional(), isPT:z.boolean().optional(), ptPackage:TrainerMembersPtPackageSchema.optional(), assignedDietId:z.string().optional(), assignedDiet:TrainerMembersDietSnapshotSchema.optional(), assignedWorkoutId:z.string().optional(), assignedWorkout:TrainerMembersWorkoutSnapshotSchema.optional(), fitnessLevel:z.string().optional(), targetWeightKg:z.number().optional(), bmi:z.number().optional(), medicalRestrictions:z.string().optional(), fitnessGoal:z.string().optional(), daysSinceLastCheckIn:z.number().optional(), trainerNotes:z.array(z.object({id:z.string(),text:z.string(),date:z.string()})).optional(), emergencyContact:z.string().optional(), bloodGroup:z.string().optional(), medicalHistory:z.array(z.string()).optional(), membershipNumber:z.string().optional(), workoutHistory:z.array(z.object({id:z.string(),name:z.string(),date:z.string(),level:z.string(),status:z.string()})).optional(), assessment:TrainerMembersTrainerMemberAssessmentSchema.optional() });
export const TrainerMembersMemberStatsSchema = z.object({ total:z.number(), active:z.number(), pending:z.number(), expired:z.number() });
export const TrainerMembersMemberListResponseSchema = TrainerInfrastructureApiResponseSchema(z.object({ members:z.array(TrainerMembersMemberSchema), total:z.number().int().nonnegative(), page:z.number().int().positive(), limit:z.number().int().positive() }));
export const TrainerMembersMemberDetailResponseSchema = TrainerInfrastructureApiResponseSchema(TrainerMembersMemberSchema);
export const TrainerMembersMemberStatsResponseSchema = TrainerInfrastructureApiResponseSchema(TrainerMembersMemberStatsSchema);
