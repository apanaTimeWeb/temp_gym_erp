// RESPONSIBILITY: Defines isolated mock scenario behavior for data_export_requests; it does not invent production endpoints or response payload shapes.
// DATA FLOW: test-supplied verified route and payload → scenario handler → canonical mock response → test assertions (admin_data_export/data_export_requests/mocks/scenarios/admin_data_export_requests.scenarios.ts)

/** Scenario disposition for Data Export. No API scenario may be fabricated without the missing authoritative backend contract. */
export const ADMIN_DATA_EXPORT_REQUESTS_SCENARIOS = {
  ACTIVE: { id: 'ACTIVE', disposition: 'SUPPORTED', description: 'Render the explicit API-contract-blocked state.' },
  EMPTY: { id: 'EMPTY', disposition: 'BLOCKED_BY_SUPPLIED_CONTRACT', description: 'No verified export list endpoint or response shape.' },
  SERVER_500: { id: 'SERVER_500', disposition: 'BLOCKED_BY_SUPPLIED_CONTRACT', description: 'No verified export endpoint to bind an HTTP 500 response to.' },
  TIMEOUT: { id: 'TIMEOUT', disposition: 'BLOCKED_BY_SUPPLIED_CONTRACT', description: 'No verified export endpoint to bind a timeout to.' },
  UNAUTHORIZED: { id: 'UNAUTHORIZED', disposition: 'BLOCKED_BY_SUPPLIED_CONTRACT', description: 'No verified export endpoint or permission contract.' },
} as const;
