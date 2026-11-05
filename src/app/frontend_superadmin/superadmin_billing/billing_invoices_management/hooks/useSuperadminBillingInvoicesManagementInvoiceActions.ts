'use client';

// DATA FLOW: Inputs enter useSuperadminBillingInvoicesManagementInvoiceActions, flow through its feature-owned state/API dependencies, and return typed UI state/actions to the owning Superadmin feature.
// RESPONSIBILITY: Owns invoice export/download/email actions for Superadmin invoice surfaces.


import { useRef } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { invoicesApi } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/api/superadmin_billing_invoices_management.api';
import { SUPERADMIN_BILLING_INVOICES_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/api/superadmin_billing_invoices_management.query_keys';
import { createSuperadminBillingInvoicesManagementFormApiError } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/utils/SuperadminBillingInvoicesManagementFormApiErrors';

/**
 * Purpose: Encapsulates asynchronous invoice actions so table/header views remain presentation-focused.
 * Inputs: invoice identifier or optional export parameters.
 * Output: feature action functions and pending flags.
 * Side effects: validates API responses, opens approved URLs, invalidates queries, and owns localized action feedback.
 * Invariant: invoice components do not import the API service directly.
 */
/**
 * @description Manages invoices state, queries, and UI interactions for useSuperadminBillingInvoicesManagementInvoiceActions.
 * @dependencies Consumes only owning-module state/API contracts and approved global infrastructure.
 * @edge-case Preserves loading, error, cancellation, retry, and repeated-action behavior.
 */
// DATA FLOW: Module API/query/store state → useSuperadminBillingInvoicesManagementInvoiceActions → consuming feature component.
export class SuperadminBillingInvoicesDomainActionError extends Error {
  constructor(message: string) { super(message); this.name = 'SuperadminBillingInvoicesDomainActionError'; }
}

/**
 * @description Coordinates the use Superadmin invoices invoice actions concern within its owning Superadmin feature.
 * @dependencies Uses the typed arguments and module-local API, query-key, schema, and utility imports declared in this file; it must not depend on sibling business modules.
 * @edge-case Keep null or empty inputs safe, preserve pending/error/retry/cancellation behavior where applicable, and avoid stale or duplicate mutation effects.
 */
export function useSuperadminBillingInvoicesManagementInvoiceActions() {
  const queryClient = useQueryClient();
  const t = useTranslations('superadmin_billing_invoices');
  const resendKeysRef = useRef(new Map<string, string>());
  const exportMutation = useMutation({
    mutationFn: (params?: Record<string, string>) => invoicesApi.exportInvoiceReport(params),
  });
  const downloadMutation = useMutation({
    mutationFn: (id: string) => invoicesApi.fetchInvoiceDownloadUrl(id),
  });
  const resendMutation = useMutation({
    mutationFn: async ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => {
      const response = await invoicesApi.resendInvoiceEmail(id, idempotencyKey);
      if (!response.success) throw new SuperadminBillingInvoicesDomainActionError(response.message);
      return response;
    },
    onSuccess: async (response, variables) => {
      resendKeysRef.current.delete(variables.id);
      await queryClient.invalidateQueries({ queryKey: SUPERADMIN_BILLING_INVOICES_QUERY_KEYS.all });
      toast.success(response.message, { id: `resend-${variables.id}` });
    },
  });
  const safeActionErrorMessage = (error: unknown, fallback: string): string => {
    if (error instanceof SuperadminBillingInvoicesDomainActionError && error.message.trim()) return error.message;
    if (error instanceof Error && error.name === 'SuperadminBillingInvoicesManagementFormApiError' && error.message.trim()) return error.message;
    return fallback;
  };
  const exportInvoices = async (params?: Record<string, string>) => {
    try {
      const response = await exportMutation.mutateAsync(params);
      if (!response.success || !response.data?.downloadUrl) throw createSuperadminBillingInvoicesManagementFormApiError(response);
      const downloadUrl = new URL(response.data.downloadUrl, window.location.origin);
      if (downloadUrl.protocol !== 'https:' && downloadUrl.protocol !== 'http:') throw new Error('invalid download URL');
      window.open(downloadUrl.toString(), '_blank', 'noopener,noreferrer');
      toast.success(response.message, { id: 'invoice-export' });
      return response;
    } catch (error: unknown) {
      toast.error(safeActionErrorMessage(error, t('ui.invoice_export_error_retry_7c4e1b8d')), { id: 'invoice-export' });
      return null;
    }
  };
  const downloadInvoice = async (id: string) => {
    try {
      const response = await downloadMutation.mutateAsync(id);
      if (!response.success || !response.data?.downloadUrl) throw createSuperadminBillingInvoicesManagementFormApiError(response);
      const downloadUrl = new URL(response.data.downloadUrl, window.location.origin);
      if (downloadUrl.protocol !== 'https:' && downloadUrl.protocol !== 'http:') throw new Error('invalid download URL');
      window.open(downloadUrl.toString(), '_blank', 'noopener,noreferrer');
      toast.success(response.message, { id: `dl-${id}` });
      return response;
    } catch (error: unknown) {
      toast.error(safeActionErrorMessage(error, t('ui.invoice_download_error_retry_1c4a8e2d')), { id: `dl-${id}` });
      return null;
    }
  };
  const resendInvoice = async (id: string) => {
    try {
      return await resendMutation.mutateAsync({ id, idempotencyKey: resendKeysRef.current.get(id) ?? (resendKeysRef.current.set(id, crypto.randomUUID()).get(id) as string) });
    } catch (error: unknown) {
      toast.error(safeActionErrorMessage(error, t('ui.invoice_email_error_retry_4e5d7b3a')), { id: `resend-${id}` });
      return null;
    }
  };
  return {
    exportInvoices,
    downloadInvoice,
    resendInvoice,
    isExporting: exportMutation.isPending,
    isDownloading: downloadMutation.isPending,
    isResending: resendMutation.isPending,
  };
}
