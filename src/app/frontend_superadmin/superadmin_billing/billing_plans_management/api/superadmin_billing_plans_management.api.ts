import { z } from 'zod';

import { apiFetch } from '@/lib/api';

/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminBillingPlansApi owned by the superadmin_billing_plans feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: zod, @/app/frontend_superadmin/superadmin_billing/billing_plans_management/schemas/superadmin_billing_plans_management_contract.schemas, @/app/frontend_superadmin/superadmin_billing/billing_plans_management/schemas/superadmin_billing_plans_management_api.schemas, @/lib/api, @/app/frontend_superadmin/superadmin_billing/billing_plans_management/config/superadmin_billing_plans_management.url_config, @/app/frontend_superadmin/superadmin_billing/billing_plans_management/types/superadmin_billing_plans_management.types
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Modularized API client for the Plans module. All methods import apiFetch from src/lib/api.ts and define only superadmin-scoped endpoints. No UI logic.
import { SUPERADMIN_BILLING_PLANS_MANAGEMENT_API } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/config/superadmin_billing_plans_management.url_config';
import { SuperadminBillingPlansEmptyResponseSchema } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/schemas/superadmin_billing_plans_management_api.schemas';
import { SubscriptionPlanSchema } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/schemas/superadmin_billing_plans_management_contract.schemas';

import type { SubscriptionPlan, CreatePlanPayload, UpdatePlanPayload } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/types/superadmin_billing_plans_management.types';

export const plansApi = {
    fetchPlans: (params?: Record<string, string>) => {
        const q = params ? '?' + new URLSearchParams(params).toString() : '';
        return apiFetch<SubscriptionPlan[]>(`${SUPERADMIN_BILLING_PLANS_MANAGEMENT_API.BASE}${q}`, { dataSchema: z.array(SubscriptionPlanSchema) });
    },
    fetchPlanById: (id: string) => apiFetch<SubscriptionPlan>(SUPERADMIN_BILLING_PLANS_MANAGEMENT_API.BY_ID(id), { dataSchema: SubscriptionPlanSchema }),
    createPlan: (body: CreatePlanPayload, idempotencyKey: string) => apiFetch<SubscriptionPlan>(SUPERADMIN_BILLING_PLANS_MANAGEMENT_API.BASE, { method: 'POST', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: SubscriptionPlanSchema
    }),
    updatePlan: (id: string, body: UpdatePlanPayload, idempotencyKey: string) => apiFetch<SubscriptionPlan>(SUPERADMIN_BILLING_PLANS_MANAGEMENT_API.BY_ID(id), { method: 'PATCH', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: SubscriptionPlanSchema
    }),
    deletePlan: (id: string, idempotencyKey: string) => apiFetch<void>(SUPERADMIN_BILLING_PLANS_MANAGEMENT_API.BY_ID(id), { method: 'DELETE', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: SuperadminBillingPlansEmptyResponseSchema
    }),
    archivePlan: (id: string, idempotencyKey: string) => apiFetch<SubscriptionPlan>(SUPERADMIN_BILLING_PLANS_MANAGEMENT_API.ARCHIVE(id), { method: 'PATCH', headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: SubscriptionPlanSchema
    }),
};
