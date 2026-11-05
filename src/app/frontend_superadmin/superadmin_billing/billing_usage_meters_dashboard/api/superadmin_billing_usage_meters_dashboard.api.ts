import { z } from 'zod';

import { superadminUsageMetersDashboardApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_billing/billing_usage_meters_dashboard/api/superadmin_billing_usage_meters_dashboard_api_fetch.api';
import { SUPERADMIN_BILLING_USAGE_METERS_DASHBOARD_API } from '@/app/frontend_superadmin/superadmin_billing/billing_usage_meters_dashboard/config/superadmin_billing_usage_meters_dashboard.url_config';
import { UsageMeterSchema } from '@/app/frontend_superadmin/superadmin_billing/billing_usage_meters_dashboard/schemas/superadmin_billing_usage_meters_dashboard_contract.schemas';

import type { UsageMeter } from '@/app/frontend_superadmin/superadmin_billing/billing_usage_meters_dashboard/types/superadmin_billing_usage_meters_dashboard.types';


/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminBillingUsageMetersApi owned by the superadmin_billing_usage_meters feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: zod, @/app/frontend_superadmin/superadmin_billing/billing_usage_meters_dashboard/schemas/superadmin_billing_usage_meters_dashboard_contract.schemas, @/app/frontend_superadmin/superadmin_billing/billing_usage_meters_dashboard/api/superadmin_billing_usage_meters_dashboard_api_fetch.api, @/app/frontend_superadmin/superadmin_billing/billing_usage_meters_dashboard/config/superadmin_billing_usage_meters_dashboard.url_config, @/app/frontend_superadmin/superadmin_billing/billing_usage_meters_dashboard/types/superadmin_billing_usage_meters_dashboard.types, @/lib/api
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Encapsulates functionality for superadmin_billing_usage_meters_api.ts


export const usageMetersApi = {
    fetchUsageMeters: (params?: Record<string, string>) => {
        const q = params ? '?' + new URLSearchParams(params).toString() : '';
        return apiFetch<UsageMeter[]>(`${SUPERADMIN_BILLING_USAGE_METERS_DASHBOARD_API.BASE}${q}`, { dataSchema: z.array(UsageMeterSchema) });
    },
};
