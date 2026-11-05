import { isAdminFinanceSalaryAdvanceMockAmountValid } from '@/app/frontend_admin/admin_finance/finance_salary_advance_management/utils/AdminFinanceSalaryAdvanceManagementMockMoneyValidation';
// RESPONSIBILITY: Owns mutable MSW handlers for the Finance salary advances autonomous leaf.
// DATA FLOW: leaf API client → leaf-owned MSW handlers → mutable local fixtures → TanStack Query/UI.
import { http, HttpResponse } from 'msw';
import { StatusCodes } from 'http-status-codes';
import { format } from 'date-fns';
import { MOCK_ADMIN_STAFF_EXPANDED, MOCK_ADMIN_PAYROLLS_EXPANDED, MOCK_ADMIN_LEDGER } from '@/app/frontend_admin/admin_finance/finance_salary_advance_management/mocks/fixtures/AdminFinanceSalaryAdvanceManagementMockFixtures';
import { STAFF_SORT_KEY_VALUES } from '@/app/frontend_admin/admin_finance/finance_salary_advance_management/constants/AdminFinanceSalaryAdvanceManagementConstants';
import type { Staff, Payroll, LedgerEntry } from '@/app/frontend_admin/admin_finance/finance_salary_advance_management/types/AdminFinanceSalaryAdvanceManagementTypes';

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
  return value !== null && /^[1-9]\d*$/.test(value) && Number.isSafeInteger(parsed) && parsed >= 1 && parsed <= 100 ? parsed : fallback;
}
const readString = (input: JsonObject, key: string, fallback = '') => typeof input[key] === 'string' ? input[key] as string : fallback;
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
  const suppliedSortKey = url.searchParams.get('sortKey');
  const sortKey = STAFF_SORT_KEY_VALUES.find((key) => key === suppliedSortKey) ?? 'name';
  const sortDir = url.searchParams.get('sortDir') === 'desc' ? 'desc' : 'asc';
  const page = readAdminFinanceMockPageParam(url.searchParams.get('page'), 1);
  const limit = readAdminFinanceMockPageParam(url.searchParams.get('limit'), 10);
  const filtered = staffState.filter((staff) => (!search || `${staff.name} ${staff.employeeId ?? ''} ${staff.role} ${staff.phone} ${staff.branch}`.toLowerCase().includes(search)) && (!role || role === 'All' || staff.role === role) && (!branch || branch === 'All' || staff.branch === branch) && (!branchId || branchId === 'all' || staff.branch === BRANCH_NAME_BY_ID[branchId]));
  const sorted = [...filtered].sort((a, b) => { const key = sortKey; const av = a[key]; const bv = b[key]; const result = typeof av === 'number' && typeof bv === 'number' ? av - bv : String(av ?? '').localeCompare(String(bv ?? ''), undefined, { numeric: true }); return sortDir === 'asc' ? result : -result; });
  const totalPages = Math.max(1, Math.ceil(sorted.length / limit));
  const effectivePage = Math.min(page, totalPages);
  const start = (effectivePage - 1) * limit;
  return HttpResponse.json({ success: true, message: 'Success', data: { staff: sorted.slice(start, start + limit), total: sorted.length }, meta: { total: sorted.length, page: effectivePage, limit, totalPages, hasNextPage: effectivePage < totalPages, hasPrevPage: effectivePage > 1 }, requestId: globalThis.crypto.randomUUID() });
}


export const adminFinanceSalaryAdvanceManagementMockHandlers = [
  http.post('*/admin/hr/advances', async ({ request }) => { const body=await parseBody(request); const staffId=readString(body,'staffId'); const amount=body.amount; const index=staffState.findIndex((item)=>item.id===staffId); if(index<0) return notFound('Staff member not found'); if(!isAdminFinanceSalaryAdvanceMockAmountValid(amount)) return HttpResponse.json({errorCode:'ADMIN_API_BAD_REQUEST',statusCode:StatusCodes.BAD_REQUEST,requestId:globalThis.crypto.randomUUID(),success:false,message:'Advance amount must be positive',data:null},{status:StatusCodes.BAD_REQUEST}); staffState[index]={...staffState[index]!,advanceSalary:(staffState[index]!.advanceSalary??0)+amount}; appendLedgerEntry({staffId,date:readString(body,'date',new Date().toISOString()),type:'Advance Given',credit:0,debit:amount,notes:readString(body,'notes')||undefined,paymentMode:readString(body,'paymentMode')||undefined}); return ok(null,'Salary advance recorded'); }),

  http.get('*/admin/hr/staff', ({ request }) => readStaffPage(request)),
  http.get('*/admin/hr/summary', ({ request }) => ok(computeSummary(new URL(request.url).searchParams.get('branchId') ?? undefined))),
  http.head('*/admin/hr/__mock-reset', () => { staffState = clone(MOCK_ADMIN_STAFF_EXPANDED); payrollState = clone(MOCK_ADMIN_PAYROLLS_EXPANDED); ledgerState = clone(MOCK_ADMIN_LEDGER); return new HttpResponse(null, { status: StatusCodes.NO_CONTENT }); }),
];
