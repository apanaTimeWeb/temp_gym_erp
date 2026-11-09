import { describe, expect, it } from 'vitest';

import { TrainerAttendanceFormatDate, TrainerAttendanceFormatTime } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/utils/TrainerOperationsMemberAttendanceAttendanceDisplayFormatters';




describe('TrainerAttendanceDisplayFormatters', () => {
  it('formats attendance dates', () => {
    expect(TrainerAttendanceFormatDate('2026-09-14T00:00:00.000Z', 'en-IN')).toMatch(/14 Sep 2026/);
    expect(TrainerAttendanceFormatDate('not-a-date', 'en-IN')).toBe('—');
  });
  it('formats optional attendance times', () => {
    expect(TrainerAttendanceFormatTime('2026-09-14T06:30:00.000Z', 'en-IN')).toMatch(/^\d{2}:\d{2}$/);
    expect(TrainerAttendanceFormatTime(undefined, 'en-IN')).toBe('—');
  });
});
