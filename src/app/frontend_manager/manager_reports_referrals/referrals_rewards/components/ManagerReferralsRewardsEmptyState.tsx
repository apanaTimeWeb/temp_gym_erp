// RESPONSIBILITY: Renders the Manager Referrals entity-specific empty state for the referrals list.
'use client';
import { Gift } from 'lucide-react';
import { useTranslations } from 'next-intl';

import ManagerEmptyState from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/components/ManagerReferralsRewardsLocalEmptyState';

/** @description Empty-state presentation for the Manager Referrals list when no referral records are returned. */
/**
 * @description Renders ManagerReferralsRewardsEmptyState, the manager referrals UI responsibility owned by this module.
 * @dependencies Consumes module-owned hooks/state and approved zero-business UI primitives; no business behavior is delegated to global components.
 * @edge-case Handles the documented loading, empty, error, disabled, keyboard, responsive, and recovery states without introducing cross-feature ownership.
 */
export default function ManagerReferralsRewardsEmptyState() {
  const t = useTranslations('MANAGER_REFERRALS_REWARDS');
  return <ManagerEmptyState dataTestId="manager_referrals-referrals-empty-state" icon={<Gift size={18} strokeWidth={2} />} title={t('COPY_NO_REFERRALS_FOUND')} subtitle={t('COPY_NO_REFERRALS_MATCH_CURRENT_FILTER_TRY_CHANGING_STATUS_FILTER')} />;
}
