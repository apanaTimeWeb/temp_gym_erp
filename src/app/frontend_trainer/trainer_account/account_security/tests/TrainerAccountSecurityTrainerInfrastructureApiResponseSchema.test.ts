import { describe, expect, it } from 'vitest';
import { z } from 'zod';
import { TrainerInfrastructureApiResponseSchema } from '@/app/frontend_trainer/trainer_account/account_security/schemas/TrainerAccountSecurityTrainerInfrastructureApiResponseSchema';

const schema = TrainerInfrastructureApiResponseSchema(z.object({ id: z.string() }));
const requestId = 'request-validation-1';

describe('canonical account_security ApiResponse envelope', () => {
  it('accepts verified success shape with typed data and request identity', () => {
    expect(schema.parse({ success: true, requestId, message: 'ok', data: { id: 'a' } }).success).toBe(true);
  });
  it('accepts structured failure with required code and status', () => {
    expect(schema.parse({ success: false, requestId, message: 'invalid', data: null, errorCode: 'INVALID', statusCode: 422 }).success).toBe(false);
  });
  it('rejects requestId omission, missing failure code, and ambiguous boolean success', () => {
    expect(schema.safeParse({ success: true, message: 'ok', data: { id: 'a' } }).success).toBe(false);
    expect(schema.safeParse({ success: false, requestId, message: 'invalid', data: null, statusCode: 422 }).success).toBe(false);
    expect(schema.safeParse({ success: 1, requestId, message: 'ok', data: { id: 'a' } }).success).toBe(false);
    expect(schema.safeParse({ success: true, requestId, message: 'ok', data: null }).success).toBe(false);
  });
});
