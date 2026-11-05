// RESPONSIBILITY: Lists the required mock states for isolated store_products behavior tests.
export const MANAGERSTOREORDERMANAGEMENT_MOCK_SCENARIOS = {
  ACTIVE: { status: 200, kind: 'success' },
  EMPTY: { status: 200, kind: 'empty' },
  SERVER_500: { status: 500, kind: 'server-error' },
  TIMEOUT: { status: 0, kind: 'network-timeout' },
  UNAUTHORIZED: { status: 401, kind: 'unauthorized' },
  INVALID: { status: 200, kind: 'invalid-payload' },
  CANCELLED: { status: 0, kind: 'cancelled-request' },
  RETRY: { status: 503, kind: 'retry-then-success' },
} as const;

export type ManagerStoreOrderManagementMockScenario = keyof typeof MANAGERSTOREORDERMANAGEMENT_MOCK_SCENARIOS;

/** Returns a validated scenario descriptor for focused order-history harnesses. */
export function resolveManagerStoreOrderManagementMockScenario(value: string | null) {
  const key = (value ?? 'ACTIVE').toUpperCase() as ManagerStoreOrderManagementMockScenario;
  return Object.prototype.hasOwnProperty.call(MANAGERSTOREORDERMANAGEMENT_MOCK_SCENARIOS, key)
    ? MANAGERSTOREORDERMANAGEMENT_MOCK_SCENARIOS[key]
    : MANAGERSTOREORDERMANAGEMENT_MOCK_SCENARIOS.ACTIVE;
}
