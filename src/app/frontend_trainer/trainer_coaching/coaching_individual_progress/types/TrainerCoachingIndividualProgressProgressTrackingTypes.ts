import { z } from 'zod';

import { TRAINER_PROGRESS_TRACKING_PROGRESS_CHART_METRIC_IDS, TRAINER_PROGRESS_TRACKING_PROGRESS_SORT_FIELDS, TRAINER_PROGRESS_TRACKING_PROGRESS_SORT_DIRECTIONS, TRAINER_PROGRESS_TRACKING_PROGRESS_TREND_IDS, TRAINER_PROGRESS_TRACKING_COMPARISON_METRIC_IDS } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/utils/TrainerCoachingIndividualProgressProgressTrackingConstants';

import { TrainerProgressTrackingCreateProgressEntrySchema } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/schemas/TrainerCoachingIndividualProgressProgressTrackingDomainSchemas';

import { TrainerProgressTrackingProgressEntrySchema } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/schemas/TrainerCoachingIndividualProgressProgressTrackingDomainSchemas';

import { TrainerProgressTrackingProgressMemberBasicSchema } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/schemas/TrainerCoachingIndividualProgressProgressTrackingDomainSchemas';

import { TrainerProgressTrackingProgressSummarySchema } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/schemas/TrainerCoachingIndividualProgressProgressTrackingDomainSchemas';






// RESPONSIBILITY: Owns domain and UI types for the Trainer Progress Tracking feature.
// DATA FLOW: Progress API schema -> module types -> Query state -> Progress components.



export type TrainerProgressTrackingProgressChartMetric = (typeof TRAINER_PROGRESS_TRACKING_PROGRESS_CHART_METRIC_IDS)[number];
export type TrainerProgressTrackingProgressSortField = (typeof TRAINER_PROGRESS_TRACKING_PROGRESS_SORT_FIELDS)[number];
export type TrainerProgressTrackingProgressSortDirection = (typeof TRAINER_PROGRESS_TRACKING_PROGRESS_SORT_DIRECTIONS)[number];

export interface TrainerProgressTrackingComparisonMemberSnapshot {
  memberId: string;
  memberName: string;
  latestWeightKg: number | null;
  latestBmi: number | null;
  latestBodyFatPercent: number | null;
  latestMuscleMassKg: number | null;
  weightChangeKg: number | null;
  bodyFatChange: number | null;
  muscleMassChange: number | null;
  totalEntries: number;
  trend: TrainerProgressTrackingProgressTrend;
}

export type TrainerProgressTrackingProgressTrend = (typeof TRAINER_PROGRESS_TRACKING_PROGRESS_TREND_IDS)[number];
export type TrainerProgressTrackingComparisonMetric = (typeof TRAINER_PROGRESS_TRACKING_COMPARISON_METRIC_IDS)[number];

export interface TrainerProgressTrackingChartMetricOption {
  value: TrainerProgressTrackingProgressChartMetric;
  labelKey: string;
}

export interface TrainerProgressTrackingComparisonMetricOption {
  value: TrainerProgressTrackingComparisonMetric;
  labelKey: string;
  unit: string;
  lowerIsBetter: boolean;
}

export interface TrainerProgressTrackingPaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export type TrainerProgressTrackingProgressEntry = z.infer<typeof TrainerProgressTrackingProgressEntrySchema>;
export type TrainerProgressTrackingProgressSummary = z.infer<typeof TrainerProgressTrackingProgressSummarySchema>;
export type TrainerProgressTrackingCreateProgressEntryDto = z.infer<typeof TrainerProgressTrackingCreateProgressEntrySchema>;
export type TrainerProgressTrackingCreateProgressEntryFormValues = z.input<typeof TrainerProgressTrackingCreateProgressEntrySchema>;
export type TrainerProgressTrackingProgressMemberBasic = z.infer<typeof TrainerProgressTrackingProgressMemberBasicSchema>;