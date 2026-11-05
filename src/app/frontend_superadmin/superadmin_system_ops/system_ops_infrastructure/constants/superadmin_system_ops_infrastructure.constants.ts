/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminSystemOpsInfrastructureConstants owned by the superadmin_system_ops_infrastructure feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: No static module imports; see dynamic import sites in source.
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */

export const SUPERADMIN_INFRASTRUCTURE_STATUS_OPTIONS = [
  { value: 'ALL', labelKey: 'ui.status_all_nodes' },
  { value: 'HEALTHY', labelKey: 'ui.status_healthy' },
  { value: 'DEGRADED', labelKey: 'ui.status_degraded' },
  { value: 'DOWN', labelKey: 'ui.status_down' },
];

export const SUPERADMIN_INFRASTRUCTURE_STATUS_CODES = { HEALTHY: 'HEALTHY', DEGRADED: 'DEGRADED', DOWN: 'DOWN', CONNECTED: 'CONNECTED', DISCONNECTED: 'DISCONNECTED', STALE: 'STALE' } as const;

export const SUPERADMIN_INFRASTRUCTURE_FILTER_ALL = 'ALL' as const;
export const SUPERADMIN_INFRASTRUCTURE_API_HEALTH_CODES = { RESOLVED: 'RESOLVED', MONITORING: 'MONITORING' } as const;
