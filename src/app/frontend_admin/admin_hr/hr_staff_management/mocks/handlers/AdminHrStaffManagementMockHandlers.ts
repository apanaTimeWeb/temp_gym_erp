// RESPONSIBILITY: Mutable MSW handlers for the HR staff-directory API only.
// DATA FLOW: staff API request → isolated mutable staff state → ApiResponse envelope.
import { http, HttpResponse } from 'msw';
import { StatusCodes } from 'http-status-codes';
import { MOCK_ADMIN_STAFF_EXPANDED } from '@/app/frontend_admin/admin_hr/hr_staff_management/mocks/fixtures/AdminHrStaffManagementMockFixtures';
import type { Staff } from '@/app/frontend_admin/admin_hr/hr_staff_management/types/AdminHrStaffManagementTypes';
import { staffFormSchema } from '@/app/frontend_admin/admin_hr/hr_staff_management/schemas/AdminHrStaffManagementSchemas';
import type { AdminHrJsonObject } from '@/app/frontend_admin/admin_hr/hr_staff_management/types/AdminHrStaffManagementMockHandlerTypes';
import { STAFF_SORT_KEY_VALUES } from '@/app/frontend_admin/admin_hr/hr_staff_management/constants/AdminHrStaffManagementConstants';
import { adminHrStaffMockPositiveInteger } from '@/app/frontend_admin/admin_hr/hr_staff_management/utils/AdminHrStaffManagementMockPagination';

const clone = <T>(value: T): T => structuredClone(value);
let staffState: Staff[] = clone(MOCK_ADMIN_STAFF_EXPANDED);
const BRANCH_NAME_BY_ID: Record<string, string> = { b1: 'Downtown Main', b2: 'Westside Gym', b3: 'Northside Arena', b4: 'Eastside Fitness' };
async function parseBody(request: Request): Promise<AdminHrJsonObject> {
  try { const value: unknown = await request.clone().json(); return value && typeof value === 'object' && !Array.isArray(value) ? value as AdminHrJsonObject : {}; } catch { return {}; }
}
const readString = (input: AdminHrJsonObject, key: string, fallback = '') => typeof input[key] === 'string' ? input[key] as string : fallback;
const readNumber = (input: AdminHrJsonObject, key: string, fallback = 0) => Number.isFinite(Number(input[key])) ? Number(input[key]) : fallback;
const ok = <T>(data: T, message = 'Success') => HttpResponse.json({ success: true, message, data, requestId: globalThis.crypto.randomUUID() });
const notFound = (message: string) => HttpResponse.json({ errorCode: 'NOT_FOUND', requestId: globalThis.crypto.randomUUID(), success: false, message, data: null, error: 'NOT_FOUND', statusCode: StatusCodes.NOT_FOUND }, { status: StatusCodes.NOT_FOUND });
function buildStaff(input: AdminHrJsonObject): Staff {
  return {
    id: `s-demo-${globalThis.crypto.randomUUID()}`,
    employeeId: readString(input, 'employeeId', `EMP-DEMO-${globalThis.crypto.randomUUID()}`),
    name: readString(input, 'name'), email: readString(input, 'email'),
    phone: readString(input, 'phone'), role: readString(input, 'role'),
    salary: readNumber(input, 'salary'), branch: readString(input, 'branch'),
    gender: readString(input, 'gender'), joinDate: readString(input, 'joinDate'),
    isActive: input.isActive === true,
  };
}

export function resetAdminHrStaffMockState(): void { staffState = clone(MOCK_ADMIN_STAFF_EXPANDED); }

export const adminHrMockHandlers = [
  http.get('*/admin/hr/staff', ({ request }) => {
    const url = new URL(request.url);
    const search = (url.searchParams.get('search') ?? '').trim().toLowerCase();
    const role = url.searchParams.get('role');
    const branch = url.searchParams.get('branch');
    const branchId = url.searchParams.get('branchId');
    const requestedSort = url.searchParams.get('sortKey');
    const sortKey = STAFF_SORT_KEY_VALUES.some((value) => value === requestedSort) ? requestedSort! : 'name';
    const sortDir = url.searchParams.get('sortDir') === 'desc' ? 'desc' : 'asc';
    const requestedPage = adminHrStaffMockPositiveInteger(url.searchParams.get('page'), 1);
    const limit = Math.min(adminHrStaffMockPositiveInteger(url.searchParams.get('limit'), 10), 100);
    const filtered = staffState.filter((staff) =>
      (!search || `${staff.name} ${staff.employeeId ?? ''} ${staff.role} ${staff.phone} ${staff.branch}`.toLowerCase().includes(search)) &&
      (!role || role === 'All' || staff.role === role) &&
      (!branch || branch === 'All' || staff.branch === branch) &&
      (!branchId || branchId === 'all' || staff.branch === BRANCH_NAME_BY_ID[branchId]));
    const sorted = [...filtered].sort((left, right) => {
      const key = sortKey as keyof Staff;
      const leftValue = left[key]; const rightValue = right[key];
      const result = typeof leftValue === 'number' && typeof rightValue === 'number' ? leftValue - rightValue : String(leftValue ?? '').localeCompare(String(rightValue ?? ''), undefined, { numeric: true });
      return sortDir === 'asc' ? result : -result;
    });
    const totalPages = Math.max(1, Math.ceil(sorted.length / limit));
    const page = Math.min(requestedPage, totalPages);
    const start = (page - 1) * limit;
    return HttpResponse.json({ success: true, message: 'Success', data: { staff: sorted.slice(start, start + limit), total: sorted.length }, meta: { total: sorted.length, page, limit, totalPages, hasNextPage: page < totalPages, hasPrevPage: page > 1 }, requestId: globalThis.crypto.randomUUID() });
  }),
  http.get('*/admin/hr/staff/:id', ({ params }) => { const staff = staffState.find((item) => item.id === String(params.id)); return staff ? ok(staff) : notFound('Staff member not found'); }),
  http.post('*/admin/hr/staff', async ({ request }) => {
    const parsed = staffFormSchema.safeParse(await parseBody(request));
    if (!parsed.success) return HttpResponse.json({ success: false, errorCode: 'VALIDATION_ERROR', statusCode: StatusCodes.BAD_REQUEST, message: 'Invalid staff form values', requestId: globalThis.crypto.randomUUID() }, { status: StatusCodes.BAD_REQUEST });
    const created = buildStaff(parsed.data as AdminHrJsonObject);
    staffState.unshift(created);
    return ok(created, 'Staff member created');
  }),
  http.patch('*/admin/hr/staff/:id', async ({ request, params }) => {
    const index = staffState.findIndex((item) => item.id === String(params.id));
    if (index < 0) return notFound('Staff member not found');
    // Accept only fields from the HR edit form. Never let a mock update mutate Finance-owned
    // balances, immutable staff IDs, or arbitrary keys embedded in a JSON object.
    const parsed = staffFormSchema.partial().safeParse(await parseBody(request));
    if (!parsed.success || Object.keys(parsed.data ?? {}).length === 0) {
      return HttpResponse.json({ success: false, errorCode: 'VALIDATION_ERROR', statusCode: StatusCodes.BAD_REQUEST, message: 'Invalid staff update values', requestId: globalThis.crypto.randomUUID() }, { status: StatusCodes.BAD_REQUEST });
    }
    staffState[index] = { ...staffState[index]!, ...parsed.data } as Staff;
    return ok(staffState[index], 'Staff member updated');
  }),
  http.delete('*/admin/hr/staff/:id', ({ params }) => { const index = staffState.findIndex((item) => item.id === String(params.id)); if (index < 0) return notFound('Staff member not found'); staffState.splice(index, 1); return ok(null, 'Staff member removed'); }),
  http.post('*/admin/hr/staff/bulk-deactivate', async ({ request }) => { const body = await parseBody(request); const ids = Array.isArray(body.ids) ? body.ids.map(String) : []; staffState = staffState.map((staff) => ids.includes(staff.id) ? { ...staff, isActive: false } : staff); return ok(null, 'Staff deactivated'); }),
  http.head('*/admin/hr/__mock-reset', () => { resetAdminHrStaffMockState(); return new HttpResponse(null, { status: StatusCodes.NO_CONTENT }); }),
];
