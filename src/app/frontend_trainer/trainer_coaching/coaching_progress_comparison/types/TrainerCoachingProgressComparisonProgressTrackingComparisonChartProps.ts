// RESPONSIBILITY: Owns the typed props contract for this component.
import type { TrainerProgressTrackingComparisonMemberSnapshot, TrainerProgressTrackingComparisonMetric } from '@/app/frontend_trainer/trainer_coaching/coaching_progress_comparison/types/TrainerCoachingProgressComparisonProgressTrackingTypes';

export interface TrainerProgressTrackingComparisonChartProps {
  snapshots: TrainerProgressTrackingComparisonMemberSnapshot[];
  activeMetric: TrainerProgressTrackingComparisonMetric;
  onMetricChange: (m: TrainerProgressTrackingComparisonMetric) => void;
}
