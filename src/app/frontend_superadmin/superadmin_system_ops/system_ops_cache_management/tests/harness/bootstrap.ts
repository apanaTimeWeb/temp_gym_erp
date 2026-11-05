import { setupServer } from 'msw/node';

import { resetSuperadminSystemOpsCacheManagementScenario } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_cache_management/mocks/scenarios/superadmin_system_ops_cache_management.scenarios';
import { superadminInfrastructureHandlers, resetSuperadminSystemOpsCacheManagementMockState } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_cache_management/mocks/SuperadminSystemOpsCacheManagementMockHandlers';


export const cacheMockServer = setupServer(...superadminInfrastructureHandlers);
export function resetCacheHarness() { cacheMockServer.resetHandlers(); resetSuperadminSystemOpsCacheManagementScenario(); resetSuperadminSystemOpsCacheManagementMockState(); }
