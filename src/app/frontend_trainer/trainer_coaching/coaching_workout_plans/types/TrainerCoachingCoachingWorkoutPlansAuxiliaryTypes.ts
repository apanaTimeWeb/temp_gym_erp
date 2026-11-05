/** Module-owned auxiliary types extracted from implementation files for strict type isolation. */
import type { TRAINER_WORKOUT_SCREEN_VIEWS } from '../utils/TrainerCoachingWorkoutPlansViewUrlUtils';

export interface TrainerWorkoutState {
  showWkModal: boolean;
  setShowWkModal: (show: boolean) => void;
  editWorkoutId: string | null;
  setEditWorkoutId: (workoutId: string | null) => void;
  showExModal: boolean;
  setShowExModal: (show: boolean) => void;
  editExerciseId: string | null;
  setEditExerciseId: (exerciseId: string | null) => void;
  showDetailDrawer: boolean;
  setShowDetailDrawer: (show: boolean) => void;
  showAssignModal: boolean;
  setShowAssignModal: (show: boolean) => void;
}

export interface TrainerInfrastructureNavigationGuardStoreState {
  dirtySources: Record<string, true>;
  setSourceDirty: (sourceId: string, isDirty: boolean) => void;
  hasDirtySources: () => boolean;
}

export type TrainerWorkoutScreenView = (typeof TRAINER_WORKOUT_SCREEN_VIEWS)[number];
