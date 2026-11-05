import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { z } from 'zod';

import { resetSuperadminBackupsMockState, superadminBackupsHandlers } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/mocks/SuperadminSystemOpsBackupsMockHandlers';
import { SuperadminSystemOpsBackupsApiResponseSchema } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/schemas/superadmin_system_ops_backups_api_response.schema';

const server = setupServer(...superadminBackupsHandlers);
const listUrl = 'http://localhost/superadmin/system-ops/backups';
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => { server.resetHandlers(); resetSuperadminBackupsMockState(); });
afterAll(() => server.close());
beforeEach(() => resetSuperadminBackupsMockState());

describe('backup type filter contract guard', () => {
  it('rejects a type filter instead of inventing classification from backup IDs', async () => {
    const response = await fetch(`${listUrl}?type=MANUAL`);
    const body = await response.json() as { success: boolean; message: string };
    expect(response.status).toBe(400);
    expect(body.success).toBe(false);
    expect(body.message).toContain('canonical type contract');
  });

  it('continues to return the unclassified backup list when no type filter is requested', async () => {
    const response = await fetch(`${listUrl}?limit=100`);
    const body = await response.json() as { success: boolean; data: Array<{ id: string }> };
    expect(response.status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.data).toHaveLength(12);
  });
});
describe('Backups API response envelope', () => {
  const schema = SuperadminSystemOpsBackupsApiResponseSchema(z.object({ id: z.string() }));
  it('accepts canonical success and failure envelopes with traceable request IDs', () => {
    expect(schema.safeParse({ success: true, message: 'ok', data: { id: 'backup-1' }, requestId: 'req-success' }).success).toBe(true);
    expect(schema.safeParse({ success: false, message: 'unavailable', data: null, errorCode: 'BACKUPS_UNAVAILABLE', statusCode: 503, requestId: 'req-failure' }).success).toBe(true);
  });
  it('rejects incomplete canonical envelopes and mismatched discriminant/data combinations', () => {
    expect(schema.safeParse({ success: true, message: 'missing request id', data: { id: 'backup-1' } }).success).toBe(false);
    expect(schema.safeParse({ success: false, message: 'missing diagnostics', data: null, requestId: 'req-1' }).success).toBe(false);
    expect(schema.safeParse({ success: false, message: 'missing data', errorCode: 'FAILED', statusCode: 500, requestId: 'req-2' }).success).toBe(false);
    expect(schema.safeParse({ success: false, message: 'failure', data: { id: 'backup-1' }, errorCode: 'FAILED', statusCode: 500, requestId: 'req-3' }).success).toBe(false);
  });
});
