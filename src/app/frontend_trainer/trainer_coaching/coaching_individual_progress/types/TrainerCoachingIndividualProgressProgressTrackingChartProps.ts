// RESPONSIBILITY: Owns the typed props contract for this component.
import type { TrainerProgressTrackingProgressEntry, TrainerProgressTrackingProgressChartMetric } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/types/TrainerCoachingIndividualProgressProgressTrackingTypes';

export interface TrainerProgressTrackingChartProps {
  entries: TrainerProgressTrackingProgressEntry[];
  activeMetric: TrainerProgressTrackingProgressChartMetric;
  onMetricChange: (m: TrainerProgressTrackingProgressChartMetric) => void;
}
