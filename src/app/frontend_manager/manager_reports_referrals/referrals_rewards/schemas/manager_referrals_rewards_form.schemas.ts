// RESPONSIBILITY: Defines validation rules for manually logging a referral.
import { z } from 'zod';
/**
 * @description Provides the ManagerReferralsRewardsFormSchema implementation for the referrals module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const managerReferralFormSchema = z.object({ referrerName: z.string().trim().min(2, 'Member name is required'), referrerId: z.string().trim().min(1, 'Member ID is required'), refereeName: z.string().trim().min(2, 'Inquiry name is required'), refereePhone: z.string().trim().regex(/^(\+?91[\s-]?)?[0-9]{10}$/, 'Phone number must be a valid 10-digit number') });
