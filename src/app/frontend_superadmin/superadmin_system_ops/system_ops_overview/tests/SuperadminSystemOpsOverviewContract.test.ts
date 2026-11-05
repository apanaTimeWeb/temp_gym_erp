import { describe, expect, it } from 'vitest';
import { z } from 'zod';

import { SUPERADMIN_SYSTEM_OPS_SUMMARY_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_overview/mocks/SuperadminSystemOpsOverviewMockFixtures';
import { SuperadminSystemOpsOverviewApiResponseSchema } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_overview/schemas/superadmin_system_ops_overview_api_response.schema';
import { SuperadminSystemOpsSummarySchema } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_overview/schemas/superadmin_system_ops_overview_types.schemas';

describe('Superadmin System Ops summary contract', () => {
  it('accepts the complete module-owned summary fixture', () => {
    const result = SuperadminSystemOpsSummarySchema.safeParse(SUPERADMIN_SYSTEM_OPS_SUMMARY_MOCK_FIXTURE);
    expect(result.success).toBe(true);
  });
});
describe('Superadmin System Ops API response envelope', () => {
  const schema = SuperadminSystemOpsOverviewApiResponseSchema(z.object({ id: z.string() }));
  it('accepts success data and a failure envelope without success data', () => {
    expect(schema.safeParse({ success: true, message: 'ok', data: { id: 'n1' }, requestId: 'req-1' }).success).toBe(true);
    expect(schema.safeParse({ success: false, message: 'unavailable', data: null, errorCode: 'DOWN', statusCode: 503, requestId: 'req-2' }).success).toBe(true);
  });
  it('rejects success without data and failure carrying success-shaped data', () => {
    expect(schema.safeParse({ success: true, message: 'missing data', requestId: 'req-4' }).success).toBe(false);
    expect(schema.safeParse({ success: true, message: 'missing request id', data: { id: 'n1' } }).success).toBe(false);
    expect(schema.safeParse({ success: false, message: 'failure', data: { id: 'n1' }, errorCode: 'DOWN', statusCode: 500, requestId: 'req-3' }).success).toBe(false);
  });
});
