import type { z } from 'zod';

import type { managerPlansActivateSchema, managerPlansFreezeSchema, managerPlansRenewSchema } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/schemas/manager_membership_lifecycle_membership_forms.schemas';


export type ManagerMembershipLifecycleActivateForm = z.infer<typeof managerPlansActivateSchema>;
export type ManagerMembershipLifecycleRenewForm = z.infer<typeof managerPlansRenewSchema>;
export type ManagerMembershipLifecycleFreezeForm = z.infer<typeof managerPlansFreezeSchema>;
