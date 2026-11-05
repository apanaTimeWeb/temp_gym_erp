import { describe, expect, it } from 'vitest';
import { z } from 'zod';
import { TrainerInfrastructureApiResponseSchema } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/schemas/TrainerOperationsMemberAttendanceTrainerInfrastructureApiResponseSchema';
const schema = TrainerInfrastructureApiResponseSchema(z.object({ id: z.string() }));
describe('operations_member_attendance success/failure API transport contract', () => {
  it('rejects incomplete and contradictory envelopes', () => {
    expect(schema.safeParse({ success: true, requestId: 'r1', message: 'ok', data: { id: '1' } }).success).toBe(true);
    expect(schema.safeParse({ success: true, message: 'ok', data: { id: '1' } }).success).toBe(false);
    expect(schema.safeParse({ success: false, requestId: 'r2', message: 'not allowed', data: null, errorCode: 'FORBIDDEN', statusCode: 403 }).success).toBe(true);
    expect(schema.safeParse({ success: false, requestId: 'r3', message: 'bad', data: null }).success).toBe(false);
    expect(schema.safeParse({ success: true, requestId: 'r4', message: 'bad', data: null }).success).toBe(false);
  });
});
