"use client";
// RESPONSIBILITY: Owns Admin Reports export transport and download behavior.
// DATA FLOW: Report export action → mutation hook → AdminAttendanceReportsApi → browser download/cache refresh → report UI.

import { useMutation } from '@tanstack/react-query';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { AdminAttendanceReportsBinaryExportContractError, AdminAttendanceReportsApi } from '@/app/frontend_admin/admin_attendance/attendance_reports/api/admin_attendance_reports_api';
import type { AdminAttendanceReportsExportParams } from '@/app/frontend_admin/admin_attendance/attendance_reports/types/AdminAttendanceReportsTypes';
import { adminToast } from '@/app/frontend_admin/admin_attendance/attendance_reports/components/feedback/AdminAttendanceReportsToastService';

/** @description useAdminAttendanceReportsMutations: Owns Admin Reports export transport and download behavior. @dependencies Consumes AdminAttendanceReportsApi, AdminAttendanceReportsQueryKeys, AdminAttendanceReportsTypes. @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation. @returns The hook’s typed data, state, actions, and recovery handlers. */
export function useAdminAttendanceReportsMutations() {
  const t = useTranslations();
  const downloadInFlight = useRef(false);
  const exportMutation = useMutation({
    mutationFn: (params: AdminAttendanceReportsExportParams) => AdminAttendanceReportsApi.exportReport(params),
    onError: (error) => {
      const message = error instanceof AdminAttendanceReportsBinaryExportContractError
        ? t('reports.admin_reports_main.exportContractBlocked')
        : t('reports.admin_reports_main.exportError');
      adminToast.error(message, 'admin-reports-export-error');
    },
  });
  const exportReport = async (params: AdminAttendanceReportsExportParams): Promise<void> => {
    if (downloadInFlight.current) return;
    downloadInFlight.current = true;
    try {
      // Transport failures already trigger the mutation's localized onError handler.
      let blob: Blob;
      try {
        blob = await exportMutation.mutateAsync(params);
      } catch {
        return;
      }
      let url: string | null = null;
      let anchor: HTMLAnchorElement | null = null;
      try {
        url = URL.createObjectURL(blob);
        anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = `admin-${params.type}.${params.format}`;
        document.body.appendChild(anchor);
        anchor.click();
      } catch {
        adminToast.error(t('reports.admin_reports_main.exportError'), 'admin-reports-export-error');
      } finally {
        anchor?.remove();
        if (url) URL.revokeObjectURL(url);
      }
    } finally {
      downloadInFlight.current = false;
    }
  };
  return { exportMutation, exportReport };
}
