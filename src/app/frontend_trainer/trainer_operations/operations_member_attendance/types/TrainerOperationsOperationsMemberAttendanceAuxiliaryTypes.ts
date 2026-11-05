/** Module-owned auxiliary types extracted from implementation files for strict type isolation. */
import type { useTrainerAttendanceMain } from '../hooks/useTrainerOperationsMemberAttendanceAttendanceMain';
import type { TrainerAttendanceViewMode } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/types/TrainerOperationsMemberAttendanceAttendanceInteractionTypes';
import type { TRAINER_ATTENDANCE_SCREEN_VIEWS } from '../utils/TrainerOperationsMemberAttendanceAttendanceViewUrlUtils';

export type TrainerOperationsMemberAttendanceToolbarModel = ReturnType<typeof useTrainerAttendanceMain>;

export interface TrainerAttendanceStore {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  openModal: () => void;
  closeModal: () => void;
  viewMode: TrainerAttendanceViewMode;
  setViewMode: (viewMode: TrainerAttendanceViewMode) => void;
}

export interface TrainerInfrastructureNavigationGuardStoreState {
  dirtySources: Record<string, true>;
  setSourceDirty: (sourceId: string, isDirty: boolean) => void;
  hasDirtySources: () => boolean;
}

export type TrainerAttendanceScreenView = (typeof TRAINER_ATTENDANCE_SCREEN_VIEWS)[number];

export interface TrainerInfrastructureErrorReport {
  module: string;
  route: string;
  timestamp: string;
  errorDigest?: string;
}
