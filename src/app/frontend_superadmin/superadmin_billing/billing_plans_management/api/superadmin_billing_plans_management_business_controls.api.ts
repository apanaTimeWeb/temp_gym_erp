import { apiFetch } from '@/lib/api';

import { SUPERADMIN_BILLING_PLANS_MANAGEMENT_API } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/config/superadmin_billing_plans_management.url_config';
import { SuperadminBillingPlansV1DataSchema } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/schemas/superadmin_billing_plans_management_v1_contract.schemas';

import type { SuperadminBillingPlansV1Data } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/types/superadmin_billing_plans_management_v1.types';
import type { ApiResponse } from '@/lib/api';

export async function fetchPlansBusinessControls(): Promise<ApiResponse<SuperadminBillingPlansV1Data>> {
    return apiFetch<SuperadminBillingPlansV1Data>(SUPERADMIN_BILLING_PLANS_MANAGEMENT_API.BUSINESS_CONTROLS.BACKEND_API.BASE, { dataSchema: SuperadminBillingPlansV1DataSchema });
}
