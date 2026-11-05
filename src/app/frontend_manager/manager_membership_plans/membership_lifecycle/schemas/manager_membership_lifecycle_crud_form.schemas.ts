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
  featuresText: z.string().max(1000).default(''),
  isActive: z.boolean()
});
export type ManagerMembershipLifecycleCrudFormInput = z.input<typeof managerPlansCrudFormSchema>;
export type ManagerMembershipLifecycleCrudFormOutput = z.output<typeof managerPlansCrudFormSchema>;
