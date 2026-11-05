// RESPONSIBILITY: Renders ManagerReferralsRewardsMain's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';

import ManagerReferralsRewardsAddModal from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/components/ManagerReferralsRewardsAddModal';
import ManagerReferralsRewardsKPIs from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/components/ManagerReferralsRewardsKPIs';
import ManagerReferralsRewardsTable from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/components/ManagerReferralsRewardsTable';
import { useManagerReferralsRewardsStore } from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/state/useManagerReferralsRewardsStore';


/** @description Renders the ManagerReferralsRewardsMain component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (4 documented module/import dependencies).. @edge-case Preserves modal lifecycle. */
export default function ManagerReferralsRewardsMain() {
  const t = useTranslations('MANAGER_REFERRALS_REWARDS');

  const setIsAddModalOpen = useManagerReferralsRewardsStore((s) => s.setIsAddModalOpen);

  return (
    <div className="min-h-full pb-10 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-300">
      {/* Header */}
      <div className="px-6 pt-6 pb-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">{t("COPY_REFERRALS_REWARDS")}</h1>
          <p className="text-sm text-text-secondary mt-0.5">{t("COPY_TRACK_MEMBER_WORD_MOUTH_ACQUISITIONS_MANAGE_INCENTIVES")}</p>
        </div>
        <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg text-sm font-bold hover:bg-primary-hover motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-1 focus-visible:ring-offset-page motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_referrals-manager-referrals-main-button-add-referral"
          onClick={() => setIsAddModalOpen(true)}
          
         type="button">
          <Plus size={18} strokeWidth={2}/>{t("COPY_LOG_NEW_REFERRAL_2")}</button>
      </div>

      <div className="p-6 space-y-6">
        <ManagerReferralsRewardsKPIs />
        <ManagerReferralsRewardsTable />
      </div>

      <ManagerReferralsRewardsAddModal />
    </div>
  );
}
