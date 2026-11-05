import { describe, expect, it } from 'vitest';
import { TrainerSessionsCreateSessionDtoSchema } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/schemas/TrainerCoachingSessionsDomainSchemas';
import { TrainerSessionsEditFormSchema } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/schemas/TrainerCoachingSessionsEditSchema';

describe('Trainer Sessions input schemas', () => {
  const valid = { type: 'Group', date: '2024-02-29', time: '10:30', duration: '60m' };

  it('accepts a valid leap day and rejects impossible calendar dates', () => {
    expect(TrainerSessionsCreateSessionDtoSchema.safeParse(valid).success).toBe(true);
    expect(TrainerSessionsCreateSessionDtoSchema.safeParse({ ...valid, date: '2026-02-31' }).success).toBe(false);
    expect(TrainerSessionsCreateSessionDtoSchema.safeParse({ ...valid, date: '2026-13-01' }).success).toBe(false);
  });

  it('rejects invalid times and unsupported durations while allowing supported display formats', () => {
    expect(TrainerSessionsCreateSessionDtoSchema.safeParse({ ...valid, time: '29:88' }).success).toBe(false);
    expect(TrainerSessionsCreateSessionDtoSchema.safeParse({ ...valid, duration: 'about an hour' }).success).toBe(false);
    expect(TrainerSessionsCreateSessionDtoSchema.safeParse({ ...valid, time: '07:00 AM', duration: '60 min' }).success).toBe(true);
  });

  it('uses the same validation for edits and rejects unknown update fields', () => {
    expect(TrainerSessionsEditFormSchema.safeParse({ time: '09:30', duration: '45m' }).success).toBe(true);
    expect(TrainerSessionsEditFormSchema.safeParse({ time: 'invalid', duration: '45m' }).success).toBe(false);
    expect(TrainerSessionsEditFormSchema.safeParse({ time: '09:30', duration: '45m', status: 'Completed' }).success).toBe(false);
  });
});
