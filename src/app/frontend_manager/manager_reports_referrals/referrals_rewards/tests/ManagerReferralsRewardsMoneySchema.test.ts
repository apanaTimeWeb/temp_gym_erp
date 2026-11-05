import { describe, expect, it } from 'vitest';

import { managerReferralSchema, managerReferralsKpiSchema } from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/schemas/manager_referrals_rewards.schemas';

describe('Referrals API money schemas', () => { it('rejects fractional reward minor units', () => { const referral = { id: 'r1', referrerName: 'A', referrerId: 'm1', refereeName: 'B', refereePhone: '9999999999', dateReferred: '2026-10-01', status: 'JOINED', rewardStatus: 'PENDING', rewardAmount: 5000, rewardType: 'CASH' }; expect(managerReferralSchema.safeParse(referral).success).toBe(true); expect(managerReferralSchema.safeParse({ ...referral, rewardAmount: 5000.2 }).success).toBe(false); expect(managerReferralsKpiSchema.safeParse({ totalReferrals: 1, totalConverted: 1, pendingRewards: 1, claimedRewards: 0, conversionRate: 100, totalRewardsPaidOut: 5000.5 }).success).toBe(false); }); });
