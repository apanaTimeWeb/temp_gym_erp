import { MANAGER_SALES_OVERVIEW_API } from '@/app/frontend_manager/manager_sales_billing/sales_overview/config/manager_sales_overview.url_config';
import { http, HttpResponse } from 'msw';

import { MANAGER_HTTP_STATUS } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureHttpStatus';
import { ManagerInfrastructureMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureMockApiUrl';
import { MOCK_SALES_OVERVIEW, MOCK_MEMBERSHIP_REPORT, MOCK_PENDING_PAYMENTS, MOCK_ALL_MEMBERSHIPS } from '@/app/frontend_manager/manager_sales_billing/sales_overview/mocks/fixtures/ManagerSalesOverviewMockData';
import { MANAGERSALESOVERVIEW_MOCK_SCENARIOS, type ManagerSalesOverviewMockScenario } from '@/app/frontend_manager/manager_sales_billing/sales_overview/mocks/scenarios/ManagerSalesOverviewMockScenarios';
import type { MembershipTotals } from '@/app/frontend_manager/manager_sales_billing/sales_overview/types/manager_sales_overview.types';

let requestIdCounter = 1;
const scenarioAttempts = new Map<string, number>();

function nextRequestId(): string {
  return `manager-sales-overview-mock-${requestIdCounter++}`;
}

function successEnvelope<T>(data: T, message: string) {
  return { success: true as const, message, data, requestId: nextRequestId() };
}

function failureEnvelope(message: string, errorCode: string, statusCode: number) {
  return { success: false as const, message, data: null, errorCode, statusCode, requestId: nextRequestId() };
}

function success(data: unknown, message: string): Response {
  return HttpResponse.json(successEnvelope(data, message));
}

function failure(message: string, errorCode: string, statusCode: number): Response {
  return HttpResponse.json(failureEnvelope(message, errorCode, statusCode), { status: statusCode });
}

function positiveInteger(value: string | null, fallback: number): number {
  const parsed = Number(value);
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : fallback;
}

/** Runs named catalog scenarios at the mock transport boundary. CANCELLED follows the request AbortSignal. */
async function scenarioResponse(request: Request, activeData: unknown, emptyData: unknown): Promise<Response | undefined> {
  const url = new URL(request.url);
  const rawScenario = url.searchParams.get('scenario')?.toUpperCase();
  if (!rawScenario || !Object.hasOwn(MANAGERSALESOVERVIEW_MOCK_SCENARIOS, rawScenario)) return undefined;
  const scenario = rawScenario as ManagerSalesOverviewMockScenario;

  if (scenario === 'ACTIVE') return success(activeData, 'Sales data fetched');
  if (scenario === 'EMPTY') return success(emptyData, 'Empty result');
  if (scenario === 'SERVER_500') return failure('Simulated server failure', 'INTERNAL_SERVER_ERROR', MANAGER_HTTP_STATUS.SERVER_ERROR);
  if (scenario === 'TIMEOUT') return failure('Simulated request timeout', 'REQUEST_TIMEOUT', 408);
  if (scenario === 'UNAUTHORIZED') return failure('Authentication is required', 'UNAUTHORIZED', MANAGER_HTTP_STATUS.UNAUTHORIZED);
  if (scenario === 'INVALID') return success({ invalid: true }, 'Simulated invalid payload');
  if (scenario === 'CANCELLED') {
    return new Promise<Response>((_resolve, reject) => {
      const rejectAsCancelled = () => reject(new DOMException('Request cancelled by the active MSW scenario', 'AbortError'));
      if (request.signal.aborted) { rejectAsCancelled(); return; }
      request.signal.addEventListener('abort', rejectAsCancelled, { once: true });
    });
  }
  const attemptKey = `${request.method}:${url.pathname}`;
  const nextAttempt = (scenarioAttempts.get(attemptKey) ?? 0) + 1;
  scenarioAttempts.set(attemptKey, nextAttempt);
  if (nextAttempt === 1) return failure('Temporary service unavailable; retry the request', 'SERVICE_UNAVAILABLE', 503);
  return success(activeData, 'Sales data fetched after retry');
}

export function resetManagerSalesOverviewMockScenarioState(): void {
  scenarioAttempts.clear();
}

function calculateMembershipTotals(items: typeof MOCK_MEMBERSHIP_REPORT): MembershipTotals {
  return {
    activeCount: items.length,
    revenue: items.reduce((sum, item) => sum + (item.received || 0), 0),
    totalReceivable: items.reduce((sum, item) => sum + (item.receivable || 0), 0),
    totalReceived: items.reduce((sum, item) => sum + (item.received || 0), 0),
    remaining: items.reduce((sum, item) => sum + (item.remaining || 0), 0),
    refunds: items.reduce((sum, item) => sum + (item.refund || 0), 0),
  };
}

export const managerSalesHandlers = [
  http.get(ManagerInfrastructureMockApiUrl(MANAGER_SALES_OVERVIEW_API.OVERVIEW), async ({ request }) => {
    const response = await scenarioResponse(request, { monthlyRevenue: MOCK_SALES_OVERVIEW }, { monthlyRevenue: [] });
    if (response) return response;
    return success({ monthlyRevenue: MOCK_SALES_OVERVIEW }, 'Overview fetched');
  }),

  http.get(ManagerInfrastructureMockApiUrl(MANAGER_SALES_OVERVIEW_API.MEMBERSHIP_REPORT), async ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search')?.trim().toLowerCase() || '';
    const page = positiveInteger(url.searchParams.get('page'), 1);
    const limit = Math.min(positiveInteger(url.searchParams.get('limit'), 10), 100);
    const filtered = MOCK_MEMBERSHIP_REPORT.filter((item) => !search || [item.name, item.plan].some((value) => value?.toLowerCase().includes(search)));
    const startIndex = (page - 1) * limit;
    const data = { report: filtered.slice(startIndex, startIndex + limit), totals: calculateMembershipTotals(filtered), total: filtered.length, page, limit };
    const emptyData = { report: [], totals: calculateMembershipTotals([]), total: 0, page, limit };
    const response = await scenarioResponse(request, data, emptyData);
    if (response) return response;
    return success(data, 'Report fetched');
  }),

  http.get(ManagerInfrastructureMockApiUrl(MANAGER_SALES_OVERVIEW_API.PENDING_PAYMENTS), async ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search')?.trim().toLowerCase() || '';
    const page = positiveInteger(url.searchParams.get('page'), 1);
    const limit = Math.min(positiveInteger(url.searchParams.get('limit'), 10), 100);
    // Pending-payment and all-membership tables paginate the full filtered result client-side.
    const members = MOCK_PENDING_PAYMENTS.filter((member) => !search || member.name?.toLowerCase().includes(search) || member.phone?.includes(search));
    const data = { members, total: members.reduce((sum, item) => sum + (item.pendingAmount || 0), 0), totalCount: members.length, page, limit };
    const emptyData = { members: [], total: 0, totalCount: 0, page, limit };
    const response = await scenarioResponse(request, data, emptyData);
    if (response) return response;
    return success(data, 'Pending payments fetched');
  }),

  http.get(ManagerInfrastructureMockApiUrl(MANAGER_SALES_OVERVIEW_API.ALL_MEMBERSHIPS), async ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search')?.trim().toLowerCase() || '';
    const page = positiveInteger(url.searchParams.get('page'), 1);
    const limit = Math.min(positiveInteger(url.searchParams.get('limit'), 10), 100);
    // The member directory table paginates the full filtered result client-side.
    const members = MOCK_ALL_MEMBERSHIPS.filter((member) => !search || [member.name, member.phone, member.email].some((value) => value?.toLowerCase().includes(search)));
    const data = { members, total: members.length, page, limit };
    const emptyData = { members: [], total: 0, page, limit };
    const response = await scenarioResponse(request, data, emptyData);
    if (response) return response;
    return success(data, 'All memberships fetched');
  }),
];
