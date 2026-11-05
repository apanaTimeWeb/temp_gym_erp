// RESPONSIBILITY: Lists the required mock states for isolated referrals_rewards behavior tests.
export const MANAGERREFERRALSREWARDS_MOCK_SCENARIOS = {
  ACTIVE: { status: 200, kind: 'success' },
  EMPTY: { status: 200, kind: 'empty' },
  SERVER_500: { status: 500, kind: 'server-error' },
  TIMEOUT: { status: 0, kind: 'network-timeout' },
  UNAUTHORIZED: { status: 401, kind: 'unauthorized' },
  INVALID: { status: 200, kind: 'invalid-payload' },
  CANCELLED: { status: 0, kind: 'cancelled-request' },
  RETRY: { status: 503, kind: 'retry-then-success' },
} as const;

export type ManagerReferralsRewardsMockScenario = keyof typeof MANAGERREFERRALSREWARDS_MOCK_SCENARIOS;

export function resolveManagerReferralsRewardsMockScenario(value: string | null | undefined) {
  const key = (value ?? 'SUCCESS').toUpperCase() as keyof typeof MANAGERREFERRALSREWARDS_MOCK_SCENARIOS;
  return Object.prototype.hasOwnProperty.call(MANAGERREFERRALSREWARDS_MOCK_SCENARIOS, key) ? MANAGERREFERRALSREWARDS_MOCK_SCENARIOS[key] : MANAGERREFERRALSREWARDS_MOCK_SCENARIOS.ACTIVE;
}
