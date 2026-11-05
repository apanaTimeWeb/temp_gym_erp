/**
 * RESPONSIBILITY: Defines TypeScript domain contracts for the feature.
 * AI BOUNDARY: Types/interfaces only; runtime validation schemas live in the owning _schemas folder.
 */
// RESPONSIBILITY: Defines all TypeScript types and interfaces for the Plans module.
import type { CreatePlanPayloadSchema, UpdatePlanPayloadSchema } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/schemas/superadmin_billing_plans_management_aliases.schemas';
import type { SubscriptionPlanSchema } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/schemas/superadmin_billing_plans_management_contract.schemas';
import type { z } from 'zod';


export type SubscriptionPlan = z.infer<typeof SubscriptionPlanSchema>;
export type CreatePlanPayload = z.infer<typeof CreatePlanPayloadSchema>;
export type UpdatePlanPayload = z.infer<typeof UpdatePlanPayloadSchema>;
