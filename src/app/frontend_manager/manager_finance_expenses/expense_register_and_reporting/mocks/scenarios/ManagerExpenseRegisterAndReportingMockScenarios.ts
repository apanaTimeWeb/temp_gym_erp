// RESPONSIBILITY: Declares the transport/UI scenarios consumed by the owning MSW handler.
// Send `x-manager-mock-scenario: <key>` on the expenses-list request to activate a scenario.
// TIMEOUT is represented by HTTP 504; CANCELLED by HTTP 499; RETRY returns 503 once, then success.
export const MANAGEREXPENSESMANAGEMENT_MOCK_SCENARIOS = {
  ACTIVE: { status: 200, kind: 'success' },
  EMPTY: { status: 200, kind: 'empty' },
  SERVER_500: { status: 500, kind: 'server-error' },
  TIMEOUT: { status: 504, kind: 'network-timeout' },
  UNAUTHORIZED: { status: 401, kind: 'unauthorized' },
  INVALID: { status: 200, kind: 'invalid-payload' },
  CANCELLED: { status: 499, kind: 'cancelled-request' },
  RETRY: { status: 503, kind: 'retry-then-success' },
} as const;

export type ManagerExpenseRegisterAndReportingMockScenario = keyof typeof MANAGEREXPENSESMANAGEMENT_MOCK_SCENARIOS;
