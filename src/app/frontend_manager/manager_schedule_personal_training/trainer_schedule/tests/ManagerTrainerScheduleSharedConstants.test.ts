import { describe, expect, it } from 'vitest';

import { SHIFT_DAYS, SHIFT_STATUS_OPTIONS, SHIFT_STATUS_STYLES, TIME_OPTIONS } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/constants/manager_trainer_schedule_shared.constants';


describe('ManagerTrainerScheduleSharedConstants', () => {
  it('keeps the weekly day/status contract stable', () => {
    expect(SHIFT_DAYS).toHaveLength(7);
    expect(SHIFT_STATUS_OPTIONS).toEqual(['Active', 'Off', 'Leave']);
    expect(SHIFT_STATUS_STYLES.Leave?.text).toBe('text-warning-text');
  });

  it('provides half-hour time slots across the configured schedule window', () => {
    expect(TIME_OPTIONS[0]).toBe('05:00');
    expect(TIME_OPTIONS.at(-1)).toBe('22:00');
    expect(TIME_OPTIONS).toContain('09:30');
  });
});
