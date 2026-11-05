import { superadminInvoicesManagementApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/api/superadmin_billing_invoices_management_api_fetch.api';
import { SUPERADMIN_BILLING_INVOICES_MANAGEMENT_API } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/config/superadmin_billing_invoices_management.url_config';
import { SuperadminBillingInvoicesV1DataSchema } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/schemas/superadmin_billing_invoices_management_v1_contract.schemas';

import type { SuperadminBillingInvoicesV1Data } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/types/superadmin_billing_invoices_management_v1.types';
import type { ApiResponse } from '@/lib/api';


export async function fetchInvoiceRecoveryCenter(): Promise<ApiResponse<SuperadminBillingInvoicesV1Data>> {
    return apiFetch<SuperadminBillingInvoicesV1Data>(SUPERADMIN_BILLING_INVOICES_MANAGEMENT_API.RECOVERY_CENTER.BACKEND_API.BASE, { dataSchema: SuperadminBillingInvoicesV1DataSchema });
}
