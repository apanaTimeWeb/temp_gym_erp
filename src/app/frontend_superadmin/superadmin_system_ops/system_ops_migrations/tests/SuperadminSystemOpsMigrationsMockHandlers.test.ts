import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';

import { SUPERADMIN_SYSTEM_OPS_MIGRATIONS_API } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_migrations/config/superadmin_system_ops_migrations.url_config';
import { resetSuperadminSystemOpsMigrationsMockState, superadminMigrationsHandlers } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_migrations/mocks/SuperadminSystemOpsMigrationsMockHandlers';


const server = setupServer(...superadminMigrationsHandlers);
const triggerUrl = `http://localhost${SUPERADMIN_SYSTEM_OPS_MIGRATIONS_API.TRIGGER}`;
const listUrl = `http://localhost${SUPERADMIN_SYSTEM_OPS_MIGRATIONS_API.BASE}`;
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => { server.resetHandlers(); resetSuperadminSystemOpsMigrationsMockState(); });
afterAll(() => server.close());
beforeEach(() => resetSuperadminSystemOpsMigrationsMockState());

describe('migrations MSW mutable state and idempotency', () => {
  it('replays the same migration for duplicate requests with the same intent key', async () => {
    const options = { method: 'POST', headers: { 'Content-Type': 'application/json', 'Idempotency-Key': 'migration-intent-1' }, body: JSON.stringify({ targetVersion: 'v1.6.0' }) };
    const first = await (await fetch(triggerUrl, options)).json() as { data: { id: string } };
    const second = await (await fetch(triggerUrl, options)).json() as { data: { id: string } };
    expect(second.data.id).toBe(first.data.id);
    const list = await (await fetch(listUrl)).json() as { data: Array<{ id: string }> };
    expect(list.data.filter((item) => item.id === first.data.id)).toHaveLength(1);
  });
  it('rejects reuse of an idempotency key for a different target version', async () => {
    const key = 'migration-intent-conflict';
    await fetch(triggerUrl, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Idempotency-Key': key }, body: JSON.stringify({ targetVersion: 'v1.6.0' }) });
    const response = await fetch(triggerUrl, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Idempotency-Key': key }, body: JSON.stringify({ targetVersion: 'v1.7.0' }) });
    expect(response.status).toBe(409);
  });
  it('restores fixtures and clears idempotency state between tests', async () => {
    const before = await (await fetch(listUrl)).json() as { data: Array<{ id: string }> };
    await fetch(triggerUrl, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Idempotency-Key': 'reset-test' }, body: JSON.stringify({ targetVersion: 'v1.6.0' }) });
    resetSuperadminSystemOpsMigrationsMockState();
    const after = await (await fetch(listUrl)).json() as { data: Array<{ id: string }> };
    expect(after.data).toHaveLength(before.data.length);
  });
});
