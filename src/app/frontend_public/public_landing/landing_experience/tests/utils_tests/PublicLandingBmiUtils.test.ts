import { describe, expect, it } from 'vitest';
import { calculatePublicLandingBmi } from '@/app/frontend_public/public_landing/landing_experience/utils/PublicLandingBmiUtils';

describe('calculatePublicLandingBmi', () => {
  it.each([
    ['18.4', 'Underweight'],
    ['18.5', 'Normal Weight'],
    ['24.9', 'Normal Weight'],
    ['25.0', 'Overweight'],
    ['29.9', 'Overweight'],
    ['30.0', 'Obese'],
  ])('maps BMI %s to %s', (bmi, expectedStatus) => {
    const result = calculatePublicLandingBmi(100, Number(bmi));
    expect(result?.status).toBe(expectedStatus);
  });

  it('returns null for invalid values', () => {
    expect(calculatePublicLandingBmi(0, 70)).toBeNull();
    expect(calculatePublicLandingBmi(170, Number.NaN)).toBeNull();
    expect(calculatePublicLandingBmi(Number.MIN_VALUE, Number.MAX_VALUE)).toBeNull();
  });
});
