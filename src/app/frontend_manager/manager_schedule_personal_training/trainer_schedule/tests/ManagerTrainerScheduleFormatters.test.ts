import { describe, expect, it } from 'vitest';
import { ManagerTrainerScheduleDisplayValue } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/utils/ManagerTrainerScheduleFormatters';

describe('ManagerTrainerScheduleDisplayValue', () => {
  it('renders missing values with an en dash and preserves valid falsy values', () => {
    expect(ManagerTrainerScheduleDisplayValue(null)).toBe('—');
    expect(ManagerTrainerScheduleDisplayValue(undefined)).toBe('—');
    expect(ManagerTrainerScheduleDisplayValue('')).toBe('—');
    expect(ManagerTrainerScheduleDisplayValue(0)).toBe('0');
    expect(ManagerTrainerScheduleDisplayValue(false)).toBe('false');
    expect(ManagerTrainerScheduleDisplayValue('Available')).toBe('Available');
  });
});
