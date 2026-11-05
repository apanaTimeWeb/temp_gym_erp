import { z } from 'zod';

import { superadminInvoicesManagementApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/api/superadmin_billing_invoices_management_api_fetch.api';
import { SUPERADMIN_BILLING_INVOICES_MANAGEMENT_API } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/config/superadmin_billing_invoices_management.url_config';
import { SuperadminBillingInvoicesDownloadResponseSchema } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/schemas/superadmin_billing_invoices_management_api.schemas';
import { SuperadminBillingInvoicesTenantSchema, SaaSInvoiceSchema } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/schemas/superadmin_billing_invoices_management_contract.schemas';

import type { CreateManualPaymentDto, SaaSInvoice, SuperadminBillingInvoicesTenant } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/types/superadmin_billing_invoices_management.types';


/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminBillingInvoicesApi owned by the superadmin_billing_invoices feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: zod, @/app/frontend_superadmin/superadmin_billing/billing_invoices_management/schemas/superadmin_billing_invoices_management_api.schemas, @/app/frontend_superadmin/superadmin_billing/billing_invoices_management/schemas/superadmin_billing_invoices_management_contract.schemas, @/app/frontend_superadmin/superadmin_billing/billing_invoices_management/api/superadmin_billing_invoices_management_api_fetch.api, @/app/frontend_superadmin/superadmin_billing/billing_invoices_management/config/superadmin_billing_invoices_management.url_config, @/app/frontend_superadmin/superadmin_billing/billing_invoices_management/types/superadmin_billing_invoices_management.types, @/lib/api
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Encapsulates functionality for superadmin_billing_invoices_api.ts


export const invoicesApi = {
    fetchInvoices: (params?: Record<string, string>) => {
        const q = params ? '?' + new URLSearchParams(params).toString() : '';
        return apiFetch<SaaSInvoice[]>(`${SUPERADMIN_BILLING_INVOICES_MANAGEMENT_API.BASE}${q}`, { dataSchema: z.array(SaaSInvoiceSchema) });
    },
    createManualPayment: (dto: CreateManualPaymentDto, idempotencyKey: string) => apiFetch<SaaSInvoice>(SUPERADMIN_BILLING_INVOICES_MANAGEMENT_API.MANUAL_PAYMENT, {
        method: 'POST',
        body: JSON.stringify(dto),
        headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: SaaSInvoiceSchema
    }),
    fetchInvoiceDownloadUrl: (id: string) => apiFetch<{
        downloadUrl: string;
    }>(SUPERADMIN_BILLING_INVOICES_MANAGEMENT_API.DOWNLOAD(id), { dataSchema: SuperadminBillingInvoicesDownloadResponseSchema }),
    exportInvoiceReport: (params?: Record<string, string>) => {
        const q = params ? '?' + new URLSearchParams(params).toString() : '';
        return apiFetch<{
            downloadUrl: string;
        }>(`${SUPERADMIN_BILLING_INVOICES_MANAGEMENT_API.EXPORT}${q}`, { dataSchema: SuperadminBillingInvoicesDownloadResponseSchema });
    },
    resendInvoiceEmail: (id: string, idempotencyKey: string) => apiFetch<null>(SUPERADMIN_BILLING_INVOICES_MANAGEMENT_API.RESEND(id), {
        method: 'POST',
        dataSchema: z.null(),
        headers: { 'Idempotency-Key': idempotencyKey }
    }),
    fetchTenants: () => {
        // Local tenant lookup to avoid cross-module business imports
        return apiFetch<SuperadminBillingInvoicesTenant[]>(SUPERADMIN_BILLING_INVOICES_MANAGEMENT_API.TENANTS, { dataSchema: z.array(SuperadminBillingInvoicesTenantSchema) });
    },
};
