/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminBillingPlansSchema owned by the superadmin_billing_plans feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: zod
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import { z } from 'zod';
export const planFormSchema = z.object({
    name: z.string().trim().min(1, 'validation.planNameRequired'),
    priceMonthly: z.coerce.number().finite('validation.finiteNumber').min(0, 'validation.nonNegative'),
    priceAnnual: z.coerce.number().finite('validation.finiteNumber').min(0, 'validation.nonNegative'),
    maxMembers: z.coerce.number().finite('validation.finiteNumber').min(1, 'validation.positiveInteger'),
    maxStaff: z.coerce.number().finite('validation.finiteNumber').min(1, 'validation.positiveInteger'),
    dbLimitGb: z.coerce.number().finite('validation.finiteNumber').min(0, 'validation.nonNegative'),
    binaryLimitGb: z.coerce.number().finite('validation.finiteNumber').min(0, 'validation.nonNegative'),
    features: z.array(z.object({ value: z.string().trim().min(1, 'validation.featureRequired') })).min(1, 'validation.oneFeatureRequired'),
});
