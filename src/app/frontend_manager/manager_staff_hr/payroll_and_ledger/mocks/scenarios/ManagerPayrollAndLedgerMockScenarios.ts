// RESPONSIBILITY: Defines executable, selectable transport and payload states for payroll/ledger MSW handlers.
export const MANAGERPAYROLLANDLEDGER_MOCK_SCENARIOS = {
  ACTIVE: { status: 200, kind: 'success' },
  EMPTY: { status: 200, kind: 'empty' },
  SERVER_500: { status: 500, kind: 'server-error' },
  TIMEOUT: { status: 408, kind: 'request-timeout' },
  UNAUTHORIZED: { status: 401, kind: 'unauthorized' },
  INVALID: { status: 200, kind: 'invalid-payload' },
  CANCELLED: { status: 0, kind: 'client-abort' },
  RETRY: { status: 503, kind: 'retry-then-success' },
} as const;

export type ManagerPayrollAndLedgerMockScenario = keyof typeof MANAGERPAYROLLANDLEDGER_MOCK_SCENARIOS;

let activeScenario: ManagerPayrollAndLedgerMockScenario = 'ACTIVE';
const scenarioAttempts = new Map<string, number>();

export function setManagerPayrollAndLedgerMockScenario(scenario: ManagerPayrollAndLedgerMockScenario): void {
  activeScenario = scenario;
  scenarioAttempts.clear();
}

export function getManagerPayrollAndLedgerMockScenario(): ManagerPayrollAndLedgerMockScenario {
  return activeScenario;
}

export function nextManagerPayrollAndLedgerScenarioAttempt(key: string): number {
  const next = (scenarioAttempts.get(key) ?? 0) + 1;
  scenarioAttempts.set(key, next);
  return next;
}

export function resetManagerPayrollAndLedgerMockScenario(): void {
  activeScenario = 'ACTIVE';
  scenarioAttempts.clear();
}
