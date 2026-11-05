/**
 * RESPONSIBILITY: Defines TypeScript domain contracts for the feature.
 * AI BOUNDARY: Types/interfaces only; runtime validation schemas live in the owning _schemas folder.
 */
// RESPONSIBILITY: Defines the runtime-validated data contract for Plan Comparison & Pricing Control.
import type { SuperadminBillingPlansV1DataSchema, SuperadminBillingPlansV1ResponseSchema } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/schemas/superadmin_billing_plans_management_v1_contract.schemas';
import type { z } from 'zod';


export type SuperadminBillingPlansV1Data = z.infer<typeof SuperadminBillingPlansV1DataSchema>;
export type SuperadminBillingPlansV1Response = z.infer<typeof SuperadminBillingPlansV1ResponseSchema>;
export interface SuperadminBillingPlansV1SectionProps {
    data: SuperadminBillingPlansV1Data;
}
