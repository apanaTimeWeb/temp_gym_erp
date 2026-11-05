// RESPONSIBILITY: Lists the required mock states for isolated library_diet_plans behavior tests.
export const MANAGERLIBRARYDIETPLANS_MOCK_SCENARIOS = {
  ACTIVE: { status: 200, kind: 'success' },
  EMPTY: { status: 200, kind: 'empty' },
  SERVER_500: { status: 500, kind: 'server-error' },
  TIMEOUT: { status: 0, kind: 'network-timeout' },
  UNAUTHORIZED: { status: 401, kind: 'unauthorized' },
  INVALID: { status: 200, kind: 'invalid-payload' },
  CANCELLED: { status: 0, kind: 'cancelled-request' },
  RETRY: { status: 503, kind: 'retry-then-success' },
} as const;

export type ManagerLibraryDietPlansMockScenario = keyof typeof MANAGERLIBRARYDIETPLANS_MOCK_SCENARIOS;
