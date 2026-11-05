// DATA FLOW: Referral create/claim intent → mutation hook → ManagerReferralsRewardsApi → Query invalidation → referral UI.
'use client';
import { useRef } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import { useConfirm } from '@/components/ui/manager_confirm_provider/ManagerConfirmProvider';

import { ManagerInfrastructureIdempotency } from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/utils/ManagerReferralsRewardsLocalIdempotency';
import { ManagerInfrastructureShowErrorToast } from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/utils/ManagerReferralsRewardsLocalShowErrorToast';
import { ManagerInfrastructureShowSuccessToast } from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/utils/ManagerReferralsRewardsLocalShowSuccessToast';

import { ManagerReferralsRewardsApi } from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/api/manager_referrals_rewards.api';
import { ManagerReferralsRewardsQueryKeys } from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/api/manager_referrals_rewards.query_keys';
import type { CreateReferralDto } from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/types/manager_referrals_rewards.types';

/**
 * @description Owns referral creation and reward-claim mutations, confirmation, idempotency lifecycle, and cache reconciliation.
 * @dependencies Uses ManagerReferralsRewardsApi, ManagerReferralsRewardsQueryKeys, confirmation/toast infrastructure, and module translations.
 * @edge-case Reward claim keys persist per referral until the mutation succeeds so a retry reuses the same intent key.
 */
export function useManagerReferralsRewardsMutations() {
  const t = useTranslations('MANAGER_REFERRALS_REWARDS');
  const { confirm } = useConfirm();
  const queryClient = useQueryClient();
  const claimKeyByReferralRef = useRef(new Map<string, string>());
  const createKeyRef = useRef<{ key: string; fingerprint: string } | null>(null);
  const createMutation = useMutation({
    mutationFn: ({ dto, idempotencyKey }: { dto: CreateReferralDto; idempotencyKey: string }) => ManagerReferralsRewardsApi.createReferral(dto, idempotencyKey),
    onSuccess: (res) => {
      ManagerInfrastructureShowSuccessToast(res.message, 'manager-referral-success');
      void queryClient.invalidateQueries({ queryKey: ManagerReferralsRewardsQueryKeys.all });
    },
    onError: (err) => ManagerInfrastructureShowErrorToast(err, 'manager-referrals-error'),
  });
  const claimMutation = useMutation({
    mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => ManagerReferralsRewardsApi.claimReward(id, idempotencyKey),
    onSuccess: (res, variables) => {
      claimKeyByReferralRef.current.delete(variables.id);
      ManagerInfrastructureShowSuccessToast(res.message, `manager-referral-${variables.id}-claim-success`);
      void queryClient.invalidateQueries({ queryKey: ManagerReferralsRewardsQueryKeys.all });
    },
    onError: (err, variables) => ManagerInfrastructureShowErrorToast(err, `manager-referral-${variables.id}-claim-error`),
  });
  const createReferral = async (dto: CreateReferralDto) => { const fingerprint = JSON.stringify(dto); const current = createKeyRef.current; const idempotencyKey = current?.fingerprint === fingerprint ? current.key : ManagerInfrastructureIdempotency(); createKeyRef.current = { key: idempotencyKey, fingerprint }; const response = await createMutation.mutateAsync({ dto, idempotencyKey }); createKeyRef.current = null; return response; };
  const claimReward = async (id: string) => {
    const confirmed = await confirm({ title: t('CONFIRM_REWARD_TITLE'), message: t('CONFIRM_REWARD_MESSAGE'), confirmText: t('CONFIRM_REWARD'), cancelText: t('KEEP'), type: 'warning' });
    if (!confirmed) return;
    const idempotencyKey = claimKeyByReferralRef.current.get(id) ?? ManagerInfrastructureIdempotency();
    claimKeyByReferralRef.current.set(id, idempotencyKey);
    await claimMutation.mutateAsync({ id, idempotencyKey });
  };
  return {
    createReferral,
    isCreating: createMutation.isPending,
    claimReward,
    isClaiming: claimMutation.isPending,
  };
}
