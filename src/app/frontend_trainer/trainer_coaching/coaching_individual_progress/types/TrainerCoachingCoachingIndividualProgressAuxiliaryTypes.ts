/** Module-owned auxiliary types extracted from implementation files for strict type isolation. */
import type { TrainerProgressTrackingProgressChartMetric, TrainerProgressTrackingComparisonMetric } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/types/TrainerCoachingIndividualProgressProgressTrackingTypes';
import type { TRAINER_PROGRESS_TRACKING_SCREEN_VIEWS } from '../utils/TrainerCoachingIndividualProgressProgressTrackingViewUrlUtils';

export interface TrainerProgressTrackingStore {
  activeMetric: TrainerProgressTrackingProgressChartMetric;
  setActiveMetric: (metric: TrainerProgressTrackingProgressChartMetric) => void;
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  editingEntryId: string | null;
  setEditingEntryId: (entryId: string | null) => void;
  activeComparisonMetric: TrainerProgressTrackingComparisonMetric;
  setActiveComparisonMetric: (metric: TrainerProgressTrackingComparisonMetric) => void;
  selectedComparisonIds: string[];
  toggleComparisonMember: (memberId: string) => void;
}

export interface TrainerInfrastructureNavigationGuardStoreState {
  dirtySources: Record<string, true>;
  setSourceDirty: (sourceId: string, isDirty: boolean) => void;
  hasDirtySources: () => boolean;
}

export type TrainerProgressTrackingScreenView = (typeof TRAINER_PROGRESS_TRACKING_SCREEN_VIEWS)[number];

export interface TrainerInfrastructureErrorReport {
  module: string;
  route: string;
  timestamp: string;
  errorDigest?: string;
}
