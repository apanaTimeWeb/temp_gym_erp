"use client";
// RESPONSIBILITY: Owns Admin Reports export transport and download behavior.
// DATA FLOW: Report export action → mutation hook → AdminFinanceProfitAndLossReportApi → browser download/cache refresh → report UI.

import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { AdminFinanceProfitAndLossReportBinaryExportContractError, AdminFinanceProfitAndLossReportApi } from '@/app/frontend_admin/admin_finance/finance_profit_and_loss_report/api/admin_finance_profit_and_loss_report_api';
import type { AdminFinanceProfitAndLossReportExportParams } from '@/app/frontend_admin/admin_finance/finance_profit_and_loss_report/types/AdminFinanceProfitAndLossReportTypes';
import { adminToast } from '@/app/frontend_admin/admin_finance/finance_profit_and_loss_report/components/feedback/AdminFinanceProfitAndLossReportToastService';

/** @description useAdminFinanceProfitAndLossReportMutations: Owns Admin Reports export transport and download behavior. @dependencies Consumes AdminFinanceProfitAndLossReportApi, AdminReportsQueryKeys, AdminReportsTypes. @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation. @returns The hook’s typed data, state, actions, and recovery handlers. */
export function useAdminFinanceProfitAndLossReportMutations() {
  const t = useTranslations();
  const exportMutation = useMutation({
    mutationFn: (params: AdminFinanceProfitAndLossReportExportParams) => AdminFinanceProfitAndLossReportApi.exportReport(params),
    onError: (error) => {
      const message = error instanceof AdminFinanceProfitAndLossReportBinaryExportContractError
        ? t('reports.admin_reports_main.exportContractBlocked')
        : t('reports.admin_reports_main.exportError');
      adminToast.error(message, 'admin-reports-export-error');
    },
  });
  const exportReport = async (params: AdminFinanceProfitAndLossReportExportParams): Promise<void> => {
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
