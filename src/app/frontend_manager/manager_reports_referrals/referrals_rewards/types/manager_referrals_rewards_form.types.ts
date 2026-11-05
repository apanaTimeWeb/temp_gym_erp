import type { z } from 'zod';

import type { managerReferralFormSchema } from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/schemas/manager_referrals_rewards_form.schemas';

export type ManagerReferralFormValues = z.infer<typeof managerReferralFormSchema>;
/**
 * @description Provides the ManagerReferralsRewardsFormTypes implementation for the referrals module.
 * @dependencies @/app/frontend_manager/manager_reports_referrals/manager_referrals_schemas/ManagerReferralsRewardsFormSchema
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
