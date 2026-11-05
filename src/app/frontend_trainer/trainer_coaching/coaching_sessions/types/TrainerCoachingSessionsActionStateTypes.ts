import type { TrainerSessionsTrainerSession } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/types/TrainerCoachingSessionsTypes';

import type { Dispatch, SetStateAction } from 'react';

export interface TrainerSessionsActionStateSetters {
  setShowScheduleModal: Dispatch<SetStateAction<boolean>>;
  setAttendanceSession: Dispatch<SetStateAction<TrainerSessionsTrainerSession | null>>;
  setEditingSession: Dispatch<SetStateAction<TrainerSessionsTrainerSession | null>>;
}
