import {describe, expect, it, beforeEach} from 'vitest';
import { z } from 'zod';

import { resetSuperadminSystemOpsJobsMockState } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/mocks/SuperadminSystemOpsJobsMockHandlers';
import { SUPERADMIN_JOBS_QUEUE_HEALTH_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/mocks/SuperadminSystemOpsJobsV1MockFixtures';
import { SuperadminSystemOpsJobsApiResponseSchema } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/schemas/superadmin_system_ops_jobs_api_response.schema';
import { SuperadminSystemOpsJobsV1DataSchema } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/schemas/superadmin_system_ops_jobs_v1.schemas';

beforeEach(() => {
  resetSuperadminSystemOpsJobsMockState();
});

describe('Background Job Queue Health contract', () => {
    it('accepts the complete module fixture', () => {
        const result = SuperadminSystemOpsJobsV1DataSchema.safeParse(SUPERADMIN_JOBS_QUEUE_HEALTH_MOCK_FIXTURE);
        expect(result.success).toBe(true);
    });
});
describe('Jobs API response envelope', () => {
  const schema = SuperadminSystemOpsJobsApiResponseSchema(z.object({ id: z.string() }));
  it('accepts the success and failure discriminants independently', () => {
    expect(schema.safeParse({ success: true, message: 'ok', data: { id: 'job-1' }, requestId: 'req-1' }).success).toBe(true);
    expect(schema.safeParse({ success: false, message: 'unavailable', data: null, errorCode: 'UNAVAILABLE', statusCode: 503, requestId: 'req-2' }).success).toBe(true);
  });
  it('rejects invalid branch/data combinations', () => {
    expect(schema.safeParse({ success: true, message: 'missing data', requestId: 'req-4' }).success).toBe(false);
    expect(schema.safeParse({ success: true, message: 'missing request id', data: { id: 'job-1' } }).success).toBe(false);
    expect(schema.safeParse({ success: false, message: 'failure', data: { id: 'job-1' }, errorCode: 'DOWN', statusCode: 500, requestId: 'req-3' }).success).toBe(false);
  });
});
