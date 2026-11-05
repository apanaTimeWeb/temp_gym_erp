/** Module-owned auxiliary types extracted from implementation files for strict type isolation. */
import type { TrainerAttendanceViewMode } from '@/app/frontend_trainer/trainer_operations/operations_trainer_attendance/types/TrainerOperationsTrainerAttendanceAttendanceInteractionTypes';
import type { TRAINER_ATTENDANCE_SCREEN_VIEWS } from '../utils/TrainerOperationsTrainerAttendanceAttendanceViewUrlUtils';

export interface TrainerAttendanceStore {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  openModal: () => void;
  closeModal: () => void;
  viewMode: TrainerAttendanceViewMode;
  setViewMode: (viewMode: TrainerAttendanceViewMode) => void;
}

export type TrainerAttendanceScreenView = (typeof TRAINER_ATTENDANCE_SCREEN_VIEWS)[number];
