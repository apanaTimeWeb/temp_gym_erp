// RESPONSIBILITY: Lists the required mock states for isolated membership_lifecycle behavior tests.
export const MANAGERPLANSMANAGEMENT_MOCK_SCENARIOS = {
  ACTIVE: { status: 200, kind: 'success' },
  EMPTY: { status: 200, kind: 'empty' },
  SERVER_500: { status: 500, kind: 'server-error' },
  TIMEOUT: { status: 0, kind: 'network-timeout' },
  UNAUTHORIZED: { status: 401, kind: 'unauthorized' },
  INVALID: { status: 200, kind: 'invalid-payload' },
  CANCELLED: { status: 0, kind: 'cancelled-request' },
  RETRY: { status: 503, kind: 'retry-then-success' },
} as const;

export type ManagerMembershipLifecycleMockScenario = keyof typeof MANAGERPLANSMANAGEMENT_MOCK_SCENARIOS;

export function resolveManagerMembershipLifecycleMockScenario(value: string | null | undefined) {
  const key = (value ?? 'SUCCESS').toUpperCase() as keyof typeof MANAGERPLANSMANAGEMENT_MOCK_SCENARIOS;
  return Object.prototype.hasOwnProperty.call(MANAGERPLANSMANAGEMENT_MOCK_SCENARIOS, key) ? MANAGERPLANSMANAGEMENT_MOCK_SCENARIOS[key] : MANAGERPLANSMANAGEMENT_MOCK_SCENARIOS.ACTIVE;
}
