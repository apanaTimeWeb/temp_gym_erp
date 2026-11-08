import { z } from 'zod';

import { TRAINER_MEMBERS_SORT_FIELDS, TRAINER_MEMBERS_SORT_DIRECTIONS } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/config/TrainerMembersDirectoryAndProfileConstants';

import { TrainerMembersTrainerMemberAssessmentSchema, TrainerMembersMemberSchema, TrainerMembersMemberStatsSchema, TrainerMembersPtPackageSchema } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/schemas/TrainerMembersDirectoryAndProfileDomainSchemas';

import { TrainerMembersFormSchema } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/schemas/TrainerMembersDirectoryAndProfileFormSchema';

import { TrainerMembersTrainerMemberNoteSchema, TrainerMembersCreateMemberNoteSchema } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/schemas/TrainerMembersDirectoryAndProfileNoteSchemas';

import { TrainerMembersTrainerMemberAttendanceDaySchema, TrainerMembersTrainerMemberDietPlanListItemSchema, TrainerMembersTrainerMemberWorkoutPlanSchema, TrainerMembersTrainerMemberProgressEntrySchema } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/schemas/TrainerMembersDirectoryAndProfileProfileDataSchemas';

import { TrainerMembersDietSnapshotSchema, TrainerMembersTrainerMemberWorkoutExerciseSnapshotSchema, TrainerMembersWorkoutSnapshotSchema } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/schemas/TrainerMembersDirectoryAndProfileSnapshotSchemas';












// RESPONSIBILITY: Owns TypeScript domain and form contracts derived from Trainer members validation schemas.
export type TrainerMembersTrainerMemberAssessment = z.infer<typeof TrainerMembersTrainerMemberAssessmentSchema>;
export type TrainerMembersPtPackage = z.infer<typeof TrainerMembersPtPackageSchema>;
export type TrainerMembersMember = z.infer<typeof TrainerMembersMemberSchema>;
export type TrainerMembersMemberStats = z.infer<typeof TrainerMembersMemberStatsSchema>;
export type TrainerMembersFormValues = z.infer<typeof TrainerMembersFormSchema>;
export type TrainerMembersTrainerMemberNote = z.infer<typeof TrainerMembersTrainerMemberNoteSchema>;
export type TrainerMembersCreateMemberNote = z.infer<typeof TrainerMembersCreateMemberNoteSchema>;
export type TrainerMembersTrainerMemberAttendanceDay = z.infer<typeof TrainerMembersTrainerMemberAttendanceDaySchema>;
export type TrainerMembersTrainerMemberDietPlanListItem = z.infer<typeof TrainerMembersTrainerMemberDietPlanListItemSchema>;
export type TrainerMembersTrainerMemberWorkoutPlan = z.infer<typeof TrainerMembersTrainerMemberWorkoutPlanSchema>;
export type TrainerMembersTrainerMemberProgressEntry = z.infer<typeof TrainerMembersTrainerMemberProgressEntrySchema>;
export type TrainerMembersDietSnapshot = z.infer<typeof TrainerMembersDietSnapshotSchema>;
export type TrainerMembersTrainerMemberWorkoutExerciseSnapshot = z.infer<typeof TrainerMembersTrainerMemberWorkoutExerciseSnapshotSchema>;
export type TrainerMembersWorkoutSnapshot = z.infer<typeof TrainerMembersWorkoutSnapshotSchema>;


export type TrainerMembersSortField = (typeof TRAINER_MEMBERS_SORT_FIELDS)[number];
export type TrainerMembersSortDirection = (typeof TRAINER_MEMBERS_SORT_DIRECTIONS)[number];
