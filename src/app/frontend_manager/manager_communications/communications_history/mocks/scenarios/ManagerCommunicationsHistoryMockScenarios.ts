// RESPONSIBILITY: Lists the required mock states for isolated communications_campaigns behavior tests.
export const MANAGERCOMMUNICATIONSHISTORY_MOCK_SCENARIOS = {
  ACTIVE: { status: 200, kind: 'success' },
  EMPTY: { status: 200, kind: 'empty' },
  SERVER_500: { status: 500, kind: 'server-error' },
  TIMEOUT: { status: 0, kind: 'network-timeout' },
  UNAUTHORIZED: { status: 401, kind: 'unauthorized' },
  INVALID: { status: 200, kind: 'invalid-payload' },
  CANCELLED: { status: 0, kind: 'cancelled-request' },
  RETRY: { status: 503, kind: 'retry-then-success' },
} as const;

export type ManagerCommunicationsHistoryMockScenario = keyof typeof MANAGERCOMMUNICATIONSHISTORY_MOCK_SCENARIOS;


/** Resolves a declared scenario into a deterministic HTTP outcome for the owning MSW handler. */
export function resolveManagerCommunicationsHistoryMockScenario(scenario: ManagerCommunicationsHistoryMockScenario) {
  const definition = MANAGERCOMMUNICATIONSHISTORY_MOCK_SCENARIOS[scenario];
  return { status: definition.status, kind: definition.kind };
}
