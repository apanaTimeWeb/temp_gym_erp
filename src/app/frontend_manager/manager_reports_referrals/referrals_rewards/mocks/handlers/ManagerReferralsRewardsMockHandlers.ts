import { MANAGER_REFERRALS_REWARDS_API } from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/config/manager_referrals_rewards.url_config';
import { http, HttpResponse } from 'msw';

import { MANAGER_HTTP_STATUS } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureHttpStatus';
import { ManagerInfrastructureMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureMockApiUrl';



import { MANAGER_REFERRALS_REWARDS_STATUS_VALUES } from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/constants/manager_referrals_rewards.constants';
import { MANAGER_REFERRAL_REWARD_STATUS_CLAIMED } from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/constants/manager_referrals_rewards.constants';
import { MOCK_REFERRALS, MOCK_REFERRALS_KPIS } from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/mocks/fixtures/ManagerReferralsRewardsMockData';
import type { ManagerReferral, CreateReferralDto } from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/types/manager_referrals_rewards.types';


let mockReferralIdCounter = 1000;
let mockReferrals = [...MOCK_REFERRALS];
const claimedKeys = new Set<string>();
const createKeys = new Map<string, { fingerprint: string; response: ManagerReferral }>();

/**
 * @description Provides the ManagerReferralsRewardsMockHandlers implementation for the referrals module.
 * @dependencies @/app/frontend_manager/manager_infrastructure/manager_infrastructure_constants/ManagerHttpStatus; @/app/frontend_manager/manager_infrastructure/manager_infrastructure_utils/ManagerMockApiUrl; @/app/frontend_manager/manager_reports_referrals/manager_referrals_mocks/manager_referrals_mocks_fixtures/ManagerReferralsRewardsMockData; @/app/frontend_manager/manager_reports_referrals/manager_referrals_url_config; @/app/frontend_manager/manager_reports_referrals/manager_referrals_types/ManagerReferralsRewardsTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export function resetManagerReferralsRewardsMockState(): void {
  mockReferralIdCounter = 1000;
  mockReferrals = [...MOCK_REFERRALS];
  claimedKeys.clear();
  createKeys.clear();
}

export const managerReferralsHandlers = [
  http.get(ManagerInfrastructureMockApiUrl(MANAGER_REFERRALS_REWARDS_API.KPIS), () => {
    return HttpResponse.json({
      success: true,
      message: 'KPIs fetched',
      data: { ...MOCK_REFERRALS_KPIS, totalReferrals: mockReferrals.length, totalConverted: mockReferrals.filter((item) => item.status === 'JOINED').length, pendingRewards: mockReferrals.filter((item) => item.rewardStatus === 'PENDING').length, claimedRewards: mockReferrals.filter((item) => item.rewardStatus === 'CLAIMED').length, totalRewardsPaidOut: mockReferrals.filter((item) => item.rewardStatus === 'CLAIMED').reduce((sum, item) => sum + item.rewardAmount, 0) }, requestId: 'mock-referrals-kpis'
    });
  }),

  http.get(ManagerInfrastructureMockApiUrl(MANAGER_REFERRALS_REWARDS_API.BASE), ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') || '1');
    const limit = Number(url.searchParams.get('limit') || '10');
    const search = (url.searchParams.get('search') || '').toLowerCase();
    const status = url.searchParams.get('status') || '';
    const filtered = mockReferrals.filter((ref) => {
      const matchesSearch = !search || `${ref.referrerName} ${ref.refereeName}`.toLowerCase().includes(search);
      const matchesStatus = !status || ref.status === status;
      return matchesSearch && matchesStatus;
    });
    const start = (page - 1) * limit;
    return HttpResponse.json({
      success: true,
      message: 'Referrals fetched',
      data: filtered.slice(start, start + limit),
      meta: { page, limit, total: filtered.length, totalPages: Math.max(1, Math.ceil(filtered.length / limit)) }
    });
  }),

  http.post(ManagerInfrastructureMockApiUrl(MANAGER_REFERRALS_REWARDS_API.BASE), async ({ request }) => {
    const dto = await request.json() as CreateReferralDto;
    const key = request.headers.get('Idempotency-Key');
    if (!key) return HttpResponse.json({ success: false, message: 'Idempotency-Key is required', data: null, errorCode: 'IDEMPOTENCY_KEY_REQUIRED', statusCode: 400, requestId: 'mock-referral-key-required' }, { status: 400 });
    const fingerprint = JSON.stringify(dto);
    const previous = createKeys.get(key);
    if (previous) return previous.fingerprint === fingerprint ? HttpResponse.json({ success: true, message: 'Referral already created', data: previous.response, requestId: `mock-referral-replay-${previous.response.id}` }) : HttpResponse.json({ success: false, message: 'Idempotency key payload conflict', data: null, errorCode: 'IDEMPOTENCY_CONFLICT', statusCode: 409, requestId: 'mock-referral-conflict' }, { status: 409 });
    const newRef: ManagerReferral = {
      id: `ref-${mockReferralIdCounter++}`,
      referrerName: dto.referrerName,
      referrerId: dto.referrerId,
      refereeName: dto.refereeName,
      refereePhone: dto.refereePhone,
      dateReferred: new Date().toISOString().split('T')[0] || '',
      status: MANAGER_REFERRALS_REWARDS_STATUS_VALUES.PENDING,
      rewardStatus: 'N/A',
      rewardAmount: 50000,
      rewardType: 'CASH' };
    mockReferrals = [newRef, ...mockReferrals];
    createKeys.set(key, { fingerprint, response: newRef });
    return HttpResponse.json({ success: true, message: 'Referral logged successfully!', data: newRef, requestId: `mock-referral-created-${newRef.id}` });
  }),

  http.post(ManagerInfrastructureMockApiUrl(MANAGER_REFERRALS_REWARDS_API.CLAIM(':id')), ({ params, request }) => {
    const { id } = params;
    const idx = mockReferrals.findIndex(r => r.id === id);
    const key = request.headers.get('Idempotency-Key');
    if (!key) return HttpResponse.json({ success: false, message: 'Idempotency-Key is required', data: null, errorCode: 'IDEMPOTENCY_KEY_REQUIRED', statusCode: 400, requestId: 'mock-claim-key-required' }, { status: 400 });
    const claimScope = `${String(id)}:${key}`;
    if (claimedKeys.has(claimScope)) return HttpResponse.json({ success: true, message: 'Reward already claimed', data: idx >= 0 ? mockReferrals[idx] : null, requestId: `mock-claim-replay-${String(id)}` });
    if (idx === -1) {
      return HttpResponse.json({ success: false, message: 'Referral not found', data: null, errorCode: 'NOT_FOUND', statusCode: MANAGER_HTTP_STATUS.NOT_FOUND, requestId: 'mock-referral-not-found' }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
    }
    
    if (mockReferrals[idx]!.status !== 'JOINED' || mockReferrals[idx]!.rewardStatus !== 'PENDING') return HttpResponse.json({ success: false, message: 'Referral is not eligible for reward claim', data: null, errorCode: 'REWARD_NOT_ELIGIBLE', statusCode: 409, requestId: 'mock-claim-ineligible' }, { status: 409 });
    claimedKeys.add(claimScope);
    mockReferrals[idx] = { ...mockReferrals[idx]!, rewardStatus: MANAGER_REFERRAL_REWARD_STATUS_CLAIMED } as ManagerReferral;
    return HttpResponse.json({
      success: true,
      message: 'Reward claimed successfully!',
      data: mockReferrals[idx], requestId: `mock-reward-claimed-${String(id)}`
    });
  })
];
