// RESPONSIBILITY: Calculates BMI and maps the result to a module-owned semantic category.
import { LANDING_BMI_RESULT_CLASSES, LANDING_BMI_STATUS_VALUES } from '@/app/frontend_public/public_landing/landing_experience/constants/PublicLandingExperienceBmiConstants';
import type { PublicLandingBmiResult } from '@/app/frontend_public/public_landing/landing_experience/types/PublicLandingExperienceTypes';

const LANDING_BMI_NORMAL_MAX = 25;
const LANDING_BMI_OVERWEIGHT_MAX = 30;

/** Returns a deterministic BMI result for valid metric inputs.
 * @dependencies PublicLanding BMI semantic constants only.
 * @edge-case Non-positive or non-finite values return null; display formatting is performed before leaving this utility.
 */
export function calculatePublicLandingBmi(heightCm: number, weightKg: number): PublicLandingBmiResult | null {
  if (!Number.isFinite(heightCm) || !Number.isFinite(weightKg) || heightCm <= 0 || weightKg <= 0) return null;
  const heightMeters = heightCm / 100;
  const bmi = weightKg / (heightMeters * heightMeters);
  if (!Number.isFinite(bmi)) return null;
  const status = bmi < 18.5
    ? LANDING_BMI_STATUS_VALUES.UNDERWEIGHT
    : bmi < LANDING_BMI_NORMAL_MAX
      ? LANDING_BMI_STATUS_VALUES.NORMAL_WEIGHT
      : bmi < LANDING_BMI_OVERWEIGHT_MAX
        ? LANDING_BMI_STATUS_VALUES.OVERWEIGHT
        : LANDING_BMI_STATUS_VALUES.OBESE;
  return { value: bmi.toFixed(1), status, colorClass: LANDING_BMI_RESULT_CLASSES[status] };
}
