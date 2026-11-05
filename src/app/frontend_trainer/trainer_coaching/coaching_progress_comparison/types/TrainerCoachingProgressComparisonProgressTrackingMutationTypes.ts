// RESPONSIBILITY: Defines mutation variable contracts for Trainer Progress Tracking server-state writes.
import type { TrainerProgressTrackingCreateProgressEntryDto } from '@/app/frontend_trainer/trainer_coaching/coaching_progress_comparison/types/TrainerCoachingProgressComparisonProgressTrackingTypes';
export interface TrainerProgressTrackingCreateMutationVariables { memberId: string; dto: TrainerProgressTrackingCreateProgressEntryDto; idempotencyKey: string; }
export interface TrainerProgressTrackingUpdateMutationVariables { memberId: string; entryId: string; dto: Partial<TrainerProgressTrackingCreateProgressEntryDto>; idempotencyKey: string; }
export interface TrainerProgressTrackingDeleteMutationVariables { memberId: string; entryId: string; idempotencyKey: string; }
