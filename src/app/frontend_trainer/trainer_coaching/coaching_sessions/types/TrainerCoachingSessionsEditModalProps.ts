// RESPONSIBILITY: Owns the typed props contract for this component.
import type { TrainerSessionsTrainerSession } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/types/TrainerCoachingSessionsTypes';

export interface TrainerSessionsEditModalProps {
  session: TrainerSessionsTrainerSession; onClose: () => void; onSuccess: (updatedSession: TrainerSessionsTrainerSession, message: string) => void;
}
