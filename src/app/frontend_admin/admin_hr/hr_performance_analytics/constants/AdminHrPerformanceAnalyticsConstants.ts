// RESPONSIBILITY: Defines feature-local constants and query-key contracts for hr_performance_analytics; it does not contain mutable server data.
// DATA FLOW: feature hook/API/component → stable feature constants → requests, cache keys, and UI behavior (admin_hr/hr_performance_analytics/constants/AdminHrPerformanceAnalyticsConstants.ts)

import type { PerformancePeriod, StaffPerformanceRecord } from '@/app/frontend_admin/admin_hr/hr_performance_analytics/types/AdminHrPerformanceAnalyticsTypes';
export const PERFORMANCE_PERIOD_OPTIONS: { labelKey: string; value: PerformancePeriod }[] = [
 { labelKey: 'hr.static.this_month', value: 'THIS_MONTH' }, { labelKey: 'hr.static.last_month', value: 'LAST_MONTH' }, { labelKey: 'hr.static.this_quarter', value: 'THIS_QUARTER' },
];
export const PERFORMANCE_STATUS_VALUES = { EXCELLENT: 'EXCELLENT', AVERAGE: 'AVERAGE', POOR: 'POOR' } as const;
export const PERFORMANCE_STATUS_CONFIG: Record<string, { labelKey: string; bgClass: string; textClass: string }> = {
 EXCELLENT: { labelKey: 'hr.static.excellent', bgClass: 'bg-success-bg', textClass: 'text-success' },
 AVERAGE: { labelKey: 'hr.static.average', bgClass: 'bg-warning-bg', textClass: 'text-warning' },
 POOR: { labelKey: 'hr.static.poor', bgClass: 'bg-danger-bg', textClass: 'text-danger' },
};
export const PERFORMANCE_TABLE_HEADERS = [
 { key: 'name', labelKey: 'hr.static.staff_member', sortable: true }, { key: 'role', labelKey: 'hr.static.role', sortable: true },
 { key: 'sessionsTaken', labelKey: 'hr.static.sessions', sortable: true }, { key: 'membersAdded', labelKey: 'hr.static.members_added', sortable: true },
 { key: 'attendancePct', labelKey: 'hr.static.attendance', sortable: true }, { key: 'rating', labelKey: 'hr.static.rating', sortable: true }, { key: 'status', labelKey: 'hr.static.status', sortable: false },
] as const;
