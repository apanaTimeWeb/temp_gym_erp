import { MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/config/manager_staff_hr_payroll_and_ledger.url_config';
import { http, HttpResponse } from 'msw';

import { MANAGER_HTTP_STATUS } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureHttpStatus';
import { ManagerInfrastructureMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureMockApiUrl';

import { MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_STATUS_VALUES } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/constants/manager_staff_payroll_and_attendance.constants';
import {
  MOCK_STAFF,
  MOCK_PAYROLLS,
  MOCK_LEDGER,
  MOCK_STAFF_ATTENDANCE,
  MOCK_PAYROLL_AND_LEDGER_MONTH,
  type ManagerPayrollAttendanceFixture,
} from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/mocks/fixtures/ManagerPayrollAndLedgerMockData';
import {
  getManagerPayrollAndLedgerMockScenario,
  nextManagerPayrollAndLedgerScenarioAttempt,
  resetManagerPayrollAndLedgerMockScenario,
} from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/mocks/scenarios/ManagerPayrollAndLedgerMockScenarios';
import type { Staff, Payroll, HrSummary, LedgerEntry } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/types/manager_staff_hr_payroll_and_ledger.types';

let mockStaff: Staff[] = [...MOCK_STAFF].map((staff) => ({ ...staff }));
let mockPayrolls: Payroll[] = [...MOCK_PAYROLLS].map((payroll) => ({ ...payroll, deductions: { ...payroll.deductions }, staff: payroll.staff ? { ...payroll.staff } : undefined }));
let mockLedger: LedgerEntry[] = [...MOCK_LEDGER].map((entry) => ({ ...entry }));
let mockAttendance: ManagerPayrollAttendanceFixture[] = [...MOCK_STAFF_ATTENDANCE];
let mockStaffIdCounter = 1000;
let mockPayrollIdCounter = 1000;
let mockLedgerIdCounter = 1000;
let requestIdCounter = 1;

interface StoredIdempotentResponse {
  fingerprint: string;
  body: unknown;
  status: number;
}
const idempotencyResponses = new Map<string, StoredIdempotentResponse>();

function nextRequestId(): string {
  return `manager-payroll-mock-${requestIdCounter++}`;
}

/** Matches the leaf host stub's ApiResponse<T> success contract exactly. */
function successEnvelope<T>(data: T, message = 'Success') {
  return { success: true as const, message, data, requestId: nextRequestId() };
}

/** Matches the leaf host stub's ApiResponse<T> failure contract exactly. */
function failureEnvelope(message: string, errorCode: string, statusCode: number) {
  return { success: false as const, message, data: null, errorCode, statusCode, requestId: nextRequestId() };
}

function success(data: unknown, message = 'Success', status = 200): Response {
  return HttpResponse.json(successEnvelope(data, message), { status });
}

function failure(message: string, errorCode: string, statusCode: number): Response {
  return HttpResponse.json(failureEnvelope(message, errorCode, statusCode), { status: statusCode });
}

function emptySummary(): HrSummary {
  return { totalSalaryThisMonth: 0, totalSalaryPaid: 0, totalSalaryDue: 0, totalAdvanceGiven: 0, pendingPaymentsCount: 0, totalStaff: 0, activeStaff: 0, totalPayrollThisMonth: 0, paidCount: 0 };
}

/** Executes the selected scenario at the transport boundary, before any mutation is applied. */
async function scenarioResponse(request: Request, emptyData: unknown): Promise<Response | undefined> {
  const scenario = getManagerPayrollAndLedgerMockScenario();
  if (scenario === 'ACTIVE') return undefined;
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
  const attemptKey = `${request.method}:${new URL(request.url).pathname}`;
  if (scenario === 'RETRY' && nextManagerPayrollAndLedgerScenarioAttempt(attemptKey) === 1) {
    return failure('Temporary service unavailable; retry the request', 'SERVICE_UNAVAILABLE', 503);
  }
  return undefined;
}

function stableSerialize(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(stableSerialize).join(',')}]`;
  if (value && typeof value === 'object') {
    return `{${Object.entries(value as Record<string, unknown>).sort(([a], [b]) => a.localeCompare(b)).map(([key, item]) => `${JSON.stringify(key)}:${stableSerialize(item)}`).join(',')}}`;
  }
  return JSON.stringify(value) ?? 'undefined';
}

/** Replays the original response for an identical key+intent and rejects key reuse for a different intent. */
async function idempotentMutation(request: Request, payload: unknown, operation: () => Response): Promise<Response> {
  const key = request.headers.get('Idempotency-Key')?.trim();
  if (!key) return operation();
  const fingerprint = `${request.method}:${new URL(request.url).pathname}:${stableSerialize(payload)}`;
  const previous = idempotencyResponses.get(key);
  if (previous) {
    if (previous.fingerprint !== fingerprint) {
      return failure('The idempotency key was already used for a different request', 'IDEMPOTENCY_KEY_REUSED', MANAGER_HTTP_STATUS.CONFLICT);
    }
    return HttpResponse.json(previous.body, { status: previous.status });
  }
  const response = operation();
  if (response.ok) {
    const body = await response.clone().json().catch(() => null);
    if (body !== null) idempotencyResponses.set(key, { fingerprint, body, status: response.status });
  }
  return response;
}

function parsePositiveInteger(value: string | null, fallback: number, maximum = 5000): number {
  const parsed = value === null ? fallback : Number(value);
  return Number.isSafeInteger(parsed) && parsed > 0 ? Math.min(parsed, maximum) : fallback;
}

function deriveSummary(): HrSummary {
  const currentPayrolls = mockPayrolls.filter((payroll) => payroll.month === MOCK_PAYROLL_AND_LEDGER_MONTH);
  return {
    totalSalaryThisMonth: currentPayrolls.reduce((total, payroll) => total + payroll.netPayable, 0),
    totalSalaryPaid: currentPayrolls.reduce((total, payroll) => total + payroll.paidAmount, 0),
    totalSalaryDue: currentPayrolls.reduce((total, payroll) => total + payroll.pendingAmount, 0),
    totalAdvanceGiven: mockLedger.filter((entry) => entry.type === 'Advance Given').reduce((total, entry) => total + entry.debit, 0),
    pendingPaymentsCount: currentPayrolls.filter((payroll) => payroll.pendingAmount > 0).length,
    totalStaff: mockStaff.length,
    activeStaff: mockStaff.filter((staff) => staff.isActive).length,
    totalPayrollThisMonth: currentPayrolls.length,
    paidCount: currentPayrolls.filter((payroll) => payroll.pendingAmount === 0 && payroll.paidAmount > 0).length,
  };
}

function refreshStaffBalances(): void {
  mockStaff = mockStaff.map((staff) => ({
    ...staff,
    currentDue: mockPayrolls.filter((payroll) => payroll.staffId === staff.id).reduce((total, payroll) => total + payroll.pendingAmount, 0),
    advanceSalary: mockLedger.filter((entry) => entry.staffId === staff.id && entry.type === 'Advance Given').reduce((total, entry) => total + entry.debit, 0),
  }));
}

function getStaffAttendance(staffId: string, month: string) {
  return mockAttendance.find((item) => item.staffId === staffId && item.month === month)?.history ?? [];
}

export function resetManagerPayrollAndLedgerMockState(): void {
  mockStaff = [...MOCK_STAFF].map((staff) => ({ ...staff }));
  mockPayrolls = [...MOCK_PAYROLLS].map((payroll) => ({ ...payroll, deductions: { ...payroll.deductions }, staff: payroll.staff ? { ...payroll.staff } : undefined }));
  mockLedger = [...MOCK_LEDGER].map((entry) => ({ ...entry }));
  mockAttendance = [...MOCK_STAFF_ATTENDANCE];
  mockStaffIdCounter = 1000;
  mockPayrollIdCounter = 1000;
  mockLedgerIdCounter = 1000;
  requestIdCounter = 1;
  idempotencyResponses.clear();
  resetManagerPayrollAndLedgerMockScenario();
}

export const managerHrHandlers = [
  http.get(ManagerInfrastructureMockApiUrl(MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API.STAFF_BASE), async ({ request }) => {
    const url = new URL(request.url);
    const page = parsePositiveInteger(url.searchParams.get('page'), 1);
    const limit = parsePositiveInteger(url.searchParams.get('limit'), 10);
    const empty = { staff: [], total: 0, page, limit };
    const scenario = await scenarioResponse(request, empty);
    if (scenario) return scenario;
    const search = (url.searchParams.get('search') || '').trim().toLocaleLowerCase();
    const role = (url.searchParams.get('role') || '').trim().toLocaleLowerCase();
    const filtered = mockStaff.filter((staff) => {
      const matchesSearch = !search || [staff.name, staff.email, staff.phone, staff.id].join(' ').toLocaleLowerCase().includes(search);
      const matchesRole = !role || role === 'all' || (staff.role || '').toLocaleLowerCase().includes(role);
      return matchesSearch && matchesRole;
    });
    const start = (page - 1) * limit;
    return success({ staff: filtered.slice(start, start + limit), total: filtered.length, page, limit });
  }),

  http.get(ManagerInfrastructureMockApiUrl(MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API.PAYROLLS_BASE), async ({ request }) => {
    const url = new URL(request.url);
    const page = parsePositiveInteger(url.searchParams.get('page'), 1);
    const limit = parsePositiveInteger(url.searchParams.get('limit'), 10);
    const empty = { payrolls: [], total: 0, page, limit };
    const scenario = await scenarioResponse(request, empty);
    if (scenario) return scenario;
    const search = (url.searchParams.get('search') || '').trim().toLocaleLowerCase();
    const month = url.searchParams.get('month') || '';
    const filtered = mockPayrolls.filter((payroll) => {
      const searchText = [payroll.staff?.name, payroll.staff?.role, payroll.id, payroll.staffId].filter(Boolean).join(' ').toLocaleLowerCase();
      return (!search || searchText.includes(search)) && (!month || payroll.month === month);
    });
    const start = (page - 1) * limit;
    return success({ payrolls: filtered.slice(start, start + limit), total: filtered.length, page, limit });
  }),

  http.post(ManagerInfrastructureMockApiUrl(MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API.PAYROLL_GENERATE), async ({ request }) => {
    const scenario = await scenarioResponse(request, { payrolls: [] });
    if (scenario) return scenario;
    const body = await request.json() as { month: string };
    return idempotentMutation(request, body, () => {
      const month = String(body.month || '').trim();
      if (!/^\d{4}-\d{2}$/.test(month)) return failure('A valid payroll month is required', 'INVALID_MONTH', 400);
      const existingForMonth = new Set(mockPayrolls.filter((item) => item.month === month).map((item) => item.staffId));
      const generated = mockStaff.filter((item) => item.isActive && !existingForMonth.has(item.id)).map((item) => ({
        id: `pay-${mockPayrollIdCounter++}`,
        staffId: item.id,
        month,
        amount: item.salary,
        netPayable: item.salary,
        paidAmount: 0,
        pendingAmount: item.salary,
        status: MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_STATUS_VALUES.PENDING,
        deductions: { tds: 0, pf: 0, esi: 0, other: 0 },
        staff: { name: item.name, role: item.role },
      } as Payroll));
      mockPayrolls = [...generated, ...mockPayrolls];
      refreshStaffBalances();
      return success({ payrolls: generated }, 'Payroll generated.');
    });
  }),

  http.post(ManagerInfrastructureMockApiUrl(MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API.PAYROLLS_BASE), async ({ request }) => {
    const scenario = await scenarioResponse(request, null);
    if (scenario) return scenario;
    const body = await request.json() as Partial<Payroll>;
    return idempotentMutation(request, body, () => {
      const selectedStaff = mockStaff.find((staff) => staff.id === body.staffId) ?? mockStaff.find((staff) => staff.isActive);
      if (!selectedStaff) return failure('No active staff record is available', 'STAFF_NOT_FOUND', MANAGER_HTTP_STATUS.NOT_FOUND);
      const amount = Number(body.amount ?? selectedStaff.salary);
      const netPayable = Number(body.netPayable ?? amount);
      const paidAmount = Number(body.paidAmount ?? 0);
      const pendingAmount = Number(body.pendingAmount ?? Math.max(0, netPayable - paidAmount));
      const newPayroll: Payroll = {
        id: `pay-${mockPayrollIdCounter++}`,
        staffId: selectedStaff.id,
        month: body.month ?? MOCK_PAYROLL_AND_LEDGER_MONTH,
        amount,
        netPayable,
        paidAmount,
        pendingAmount,
        status: body.status ?? (pendingAmount === 0 ? MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_STATUS_VALUES.PAID : MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_STATUS_VALUES.PENDING),
        paidAt: body.paidAt,
        notes: body.notes,
        deductions: body.deductions ?? { tds: 0, pf: 0, esi: 0, other: 0 },
        staff: { name: selectedStaff.name, role: selectedStaff.role },
      };
      mockPayrolls = [newPayroll, ...mockPayrolls];
      refreshStaffBalances();
      return success(newPayroll, 'Created');
    });
  }),

  http.patch(ManagerInfrastructureMockApiUrl(MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API.PAYROLL_GET_ONE(':id')), async ({ request, params }) => {
    const scenario = await scenarioResponse(request, null);
    if (scenario) return scenario;
    const body = await request.json() as Partial<Payroll>;
    return idempotentMutation(request, body, () => {
      const idx = mockPayrolls.findIndex((payroll) => payroll.id === String(params.id));
      const current = mockPayrolls[idx];
      if (!current) return failure('Payroll record was not found', 'PAYROLL_NOT_FOUND', MANAGER_HTTP_STATUS.NOT_FOUND);
      mockPayrolls[idx] = { ...current, ...body, deductions: body.deductions ?? current.deductions };
      refreshStaffBalances();
      return success(mockPayrolls[idx], 'Updated');
    });
  }),

  http.patch(ManagerInfrastructureMockApiUrl(MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API.PAYROLL_STATUS_UPDATE(':id')), async ({ request, params }) => {
    const scenario = await scenarioResponse(request, null);
    if (scenario) return scenario;
    const body = await request.json() as { status: string };
    return idempotentMutation(request, body, () => {
      const idx = mockPayrolls.findIndex((payroll) => payroll.id === String(params.id));
      const current = mockPayrolls[idx];
      if (!current) return failure('Payroll record was not found', 'PAYROLL_NOT_FOUND', MANAGER_HTTP_STATUS.NOT_FOUND);
      const paid = body.status === MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_STATUS_VALUES.PAID;
      mockPayrolls[idx] = { ...current, status: body.status, paidAmount: paid ? current.netPayable : current.paidAmount, pendingAmount: paid ? 0 : current.pendingAmount };
      refreshStaffBalances();
      return success(mockPayrolls[idx], 'Updated');
    });
  }),

  http.get(ManagerInfrastructureMockApiUrl(MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API.SUMMARY), async ({ request }) => {
    const scenario = await scenarioResponse(request, emptySummary());
    if (scenario) return scenario;
    return success(deriveSummary());
  }),

  http.get(ManagerInfrastructureMockApiUrl(MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API.LEDGER(':staffId')), async ({ request, params }) => {
    const staffId = String(params.staffId ?? '');
    const scenario = await scenarioResponse(request, { ledger: [], total: 0 });
    if (scenario) return scenario;
    const ledger = mockLedger.filter((entry) => entry.staffId === staffId);
    return success({ ledger, total: ledger.length });
  }),

  http.post(ManagerInfrastructureMockApiUrl(MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API.LEDGER_ADVANCE), async ({ request }) => {
    const scenario = await scenarioResponse(request, { advanceAmount: 0 });
    if (scenario) return scenario;
    const body = await request.json() as Record<string, unknown>;
    return idempotentMutation(request, body, () => {
      const amount = Number(body.amount ?? 0);
      const staffId = String(body.staffId ?? '');
      const staff = mockStaff.find((item) => item.id === staffId);
      if (!staff) return failure('Staff record was not found', 'STAFF_NOT_FOUND', MANAGER_HTTP_STATUS.NOT_FOUND);
      if (!Number.isSafeInteger(amount) || amount <= 0) return failure('Advance amount must be a positive minor-unit integer', 'INVALID_AMOUNT', 400);
      const currentBalance = mockLedger.filter((entry) => entry.staffId === staffId).reduce((balance, entry) => balance + entry.credit - entry.debit, 0);
      mockLedger = [{ id: `ledger-advance-${mockLedgerIdCounter++}`, staffId, date: new Date().toISOString(), type: 'Advance Given', credit: 0, debit: amount, balance: currentBalance - amount, notes: String(body.notes ?? ''), paymentMode: String(body.paymentMode ?? '') }, ...mockLedger];
      refreshStaffBalances();
      return success({ advanceAmount: amount }, 'Advance recorded');
    });
  }),

  http.post(ManagerInfrastructureMockApiUrl(MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API.LEDGER_PAY_DUE), async ({ request }) => {
    const scenario = await scenarioResponse(request, { paidAmount: 0 });
    if (scenario) return scenario;
    const body = await request.json() as Record<string, unknown>;
    return idempotentMutation(request, body, () => {
      const amount = Number(body.amount ?? 0);
      const staffId = String(body.staffId ?? '');
      const staff = mockStaff.find((item) => item.id === staffId);
      if (!staff) return failure('Staff record was not found', 'STAFF_NOT_FOUND', MANAGER_HTTP_STATUS.NOT_FOUND);
      if (!Number.isSafeInteger(amount) || amount <= 0) return failure('Due payment must be a positive minor-unit integer', 'INVALID_AMOUNT', 400);
      const outstanding = mockPayrolls.filter((payroll) => payroll.staffId === staffId).reduce((total, payroll) => total + payroll.pendingAmount, 0);
      if (amount > outstanding) return failure('Due payment exceeds the outstanding payroll balance', 'AMOUNT_EXCEEDS_DUE', 400);
      let remaining = amount;
      mockPayrolls = mockPayrolls.map((payroll) => {
        if (payroll.staffId !== staffId || remaining <= 0 || payroll.pendingAmount <= 0) return payroll;
        const settled = Math.min(payroll.pendingAmount, remaining);
        remaining -= settled;
        const pendingAmount = payroll.pendingAmount - settled;
        const paidAmount = payroll.paidAmount + settled;
        return { ...payroll, pendingAmount, paidAmount, status: pendingAmount === 0 ? MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_STATUS_VALUES.PAID : payroll.status };
      });
      const currentBalance = mockLedger.filter((entry) => entry.staffId === staffId).reduce((balance, entry) => balance + entry.credit - entry.debit, 0);
      mockLedger = [{ id: `ledger-due-${mockLedgerIdCounter++}`, staffId, date: new Date().toISOString(), type: 'Due Paid', credit: amount, debit: 0, balance: currentBalance + amount, notes: String(body.notes ?? ''), paymentMode: String(body.paymentMode ?? '') }, ...mockLedger];
      refreshStaffBalances();
      return success({ paidAmount: amount }, 'Due payment recorded');
    });
  }),

  http.get(ManagerInfrastructureMockApiUrl(MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API.STAFF_ATTENDANCE_BASE(':staffId')), async ({ request, params }) => {
    const staffId = String(params.staffId ?? '');
    const month = new URL(request.url).searchParams.get('month') || '';
    const scenario = await scenarioResponse(request, { history: [] });
    if (scenario) return scenario;
    if (!/^\d{4}-\d{2}$/.test(month) || !mockStaff.some((staff) => staff.id === staffId)) return success({ history: [] });
    return success({ history: getStaffAttendance(staffId, month) });
  }),
];
