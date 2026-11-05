"use client";
// RESPONSIBILITY: Owns Admin Reports export transport and download behavior.
// DATA FLOW: Report export action → mutation hook → AdminSalesMembershipGrowthReportApi → browser download/cache refresh → report UI.

import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { AdminSalesMembershipGrowthReportBinaryExportContractError, AdminSalesMembershipGrowthReportApi } from '@/app/frontend_admin/admin_sales/sales_membership_growth_report/api/admin_sales_membership_growth_report_api';
import type { AdminSalesMembershipGrowthReportExportParams } from '@/app/frontend_admin/admin_sales/sales_membership_growth_report/types/AdminSalesMembershipGrowthReportTypes';
import { adminToast } from '@/app/frontend_admin/admin_sales/sales_membership_growth_report/components/feedback/AdminSalesMembershipGrowthReportToastService';

/** @description useAdminSalesMembershipGrowthReportMutations: Owns Admin Reports export transport and download behavior. @dependencies Consumes AdminSalesMembershipGrowthReportApi, AdminSalesMembershipGrowthReportQueryKeys, AdminSalesMembershipGrowthReportTypes. @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation. @returns The hook’s typed data, state, actions, and recovery handlers. */
export function useAdminSalesMembershipGrowthReportMutations() {
  const t = useTranslations();
  const exportMutation = useMutation({
    mutationFn: (params: AdminSalesMembershipGrowthReportExportParams) => AdminSalesMembershipGrowthReportApi.exportReport(params),
    onError: (error) => {
      const message = error instanceof AdminSalesMembershipGrowthReportBinaryExportContractError
        ? t('reports.admin_reports_main.exportContractBlocked')
        : t('reports.admin_reports_main.exportError');
      adminToast.error(message, 'admin-reports-export-error');
    },
  });
  const exportReport = async (params: AdminSalesMembershipGrowthReportExportParams): Promise<void> => {
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
      // A browser download failure is distinct from the API mutation failure.
      adminToast.error(t('reports.admin_reports_main.exportError'), 'admin-reports-export-error');
    } finally {
      anchor?.remove();
      if (url) URL.revokeObjectURL(url);
    }
  };
  return { exportMutation, exportReport };
}
