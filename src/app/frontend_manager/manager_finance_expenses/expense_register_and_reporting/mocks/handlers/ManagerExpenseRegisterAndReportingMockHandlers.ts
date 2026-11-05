import { MANAGER_EXPENSE_REGISTER_AND_REPORTING_API } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/config/manager_expense_register_and_reporting.url_config';
import { http, HttpResponse } from 'msw';

import { MANAGER_HTTP_STATUS } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureHttpStatus';
import { ManagerInfrastructureMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureMockApiUrl';
import { MANAGER_EXPENSE_REGISTER_AND_REPORTING_STATUS_VALUES } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/constants/manager_expense_register_and_reporting.constants';
import { getManagerExpenseMockStats, MOCK_EXPENSES_LIST } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/mocks/fixtures/ManagerExpenseRegisterAndReportingMockData';
import { MANAGEREXPENSESMANAGEMENT_MOCK_SCENARIOS } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/mocks/scenarios/ManagerExpenseRegisterAndReportingMockScenarios';
import type { Expense } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/types/manager_expense_register_and_reporting.types';

let mockExpenses = [...MOCK_EXPENSES_LIST];
let mockExpenseIdCounter = 1000;
let retryScenarioAttempts = 0;
const idempotencyRecords = new Map<string, { fingerprint: string; response: unknown }>();

function scenarioResponse(request: Request, emptyPayload: unknown) {
  const scenario = request.headers.get('x-manager-mock-scenario') as keyof typeof MANAGEREXPENSESMANAGEMENT_MOCK_SCENARIOS | null;
  if (!scenario || scenario === 'ACTIVE') return null;
  if (!MANAGEREXPENSESMANAGEMENT_MOCK_SCENARIOS[scenario]) return null;
  if (scenario === 'RETRY' && retryScenarioAttempts++ > 0) return null;
  if (scenario === 'EMPTY') return HttpResponse.json({ success: true, message: 'Empty result', data: emptyPayload });
  if (scenario === 'INVALID') return HttpResponse.json({ success: true, message: 'Invalid scenario payload', data: { expenses: null, total: 'invalid', page: 1, limit: 10 } });
  const status = scenario === 'RETRY' ? 503 : scenario === 'TIMEOUT' ? 504 : MANAGEREXPENSESMANAGEMENT_MOCK_SCENARIOS[scenario].status;
  return HttpResponse.json({ success: false, message: `Mock scenario: ${scenario}`, data: null }, { status: status || 499 });
}

function idempotencyReplay(request: Request, fingerprint: string) {
  const key = request.headers.get('Idempotency-Key');
  if (!key) return { key: null, replay: HttpResponse.json({ success: false, message: 'Idempotency-Key is required', data: null, errorCode: 'IDEMPOTENCY_KEY_REQUIRED', statusCode: 400, requestId: 'mock-expense-idempotency-required' }, { status: 400 }) as Response };
  const existing = idempotencyRecords.get(key);
  if (!existing) return { key, replay: null as Response | null };
  if (existing.fingerprint !== fingerprint) return { key, replay: HttpResponse.json({ success: false, message: 'Idempotency key reused with a different request', data: null, errorCode: 'IDEMPOTENCY_CONFLICT', statusCode: 409, requestId: 'mock-expense-idempotency-conflict' }, { status: 409 }) };
  return { key, replay: HttpResponse.json(existing.response as any) };
}

function storeIdempotentResponse(key: string | null, fingerprint: string, response: unknown) {
  if (key) idempotencyRecords.set(key, { fingerprint, response });
}

/** Resets mutable mock state between tests. */
export function resetManagerExpenseRegisterAndReportingMockState(): void {
  mockExpenses = [...MOCK_EXPENSES_LIST];
  mockExpenseIdCounter = 1000;
  retryScenarioAttempts = 0;
  idempotencyRecords.clear();
}

export const managerExpensesHandlers = [
  http.get(ManagerInfrastructureMockApiUrl(MANAGER_EXPENSE_REGISTER_AND_REPORTING_API.BASE), ({ request }) => {
    const url = new URL(request.url);
    const status = url.searchParams.get('status');
    const search = url.searchParams.get('search')?.trim().toLowerCase();
    const parsedPage = Number(url.searchParams.get('page') || '1');
    const parsedLimit = Number(url.searchParams.get('limit') || '10');
    const page = Number.isSafeInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;
    const limit = Number.isSafeInteger(parsedLimit) && parsedLimit > 0 ? Math.min(parsedLimit, 1000) : 10;
    let filtered = [...mockExpenses];
    if (status && status !== 'ALL' && status !== 'all' && status !== MANAGER_EXPENSE_REGISTER_AND_REPORTING_STATUS_VALUES.ALL) filtered = filtered.filter((expense) => expense.status === status);
    if (search) filtered = filtered.filter((expense) => expense.title.toLowerCase().includes(search) || expense.category.toLowerCase().includes(search));
    const payload = { expenses: filtered.slice((page - 1) * limit, page * limit), total: filtered.length, page, limit };
    return scenarioResponse(request, { expenses: [], total: 0, page, limit }) ?? HttpResponse.json({ success: true, message: 'Fetched expenses', data: payload, requestId: 'mock-expense-list' });
  }),
  http.get(ManagerInfrastructureMockApiUrl(MANAGER_EXPENSE_REGISTER_AND_REPORTING_API.STATS), () => HttpResponse.json({ success: true, message: 'Fetched stats', data: getManagerExpenseMockStats(mockExpenses), requestId: 'mock-expense-stats' })),
  http.get(ManagerInfrastructureMockApiUrl(MANAGER_EXPENSE_REGISTER_AND_REPORTING_API.GET_ONE(':id')), ({ params }) => {
    const expense = mockExpenses.find((item) => item.id === params.id);
    if (!expense) return HttpResponse.json({ success: false, message: 'Not found', data: null, errorCode: 'NOT_FOUND', statusCode: MANAGER_HTTP_STATUS.NOT_FOUND, requestId: 'mock-expense-not-found' }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
    return HttpResponse.json({ success: true, message: 'Fetched expense', data: expense, requestId: `mock-expense-${expense.id}` });
  }),
  http.post(ManagerInfrastructureMockApiUrl(MANAGER_EXPENSE_REGISTER_AND_REPORTING_API.BASE), async ({ request }) => {
    const body = await request.json() as Partial<Expense>;
    const fingerprint = `POST:${new URL(request.url).pathname}:${JSON.stringify(body)}`;
    const { key, replay } = idempotencyReplay(request, fingerprint);
    if (replay) return replay;
    const newExpense = { ...body, id: `expense-mock-${mockExpenseIdCounter++}`, createdAt: new Date().toISOString() } as Expense;
    mockExpenses = [newExpense, ...mockExpenses];
    const response = { success: true, message: 'Created expense', data: newExpense, requestId: `mock-expense-created-${newExpense.id}` };
    storeIdempotentResponse(key, fingerprint, response);
    return HttpResponse.json(response);
  }),
  http.patch(ManagerInfrastructureMockApiUrl(MANAGER_EXPENSE_REGISTER_AND_REPORTING_API.GET_ONE(':id')), async ({ request, params }) => {
    const body = await request.json() as Partial<Expense>;
    const fingerprint = `PATCH:${new URL(request.url).pathname}:${JSON.stringify(body)}`;
    const { key, replay } = idempotencyReplay(request, fingerprint);
    if (replay) return replay;
    const idx = mockExpenses.findIndex((item) => item.id === params.id);
    if (idx === -1) return HttpResponse.json({ success: false, message: 'Not found' }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
    mockExpenses[idx] = { ...mockExpenses[idx], ...body } as Expense;
    const response = { success: true, message: 'Updated expense', data: mockExpenses[idx], requestId: `mock-expense-updated-${params.id}` };
    storeIdempotentResponse(key, fingerprint, response);
    return HttpResponse.json(response);
  }),
  http.delete(ManagerInfrastructureMockApiUrl(MANAGER_EXPENSE_REGISTER_AND_REPORTING_API.GET_ONE(':id')), ({ request, params }) => {
    const fingerprint = `DELETE:${new URL(request.url).pathname}`;
    const { key, replay } = idempotencyReplay(request, fingerprint);
    if (replay) return replay;
    mockExpenses = mockExpenses.filter((item) => item.id !== params.id);
    if (!mockExpenses.some((item) => item.id === params.id)) return HttpResponse.json({ success: false, message: 'Not found', data: null, errorCode: 'NOT_FOUND', statusCode: MANAGER_HTTP_STATUS.NOT_FOUND, requestId: 'mock-expense-delete-not-found' }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
    const response = { success: true, message: 'Deleted expense', data: { id: params.id }, requestId: `mock-expense-deleted-${params.id}` };
    storeIdempotentResponse(key, fingerprint, response);
    return HttpResponse.json(response);
  }),
];
