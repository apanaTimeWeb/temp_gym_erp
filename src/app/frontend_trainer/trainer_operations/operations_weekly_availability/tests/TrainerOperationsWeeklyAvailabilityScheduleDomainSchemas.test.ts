import { describe, expect, it } from 'vitest';
import { TrainerScheduleCreateLeaveDtoSchema, TrainerScheduleWeeklyAvailabilityFormSchema } from '@/app/frontend_trainer/trainer_operations/operations_weekly_availability/schemas/TrainerOperationsWeeklyAvailabilityScheduleDomainSchemas';
import { TRAINER_SCHEDULE_MOCK_AVAILABILITY } from '@/app/frontend_trainer/trainer_operations/operations_weekly_availability/mocks/fixtures/TrainerOperationsWeeklyAvailabilityScheduleMockData';

describe('Trainer Schedule domain validation', () => {
  it('accepts seven unique weekdays with valid times', () => {
    expect(TrainerScheduleWeeklyAvailabilityFormSchema.safeParse({ days: TRAINER_SCHEDULE_MOCK_AVAILABILITY }).success).toBe(true);
  });
  it('rejects duplicate weekdays and reversed available intervals', () => {
    const duplicate = [...TRAINER_SCHEDULE_MOCK_AVAILABILITY];
    duplicate[1] = { ...duplicate[1]!, day: duplicate[0]!.day };
    expect(TrainerScheduleWeeklyAvailabilityFormSchema.safeParse({ days: duplicate }).success).toBe(false);
    const reversed = TRAINER_SCHEDULE_MOCK_AVAILABILITY.map((day) => day.day === 'Monday' ? { ...day, startTime: '18:00', endTime: '06:00' } : day);
    expect(TrainerScheduleWeeklyAvailabilityFormSchema.safeParse({ days: reversed }).success).toBe(false);
  });
  it('rejects malformed, impossible, and reversed leave dates', () => {
    const base = { startDate: '2026-10-01', endDate: '2026-10-02', reason: 'Annual leave', leaveType: 'Personal' };
    expect(TrainerScheduleCreateLeaveDtoSchema.safeParse(base).success).toBe(true);
    expect(TrainerScheduleCreateLeaveDtoSchema.safeParse({ ...base, startDate: '2026-02-30' }).success).toBe(false);
    expect(TrainerScheduleCreateLeaveDtoSchema.safeParse({ ...base, startDate: 'not-a-date' }).success).toBe(false);
    expect(TrainerScheduleCreateLeaveDtoSchema.safeParse({ ...base, startDate: '2026-10-03', endDate: '2026-10-02' }).success).toBe(false);
  });
});
