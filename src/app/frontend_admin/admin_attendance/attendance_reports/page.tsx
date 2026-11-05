"use client";
// Route entry for the independently navigable Attendance report.
import { useTranslations } from 'next-intl';
import { Download, Loader2 } from 'lucide-react';
import AdminAttendanceReportsTable from '@/app/frontend_admin/admin_attendance/attendance_reports/components/attendance/AdminAttendanceReportsTable';
import { AdminAttendanceReportsDateFilterDropdown } from '@/app/frontend_admin/admin_attendance/attendance_reports/components/date_filter/AdminAttendanceReportsDateFilterDropdown';
import { useAdminAttendanceReportsBranchReference } from '@/app/frontend_admin/admin_attendance/attendance_reports/hooks/useAdminAttendanceReportsBranchReference';
import { useAdminAttendanceReportsStore } from '@/app/frontend_admin/admin_attendance/attendance_reports/state/useAdminAttendanceReportsStore';
import { useAdminAttendanceReportsLogic } from '@/app/frontend_admin/admin_attendance/attendance_reports/hooks/useAdminAttendanceReportsLogic';
import { EXPORT_FORMAT_OPTIONS } from '@/app/frontend_admin/admin_attendance/attendance_reports/constants/AdminAttendanceReportsConstants';
import { ADMIN_ATTENDANCE_REPORTS_EXPORT_AVAILABLE } from '@/app/frontend_admin/admin_attendance/attendance_reports/constants/AdminAttendanceReportsConstants';
import type { AdminAttendanceReportsBranchReference } from '@/app/frontend_admin/admin_attendance/attendance_reports/types/AdminAttendanceReportsBranchReferenceTypes';
import { AdminAttendanceReportsSearchableDropdown } from '@/app/frontend_admin/admin_attendance/attendance_reports/components/searchable_dropdown/AdminAttendanceReportsSearchableDropdown';

export default function AdminAttendanceReportPage() {
  const t = useTranslations();
  const { selectedGymId, setSelectedGymId } = useAdminAttendanceReportsStore();
  const { data: branches = [] } = useAdminAttendanceReportsBranchReference();
  const { exportStatus, handleExport, isDateRangeValid } = useAdminAttendanceReportsLogic();
  const options = [{ value: 'all', label: t('reports.AdminAuditRepair.allGyms') }, ...(branches as AdminAttendanceReportsBranchReference[]).map((b) => ({ value: b.id, label: b.name }))];
  return <main className="min-h-full bg-page p-6 text-primary space-y-5">
    <h1 className="text-2xl font-bold">{t('reports.static.attendance')}</h1>
    <section className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-4" aria-label={t('reports.admin_reports_main.filterSectionLabel')}>
      <div className="flex flex-wrap items-center gap-3"><div className="w-52"><AdminAttendanceReportsSearchableDropdown options={options} value={selectedGymId} onChange={(value) => setSelectedGymId(String(value))} placeholder={t('reports.admin_reports_main.text_1ea6687cfe')} testId="admin-reports-scope-branch" /></div><AdminAttendanceReportsDateFilterDropdown /></div>
      <div className="flex flex-wrap gap-2 items-center">
        {EXPORT_FORMAT_OPTIONS.map((option) => <button key={option.value} type="button" onClick={() => { void handleExport(option.value); }} disabled={!ADMIN_ATTENDANCE_REPORTS_EXPORT_AVAILABLE || exportStatus === 'pending' || !isDateRangeValid} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border bg-input px-3 text-sm font-medium text-primary disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid={`admin-reports-export-${option.value}`}>{exportStatus === 'pending' ? <Loader2 size={18} aria-hidden="true" /> : <Download size={18} aria-hidden="true" />}{t(option.value === 'pdf' ? 'reports.admin_reports_main.exportPdf' : 'reports.admin_reports_main.exportCsv')}</button>)}
      </div>
      {!ADMIN_ATTENDANCE_REPORTS_EXPORT_AVAILABLE && <p className="w-full text-sm text-secondary" role="status" aria-live="polite">{t('reports.admin_reports_main.exportContractBlocked')}</p>}
    </section>
    {!isDateRangeValid && <p role="alert" className="rounded-lg border border-border bg-warning-bg p-3 text-warning">{t('reports.admin_reports_main.dateRangeInvalid')}</p>}
    <section aria-label={t('reports.admin_reports_main.dataSectionLabel')}><AdminAttendanceReportsTable /></section>
  </main>;
}
