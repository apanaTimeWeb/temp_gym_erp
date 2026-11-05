// RESPONSIBILITY: Lists the required mock states for isolated members_directory behavior tests.
export const MANAGERMEMBERSDIRECTORY_MOCK_SCENARIOS = {
  ACTIVE: { status: 200, kind: 'success' },
  EMPTY: { status: 200, kind: 'empty' },
  SERVER_500: { status: 500, kind: 'server-error' },
  TIMEOUT: { status: 0, kind: 'network-timeout' },
  UNAUTHORIZED: { status: 401, kind: 'unauthorized' },
  INVALID: { status: 200, kind: 'invalid-payload' },
  CANCELLED: { status: 0, kind: 'cancelled-request' },
  RETRY: { status: 503, kind: 'retry-then-success' },
} as const;

export type ManagerMembersDirectoryMockScenario = keyof typeof MANAGERMEMBERSDIRECTORY_MOCK_SCENARIOS;

/** Resolves a named scenario into an explicit transport outcome for the owning MSW handler/tests. */
export function resolveManagerMembersDirectoryMockScenario(name: ManagerMembersDirectoryMockScenario) {
  const scenario = MANAGERMEMBERSDIRECTORY_MOCK_SCENARIOS[name];
  return { ...scenario, shouldSucceed: scenario.kind === 'success' || scenario.kind === 'empty', shouldRetry: scenario.kind === 'retry-then-success', shouldReject: scenario.kind === 'network-timeout' || scenario.kind === 'cancelled-request' };
}
