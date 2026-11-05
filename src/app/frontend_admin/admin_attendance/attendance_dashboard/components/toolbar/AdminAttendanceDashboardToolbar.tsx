"use client";
// RESPONSIBILITY: Renders search input, status filter, branch filter, and date range filter for Admin Attendance.
// DATA FLOW: feature data/state and user input → AdminAttendanceDashboardToolbar → accessible UI/events routed to owning hooks (admin_attendance/attendance_dashboard/components/toolbar/AdminAttendanceDashboardToolbar.tsx)

import type { AdminAttendanceStatusFilter } from '@/app/frontend_admin/admin_attendance/attendance_dashboard/types/AdminAttendanceDashboardTypes';
import { useTranslations } from 'next-intl';

import { Search } from 'lucide-react';
import { useAdminAttendanceStore } from '@/app/frontend_admin/admin_attendance/attendance_dashboard/state/useAdminAttendanceDashboardStore';
import { useAdminAttendanceBranchReference } from '@/app/frontend_admin/admin_attendance/attendance_dashboard/hooks/useAdminAttendanceDashboardBranchReference';
import { AdminNavigationLayoutSearchableDropdown } from '@/app/frontend_admin/admin_attendance/attendance_dashboard/components/searchable_dropdown/AdminAttendanceDashboardSearchableDropdown';
import { ATTENDANCE_STATUS_OPTIONS, DATE_RANGE_OPTIONS } from '@/app/frontend_admin/admin_attendance/attendance_dashboard/constants/AdminAttendanceDashboardConstants';
import type { AttendanceStatus, DateRangeFilter } from '@/app/frontend_admin/admin_attendance/attendance_dashboard/types/AdminAttendanceDashboardTypes';
import type { AdminAttendanceBranchReference } from '@/app/frontend_admin/admin_attendance/attendance_dashboard/types/AdminAttendanceDashboardBranchReferenceTypes';

/**
 * AdminAttendanceDashboardToolbar renders the admin attendance toolbar UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminAttendanceDashboardToolbar: Renders search input, status filter, branch filter, and date range filter for Admin Attendance.
 * @dependencies Consumes useAdminAttendanceStore, useAdminAttendanceBranchReference, AdminNavigationLayoutSearchableDropdown, AdminAttendanceConstants, AdminAttendanceTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminAttendanceDashboardToolbar() {
  const t = useTranslations();

  const { search, setSearch, statusFilter, setStatusFilter, branchFilter, setBranchFilter, dateRange, setDateRange } =
    useAdminAttendanceStore();
  const branchesQuery = useAdminAttendanceBranchReference();
  const branches = branchesQuery.data ?? [];

  const branchOptions = [
    { value: 'all', label: t('attendance.AdminAuditRepair.allBranches') },
    ...(branches as AdminAttendanceBranchReference[]).map((b) => ({ value: b.id, label: b.name })),
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
      <div className="relative flex-1 min-w-48">
        <span className="absolute inset-y-0 left-3 flex items-center"><Search size={18} className="text-secondary pointer-events-none"  strokeWidth={2}/></span>
        <input
          type="text"
          placeholder={t('attendance.admin_attendance_toolbar.text_9ecaf04b35')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 bg-input border border-border rounded-xl text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary placeholder:text-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11"
          aria-label={t('attendance.admin_attendance_toolbar.text_617d2d01c3')}
         data-testid="admin_attendance-admin_attendance-toolbar-control"/>
      </div>
      <div className="w-full sm:w-44">
        <AdminNavigationLayoutSearchableDropdown
          options={DATE_RANGE_OPTIONS.map((o) => ({ value: o.value, label: t(o.labelKey) }))}
          value={dateRange}
          onChange={(v) => setDateRange(v as DateRangeFilter)}
          placeholder={t('attendance.admin_attendance_toolbar.text_24345a1437')}
         testId="admin_attendance-admin_attendance-toolbar-change"/>
      </div>
      <div className="w-full sm:w-44">
        <AdminNavigationLayoutSearchableDropdown
          options={ATTENDANCE_STATUS_OPTIONS.map((o) => ({ value: o.value, label: t(o.labelKey) }))}
          value={statusFilter}
          onChange={(v) => setStatusFilter(v as AdminAttendanceStatusFilter)}
          placeholder={t('attendance.admin_attendance_toolbar.text_6b308de777')}
         testId="admin_attendance-admin_attendance-toolbar-change-2"/>
      </div>
      <div className="w-full sm:w-48">
        {branchesQuery.isPending ? (
          <p role="status" className="min-h-11 flex items-center text-sm text-secondary" data-testid="attendance-dashboard-attendance-dashboard-toolbar-status-region">{t('AdminAttendanceError.loadingBranches')}</p>
        ) : branchesQuery.isError ? (
          <div role="alert" className="flex min-h-11 items-center gap-2 text-sm text-danger">
            <span>{t('AdminAttendanceError.branchesFailed')}</span>
            <button type="button" onClick={() => void branchesQuery.refetch()} className="min-h-11 underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="attendance-dashboard-attendance-dashboard-toolbar-admin-attendance-error-retry">{t('AdminAttendanceError.retry')}</button>
          </div>
        ) : <AdminNavigationLayoutSearchableDropdown
          options={branchOptions}
          value={branchFilter}
          onChange={(v) => setBranchFilter(v as string)}
          placeholder={t('attendance.admin_attendance_toolbar.text_0bf51d9a45')}
         testId="admin_attendance-admin_attendance-toolbar-change-3"/>}
      </div>
    </div>
  );
}
