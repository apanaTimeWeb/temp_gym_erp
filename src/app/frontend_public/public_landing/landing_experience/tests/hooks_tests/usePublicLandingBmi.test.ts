import { renderHook, act } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { usePublicLandingBmi } from '@/app/frontend_public/public_landing/landing_experience/hooks/usePublicLandingBmi';

describe('usePublicLandingBmi', () => {
  it('calculates and exposes a categorized result after valid submission', () => {
    const { result } = renderHook(() => usePublicLandingBmi());
    act(() => { result.current.handleHeightChange({ target: { value: '100' } } as never); result.current.handleWeightChange({ target: { value: '25' } } as never); });
    act(() => { result.current.handleCalculate({ preventDefault: () => undefined } as never); });
    expect(result.current.bmiResult?.value).toBe('25.0');
    expect(result.current.bmiResult?.status).toBe('Overweight');
    expect(result.current.inputErrorKey).toBeNull();
  });

  it('exposes a localized validation key for non-positive input', () => {
    const { result } = renderHook(() => usePublicLandingBmi());
    act(() => { result.current.handleHeightChange({ target: { value: '0' } } as never); result.current.handleWeightChange({ target: { value: '70' } } as never); });
    act(() => { result.current.handleCalculate({ preventDefault: () => undefined } as never); });
    expect(result.current.bmiResult).toBeNull();
    expect(result.current.inputErrorKey).toBe('bmi.positiveValues');
  });
});
