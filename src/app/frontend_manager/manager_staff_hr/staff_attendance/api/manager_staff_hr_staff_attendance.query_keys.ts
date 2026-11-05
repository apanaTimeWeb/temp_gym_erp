// RESPONSIBILITY: Owns the canonical TanStack Query key registry for the Manager hr module.
/**
 * @description Provides stable, module-namespaced query-key factories so cache entries cannot collide across resources or filters.
 * @dependencies None; consumed by module-owned query and mutation hooks.
 * @edge-case Resource-specific factories include resource identifiers whenever the query represents a specific entity.
 */
export const MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_QUERY_KEYS = {
  all: ['manager_hr'] as const,
  detail: (id: string) => [...MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_QUERY_KEYS.all, 'detail', id] as const,
  staff: <T extends object>(params?: T) => [...MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_QUERY_KEYS.all, 'staff', params] as const,
  payroll: <T extends object>(params?: T) => [...MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_QUERY_KEYS.all, 'payroll', params] as const,
  payrolls: () => [...MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_QUERY_KEYS.all, 'payrolls'] as const,
  summary: () => [...MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_QUERY_KEYS.all, 'summary'] as const,
  ledger: (staffId: string, range?: string) => [...MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_QUERY_KEYS.all, 'ledger', staffId, range] as const,
  staffAttendance: (staffId: string, month: string) => [...MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_QUERY_KEYS.all, 'staff-attendance', staffId, month] as const,
} as const;

/** Canonical PascalCase alias consumed by module query/mutation hooks. */
export const ManagerStaffPayrollAndAttendanceQueryKeys = MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_QUERY_KEYS;
