"use client";
// RESPONSIBILITY: Owns the Admin Audit Logs export mutation and binary-download lifecycle.
// DATA FLOW: Audit export action → mutation hook → AdminAuditLogsApi → browser download/cache refresh → user feedback.

import { format } from 'date-fns';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { AdminAuditLogsApi, AdminSecurityAuditLogsExplorerBinaryExportContractError } from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/api/admin_security_audit_logs_explorer_api';
import type { AuditLogExportFilters } from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/types/AdminSecurityAuditLogsExplorerTypes';
import { adminToast } from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/components/feedback/AdminSecurityAuditLogsExplorerToastService';
import { downloadAdminSecurityAuditLogsExplorerCsv } from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/utils/AdminSecurityAuditLogsExplorerDownloadCsv';

/** @description useAdminAuditLogsMutations: Owns the Admin Audit Logs export mutation and binary-download lifecycle. @dependencies Consumes AdminAuditLogsApi, AdminAuditLogsQueryKeys, AdminNavigationLayoutToastService, AdminNavigationLayoutBackendMessage. @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation. @returns The hook’s typed data, state, actions, and recovery handlers. */
export function useAdminAuditLogsMutations() {
  const t = useTranslations();
  const exportMutation = useMutation({
    mutationFn: (params: AuditLogExportFilters) => AdminAuditLogsApi.exportAuditLogs(params),
    onSuccess: (blob) => {
      try {
        downloadAdminSecurityAuditLogsExplorerCsv(blob, `audit_logs_${format(new Date(), 'yyyy-MM-dd')}.csv`);
        adminToast.success(t('audit_logs.admin_audit_logs_toolbar.exportSuccess'), 'admin-audit-export-success');
      } catch {
        // Browser download errors must not leak transport details or produce a false success toast.
        adminToast.error(t('audit_logs.admin_audit_logs_toolbar.exportError'), 'admin-audit-export-error');
      }
    },
    onError: (error) => {
      if (error instanceof AdminSecurityAuditLogsExplorerBinaryExportContractError) {
        adminToast.error(t('audit_logs.admin_audit_logs_toolbar.exportContractBlocked'), 'admin-audit-export-contract-blocked');
        return;
      }
      // Keep transport/server diagnostic text out of admin-facing toasts.
      const message = t('audit_logs.admin_audit_logs_toolbar.exportError');
      adminToast.error(message, 'admin-audit-export-error');
    },
  });
  return { exportMutation };
}
