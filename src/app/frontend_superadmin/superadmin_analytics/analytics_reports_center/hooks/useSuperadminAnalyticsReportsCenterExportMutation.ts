'use client';
import { useRef } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations as useFeedbackTranslations } from 'next-intl';
import { toast } from 'sonner';

import { superadminReportsExportApi } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/api/superadmin_analytics_reports_center_export.api';
import { SUPERADMIN_ANALYTICS_REPORTS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/api/superadmin_analytics_reports_center.query_keys';
import { resolveSuperadminAnalyticsReportsCenterFeedback } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/utils/SuperadminAnalyticsReportsCenterFeedback';


// DATA FLOW: Reports export control → mutation → feature export API → success/error toast.
// RESPONSIBILITY: Owns export-request lifecycle and idempotency for the Reports feature.


/**
 * @description Starts the documented Reports export request and exposes its pending state to the action control.
 * @dependencies Uses the feature export API and TanStack Query mutation lifecycle.
 * @edge-case The key is created when the export intent starts, reused across retries, and cleared only after a successful authoritative response.
 */
export function useSuperadminAnalyticsReportsCenterExportMutation() {
 const feedback = useFeedbackTranslations('superadmin_analytics_reports');

  const queryClient = useQueryClient();
  const idempotencyKeyRef = useRef<string | null>(null);
  const mutation = useMutation({
    mutationFn: async (idempotencyKey: string) => {
      const response = await superadminReportsExportApi.requestExport(idempotencyKey);
      if (!response.success) throw new Error(response.message);
      return response;
    },
    onSuccess: (response) => {
      void queryClient.invalidateQueries({ queryKey: SUPERADMIN_ANALYTICS_REPORTS_QUERY_KEYS.all });
      toast.success(response.message, { id: 'superadmin-reports-export' });
      idempotencyKeyRef.current = null;
    },
    onError: (error: unknown) => {
      toast.error(resolveSuperadminAnalyticsReportsCenterFeedback(error, feedback('errors.unexpected')), { id: 'superadmin-reports-export-error' });
    },
  });
  const requestExport = () => { idempotencyKeyRef.current ??= crypto.randomUUID(); return mutation.mutateAsync(idempotencyKeyRef.current); };
  return { requestExport, isRequesting: mutation.isPending };
}
