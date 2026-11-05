import { QueryClient } from '@tanstack/react-query';
import { setupServer } from 'msw/node';

import { resetSuperadminSystemOpsInfrastructureScenario } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/mocks/scenarios/superadmin_system_ops_infrastructure.scenarios';
import { superadminInfrastructureHandlers } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/mocks/SuperadminSystemOpsInfrastructureMockHandlers';


export const superadminInfrastructureMockServer = setupServer(...superadminInfrastructureHandlers);
export const createInfrastructureQueryClient = () => new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
export function startInfrastructureMockServer() { superadminInfrastructureMockServer.listen({ onUnhandledRequest: 'error' }); }
export function resetInfrastructureMockState() { superadminInfrastructureMockServer.resetHandlers(); resetSuperadminSystemOpsInfrastructureScenario(); }
export function stopInfrastructureMockServer() { superadminInfrastructureMockServer.close(); }
