import { http, HttpResponse, delay } from 'msw';

import { SUPERADMIN_SYSTEM_OPS_INFRASTRUCTURE_API, SUPERADMIN_SYSTEM_OPS_INFRASTRUCTURE_API as SUPERADMIN_SYSTEM_OPS_INFRASTRUCTURE_API_HEALTH_URL_CONTRACT } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/config/superadmin_system_ops_infrastructure.url_config';
import { getSuperadminSystemOpsInfrastructureScenario } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/mocks/scenarios/superadmin_system_ops_infrastructure.scenarios';
import { MOCK_REDIS_TELEMETRY, MOCK_INFRASTRUCTURE_NODES } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/mocks/SuperadminSystemOpsInfrastructureMockData';
import { MOCK_SUPERADMIN_INFRASTRUCTURE_TENANTS } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/mocks/SuperadminSystemOpsInfrastructureMockFixtures';
import { MOCK_SUPERADMIN_INFRASTRUCTURE_UPTIME } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/mocks/SuperadminSystemOpsInfrastructureUptimeMockFixtures';
import { SUPERADMIN_INFRASTRUCTURE_API_HEALTH_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/mocks/SuperadminSystemOpsInfrastructureV1MockFixtures';


/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminSystemOpsInfrastructureMockHandlers owned by the superadmin_system_ops_infrastructure feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: msw, @/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/mocks/SuperadminSystemOpsInfrastructureMockFixtures, @/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/mocks/SuperadminSystemOpsInfrastructureUptimeMockFixtures, @/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/mocks/SuperadminSystemOpsInfrastructureMockData, @/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/config/superadmin_system_ops_infrastructure.url_config
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */


export const superadminInfrastructureHandlers = [
    http.get(`*${SUPERADMIN_SYSTEM_OPS_INFRASTRUCTURE_API_HEALTH_URL_CONTRACT.SUPERADMIN_SYSTEM_OPS_INFRASTRUCTURE_API_HEALTH.BACKEND_API.BASE}`, async () => {
      const scenario = getSuperadminSystemOpsInfrastructureScenario();
      if (scenario === 'server_error') return HttpResponse.json({ success: false, message: 'Infrastructure API health unavailable.', data: null, errorCode: 'INFRASTRUCTURE_HEALTH_MOCK_FAILURE', statusCode: 500, requestId: crypto.randomUUID() }, { status: 500 });
      if (scenario === 'slow') await delay(1200);
      const data = scenario === 'empty' ? { ...SUPERADMIN_INFRASTRUCTURE_API_HEALTH_MOCK_FIXTURE, endpoints: [], incidents: [] } : SUPERADMIN_INFRASTRUCTURE_API_HEALTH_MOCK_FIXTURE;
      return HttpResponse.json({ success: true, message: 'Infrastructure API health loaded', data, requestId: crypto.randomUUID() });
    }),
    http.get(`*${SUPERADMIN_SYSTEM_OPS_INFRASTRUCTURE_API.TENANTS}`, async () => HttpResponse.json({ success: true, message: 'Success', data: MOCK_SUPERADMIN_INFRASTRUCTURE_TENANTS, requestId: crypto.randomUUID()})),
    http.get('*' + SUPERADMIN_SYSTEM_OPS_INFRASTRUCTURE_API.BASE, async ({ request }) => {
        await delay(300);
        const url = new URL(request.url);
        const statusFilter = url.searchParams.get('statusFilter');
        let filtered = [...MOCK_INFRASTRUCTURE_NODES];
        if (statusFilter && statusFilter !== 'ALL') {
            filtered = filtered.filter(n => n.status === statusFilter);
        }
        return HttpResponse.json({ success: true, message: 'Success', data: filtered, requestId: crypto.randomUUID()});
    }),
    http.get('*' + SUPERADMIN_SYSTEM_OPS_INFRASTRUCTURE_API.UPTIME_HISTORY, async () => {
        await delay(250);
        return HttpResponse.json({ success: true, message: 'Historical uptime loaded', data: MOCK_SUPERADMIN_INFRASTRUCTURE_UPTIME, requestId: crypto.randomUUID()});
    }),
    http.get('*' + SUPERADMIN_SYSTEM_OPS_INFRASTRUCTURE_API.REDIS_TELEMETRY, async () => {
        await delay(300);
        return HttpResponse.json({ success: true, message: 'Success', data: MOCK_REDIS_TELEMETRY, requestId: crypto.randomUUID()});
    }),
    http.post('*' + SUPERADMIN_SYSTEM_OPS_INFRASTRUCTURE_API.REDIS_FLUSH_GLOBAL, async () => {
        await delay(600);
        return HttpResponse.json({ success: true, message: 'Global cache flushed', requestId: crypto.randomUUID(), data: null});
    }),
    http.post('*' + SUPERADMIN_SYSTEM_OPS_INFRASTRUCTURE_API.REDIS_FLUSH_TENANT, async () => {
        await delay(600);
        return HttpResponse.json({ success: true, message: 'Tenant cache flushed', requestId: crypto.randomUUID(), data: null});
    }),
];
