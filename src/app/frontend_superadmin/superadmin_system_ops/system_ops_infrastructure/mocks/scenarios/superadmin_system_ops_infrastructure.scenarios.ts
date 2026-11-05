export const SUPERADMIN_SYSTEM_OPS_INFRASTRUCTURE_SCENARIOS = [
  { value: 'default', label: 'Default success' },
  { value: 'empty', label: 'Empty / zero state' },
  { value: 'server_error', label: 'API failure' },
  { value: 'slow', label: 'Slow response' },
] as const;
export type SuperadminSystemOpsInfrastructureScenario = typeof SUPERADMIN_SYSTEM_OPS_INFRASTRUCTURE_SCENARIOS[number]['value'];
let activeScenario: SuperadminSystemOpsInfrastructureScenario = 'default';
export function getSuperadminSystemOpsInfrastructureScenario(): SuperadminSystemOpsInfrastructureScenario { return activeScenario; }
export function setSuperadminSystemOpsInfrastructureScenario(value: SuperadminSystemOpsInfrastructureScenario): void { activeScenario = value; }
export function resetSuperadminSystemOpsInfrastructureScenario(): void { activeScenario = 'default'; }
