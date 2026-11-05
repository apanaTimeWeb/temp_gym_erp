import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

import { SUPERADMIN_PLATFORM_CONFIGURATION_SETTINGS_GENERAL_API } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_settings_general/config/superadmin_platform_configuration_settings_general.url_config';
import { MOCK_PLATFORM_SETTINGS } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_settings_general/mocks/fixtures/SuperadminPlatformConfigurationSettingsGeneralMockData';
import { createSettingsGeneralScenarioHandler, createSettingsGeneralEmptyScenarioData } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_settings_general/mocks/scenarios/superadmin_platform_configuration_settings_general.scenarios';


const activeData = JSON.parse(JSON.stringify(MOCK_PLATFORM_SETTINGS));
const emptyData = createSettingsGeneralEmptyScenarioData(activeData);
const server = setupServer(createSettingsGeneralScenarioHandler(
  SUPERADMIN_PLATFORM_CONFIGURATION_SETTINGS_GENERAL_API.BASE,
  (scenario) => scenario === 'ACTIVE' ? activeData : emptyData,
));
const requestScenario = (scenario: string) => fetch(`http://127.0.0.1${SUPERADMIN_PLATFORM_CONFIGURATION_SETTINGS_GENERAL_API.BASE}?__mockScenario=${scenario}`);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('settings_general mock scenarios', () => {
  it('returns the fixture-shaped active success envelope', async () => {
    const response = await requestScenario('ACTIVE');
    const body = await response.json();
    expect(response.status).toBe(200);
    expect(body).toMatchObject({ success: true, data: activeData, requestId: expect.any(String) });
  });

  it('returns an empty payload derived from the owning fixture without inventing fields', async () => {
    const response = await requestScenario('EMPTY');
    const body = await response.json();
    expect(response.status).toBe(200);
    expect(body).toMatchObject({ success: true, data: emptyData, requestId: expect.any(String) });
  });

  it('returns the canonical server-failure envelope', async () => {
    const response = await requestScenario('SERVER_500');
    const body = await response.json();
    expect(response.status).toBe(500);
    expect(body).toMatchObject({ success: false, data: null, errorCode: 'INTERNAL_SERVER_ERROR', statusCode: 500, requestId: expect.any(String) });
  });

  it('simulates a network timeout/failure', async () => {
    await expect(requestScenario('TIMEOUT')).rejects.toThrow();
  });

  it('returns the canonical unauthorized envelope', async () => {
    const response = await requestScenario('UNAUTHORIZED');
    const body = await response.json();
    expect(response.status).toBe(401);
    expect(body).toMatchObject({ success: false, data: null, errorCode: 'UNAUTHORIZED', statusCode: 401, requestId: expect.any(String) });
  });
});
