/** Module-owned auxiliary types extracted from implementation files for strict type isolation. */
import type { TRAINER_WORKOUT_SCREEN_VIEWS } from '../utils/TrainerCoachingExerciseManagementViewUrlUtils';

export interface TrainerWorkoutState {
 showExModal: boolean; setShowExModal: (value: boolean) => void;
 editExerciseId: string | null; setEditExerciseId: (value: string | null) => void;
}

export interface TrainerInfrastructureNavigationGuardStoreState {
  dirtySources: Record<string, true>;
  setSourceDirty: (sourceId: string, isDirty: boolean) => void;
  hasDirtySources: () => boolean;
}

export type TrainerWorkoutScreenView = (typeof TRAINER_WORKOUT_SCREEN_VIEWS)[number];
