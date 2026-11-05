import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import { TrainerInfrastructureApiResponseSchema } from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/schemas/TrainerDashboardOverviewTrainerInfrastructureApiResponseSchema';
const response = TrainerInfrastructureApiResponseSchema(z.object({ id: z.string() }));
const requestId = 'request-42';
describe('trainer_dashboard/dashboard_overview canonical API envelope', () => {
  it('accepts typed success with required requestId', () => {
    expect(response.parse({ success: true, requestId, message: 'ok', data: { id: 'one' } }).success).toBe(true);
  });
  it('accepts required machine-coded failure', () => {
    expect(response.parse({ success: false, requestId, message: 'invalid', data: null, errorCode: 'INVALID', statusCode: 422 }).success).toBe(false);
  });
  it('rejects impossible and incomplete API envelopes', () => {
    expect(response.safeParse({ success: true, data: { id: 'one' }, message: 'ok' }).success).toBe(false);
    expect(response.safeParse({ success: true, requestId, message: 'ok', data: null }).success).toBe(false);
    expect(response.safeParse({ success: false, requestId, message: 'invalid', data: null, statusCode: 422 }).success).toBe(false);
    expect(response.safeParse({ success: false, requestId, message: 'invalid', data: null, errorCode: 'INVALID' }).success).toBe(false);
  });
});
