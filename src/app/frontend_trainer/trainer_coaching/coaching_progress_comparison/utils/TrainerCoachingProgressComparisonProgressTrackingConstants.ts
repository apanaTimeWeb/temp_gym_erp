// RESPONSIBILITY: Centralized constants for the Trainer Progress Tracking module.
// DATA FLOW: Imported by useTrainerProgressTrackingLogic and progress sub-components.

import type { TrainerProgressTrackingChartMetricOption, TrainerProgressTrackingComparisonMetricOption } from '@/app/frontend_trainer/trainer_coaching/coaching_progress_comparison/types/TrainerCoachingProgressComparisonProgressTrackingTypes';

export const TRAINER_PROGRESS_TRACKING_PROGRESS_CHART_METRIC_IDS = ['weight', 'bmi', 'bodyFat', 'muscleMass'] as const;
export const TRAINER_PROGRESS_TRACKING_PROGRESS_SORT_FIELDS = ['date', 'weightKg', 'heightCm', 'bmi', 'bodyFatPercent', 'muscleMassKg'] as const;
export const TRAINER_PROGRESS_TRACKING_PROGRESS_SORT_DIRECTIONS = ['asc', 'desc'] as const;
export const TRAINER_PROGRESS_TRACKING_PROGRESS_TREND_IDS = ['improving', 'plateau', 'declining', 'insufficient'] as const;
export const TRAINER_PROGRESS_TRACKING_COMPARISON_METRIC_IDS = ['latestWeightKg', 'latestBmi', 'latestBodyFatPercent', 'latestMuscleMassKg', 'weightChangeKg', 'muscleMassChange'] as const;

export const TRAINER_PROGRESS_TRACKING_PROGRESS_CHART_METRICS: readonly TrainerProgressTrackingChartMetricOption[] = [
  { value: 'weight', labelKey: 'TEXT_WEIGHT_KG' },
  { value: 'bmi', labelKey: 'TEXT_BMI' },
  { value: 'bodyFat', labelKey: 'TEXT_BODY_FAT_PERCENT' },
  { value: 'muscleMass', labelKey: 'TEXT_MUSCLE_MASS_KG' },
];

export const TRAINER_PROGRESS_TRACKING_COMPARISON_METRICS: readonly TrainerProgressTrackingComparisonMetricOption[] = [
  { value: 'latestWeightKg',        labelKey: 'TEXT_CURRENT_WEIGHT',    unit: 'kg',  lowerIsBetter: false },
  { value: 'latestBmi',             labelKey: 'TEXT_CURRENT_BMI',       unit: '',    lowerIsBetter: true  },
  { value: 'latestBodyFatPercent',  labelKey: 'TEXT_BODY_FAT_PERCENT',        unit: '%',   lowerIsBetter: true  },
  { value: 'latestMuscleMassKg',    labelKey: 'TEXT_MUSCLE_MASS',       unit: 'kg',  lowerIsBetter: false },
  { value: 'weightChangeKg',        labelKey: 'TEXT_WEIGHT_CHANGE',     unit: 'kg',  lowerIsBetter: true  },
  { value: 'muscleMassChange',      labelKey: 'TEXT_MUSCLE_GAIN',       unit: 'kg',  lowerIsBetter: false },
];

// Max members selectable for comparison
export const TRAINER_PROGRESS_TRACKING_COMPARISON_MAX_MEMBERS = 4;

export const TRAINER_PROGRESS_TRACKING_PROGRESS_TABLE_HEADERS = [
  'Date',
  'Weight (kg)',
  'Height (cm)',
  'BMI',
  'Body Fat %',
  'Muscle Mass (kg)',
  'Waist (cm)',
  'Notes',
  'Actions',
] as const;

export const TRAINER_PROGRESS_TRACKING_PROGRESS_TAB_IDS = ['individual', 'compare'] as const;

export const TRAINER_PROGRESS_TRACKING_GOAL_STATUS = { ON_TRACK: 'On Track', OFF_TRACK: 'Off Track', ACHIEVED: 'Achieved' } as const;
export const TRAINER_PROGRESS_TRACKING_GOAL_STATUS_VALUES = [TRAINER_PROGRESS_TRACKING_GOAL_STATUS.ON_TRACK, TRAINER_PROGRESS_TRACKING_GOAL_STATUS.OFF_TRACK, TRAINER_PROGRESS_TRACKING_GOAL_STATUS.ACHIEVED] as const;

export const TRAINER_PROGRESS_TRACKING_PROGRESS_TABLE_COLUMNS = [
  { labelKey: 'TEXT_DATE', field: 'date' },
  { labelKey: 'TEXT_WEIGHT_KG', field: 'weightKg' },
  { labelKey: 'TEXT_HEIGHT_CM', field: 'heightCm' },
  { labelKey: 'TEXT_BMI', field: 'bmi' },
  { labelKey: 'TEXT_BODY_FAT_PERCENT', field: 'bodyFatPercent' },
  { labelKey: 'TEXT_MUSCLE_MASS_KG', field: 'muscleMassKg' },
  { labelKey: 'TEXT_WAIST_CM', field: 'waistCm' },
  { labelKey: 'TEXT_NOTES', field: null },
] as const;
