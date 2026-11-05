/** Module-owned auxiliary types extracted from implementation files for strict type isolation. */
import type { TRAINER_SCHEDULE_SCREEN_VIEWS } from '@/app/frontend_trainer/trainer_operations/operations_weekly_availability/config/trainer_operations_weekly_availability.url_config';

export interface TrainerInfrastructureNavigationGuardStoreState {
  dirtySources: Record<string, true>;
  setSourceDirty: (sourceId: string, isDirty: boolean) => void;
  hasDirtySources: () => boolean;
}

export type TrainerScheduleScreenView = (typeof TRAINER_SCHEDULE_SCREEN_VIEWS)[number];

export interface TrainerInfrastructureErrorReport {
  module: string;
  route: string;
  timestamp: string;
  errorDigest?: string;
}
