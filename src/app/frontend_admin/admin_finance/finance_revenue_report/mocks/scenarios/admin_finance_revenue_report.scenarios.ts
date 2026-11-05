// RESPONSIBILITY: Defines isolated mock scenario behavior for finance_revenue_report; it does not invent production endpoints or response payload shapes.
// DATA FLOW: test-supplied verified route and payload → scenario handler → canonical mock response → test assertions (admin_finance/finance_revenue_report/mocks/scenarios/admin_finance_revenue_report.scenarios.ts)

/** Canonical MSW scenario factory for the admin_reports/finance_revenue_report leaf. Routes and EMPTY payloads are caller-supplied from verified feature contracts. */
import { delay, http, HttpResponse } from 'msw';

export type AdminFinanceRevenueReportScenarioId = 'ACTIVE' | 'EMPTY' | 'SERVER_500' | 'TIMEOUT' | 'UNAUTHORIZED';
export type AdminFinanceRevenueReportFailureScenarioId = Exclude<AdminFinanceRevenueReportScenarioId, 'ACTIVE'>;

export const ADMIN_REPORTS_ANALYTICS_SCENARIOS = {
  ACTIVE: { id: 'ACTIVE', statusCode: 200, strategy: 'Use the feature-owned default mock handlers; do not install an override.' },
  EMPTY: { id: 'EMPTY', statusCode: 200, strategy: 'Supply an empty payload matching the verified endpoint response schema.' },
  SERVER_500: { id: 'SERVER_500', statusCode: 500, strategy: 'Return canonical ApiFailure envelope for server failure.' },
  TIMEOUT: { id: 'TIMEOUT', statusCode: 504, defaultDelayMs: 15000, strategy: 'Delay then return canonical ApiFailure envelope for timeout.' },
  UNAUTHORIZED: { id: 'UNAUTHORIZED', statusCode: 401, strategy: 'Return canonical ApiFailure envelope for expired/unauthorized session.' },
} as const;

export function createAdminFinanceRevenueReportScenarioHandler(
  scenario: AdminFinanceRevenueReportFailureScenarioId,
  verifiedRoute: string,
  options: { emptyData?: unknown; timeoutDelayMs?: number } = {}
) {
  if (scenario === 'EMPTY' && !Object.prototype.hasOwnProperty.call(options, 'emptyData')) {
    throw new Error('EMPTY scenario requires an explicit schema-correct emptyData payload.');
  }
  return http.all(verifiedRoute, async () => {
    if (scenario === 'EMPTY') return HttpResponse.json({ success: true, message: 'Empty scenario', data: options.emptyData, requestId: globalThis.crypto.randomUUID() });
    if (scenario === 'SERVER_500') return HttpResponse.json({ success: false, message: 'Simulated server failure', data: null, errorCode: 'ERR_INTERNAL', statusCode: 500, requestId: globalThis.crypto.randomUUID() }, { status: 500 });
    if (scenario === 'TIMEOUT') {
      await delay(options.timeoutDelayMs ?? ADMIN_REPORTS_ANALYTICS_SCENARIOS.TIMEOUT.defaultDelayMs);
      return HttpResponse.json({ success: false, message: 'Simulated request timeout', data: null, errorCode: 'ERR_TIMEOUT', statusCode: 504, requestId: globalThis.crypto.randomUUID() }, { status: 504 });
    }
    return HttpResponse.json({ success: false, message: 'Session is unauthorized', data: null, errorCode: 'ERR_UNAUTHORIZED', statusCode: 401, requestId: globalThis.crypto.randomUUID() }, { status: 401 });
  });
}
