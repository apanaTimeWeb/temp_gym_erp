import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

import { SUPERADMIN_SYSTEM_OPS_INFRASTRUCTURE_API as SUPERADMIN_SYSTEM_OPS_INFRASTRUCTURE_API_HEALTH_URL_CONTRACT } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/config/superadmin_system_ops_infrastructure.url_config';
import { resetSuperadminSystemOpsInfrastructureScenario, setSuperadminSystemOpsInfrastructureScenario } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/mocks/scenarios/superadmin_system_ops_infrastructure.scenarios';
import { superadminInfrastructureHandlers } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/mocks/SuperadminSystemOpsInfrastructureMockHandlers';
import { SUPERADMIN_INFRASTRUCTURE_API_HEALTH_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/mocks/SuperadminSystemOpsInfrastructureV1MockFixtures';
import { SuperadminInfrastructureV1DataSchema } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/schemas/superadmin_system_ops_infrastructure_v1.schemas';


const server = setupServer(...superadminInfrastructureHandlers);
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => { server.resetHandlers(); resetSuperadminSystemOpsInfrastructureScenario(); });
afterAll(() => server.close());


describe('Platform API Health contract', () => {
    it('accepts the complete module fixture', () => {
        const result = SuperadminInfrastructureV1DataSchema.safeParse(SUPERADMIN_INFRASTRUCTURE_API_HEALTH_MOCK_FIXTURE);
        expect(result.success).toBe(true);
    });
});


it('serves the API-health endpoint with the canonical success envelope', async () => {
  const response = await fetch(`http://localhost${SUPERADMIN_SYSTEM_OPS_INFRASTRUCTURE_API_HEALTH_URL_CONTRACT.SUPERADMIN_SYSTEM_OPS_INFRASTRUCTURE_API_HEALTH.BACKEND_API.BASE}`);
  expect(response.status).toBe(200);
  const body = await response.json();
  expect(body).toMatchObject({ success: true, message: expect.any(String), data: SUPERADMIN_INFRASTRUCTURE_API_HEALTH_MOCK_FIXTURE, requestId: expect.any(String) });
});


it('returns the canonical failure envelope when the selected MSW scenario is API failure', async () => {
  setSuperadminSystemOpsInfrastructureScenario('server_error');
  const response = await fetch(`http://localhost${SUPERADMIN_SYSTEM_OPS_INFRASTRUCTURE_API_HEALTH_URL_CONTRACT.SUPERADMIN_SYSTEM_OPS_INFRASTRUCTURE_API_HEALTH.BACKEND_API.BASE}`);
  expect(response.status).toBe(500);
  const body = await response.json();
  expect(body).toMatchObject({ success: false, message: expect.any(String), data: null, errorCode: expect.any(String), statusCode: 500, requestId: expect.any(String) });
});
