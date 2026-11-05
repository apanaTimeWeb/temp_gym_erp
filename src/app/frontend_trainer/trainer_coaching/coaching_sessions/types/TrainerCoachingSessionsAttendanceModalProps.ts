// RESPONSIBILITY: Owns the typed contract between the Sessions attendance modal and its mutation boundary.
import type { TrainerSessionsTrainerSession } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/types/TrainerCoachingSessionsTypes';

export interface TrainerSessionsAttendanceModalProps {
  session: TrainerSessionsTrainerSession;
  onClose: () => void;
  onSubmit: (sessionId: string, attendedMemberIds: string[]) => Promise<void>;
  testId?: string;
}
