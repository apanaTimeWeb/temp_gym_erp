export const SUPERADMIN_SYSTEM_OPS_OVERVIEW_SCENARIOS = [
  { value: 'default', label: 'Default success' },
  { value: 'empty', label: 'Empty / zero state' },
  { value: 'server_error', label: 'API failure' },
  { value: 'slow', label: 'Slow response' },
] as const;
export type SuperadminSystemOpsOverviewScenario = typeof SUPERADMIN_SYSTEM_OPS_OVERVIEW_SCENARIOS[number]['value'];
let activeScenario: SuperadminSystemOpsOverviewScenario = 'default';
export function getSuperadminSystemOpsOverviewScenario(): SuperadminSystemOpsOverviewScenario { return activeScenario; }
export function setSuperadminSystemOpsOverviewScenario(value: SuperadminSystemOpsOverviewScenario): void { activeScenario = value; }
export function resetSuperadminSystemOpsOverviewScenario(): void { activeScenario = 'default'; }
