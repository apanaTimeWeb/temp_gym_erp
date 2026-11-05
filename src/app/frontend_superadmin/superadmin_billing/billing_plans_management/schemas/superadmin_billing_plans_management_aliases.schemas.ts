/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminBillingPlansSchemas owned by the superadmin_billing_plans feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_billing/billing_plans_management/schemas/superadmin_billing_plans_management_contract.schemas
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Keeps the existing feature validation contract under the canonical schema boundary for module tests.
import { SubscriptionPlanSchema } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/schemas/superadmin_billing_plans_management_contract.schemas';
export const subscriptionPlanSchema = SubscriptionPlanSchema;
export const CreatePlanPayloadSchema = SubscriptionPlanSchema.omit({ id: true, activeTenants: true, isArchived: true });
export const UpdatePlanPayloadSchema = CreatePlanPayloadSchema.partial();
