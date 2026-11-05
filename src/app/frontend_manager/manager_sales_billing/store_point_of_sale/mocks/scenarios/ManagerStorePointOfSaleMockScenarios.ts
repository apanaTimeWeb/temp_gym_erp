// RESPONSIBILITY: Lists the required mock states for isolated store_products behavior tests.
export const MANAGERSTOREPOINTOFSALE_MOCK_SCENARIOS = {
  ACTIVE: { status: 200, kind: 'success' },
  EMPTY: { status: 200, kind: 'empty' },
  SERVER_500: { status: 500, kind: 'server-error' },
  TIMEOUT: { status: 0, kind: 'network-timeout' },
  UNAUTHORIZED: { status: 401, kind: 'unauthorized' },
  INVALID: { status: 200, kind: 'invalid-payload' },
  CANCELLED: { status: 0, kind: 'cancelled-request' },
  RETRY: { status: 503, kind: 'retry-then-success' },
} as const;

export type ManagerStorePointOfSaleMockScenario = keyof typeof MANAGERSTOREPOINTOFSALE_MOCK_SCENARIOS;

/** Resolve an explicitly requested mock state; ACTIVE is the default production-like fixture state. */
export function resolveManagerStorePointOfSaleMockScenario(value: string | null) {
  const key = (value ?? 'ACTIVE').toUpperCase() as ManagerStorePointOfSaleMockScenario;
  return Object.prototype.hasOwnProperty.call(MANAGERSTOREPOINTOFSALE_MOCK_SCENARIOS, key)
    ? MANAGERSTOREPOINTOFSALE_MOCK_SCENARIOS[key]
    : MANAGERSTOREPOINTOFSALE_MOCK_SCENARIOS.ACTIVE;
}
