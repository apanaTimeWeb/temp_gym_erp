'use client';
import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { superadminGlobalAuditExportApi } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/api/superadmin_audit_compliance_global_audit_overview_export.api';
import { SUPERADMIN_AUDIT_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/api/superadmin_audit_compliance_global_audit_overview.query_keys';

/** Reuses the intent key across retries; a successful export closes that intent. */
export function useSuperadminAuditComplianceGlobalAuditOverviewExportMutation() {
  const queryClient = useQueryClient();
  const t = useTranslations('superadmin_audit_compliance_global_audit');
  const idempotencyKeyRef = useRef<string | null>(null);
  const mutation = useMutation({
    mutationFn: async () => {
      idempotencyKeyRef.current ??= crypto.randomUUID();
      const response = await superadminGlobalAuditExportApi.requestExport(idempotencyKeyRef.current);
      if (!response.success) throw new Error(response.message);
      idempotencyKeyRef.current = null;
      toast.success(response.message || t('ui.export_request_accepted'), { id: 'superadmin-global-audit-export-accepted' });
      return response;
    },
    onSuccess: async () => { await queryClient.invalidateQueries({ queryKey: SUPERADMIN_AUDIT_QUERY_KEYS.all }); },
  });
  return { requestExport: () => mutation.mutateAsync(), isRequesting: mutation.isPending, error: mutation.error, reset: mutation.reset };
}
