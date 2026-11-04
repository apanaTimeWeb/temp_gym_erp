'use client';
// RESPONSIBILITY: Owns BMI input state and delegates calculation to the pure PublicLanding BMI utility.
// DATA FLOW: Height/weight input events → local state → submit calculation → result or localized validation key.
import { useCallback, useState, type ChangeEvent, type FormEvent } from 'react';
import { calculatePublicLandingBmi } from '@/app/frontend_public/public_landing/landing_experience/utils/PublicLandingBmiUtils';
import type { PublicLandingBmiResult } from '@/app/frontend_public/public_landing/landing_experience/types/PublicLandingExperienceTypes';

/**
 * Provides isolated BMI calculator state and event handlers for the PublicLanding BMI section.
 * @dependencies Pure PublicLanding BMI calculation utility.
 * @edge-cases Non-numeric, zero, or negative inputs clear the previous result and set a translation key instead of hardcoded UI copy.
 */
export function usePublicLandingBmi() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmiResult, setBmiResult] = useState<PublicLandingBmiResult | null>(null);
  const [inputErrorKey, setInputErrorKey] = useState<string | null>(null);

  const handleHeightChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setHeight(event.target.value);
    setBmiResult(null);
    setInputErrorKey(null);
  }, []);

  const handleWeightChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setWeight(event.target.value);
    setBmiResult(null);
    setInputErrorKey(null);
  }, []);

  const handleCalculate = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = calculatePublicLandingBmi(Number(height), Number(weight));
    if (!result) {
      setBmiResult(null);
      setInputErrorKey('bmi.positiveValues');
      return;
    }
    setInputErrorKey(null);
    setBmiResult(result);
  }, [height, weight]);

  return { height, weight, bmiResult, inputErrorKey, handleHeightChange, handleWeightChange, handleCalculate };
}
