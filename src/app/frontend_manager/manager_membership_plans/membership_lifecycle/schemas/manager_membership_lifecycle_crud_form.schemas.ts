import { z } from 'zod';

/**
 * @description Validates the manager plan CRUD form before create/update requests.
 * @dependencies Zod only.
 * @edge-case Rejects negative pricing and empty plan identity while allowing a newline-separated feature list.
 */
export const managerPlansCrudFormSchema = z.object({
  name: z.string().trim().min(1).max(120),
  tier: z.string().trim().min(1).max(50),
  price1Month: z.coerce.number().nonnegative(),
  price3Month: z.coerce.number().nonnegative(),
  price6Month: z.coerce.number().nonnegative(),
  price12Month: z.coerce.number().nonnegative(),
  priceCustom: z.coerce.number().nonnegative().optional().default(0),
  joiningFee: z.coerce.number().nonnegative().optional().default(0),
  taxRate: z.coerce.number().min(0).max(100).optional().default(0),
  ptSessionsIncluded: z.coerce.number().int().nonnegative().optional().default(0),
  freezeAllowed: z.boolean().optional().default(true),
  featuresText: z.string().max(1000).default(''),
  isActive: z.boolean()
});
export type ManagerMembershipLifecycleCrudFormInput = z.input<typeof managerPlansCrudFormSchema>;
export type ManagerMembershipLifecycleCrudFormOutput = z.output<typeof managerPlansCrudFormSchema>;
