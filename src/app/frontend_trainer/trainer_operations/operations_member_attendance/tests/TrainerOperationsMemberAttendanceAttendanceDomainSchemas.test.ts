import { describe, expect, it } from 'vitest';

import {
  TrainerAttendanceCreateDtoSchema,
  TrainerAttendanceMemberSchema,
  TrainerAttendanceRecordSchema,
} from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/schemas/TrainerOperationsMemberAttendanceAttendanceDomainSchemas';

describe('TrainerAttendanceDomainSchemas', () => {
  it('normalizes numeric and string member identifiers to strings', () => {
    expect(TrainerAttendanceMemberSchema.parse({ id: 42, name: 'Trainer Member' })).toMatchObject({ id: '42', name: 'Trainer Member' });
    expect(TrainerAttendanceMemberSchema.parse({ id: 'm-1', name: 'Trainer Member' }).id).toBe('m-1');
  });

  it('normalizes optional numeric staff/member IDs on records without changing other fields', () => {
    const parsed = TrainerAttendanceRecordSchema.parse({
      id: 'attendance-1', type: 'STAFF', date: '2026-10-16', staffId: 7,
      staff: { id: 7, name: 'Trainer Demo' },
    });
    expect(parsed.staffId).toBe('7');
    expect(parsed.staff?.id).toBe('7');
    expect(parsed.date).toBe('2026-10-16');
  });

  it('rejects a missing date and a member record without a member identity', () => {
    expect(TrainerAttendanceCreateDtoSchema.safeParse({ type: 'MEMBER', memberId: 'm-1' }).success).toBe(false);
    const missingMember = TrainerAttendanceCreateDtoSchema.safeParse({ type: 'MEMBER', date: '2026-10-16' });
    expect(missingMember.success).toBe(false);
    if (!missingMember.success) expect(missingMember.error.issues.some((issue) => issue.path[0] === 'memberId')).toBe(true);
  });

  it('requires a staff identity for self check-in and accepts a valid one', () => {
    expect(TrainerAttendanceCreateDtoSchema.safeParse({ type: 'STAFF', date: '2026-10-16', isSelfCheckIn: true }).success).toBe(false);
    expect(TrainerAttendanceCreateDtoSchema.safeParse({ type: 'STAFF', staffId: 'staff-1', date: '2026-10-16', isSelfCheckIn: true }).success).toBe(true);
  });
});
