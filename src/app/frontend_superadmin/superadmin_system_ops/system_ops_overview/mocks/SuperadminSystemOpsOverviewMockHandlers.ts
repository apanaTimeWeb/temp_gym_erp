import { http, HttpResponse } from 'msw';

import { SUPERADMIN_SYSTEM_OPS_OVERVIEW_API as SUPERADMIN_SYSTEM_OPS_API } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_overview/config/superadmin_system_ops_overview.url_config';
import { getSuperadminSystemOpsOverviewScenario, resetSuperadminSystemOpsOverviewScenario } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_overview/mocks/scenarios/superadmin_system_ops_overview.scenarios';
import { SUPERADMIN_SYSTEM_OPS_SUMMARY_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_overview/mocks/SuperadminSystemOpsOverviewMockFixtures';

import type { SuperadminSystemOpsSummary } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_overview/types/superadmin_system_ops_overview_status.types';


/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminSystemOpsMockHandlers owned by the superadmin_system_ops feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: msw, @/app/frontend_superadmin/superadmin_system_ops/system_ops_overview/mocks/SuperadminSystemOpsMockFixtures, @/app/frontend_superadmin/superadmin_system_ops/system_ops_overview/config/superadmin_system_ops_overview.url_config, @/app/frontend_superadmin/superadmin_system_ops/system_ops_overview/types/SuperadminSystemOpsTypes
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Provides MSW handlers for the System Ops summary feature and resettable fixture state.


let summaryState: SuperadminSystemOpsSummary = { ...SUPERADMIN_SYSTEM_OPS_SUMMARY_MOCK_FIXTURE };

export function resetSuperadminSystemOpsMockState(): void {
  summaryState = { ...SUPERADMIN_SYSTEM_OPS_SUMMARY_MOCK_FIXTURE };
  resetSuperadminSystemOpsOverviewScenario();
}

export const superadminSystemOpsHandlers = [
  http.get(`*${SUPERADMIN_SYSTEM_OPS_API.SUMMARY}`, async () => {
    const scenario = getSuperadminSystemOpsOverviewScenario();
    if (scenario === 'server_error') return HttpResponse.json({ success: false, message: 'System Ops summary unavailable.', data: null, errorCode: 'SYSTEM_OPS_MOCK_FAILURE', statusCode: 500, requestId: crypto.randomUUID() }, { status: 500 });
    if (scenario === 'slow') await new Promise((resolve) => setTimeout(resolve, 1200));
    const data = scenario === 'empty' ? { ...summaryState, pendingJobs: 0 } : summaryState;
    return HttpResponse.json({ success: true, message: 'System Ops summary loaded.', data, requestId: crypto.randomUUID() });
  }),
];
