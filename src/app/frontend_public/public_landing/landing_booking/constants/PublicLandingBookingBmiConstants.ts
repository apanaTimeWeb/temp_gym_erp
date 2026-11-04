// RESPONSIBILITY: Owns PublicLanding BMI categories and their semantic CSS classes.
export const LANDING_BMI_STATUS_VALUES = {
  UNDERWEIGHT: 'Underweight',
  NORMAL_WEIGHT: 'Normal Weight',
  OVERWEIGHT: 'Overweight',
  OBESE: 'Obese',
} as const;

export const LANDING_BMI_RESULT_CLASSES = {
  [LANDING_BMI_STATUS_VALUES.UNDERWEIGHT]: 'bmi-result--underweight',
  [LANDING_BMI_STATUS_VALUES.NORMAL_WEIGHT]: 'bmi-result--normal',
  [LANDING_BMI_STATUS_VALUES.OVERWEIGHT]: 'bmi-result--overweight',
  [LANDING_BMI_STATUS_VALUES.OBESE]: 'bmi-result--obese',
} as const;
