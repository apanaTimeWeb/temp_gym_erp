import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

import { SUPERADMIN_AUDIT_COMPLIANCE_GLOBAL_AUDIT_OVERVIEW_API } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/config/superadmin_audit_compliance_global_audit_overview.url_config';
import { MOCK_SUPERADMIN_AUDIT_COMPLIANCE_GLOBAL_AUDIT } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/mocks/fixtures/SuperadminAuditComplianceGlobalAuditOverviewMockFixtures';
import { createGlobalAuditOverviewScenarioHandler, createGlobalAuditOverviewEmptyScenarioData } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/mocks/scenarios/superadmin_audit_compliance_global_audit_overview.scenarios';


const activeData = JSON.parse(JSON.stringify(MOCK_SUPERADMIN_AUDIT_COMPLIANCE_GLOBAL_AUDIT));
const emptyData = createGlobalAuditOverviewEmptyScenarioData(activeData);
const server = setupServer(createGlobalAuditOverviewScenarioHandler(
  SUPERADMIN_AUDIT_COMPLIANCE_GLOBAL_AUDIT_OVERVIEW_API.BASE,
  (scenario) => scenario === 'ACTIVE' ? activeData : emptyData,
));
const requestScenario = (scenario: string) => fetch(`http://127.0.0.1${SUPERADMIN_AUDIT_COMPLIANCE_GLOBAL_AUDIT_OVERVIEW_API.BASE}?__mockScenario=${scenario}`);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('global_audit_overview mock scenarios', () => {
  it('returns the fixture-shaped active success envelope', async () => {
    const response = await requestScenario('ACTIVE');
    const body = await response.json();
    expect(response.status).toBe(200);
    expect(body).toMatchObject({ success: true, data: activeData, meta: { total: activeData.length, page: 1, limit: 20, totalPages: 1, hasNextPage: false, hasPrevPage: false }, requestId: expect.any(String) });
  });

  it('returns an empty payload derived from the owning fixture without inventing fields', async () => {
    const response = await requestScenario('EMPTY');
    const body = await response.json();
    expect(response.status).toBe(200);
    expect(body).toMatchObject({ success: true, data: emptyData, meta: { total: 0, page: 1, limit: 20, totalPages: 1, hasNextPage: false, hasPrevPage: false }, requestId: expect.any(String) });
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
