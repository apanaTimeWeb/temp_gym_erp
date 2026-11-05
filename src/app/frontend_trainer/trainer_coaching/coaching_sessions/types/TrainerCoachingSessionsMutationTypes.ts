// RESPONSIBILITY: Defines mutation variable contracts for Trainer Sessions server-state writes.
import type { TrainerSessionsCreateSessionDto, TrainerSessionsTrainerSession } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/types/TrainerCoachingSessionsTypes';
export interface TrainerSessionsCreateMutationVariables { dto: TrainerSessionsCreateSessionDto; idempotencyKey: string; }
export interface TrainerSessionsUpdateMutationVariables { id: string; dto: Partial<TrainerSessionsCreateSessionDto>; idempotencyKey: string; }
export interface TrainerSessionsCancelMutationVariables {
  id: string;
  idempotencyKey: string;
}

export interface TrainerSessionsNoShowMutationVariables { id: string; idempotencyKey: string; }
export interface TrainerSessionsAttendanceMutationVariables { id: string; memberIds: string[]; idempotencyKey: string; }
export interface TrainerSessionsEditSuccessPayload { session: TrainerSessionsTrainerSession; message: string; }
