import { describe, expect, it } from 'vitest';

import * as moduleUnderTest from '@/app/frontend_manager/manager_workout_diet_library/workout_plan_management/utils/ManagerWorkoutPlansFormatters';

describe('ManagerWorkoutPlansFormatters behavioral contract', () => {
  it('ManagerWorkoutPlansFormatCurrency formats minor-unit currency through Intl', () => {
    const formatted = moduleUnderTest.ManagerWorkoutPlansFormatCurrency(12345, 'INR', 'en-IN');
    expect(formatted).toContain('123');
    expect(formatted).toContain('45');
  });
  it('ManagerWorkoutPlansFormatNumber formats a metric without decimals', () => {
    expect(moduleUnderTest.ManagerWorkoutPlansFormatNumber(123456, 'en-IN')).toContain('123');
  });
  it('ManagerWorkoutPlansFormatPercent formats percentages', () => {
    expect(moduleUnderTest.ManagerWorkoutPlansFormatPercent(12.5, 'en-IN')).toContain('%');
  });
  it('ManagerWorkoutPlansFormatKpi formats KPI values', () => {
    expect(moduleUnderTest.ManagerWorkoutPlansFormatKpi(1234, 'en-IN')).toBeTruthy();
  });
  it('ManagerWorkoutPlansDisplayValue provides en-dash nullable fallback', () => {
    expect(moduleUnderTest.ManagerWorkoutPlansDisplayValue(null)).toBe('—');
    expect(moduleUnderTest.ManagerWorkoutPlansDisplayValue('Ready')).toBe('Ready');
  });
  it('ManagerWorkoutPlansMaskSensitiveData masks sensitive identifiers by default', () => {
    expect(moduleUnderTest.ManagerWorkoutPlansMaskSensitiveData('9876543210', 'phone')).not.toBe('9876543210');
  });
  it('ManagerWorkoutPlansFormatDate formats a date value', () => {
    expect(moduleUnderTest.ManagerWorkoutPlansFormatDate('2026-01-02', 'en-IN')).not.toBe('—');
  });
  it('ManagerWorkoutPlansFormatDateTime formats a date-time value', () => {
    expect(moduleUnderTest.ManagerWorkoutPlansFormatDateTime('2026-01-02T10:30:00Z', 'en-IN')).not.toBe('—');
  });
});

describe('workout enum display labels', () => {
  it('maps documented workout levels to translation keys', () => {
    expect(moduleUnderTest.ManagerWorkoutPlansGetLevelLabelKey('BEGINNER')).toBe('COPY_BEGINNER');
  });

  it('maps documented exercise difficulties to translation keys', () => {
    expect(moduleUnderTest.ManagerWorkoutPlansGetDifficultyLabelKey('ADVANCED')).toBe('COPY_ADVANCED');
  });

  it('uses the documented fallback for unknown values', () => {
    expect(moduleUnderTest.ManagerWorkoutPlansGetLevelLabelKey('UNKNOWN')).toBe('COPY_N');
  });
});
