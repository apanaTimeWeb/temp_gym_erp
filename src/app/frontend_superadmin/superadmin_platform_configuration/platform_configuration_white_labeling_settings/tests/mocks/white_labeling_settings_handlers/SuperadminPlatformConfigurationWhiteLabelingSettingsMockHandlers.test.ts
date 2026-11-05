import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';

import { SUPERADMIN_PLATFORM_CONFIGURATION_WHITE_LABELING_SETTINGS_API } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/config/superadmin_platform_configuration_white_labeling_settings.url_config';
import { mockWhiteLabelDomains } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/mocks/fixtures/SuperadminPlatformConfigurationWhiteLabelingSettingsMockFixtures';
import { resetSuperadminPlatformConfigurationWhiteLabelingMockState, superadminWhiteLabelingHandlers } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/mocks/handlers/SuperadminPlatformConfigurationWhiteLabelingSettingsMockHandlers';


const server = setupServer(...superadminWhiteLabelingHandlers);
const baseUrl = `http://localhost${SUPERADMIN_PLATFORM_CONFIGURATION_WHITE_LABELING_SETTINGS_API.DOMAINS}`;
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => { server.resetHandlers(); resetSuperadminPlatformConfigurationWhiteLabelingMockState(); });
afterAll(() => server.close());
beforeEach(() => resetSuperadminPlatformConfigurationWhiteLabelingMockState());

const update = (id: string, key: string, status: 'pending' | 'active' | 'failed') => fetch(
  `http://localhost${SUPERADMIN_PLATFORM_CONFIGURATION_WHITE_LABELING_SETTINGS_API.UPDATE_STATUS(id)}`,
  { method: 'PATCH', headers: { 'Content-Type': 'application/json', 'Idempotency-Key': key }, body: JSON.stringify({ status }) },
);

describe('white-labeling MSW contract', () => {
  it('normalizes search case and whitespace consistently', async () => {
    const response = await fetch(`${baseUrl}?search=%20TITAN%20%20FITNESS%20`);
    const body = await response.json() as { data: Array<{ id: string }> };
    expect(response.ok).toBe(true);
    expect(body.data.map((item) => item.id)).toEqual([mockWhiteLabelDomains[0]!.id]);
  });

  it('replays a repeated status intent and rejects reuse for a different intent', async () => {
    const id = mockWhiteLabelDomains[1]!.id;
    const first = await update(id, 'white-label-intent-1', 'active');
    const firstBody = await first.json() as { data: { id: string; status: string } };
    const replay = await update(id, 'white-label-intent-1', 'active');
    const replayBody = await replay.json() as { data: { id: string; status: string } };
    expect(first.ok).toBe(true);
    expect(replay.ok).toBe(true);
    expect(replayBody.data).toMatchObject(firstBody.data);
    expect((await update(id, 'white-label-intent-1', 'failed')).status).toBe(409);
  });

  it('requires idempotency keys and resets mutable state', async () => {
    const id = mockWhiteLabelDomains[1]!.id;
    const missingKey = await fetch(`http://localhost${SUPERADMIN_PLATFORM_CONFIGURATION_WHITE_LABELING_SETTINGS_API.UPDATE_STATUS(id)}`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: 'active' }),
    });
    expect(missingKey.status).toBe(400);
    await update(id, 'white-label-reset-intent', 'active');
    resetSuperadminPlatformConfigurationWhiteLabelingMockState();
    const response = await fetch(baseUrl);
    const body = await response.json() as { data: Array<{ id: string; status: string }> };
    expect(body.data).toHaveLength(mockWhiteLabelDomains.length);
    expect(body.data.find((domain) => domain.id === id)?.status).toBe('pending');
  });
});
