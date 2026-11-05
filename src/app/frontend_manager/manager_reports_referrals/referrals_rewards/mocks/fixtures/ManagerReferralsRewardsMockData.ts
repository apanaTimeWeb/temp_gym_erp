import { MANAGER_REFERRALS_REWARDS_STATUS_VALUES } from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/constants/manager_referrals_rewards.constants';
import { MANAGER_REFERRAL_REWARD_STATUS_CLAIMED, MANAGER_REFERRAL_REWARD_STATUS_PENDING } from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/constants/manager_referrals_rewards.constants';
import type { ManagerReferral, ManagerReferralsRewardsKPIs } from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/types/manager_referrals_rewards.types';
/**
 * @description Provides the ManagerReferralsRewardsMockData implementation for the referrals module.
 * @dependencies @/app/frontend_manager/manager_reports_referrals/manager_referrals_types/ManagerReferralsRewardsTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const MOCK_REFERRALS: ManagerReferral[] = [
  {
    id: 'ref-101',
    referrerName: 'Arjun Sharma',
    referrerId: 'M001',
    refereeName: 'Vikram Singh',
    refereePhone: '9876543210',
    dateReferred: '2025-06-01',
    status: MANAGER_REFERRALS_REWARDS_STATUS_VALUES.JOINED,
    rewardStatus: MANAGER_REFERRAL_REWARD_STATUS_PENDING,
    rewardAmount: 50000,
    rewardType: 'CASH' },
  {
    id: 'ref-102',
    referrerName: 'Priya Mehta',
    referrerId: 'M002',
    refereeName: 'Anjali Verma',
    refereePhone: '9876543211',
    dateReferred: '2025-06-03',
    status: MANAGER_REFERRALS_REWARDS_STATUS_VALUES.JOINED,
    rewardStatus: MANAGER_REFERRAL_REWARD_STATUS_CLAIMED,
    rewardAmount: 50000,
    rewardType: 'CASH' },
  {
    id: 'ref-103',
    referrerName: 'Rahul Verma',
    referrerId: 'M003',
    refereeName: 'Karan Joshi',
    refereePhone: '9876543212',
    dateReferred: '2025-06-05',
    status: MANAGER_REFERRALS_REWARDS_STATUS_VALUES.PENDING,
    rewardStatus: 'N/A',
    rewardAmount: 50000,
    rewardType: 'CASH' },
  {
    id: 'ref-104',
    referrerName: 'Sneha Patil',
    referrerId: 'M004',
    refereeName: 'Ravi Kumar',
    refereePhone: '9876543213',
    dateReferred: '2025-06-07',
    status: MANAGER_REFERRALS_REWARDS_STATUS_VALUES.REJECTED,
    rewardStatus: 'N/A',
    rewardAmount: 50000,
    rewardType: 'CASH' },
  {
    id: 'ref-105',
    referrerName: 'Neha Singh',
    referrerId: 'M007',
    refereeName: 'Pooja Nair',
    refereePhone: '9876543218',
    dateReferred: '2025-06-10',
    status: MANAGER_REFERRALS_REWARDS_STATUS_VALUES.JOINED,
    rewardStatus: MANAGER_REFERRAL_REWARD_STATUS_PENDING,
    rewardAmount: 100000, // Special promo
    rewardType: 'DISCOUNT' }
];

export const MOCK_REFERRALS_KPIS: ManagerReferralsRewardsKPIs = {
  totalReferrals: MOCK_REFERRALS.length,
  totalConverted: MOCK_REFERRALS.filter((ref) => ref.status === MANAGER_REFERRALS_REWARDS_STATUS_VALUES.JOINED).length,
  pendingRewards: MOCK_REFERRALS.filter((ref) => ref.rewardStatus === MANAGER_REFERRAL_REWARD_STATUS_PENDING).length,
  claimedRewards: MOCK_REFERRALS.filter((ref) => ref.rewardStatus === MANAGER_REFERRAL_REWARD_STATUS_CLAIMED).length,
  conversionRate: MOCK_REFERRALS.length ? (MOCK_REFERRALS.filter((ref) => ref.status === MANAGER_REFERRALS_REWARDS_STATUS_VALUES.JOINED).length / MOCK_REFERRALS.length) * 100 : 0,
  totalRewardsPaidOut: MOCK_REFERRALS.filter((ref) => ref.rewardStatus === MANAGER_REFERRAL_REWARD_STATUS_CLAIMED).reduce((sum, ref) => sum + ref.rewardAmount, 0) };
