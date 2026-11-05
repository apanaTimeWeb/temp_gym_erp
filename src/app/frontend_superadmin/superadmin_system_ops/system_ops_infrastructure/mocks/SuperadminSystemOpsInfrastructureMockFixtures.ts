/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminSystemOpsInfrastructureMockFixtures owned by the superadmin_system_ops_infrastructure feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/types/superadmin_system_ops_infrastructure.types
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import type { SuperadminInfrastructureTenant } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/types/superadmin_system_ops_infrastructure.types';
export const MOCK_SUPERADMIN_INFRASTRUCTURE_TENANTS: SuperadminInfrastructureTenant[] = [
    { id: 't1', name: 'Iron Paradise' }, { id: 't2', name: 'Fit Life Studio' }, { id: 't3', name: 'CrossFit Box' }, { id: 't4', name: 'CoreFit Arena' }, { id: 't5', name: 'Peak Performance Studio' },
];
