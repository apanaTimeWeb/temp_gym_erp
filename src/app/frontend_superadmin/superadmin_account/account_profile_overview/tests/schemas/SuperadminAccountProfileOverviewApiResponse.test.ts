import { describe, expect, it } from 'vitest';
import { z } from 'zod';
import { SuperadminAccountProfileOverviewApiResponseSchema } from '@/app/frontend_superadmin/superadmin_account/account_profile_overview/schemas/superadmin_account_profile_overview_api_response.schema';

describe('Account Profile API envelope', () => {
  const schema = SuperadminAccountProfileOverviewApiResponseSchema(z.object({ id: z.string() }));
  it('requires requestId on success and canonical failure diagnostics', () => {
    expect(schema.safeParse({ success: true, message: 'ok', data: { id: 'profile-1' }, requestId: 'req-1' }).success).toBe(true);
    expect(schema.safeParse({ success: false, message: 'failed', data: null, errorCode: 'UNAVAILABLE', statusCode: 503, requestId: 'req-2' }).success).toBe(true);
    expect(schema.safeParse({ success: true, message: 'ok', data: { id: 'profile-1' } }).success).toBe(false);
    expect(schema.safeParse({ success: false, message: 'failed', data: null, errorCode: 'UNAVAILABLE', statusCode: 503 }).success).toBe(false);
  });
});
