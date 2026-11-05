import { setupServer } from 'msw/node';
import { expect, beforeEach, beforeAll, afterAll, describe, it } from 'vitest';

import { SUPERADMIN_GYMS_DIRECTORY_API as SUPERADMIN_GYMS_MANAGEMENT_API } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/config/superadmin_gyms_directory.url_config';
import { SUPERADMIN_GYM_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/constants/superadmin_gyms_directory.constants';
import { MOCK_GYMS, MOCK_GYM_STATS } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/mocks/SuperadminGymsDirectoryMockFixtures';
import { superadminGymsHandlers, resetSuperadminGymsMockState } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/mocks/SuperadminGymsDirectoryMockHandlers';


const server = setupServer(...superadminGymsHandlers);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
beforeEach(() => resetSuperadminGymsMockState());

describe('Superadmin Gyms MSW integration', () => {
  it('provides valid trial-end dates for trial calendar events', () => {
    const trialGyms = MOCK_GYMS.filter((gym) => gym.status === SUPERADMIN_GYM_STATUS_CODES.TRIAL);
    expect(trialGyms.length).toBeGreaterThan(0);
    expect(trialGyms.every((gym) => typeof gym.trialEndsAt === 'string' && !Number.isNaN(Date.parse(gym.trialEndsAt)))).toBe(true);
  });

  it('supports filter and pagination against the authoritative 24-record fixture', async () => {
    const response = await fetch(`http://localhost${SUPERADMIN_GYMS_MANAGEMENT_API.BASE}?status=ACTIVE&page=1&limit=3&sortBy=memberCount&order=asc`);
    const body = await response.json();
    expect(response.ok).toBe(true);
    expect(body.meta.total).toBe(MOCK_GYM_STATS.active);
    expect(body.data).toHaveLength(3);
    expect(body.data.map((gym: { status: string }) => gym.status)).toEqual([SUPERADMIN_GYM_STATUS_CODES.ACTIVE, SUPERADMIN_GYM_STATUS_CODES.ACTIVE, SUPERADMIN_GYM_STATUS_CODES.ACTIVE]);
  });

  it('sorts by the populated lastActiveAt field and returns 404 for an unknown gym', async () => {
    const asc = await fetch(`http://localhost${SUPERADMIN_GYMS_MANAGEMENT_API.BASE}?page=1&limit=2&sortBy=lastActiveAt&order=asc`);
    const ascBody = await asc.json();
    expect(asc.ok).toBe(true);
    expect(ascBody.data.map((gym: { id: string }) => gym.id)).toEqual(['t3', 't15']);

    const missing = await fetch(`http://localhost${SUPERADMIN_GYMS_MANAGEMENT_API.BASE}/does-not-exist`);
    expect(missing.status).toBe(404);
  });

  it('requires idempotency keys and replays identical gym create requests', async () => {
    const payload = { name: 'RBG6 Replay Gym', ownerName: 'Replay Owner', adminEmail: 'replay@example.com', phone: '9876543210', plan: 'Starter' };
    const missingKey = await fetch(`http://localhost${SUPERADMIN_GYMS_MANAGEMENT_API.BASE}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
    });
    expect(missingKey.status).toBe(400);

    const create = () => fetch(`http://localhost${SUPERADMIN_GYMS_MANAGEMENT_API.BASE}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'Idempotency-Key': 'rbg6-gym-create-1' }, body: JSON.stringify(payload),
    });
    const first = await create();
    const firstBody = await first.json();
    const replay = await create();
    const replayBody = await replay.json();
    expect(first.ok).toBe(true);
    expect(replay.ok).toBe(true);
    expect(replayBody.data.id).toBe(firstBody.data.id);

    const listResponse = await fetch(`http://localhost${SUPERADMIN_GYMS_MANAGEMENT_API.BASE}?search=${encodeURIComponent(payload.name)}&page=1&limit=20`);
    const listBody = await listResponse.json();
    expect(listBody.meta.total).toBe(1);
  });

  it('rejects an idempotency key reused for a different gym mutation', async () => {
    const createWith = (name: string) => fetch(`http://localhost${SUPERADMIN_GYMS_MANAGEMENT_API.BASE}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'Idempotency-Key': 'rbg6-gym-conflict-1' },
      body: JSON.stringify({ name, ownerName: 'Conflict Owner', adminEmail: 'conflict@example.com', phone: '9876543210', plan: 'Starter' }),
    });
    expect((await createWith('First Intent Gym')).status).toBe(200);
    expect((await createWith('Different Intent Gym')).status).toBe(409);
    const listResponse = await fetch(`http://localhost${SUPERADMIN_GYMS_MANAGEMENT_API.BASE}?search=Intent%20Gym&page=1&limit=20`);
    const listBody = await listResponse.json();
    expect(listBody.meta.total).toBe(1);
  });

  it('returns actual CSV content for the export download URL', async () => {
    const exportResponse = await fetch(`http://localhost${SUPERADMIN_GYMS_MANAGEMENT_API.EXPORT}`);
    expect(exportResponse.ok).toBe(true);
    const exportBody = await exportResponse.json();
    const fileResponse = await fetch(`http://localhost${exportBody.data.downloadUrl}`);
    expect(fileResponse.ok).toBe(true);
    expect(fileResponse.headers.get('content-type')).toContain('text/csv');
    expect(await fileResponse.text()).toContain('id,name,status,plan');
  });

  it('supports the documented email-owner and impersonation URL contracts', async () => {
    const target = MOCK_GYMS[0];
    const email = await fetch(`http://localhost${SUPERADMIN_GYMS_MANAGEMENT_API.EMAIL_OWNER(target.id)}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'Idempotency-Key': `gym-email-${target.id}` },
      body: JSON.stringify({ subject: 'Account details', message: 'A valid owner notification.' }),
    });
    expect(email.ok).toBe(true);
    const impersonate = await fetch(`http://localhost${SUPERADMIN_GYMS_MANAGEMENT_API.IMPERSONATE_GYM(target.id)}`, {
      method: 'POST', headers: { 'Idempotency-Key': `gym-impersonate-${target.id}` },
    });
    expect(impersonate.ok).toBe(true);
    expect((await impersonate.json()).data.token).toContain(target.id);
  });

  it('mutates a selected gym status and exposes the changed row in the next query', async () => {
    const target = MOCK_GYMS.find((gym) => gym.status === SUPERADMIN_GYM_STATUS_CODES.ACTIVE)!;
    const update = await fetch(`http://localhost${SUPERADMIN_GYMS_MANAGEMENT_API.BASE}/${target.id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'Idempotency-Key': `gym-status-${target.id}-1` },
      body: JSON.stringify({ status: SUPERADMIN_GYM_STATUS_CODES.SUSPENDED }),
    });
    expect(update.ok).toBe(true);
    const updateBody = await update.json();
    expect(updateBody.data.status).toBe(SUPERADMIN_GYM_STATUS_CODES.SUSPENDED);

    const list = await fetch(`http://localhost${SUPERADMIN_GYMS_MANAGEMENT_API.BASE}?search=${encodeURIComponent(target.id)}&page=1&limit=20`);
    const listBody = await list.json();
    const updatedGym = listBody.data.find((g: { id: string; status: string }) => g.id === target.id);
    expect(updatedGym.status).toBe(SUPERADMIN_GYM_STATUS_CODES.SUSPENDED);
  });
});
