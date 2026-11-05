/**
 * Canonical test scenario registry for the static Reports catalog.
 * ACTIVE_RECORDS and EMPTY_DATA are local fixture scenarios. Backend failure, timeout, and
 * authorization scenarios are explicitly host-owned because this module has no API or auth logic.
 * No endpoint, response envelope, or permission behavior is fabricated here.
 */
export const ADMIN_REPORTS_CROSS_DOMAIN_OVERVIEW_SCENARIOS = {
  ACTIVE_RECORDS: {
    id: 'ACTIVE_RECORDS',
    appliesLocally: true,
    fixture: 'ACTIVE_RECORDS',
  },
  EMPTY_DATA: {
    id: 'EMPTY_DATA',
    appliesLocally: true,
    fixture: 'EMPTY_DATA',
  },
  SERVER_500_ERROR: {
    id: 'SERVER_500_ERROR',
    appliesLocally: false,
    owner: 'host route error boundary',
    reason: 'The static catalog does not issue backend requests.',
  },
  NETWORK_TIMEOUT: {
    id: 'NETWORK_TIMEOUT',
    appliesLocally: false,
    owner: 'host route lifecycle',
    reason: 'The static catalog has no pending network request to time out.',
  },
  UNAUTHORIZED_401: {
    id: 'UNAUTHORIZED_401',
    appliesLocally: false,
    owner: 'host/domain authorization guard',
    reason: 'Authorization remains owned by the host and destination domains.',
  },
} as const;
