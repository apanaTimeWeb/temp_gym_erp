import { describe, expect, it, beforeAll, beforeEach, afterAll, afterEach } from 'vitest';
import { ManagerStaffPayrollAndAttendanceApi } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/api/manager_staff_hr_payroll_and_ledger.api';
import { MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/config/manager_staff_hr_payroll_and_ledger.url_config';
import { ManagerInfrastructureMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureMockApiUrl';
import { managerMswServer } from '@/app/frontend_manager/manager_infrastructure/mocks/ManagerMocksMswTestServer';
import { managerHrHandlers, resetManagerPayrollAndLedgerMockState } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/mocks/handlers/ManagerPayrollAndLedgerMockHandlers';
import {
  MOCK_PAYROLLS,
  MOCK_STAFF,
  MOCK_HR_SUMMARY,
  MOCK_PAYROLL_AND_LEDGER_MONTH,
  MOCK_PAYROLL_AND_LEDGER_FIXTURE_TIERS,
} from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/mocks/fixtures/ManagerPayrollAndLedgerMockData';
import { setManagerPayrollAndLedgerMockScenario } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/mocks/scenarios/ManagerPayrollAndLedgerMockScenarios';

beforeAll(() => managerMswServer.listen({ onUnhandledRequest: 'error' }));
beforeEach(() => {
  // Payroll/Ledger and Staff Directory share the legacy staff URL; prepend this leaf's handlers for isolated contract tests.
  managerMswServer.use(...managerHrHandlers);
});
afterEach(() => {
  managerMswServer.resetHandlers();
  resetManagerPayrollAndLedgerMockState();
  setManagerPayrollAndLedgerMockScenario('ACTIVE');
});
afterAll(() => managerMswServer.close());

function endpoint(path: string): string {
  const origin = typeof window !== 'undefined' && window.location.origin !== 'null' ? window.location.origin : 'http://localhost:3000';
  return new URL(ManagerInfrastructureMockApiUrl(path), origin).toString();
}

async function readJson(response: Response) {
  return response.json() as Promise<Record<string, unknown>>;
}

function expectSuccessEnvelope(body: Record<string, unknown>) {
  expect(body.success).toBe(true);
  expect(body).toHaveProperty('message');
  expect(body).toHaveProperty('data');
  expect(typeof body.requestId).toBe('string');
  expect(String(body.requestId).length).toBeGreaterThan(0);
}

function expectFailureEnvelope(body: Record<string, unknown>, status: number) {
  expect(body.success).toBe(false);
  expect(body.data).toBeNull();
  expect(typeof body.errorCode).toBe('string');
  expect(body.statusCode).toBe(status);
  expect(typeof body.requestId).toBe('string');
}

describe('payroll_and_ledger API ownership and executable mock contract', () => {
  it('exposes only the methods owned by this autonomous leaf', () => {
    expect(Object.keys(ManagerStaffPayrollAndAttendanceApi).sort()).toEqual(['createPayroll', 'fetchHrSummary', 'fetchLedger', 'fetchPayrolls', 'fetchStaff', 'fetchStaffAttendance', 'generatePayrolls', 'giveStaffAdvance', 'payStaffDue', 'updatePayroll', 'updatePayrollStatus']);
  });

  it('provides deterministic 10/120/520 fixture tiers with reconciled KPI totals', () => {
    expect(MOCK_PAYROLL_AND_LEDGER_FIXTURE_TIERS.SMALL.staff).toHaveLength(10);
    expect(MOCK_PAYROLL_AND_LEDGER_FIXTURE_TIERS.STANDARD.staff).toHaveLength(120);
    expect(MOCK_PAYROLL_AND_LEDGER_FIXTURE_TIERS.STRESS.staff).toHaveLength(520);
    for (const fixture of Object.values(MOCK_PAYROLL_AND_LEDGER_FIXTURE_TIERS)) {
      const currentPayrolls = fixture.payrolls;
      expect(fixture.summary.totalStaff).toBe(fixture.staff.length);
      expect(fixture.summary.activeStaff).toBe(fixture.staff.filter((staff) => staff.isActive).length);
      expect(fixture.summary.totalPayrollThisMonth).toBe(currentPayrolls.length);
      expect(fixture.summary.totalSalaryThisMonth).toBe(currentPayrolls.reduce((sum, payroll) => sum + payroll.netPayable, 0));
      expect(fixture.summary.totalSalaryPaid + fixture.summary.totalSalaryDue).toBe(fixture.summary.totalSalaryThisMonth);
      expect(fixture.summary.pendingPaymentsCount).toBe(currentPayrolls.filter((payroll) => payroll.pendingAmount > 0).length);
    }
    expect(MOCK_HR_SUMMARY.totalStaff).toBe(MOCK_STAFF.length);
    expect(MOCK_HR_SUMMARY.totalPayrollThisMonth).toBe(MOCK_PAYROLLS.length);
  });

  it('returns canonical success envelopes from each payroll, ledger and attendance resource', async () => {
    const requests: Array<[string, RequestInit?]> = [
      [MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API.STAFF_BASE],
      [MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API.PAYROLLS_BASE],
      [MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API.SUMMARY],
      [MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API.LEDGER(MOCK_STAFF[1]!.id)],
      [MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API.STAFF_ATTENDANCE(MOCK_STAFF[1]!.id, MOCK_PAYROLL_AND_LEDGER_MONTH)],
      [MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API.PAYROLL_GENERATE, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Idempotency-Key': 'envelope-generate' }, body: JSON.stringify({ month: '2027-01' }) }],
      [MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API.PAYROLLS_BASE, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Idempotency-Key': 'envelope-create' }, body: JSON.stringify({ staffId: MOCK_STAFF[1]!.id, month: '2027-02', amount: 100000, netPayable: 100000 }) }],
      [MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API.PAYROLL_GET_ONE(MOCK_PAYROLLS[0]!.id), { method: 'PATCH', headers: { 'Content-Type': 'application/json', 'Idempotency-Key': 'envelope-update' }, body: JSON.stringify({ notes: 'updated' }) }],
      [MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API.PAYROLL_STATUS_UPDATE(MOCK_PAYROLLS[1]!.id), { method: 'PATCH', headers: { 'Content-Type': 'application/json', 'Idempotency-Key': 'envelope-status' }, body: JSON.stringify({ status: 'PAID' }) }],
      [MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API.LEDGER_ADVANCE, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Idempotency-Key': 'envelope-advance' }, body: JSON.stringify({ staffId: MOCK_STAFF[1]!.id, amount: 1000 }) }],
      [MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API.LEDGER_PAY_DUE, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Idempotency-Key': 'envelope-due' }, body: JSON.stringify({ staffId: MOCK_STAFF[1]!.id, amount: 1000 }) }],
    ];

    for (const [path, init] of requests) {
      const response = await fetch(endpoint(path), init);
      const body = await readJson(response);
      expect(response.ok).toBe(true);
      expectSuccessEnvelope(body);
    }
  });

  it('filters ledger entries by the requested staff identity and returns an empty result for unknown staff', async () => {
    const firstStaffId = MOCK_STAFF[1]!.id;
    const secondStaffId = MOCK_STAFF[2]!.id;
    const first = await ManagerStaffPayrollAndAttendanceApi.fetchLedger(firstStaffId);
    const second = await ManagerStaffPayrollAndAttendanceApi.fetchLedger(secondStaffId);
    const missing = await ManagerStaffPayrollAndAttendanceApi.fetchLedger('unknown-staff');
    expect(first.success).toBe(true);
    expect(second.success).toBe(true);
    expect(first.data?.ledger.every((entry) => entry.staffId === firstStaffId)).toBe(true);
    expect(second.data?.ledger.every((entry) => entry.staffId === secondStaffId)).toBe(true);
    expect(missing.data?.ledger).toEqual([]);
    expect(missing.data?.total).toBe(0);
  });

  it('applies page, search, role and month filters to datasets that cross page boundaries', async () => {
    const pageOne = await ManagerStaffPayrollAndAttendanceApi.fetchStaff({ page: '1', limit: '10' });
    const pageTwo = await ManagerStaffPayrollAndAttendanceApi.fetchStaff({ page: '2', limit: '10' });
    const completeRoster = await ManagerStaffPayrollAndAttendanceApi.fetchStaff({ page: '1', limit: String(MOCK_STAFF.length) });
    const roleFiltered = await ManagerStaffPayrollAndAttendanceApi.fetchStaff({ role: 'nutritionist', page: '1', limit: '100' });
    const searched = await ManagerStaffPayrollAndAttendanceApi.fetchStaff({ search: 'staff member 120', page: '1', limit: '10' });
    const payrollsForMonth = await ManagerStaffPayrollAndAttendanceApi.fetchPayrolls({ month: MOCK_PAYROLL_AND_LEDGER_MONTH, page: '1', limit: '10' });
    expect(pageOne.data?.staff).toHaveLength(10);
    expect(pageTwo.data?.staff.length).toBeGreaterThan(0);
    expect(pageOne.data?.staff[0]?.id).not.toBe(pageTwo.data?.staff[0]?.id);
    expect(completeRoster.data?.staff).toHaveLength(completeRoster.data?.total ?? 0);
    expect(completeRoster.data?.total).toBeGreaterThan(100);
    expect(roleFiltered.data?.staff.every((staff) => staff.role === 'Nutritionist')).toBe(true);
    expect(searched.data?.staff.some((staff) => staff.name === 'Staff Member 120')).toBe(true);
    expect(payrollsForMonth.data?.payrolls).toHaveLength(10);
    expect(payrollsForMonth.data?.total).toBeGreaterThan(10);
  });

  it('filters attendance by both staff ID and selected month, with a deterministic empty month', async () => {
    const staffId = MOCK_STAFF[1]!.id;
    const current = await ManagerStaffPayrollAndAttendanceApi.fetchStaffAttendance(staffId, MOCK_PAYROLL_AND_LEDGER_MONTH);
    const previous = await ManagerStaffPayrollAndAttendanceApi.fetchStaffAttendance(staffId, '2001-01');
    const otherStaff = await ManagerStaffPayrollAndAttendanceApi.fetchStaffAttendance(MOCK_STAFF[2]!.id, MOCK_PAYROLL_AND_LEDGER_MONTH);
    expect(current.data?.history.length).toBeGreaterThan(0);
    expect(previous.data?.history).toEqual([]);
    expect(otherStaff.data?.history).not.toEqual(current.data?.history);
  });

  it('replays financial mutations once for an identical idempotency key and rejects key reuse with a different payload', async () => {
    const staffId = MOCK_STAFF[1]!.id;
    const before = await ManagerStaffPayrollAndAttendanceApi.fetchLedger(staffId);
    const payload = { staffId, amount: 12500, notes: 'idempotency replay test', paymentMode: 'Bank Transfer' };
    const first = await fetch(endpoint(MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API.LEDGER_ADVANCE), { method: 'POST', headers: { 'Content-Type': 'application/json', 'Idempotency-Key': 'advance-replay-1' }, body: JSON.stringify(payload) });
    const firstBody = await readJson(first);
    const replay = await fetch(endpoint(MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API.LEDGER_ADVANCE), { method: 'POST', headers: { 'Content-Type': 'application/json', 'Idempotency-Key': 'advance-replay-1' }, body: JSON.stringify(payload) });
    const replayBody = await readJson(replay);
    const after = await ManagerStaffPayrollAndAttendanceApi.fetchLedger(staffId);
    expect(firstBody.data).toEqual(replayBody.data);
    expect(firstBody.requestId).toBe(replayBody.requestId);
    expect(after.data?.total).toBe((before.data?.total ?? 0) + 1);

    const conflict = await fetch(endpoint(MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API.LEDGER_ADVANCE), { method: 'POST', headers: { 'Content-Type': 'application/json', 'Idempotency-Key': 'advance-replay-1' }, body: JSON.stringify({ ...payload, amount: 25000 }) });
    const conflictBody = await readJson(conflict);
    expect(conflict.status).toBe(409);
    expectFailureEnvelope(conflictBody, 409);
    expect(conflictBody.errorCode).toBe('IDEMPOTENCY_KEY_REUSED');

    const duePayroll = MOCK_PAYROLLS.find((payroll) => payroll.pendingAmount > 0)!;
    const duePayload = { staffId: duePayroll.staffId, amount: 1000 };
    const dueFirst = await ManagerStaffPayrollAndAttendanceApi.payStaffDue(duePayload, 'due-replay-1');
    const dueReplay = await ManagerStaffPayrollAndAttendanceApi.payStaffDue(duePayload, 'due-replay-1');
    expect(dueFirst.data).toEqual(dueReplay.data);

    const generatedFirst = await ManagerStaffPayrollAndAttendanceApi.generatePayrolls('2027-03', 'payroll-generate-replay-1');
    const generatedReplay = await ManagerStaffPayrollAndAttendanceApi.generatePayrolls('2027-03', 'payroll-generate-replay-1');
    expect(generatedFirst.data?.payrolls).toEqual(generatedReplay.data?.payrolls);
    const generatedList = await ManagerStaffPayrollAndAttendanceApi.fetchPayrolls({ month: '2027-03', page: '1', limit: '500' });
    expect(generatedList.data?.total).toBe(generatedFirst.data?.payrolls.length);

    const createPayload = { staffId, month: '2027-04', amount: 50000, netPayable: 50000, paidAmount: 0, pendingAmount: 50000, status: 'PENDING', deductions: { tds: 0, pf: 0, esi: 0, other: 0 } };
    const createFirst = await ManagerStaffPayrollAndAttendanceApi.createPayroll(createPayload, 'payroll-create-replay-1');
    const createReplay = await ManagerStaffPayrollAndAttendanceApi.createPayroll(createPayload, 'payroll-create-replay-1');
    expect(createFirst.data?.id).toBe(createReplay.data?.id);
    const createdList = await ManagerStaffPayrollAndAttendanceApi.fetchPayrolls({ month: '2027-04', page: '1', limit: '10' });
    expect(createdList.data?.total).toBe(1);

    const targetPayrollId = MOCK_PAYROLLS[0]!.id;
    const updateFirst = await ManagerStaffPayrollAndAttendanceApi.updatePayroll(targetPayrollId, { notes: 'idempotent update' }, 'payroll-update-replay-1');
    const updateReplay = await ManagerStaffPayrollAndAttendanceApi.updatePayroll(targetPayrollId, { notes: 'idempotent update' }, 'payroll-update-replay-1');
    expect(updateFirst.requestId).toBe(updateReplay.requestId);
    const statusFirst = await ManagerStaffPayrollAndAttendanceApi.updatePayrollStatus(targetPayrollId, 'PAID', 'payroll-status-replay-1');
    const statusReplay = await ManagerStaffPayrollAndAttendanceApi.updatePayrollStatus(targetPayrollId, 'PAID', 'payroll-status-replay-1');
    expect(statusFirst.requestId).toBe(statusReplay.requestId);
  });

  it('recomputes payroll summary and staff balances after advance and due-payment mutations', async () => {
    const duePayroll = MOCK_PAYROLLS.find((payroll) => payroll.pendingAmount > 0);
    expect(duePayroll).toBeDefined();
    const staffId = duePayroll!.staffId;
    const before = await ManagerStaffPayrollAndAttendanceApi.fetchHrSummary();
    const advanceAmount = 7000;
    const advance = await ManagerStaffPayrollAndAttendanceApi.giveStaffAdvance({ staffId, amount: advanceAmount }, 'summary-advance-1');
    expect(advance.success).toBe(true);
    const afterAdvance = await ManagerStaffPayrollAndAttendanceApi.fetchHrSummary();
    expect(afterAdvance.data?.totalAdvanceGiven).toBe((before.data?.totalAdvanceGiven ?? 0) + advanceAmount);

    const dueAmount = Math.min(5000, duePayroll!.pendingAmount);
    const due = await ManagerStaffPayrollAndAttendanceApi.payStaffDue({ staffId, amount: dueAmount }, 'summary-due-1');
    expect(due.success).toBe(true);
    const afterDue = await ManagerStaffPayrollAndAttendanceApi.fetchHrSummary();
    expect(afterDue.data?.totalSalaryDue).toBe((afterAdvance.data?.totalSalaryDue ?? 0) - dueAmount);
    expect(afterDue.data?.totalSalaryPaid).toBe((afterAdvance.data?.totalSalaryPaid ?? 0) + dueAmount);
  });

  it('executes all registered transport scenarios, including retry-then-success', async () => {
    const url = endpoint(MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API.SUMMARY);

    setManagerPayrollAndLedgerMockScenario('EMPTY');
    const empty = await fetch(url);
    const emptyBody = await readJson(empty);
    expectSuccessEnvelope(emptyBody);
    expect(emptyBody.data).toEqual({ totalSalaryThisMonth: 0, totalSalaryPaid: 0, totalSalaryDue: 0, totalAdvanceGiven: 0, pendingPaymentsCount: 0, totalStaff: 0, activeStaff: 0, totalPayrollThisMonth: 0, paidCount: 0 });

    setManagerPayrollAndLedgerMockScenario('SERVER_500');
    const serverError = await fetch(url);
    expect(serverError.status).toBe(500);
    expectFailureEnvelope(await readJson(serverError), 500);

    setManagerPayrollAndLedgerMockScenario('TIMEOUT');
    const timeout = await fetch(url);
    expect(timeout.status).toBe(408);
    expectFailureEnvelope(await readJson(timeout), 408);

    setManagerPayrollAndLedgerMockScenario('UNAUTHORIZED');
    const unauthorized = await fetch(url);
    expect(unauthorized.status).toBe(401);
    expectFailureEnvelope(await readJson(unauthorized), 401);

    setManagerPayrollAndLedgerMockScenario('INVALID');
    const invalid = await fetch(url);
    const invalidBody = await readJson(invalid);
    expectSuccessEnvelope(invalidBody);
    expect(invalidBody.data).toEqual({ invalid: true });

    setManagerPayrollAndLedgerMockScenario('CANCELLED');
    const controller = new AbortController();
    const cancelledRequest = fetch(url, { signal: controller.signal });
    await new Promise((resolve) => setTimeout(resolve, 0));
    controller.abort();
    await expect(cancelledRequest).rejects.toMatchObject({ name: 'AbortError' });

    setManagerPayrollAndLedgerMockScenario('RETRY');
    const firstAttempt = await fetch(url);
    expect(firstAttempt.status).toBe(503);
    expectFailureEnvelope(await readJson(firstAttempt), 503);
    const secondAttempt = await fetch(url);
    expect(secondAttempt.status).toBe(200);
    expectSuccessEnvelope(await readJson(secondAttempt));
  });
});
