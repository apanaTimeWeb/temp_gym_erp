import { isAdminFinancePayrollMockAmountValid } from '@/app/frontend_admin/admin_finance/finance_payroll_management/utils/AdminFinancePayrollManagementMockMoneyValidation';
// RESPONSIBILITY: Owns mutable MSW handlers for the Finance payroll autonomous leaf.
// DATA FLOW: leaf API client → leaf-owned MSW handlers → mutable local fixtures → TanStack Query/UI.
import { http, HttpResponse } from 'msw';
import { StatusCodes } from 'http-status-codes';
import { format } from 'date-fns';
import { MOCK_ADMIN_STAFF_EXPANDED, MOCK_ADMIN_PAYROLLS_EXPANDED, MOCK_ADMIN_LEDGER } from '@/app/frontend_admin/admin_finance/finance_payroll_management/mocks/fixtures/AdminFinancePayrollManagementMockFixtures';
import type { Staff, Payroll, LedgerEntry } from '@/app/frontend_admin/admin_finance/finance_payroll_management/types/AdminFinancePayrollManagementTypes';
import { PAYROLL_SORT_KEY_VALUES, STAFF_SORT_KEY_VALUES, PAYROLL_STATUS } from '@/app/frontend_admin/admin_finance/finance_payroll_management/constants/AdminFinancePayrollManagementConstants';

const clone = <T>(value: T): T => structuredClone(value);
type JsonObject = Record<string, unknown>;
let staffState: Staff[] = clone(MOCK_ADMIN_STAFF_EXPANDED);
let payrollState: Payroll[] = clone(MOCK_ADMIN_PAYROLLS_EXPANDED);
let ledgerState: LedgerEntry[] = clone(MOCK_ADMIN_LEDGER);
const BRANCH_NAME_BY_ID: Record<string, string> = { b1: 'Downtown Main', b2: 'Westside Gym', b3: 'Northside Arena', b4: 'Eastside Fitness' };

async function parseBody(request: Request): Promise<JsonObject> {
  try { const value: unknown = await request.clone().json(); return value && typeof value === 'object' && !Array.isArray(value) ? value as JsonObject : {}; } catch { return {}; }
}
/** Reject NaN, Infinity, fractional and unsafe mock page/limit values. */
export function readAdminFinanceMockPageParam(value: string | null, fallback: number): number {
  const parsed = value === null ? NaN : Number(value);
  return Number.isSafeInteger(parsed) && parsed >= 1 && parsed <= 100 ? parsed : fallback;
}
const readString = (input: JsonObject, key: string, fallback = '') => typeof input[key] === 'string' ? input[key] as string : fallback;
const readNumber = (input: JsonObject, key: string, fallback = 0) => Number.isFinite(Number(input[key])) ? Number(input[key]) : fallback;
const ok = <T>(data: T, message = 'Success') => HttpResponse.json({ success: true, message, data, requestId: globalThis.crypto.randomUUID() });
const notFound = (message: string) => HttpResponse.json({ errorCode: 'NOT_FOUND', requestId: globalThis.crypto.randomUUID(), success: false, message, data: null, statusCode: StatusCodes.NOT_FOUND }, { status: StatusCodes.NOT_FOUND });

function appendLedgerEntry(input: Omit<LedgerEntry, 'id' | 'balance'>): void {
  const previous = ledgerState.filter((entry) => entry.staffId === input.staffId).reduce((latest, entry) => entry.date >= latest.date ? entry : latest, { balance: 0, date: '' } as Pick<LedgerEntry, 'balance' | 'date'>);
  ledgerState.push({ ...input, id: `l-demo-${globalThis.crypto.randomUUID()}`, balance: previous.balance + input.credit - input.debit });
}

function computeSummary(branchId?: string) {
  const month = format(new Date(), 'yyyy-MM');
  const selectedStaff = !branchId || branchId === 'all' ? staffState : staffState.filter((staff) => staff.branch === BRANCH_NAME_BY_ID[branchId]);
  const selectedStaffIds = new Set(selectedStaff.map((staff) => staff.id));
  const payrolls = payrollState.filter((item) => item.month === month && selectedStaffIds.has(item.staffId));
  const selectedLedger = ledgerState.filter((entry) => selectedStaffIds.has(entry.staffId));
  const totalSalaryThisMonth = payrolls.reduce((sum, item) => sum + item.amount, 0);
  const totalSalaryPaid = payrolls.reduce((sum, item) => sum + item.paidAmount, 0);
  const totalSalaryDue = payrolls.reduce((sum, item) => sum + item.pendingAmount, 0) + selectedStaff.reduce((sum, item) => sum + (item.currentDue ?? 0), 0);
  const totalAdvanceGiven = selectedLedger.filter((entry) => entry.type === 'Advance Given').reduce((sum, entry) => sum + entry.debit, 0);
  const pendingPaymentsCount = payrolls.filter((item) => item.pendingAmount > 0).length + selectedStaff.filter((item) => (item.currentDue ?? 0) > 0).length;
  return { totalSalaryThisMonth, totalSalaryPaid, totalSalaryDue, totalAdvanceGiven, pendingPaymentsCount, totalStaff: selectedStaff.length, activeStaff: selectedStaff.filter((item) => item.isActive).length, totalPayrollThisMonth: totalSalaryThisMonth, paidCount: payrolls.filter((item) => item.pendingAmount === 0).length, pendingCount: payrolls.filter((item) => item.pendingAmount > 0).length };
}

function readStaffPage(request: Request) {
  const url = new URL(request.url);
  const search = (url.searchParams.get('search') ?? '').trim().toLowerCase();
  const role = url.searchParams.get('role');
  const branch = url.searchParams.get('branch');
  const branchId = url.searchParams.get('branchId');
  const rawSortKey = url.searchParams.get('sortKey');
  const sortKey = STAFF_SORT_KEY_VALUES.find((key) => key === rawSortKey) ?? 'name';
  const sortDir = url.searchParams.get('sortDir') === 'desc' ? 'desc' : 'asc';
  const page = readAdminFinanceMockPageParam(url.searchParams.get('page'), 1);
  const limit = readAdminFinanceMockPageParam(url.searchParams.get('limit'), 10);
  const filtered = staffState.filter((staff) => (!search || `${staff.name} ${staff.employeeId ?? ''} ${staff.role} ${staff.phone} ${staff.branch}`.toLowerCase().includes(search)) && (!role || role === 'All' || staff.role === role) && (!branch || branch === 'All' || staff.branch === branch) && (!branchId || branchId === 'all' || staff.branch === BRANCH_NAME_BY_ID[branchId]));
  const sorted = [...filtered].sort((a, b) => { const key = sortKey as keyof Staff; const av = a[key]; const bv = b[key]; const result = typeof av === 'number' && typeof bv === 'number' ? av - bv : String(av ?? '').localeCompare(String(bv ?? ''), undefined, { numeric: true }); return sortDir === 'asc' ? result : -result; });
  const totalPages = Math.max(1, Math.ceil(sorted.length / limit)); const safePage = Math.min(page, totalPages); const start = (safePage - 1) * limit;
  return HttpResponse.json({ success: true, message: 'Success', data: { staff: sorted.slice(start, start + limit), total: sorted.length }, meta: { total: sorted.length, page: safePage, limit, totalPages, hasNextPage: safePage < totalPages, hasPrevPage: safePage > 1 }, requestId: globalThis.crypto.randomUUID() });
}

const badRequest = (message: string) => HttpResponse.json({
  errorCode: 'ADMIN_API_BAD_REQUEST', statusCode: StatusCodes.BAD_REQUEST,
  requestId: globalThis.crypto.randomUUID(), success: false, message, data: null,
}, { status: StatusCodes.BAD_REQUEST });
function validPayrollCreate(body: JsonObject): boolean {
  return typeof body.staffId === 'string' && staffState.some((staff) => staff.id === body.staffId) &&
    isAdminFinancePayrollMockAmountValid(body.amount, body.paidAmount === undefined ? 0 : body.paidAmount);
}
function buildPayroll(input: JsonObject): Payroll {
  const amount = readNumber(input, 'amount'); const paidAmount = readNumber(input, 'paidAmount'); const pendingAmount = Math.max(0, amount - paidAmount);
  const status = pendingAmount === 0 ? PAYROLL_STATUS.PAID : paidAmount > 0 ? PAYROLL_STATUS.PARTIAL : PAYROLL_STATUS.PENDING;
  const staffId = readString(input, 'staffId'); const staff = staffState.find((item) => item.id === staffId);
  return { id: `pr-demo-${globalThis.crypto.randomUUID()}`, staffId, month: readString(input, 'month', format(new Date(), 'yyyy-MM')), amount, paidAmount, pendingAmount, status: status as Payroll['status'], paidAt: paidAmount > 0 ? new Date().toISOString() : undefined, staff: staff ? { name: staff.name, role: staff.role } : undefined };
}
export const adminFinancePayrollManagementMockHandlers = [
  http.get('*/admin/hr/payrolls', ({ request }) => {
    const url = new URL(request.url); const month = url.searchParams.get('month'); const status = url.searchParams.get('status'); const branchId = url.searchParams.get('branchId'); const search = (url.searchParams.get('search') ?? '').trim().toLowerCase();
    const rawSortKey = url.searchParams.get('sortKey'); const sortKey = PAYROLL_SORT_KEY_VALUES.find((key) => key === rawSortKey) ?? 'month'; const sortDir = url.searchParams.get('sortDir') === 'asc' ? 'asc' : 'desc'; const page = readAdminFinanceMockPageParam(url.searchParams.get('page'), 1); const limit = readAdminFinanceMockPageParam(url.searchParams.get('limit'), 10);
    const filtered = payrollState.filter((payroll) => { const staff = staffState.find((record) => record.id === payroll.staffId); return (!month || month === 'all' || !payroll.month || payroll.month === month) && (!status || status === 'all' || payroll.status === status) && (!branchId || branchId === 'all' || staff?.branch === BRANCH_NAME_BY_ID[branchId]) && (!search || `${staff?.name ?? payroll.staff?.name ?? ''} ${staff?.role ?? payroll.staff?.role ?? ''} ${payroll.staffId}`.toLowerCase().includes(search)); });
    const sorted = [...filtered].sort((a,b) => { const av = sortKey === 'staffName' ? (a.staff?.name ?? staffState.find((s)=>s.id===a.staffId)?.name) : sortKey === 'paidAt' ? a.paidAt : a[sortKey as keyof Payroll]; const bv = sortKey === 'staffName' ? (b.staff?.name ?? staffState.find((s)=>s.id===b.staffId)?.name) : sortKey === 'paidAt' ? b.paidAt : b[sortKey as keyof Payroll]; const result = typeof av === 'number' && typeof bv === 'number' ? av-bv : String(av ?? '').localeCompare(String(bv ?? ''), undefined, { numeric: true }); return sortDir === 'asc' ? result : -result; });
    const totalPages = Math.max(1, Math.ceil(sorted.length / limit)); const safePage = Math.min(page, totalPages); const start = (safePage-1)*limit;
    return HttpResponse.json({ success:true, message:'Success', data:{ payrolls:sorted.slice(start,start+limit), total:sorted.length }, meta:{ total:sorted.length,page:safePage,limit,totalPages,hasNextPage:safePage<totalPages,hasPrevPage:safePage>1 }, requestId:globalThis.crypto.randomUUID() });
  }),
  http.post('*/admin/hr/payrolls', async ({ request }) => { const body = await parseBody(request); if (!validPayrollCreate(body)) return badRequest('Invalid payroll staff or amount'); const created = buildPayroll(body); payrollState.unshift(created); appendLedgerEntry({ staffId: created.staffId, date:new Date().toISOString(), type:'Salary Generated', credit:created.amount, debit:0, notes:created.notes }); if (created.paidAmount > 0) appendLedgerEntry({ staffId:created.staffId,date:new Date().toISOString(),type:'Salary Paid',credit:0,debit:created.paidAmount,notes:created.notes }); return ok(created,'Payroll created'); }),
  http.patch('*/admin/hr/payrolls/:id', async ({ request, params }) => { const index = payrollState.findIndex((item)=>item.id===String(params.id)); if(index<0) return notFound('Payroll record not found'); const body=await parseBody(request); const current=payrollState[index]!; const amount=body.amount===undefined?current.amount:readNumber(body,'amount',current.amount); const paidAmount=body.paidAmount===undefined?current.paidAmount:readNumber(body,'paidAmount',current.paidAmount); if (!isAdminFinancePayrollMockAmountValid(body.amount === undefined ? current.amount : body.amount, body.paidAmount === undefined ? current.paidAmount : body.paidAmount) || (body.staffId !== undefined && body.staffId !== current.staffId)) return badRequest('Invalid payroll amount or staff'); const pendingAmount=Math.max(0,amount-paidAmount); payrollState[index]={...current,...body,id:current.id,staffId:current.staffId,staff:current.staff,amount,paidAmount,pendingAmount,status:(pendingAmount===0?PAYROLL_STATUS.PAID:paidAmount>0?PAYROLL_STATUS.PARTIAL:PAYROLL_STATUS.PENDING) as Payroll['status'],paidAt:paidAmount>0?(current.paidAt??new Date().toISOString()):undefined} as Payroll; if(paidAmount>current.paidAmount) appendLedgerEntry({staffId:current.staffId,date:new Date().toISOString(),type:'Salary Paid',credit:0,debit:paidAmount-current.paidAmount,notes:current.notes}); return ok(payrollState[index],'Payroll updated'); }),
  http.patch('*/admin/hr/staff/:id', async ({ request, params }) => { const index=staffState.findIndex((item)=>item.id===String(params.id)); if(index<0) return notFound('Staff member not found'); const body=await parseBody(request); staffState[index]={...staffState[index]!,...body,id:staffState[index]!.id} as Staff; return ok(staffState[index],'Staff member updated'); }),

  http.get('*/admin/hr/staff', ({ request }) => readStaffPage(request)),
  http.get('*/admin/hr/summary', ({ request }) => ok(computeSummary(new URL(request.url).searchParams.get('branchId') ?? undefined))),
  http.head('*/admin/hr/__mock-reset', () => { staffState = clone(MOCK_ADMIN_STAFF_EXPANDED); payrollState = clone(MOCK_ADMIN_PAYROLLS_EXPANDED); ledgerState = clone(MOCK_ADMIN_LEDGER); return new HttpResponse(null, { status: StatusCodes.NO_CONTENT }); }),
];
