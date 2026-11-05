// RESPONSIBILITY: Renders ManagerReferralsRewardsTable's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';

import { Search, Check, IndianRupee } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

import ManagerInfrastructureResponsiveTable from '@/app/frontend_manager/manager_infrastructure/components/ManagerInfrastructureResponsiveTable';
import ManagerPagination from '@/components/ui/manager_pagination/ManagerPagination';
import ManagerSearchableDropdown from '@/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown';

import { ManagerEnvConfig } from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/constants/ManagerReferralsRewardsLocalEnvConfig';

import ManagerReferralsRewardsEmptyState from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/components/ManagerReferralsRewardsEmptyState';
import { MANAGER_REFERRAL_STATUS_JOINED, MANAGER_REFERRAL_STATUS_REJECTED, MANAGER_REFERRAL_REWARD_STATUS_PENDING, MANAGER_REFERRAL_REWARD_STATUS_CLAIMED } from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/constants/manager_referrals_rewards.constants';
import { MANAGER_REFERRAL_STATUS_OPTIONS } from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/constants/manager_referrals_rewards_filter.constants';
import { useManagerReferralsRewardsLogic } from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/hooks/useManagerReferralsRewardsLogic';
import { ManagerReferralsRewardsFormatCurrency, ManagerReferralsRewardsMaskSensitiveData, ManagerReferralsRewardsFormatDate, ManagerReferralsRewardsDisplayValue } from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/utils/ManagerReferralsRewardsFormatters';

// Rule 20 FIX: Replaced native <select className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="manager_referrals-manager-referrals-main-control"> with SearchableDropdown.




/** @description Renders the ManagerReferralsRewardsTable component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (8 documented module/import dependencies).. @edge-case Preserves loading state, empty state, error state. */
export default function ManagerReferralsRewardsTable() {
  const t = useTranslations('MANAGER_REFERRALS_REWARDS');
  const locale = useLocale();

  const { 
    referrals, isReferralsLoading, isReferralsError, reloadReferrals, errorMessage, 
    searchQuery, setSearchQuery, 
    statusFilter, setStatusFilter,
    currentPage, setCurrentPage, totalPages,
    claimReward, isClaiming
  } = useManagerReferralsRewardsLogic();

  return (
    <div className="bg-card border border-border rounded-xl flex flex-col min-h-96 shadow-card">
      
      {/* Header & Filters */}
      <div className="p-4 border-b border-border flex flex-col sm:flex-row justify-between gap-4 shrink-0 bg-input">
        <div className="relative w-full sm:w-72">
          <Search size={18} strokeWidth={2} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"/>
          <input className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "min-h-11 w-full pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:duration-200 ease-in-out"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_referrals-manager-referrals-main-input-text"
            type="text"
            placeholder={t("COPY_SEARCH_REFERRER_REFEREE")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            
           aria-label={t("COPY_SEARCH_REFERRER_REFEREE")}/>
        </div>
        
        <div className="w-full sm:w-48">
          <ManagerSearchableDropdown dataTestId="manager_referrals-managerreferralstable-managersearchabledropdown-1"
            value={statusFilter}
            onChange={(val) => setStatusFilter(String(val))}
            options={[...MANAGER_REFERRAL_STATUS_OPTIONS]}
            placeholder={t("COPY_FILTER_STATUS")}
           data-testid="manager_referrals-managerreferralstable-searchable-dropdown-1"/>
        </div>
      </div>

      {/* Table Body */}
      <div className="flex-1 overflow-auto">
        {(() => { if (isReferralsLoading) { return (
          <div role="status" aria-label={t("COPY_LOADING_REFERRALS")} className="p-4 space-y-3 motion-safe:animate-pulse">
            <span className="sr-only">{t("COPY_LOADING_REFERRALS")}</span>
            {[0, 1, 2, 3, 4].map((row) => <div key={row} className="grid grid-cols-3 gap-4 border-b border-border py-4"><span className="h-4 rounded bg-input"/><span className="h-4 rounded bg-input"/><span className="h-4 rounded bg-input"/></div>)}
          </div>
        ); } return (() => { if (isReferralsError) { return (
          <div data-testid="manager_referrals-manager-referrals-main-status" role="alert" className="h-full flex flex-col items-center justify-center gap-3 text-center p-10">
            <p className="text-sm font-semibold text-danger-text">{errorMessage || t("TEXT_GENERIC_ERROR")}</p>
            <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "min-h-11 min-h-11 px-4 py-2 rounded-lg bg-primary text-on-primary text-sm font-semibold motion-safe:transition-all hover:bg-primary-hover motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_referrals-manager-referrals-main-button-action" type="button" onClick={() => void reloadReferrals()} >{t("COPY_TRY_AGAIN_2")}</button>
          </div>
        ); } return (() => { if (referrals.length === 0) { return (
          <ManagerReferralsRewardsEmptyState />
        ); } return (
          <ManagerInfrastructureResponsiveTable labels={[t('COPY_REFERRER_MEMBER'), t('COPY_REFEREE_INQUIRY'), t('COPY_DATE'), t('COPY_INQUIRY_STATUS'), t('COPY_REWARD_STATUS'), t('COPY_ACTION')]}>
<table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="sticky top-0 bg-card border-b border-border text-text-secondary font-semibold text-xs uppercase z-20">
              <tr>
                <th className="sticky left-0 z-20 bg-card px-6 py-4">{t("COPY_REFERRER_MEMBER")}</th>
                <th className="px-6 py-4">{t("COPY_REFEREE_INQUIRY")}</th>
                <th className="px-6 py-4">{t("COPY_DATE")}</th>
                <th className="px-6 py-4">{t("COPY_INQUIRY_STATUS")}</th>
                <th className="px-6 py-4">{t("COPY_REWARD_STATUS")}</th>
                <th className="px-6 py-4 text-right">{t("COPY_ACTION")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {referrals.map((ref, mapIndex) => {
                const canClaim = ref.status === MANAGER_REFERRAL_STATUS_JOINED && ref.rewardStatus === MANAGER_REFERRAL_REWARD_STATUS_PENDING;
                
                return (
                  <tr key={ref.id} className="hover:bg-input motion-safe:transition-all motion-safe:duration-200 ease-in-out">
                    <td className="sticky left-0 z-10 bg-card px-6 py-4">
                      <p className="font-bold text-text-primary">{ref.referrerName}</p>
                      <p className="text-xs text-text-secondary">{ref.referrerId}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-text-primary">{ref.refereeName}</p>
                      <p className="text-xs text-text-secondary">{ManagerReferralsRewardsMaskSensitiveData(ref.refereePhone, 'phone')}</p>
                    </td>
                    <td className="px-6 py-4 text-text-secondary">{ManagerReferralsRewardsFormatDate(ref.dateReferred, locale)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        (() => { if (ref.status === MANAGER_REFERRAL_STATUS_JOINED) return 'bg-success-bg text-success-text'; return (() => { if (ref.status === MANAGER_REFERRAL_STATUS_REJECTED) return 'bg-danger text-on-danger'; return 'bg-warning-bg text-warning-text'; })(); })()
                      }`} data-testid={`manager_referrals-managerreferralstable-status-badge-${ref.id}`}>
                        {ref.status === 'JOINED' ? t('COPY_JOINED') : ref.status === 'REJECTED' ? t('COPY_REJECTED') : t('COPY_PENDING')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {(() => { if (ref.rewardStatus === 'N/A') { return (
                        <span className="text-text-secondary">{ManagerReferralsRewardsDisplayValue(ref.rewardStatus)}</span>
                      ); } return (
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                          ref.rewardStatus === MANAGER_REFERRAL_REWARD_STATUS_CLAIMED ? 'bg-success-bg text-success-text' : 'bg-warning-bg text-warning-text'
                        }`} data-testid={`manager_referrals-managerreferralstable-reward-badge-${ref.id}`}>
                          {ref.rewardStatus === 'CLAIMED' ? t('COPY_CLAIMED') : ref.rewardStatus === 'PENDING' ? t('COPY_PENDING') : t('COPY_NOT_APPLICABLE')}
                        </span>
                      ); })()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {(() => { if (ref.rewardStatus === MANAGER_REFERRAL_REWARD_STATUS_CLAIMED) return (<span className="inline-flex items-center gap-1 text-success-text text-xs font-bold">
                          <Check size={18} strokeWidth={2}/>{t("COPY_CLAIMED")}</span>); return (() => { if (canClaim) return (<button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "inline-flex items-center gap-1 px-3 py-1.5 bg-primary-subtle text-primary rounded text-xs font-bold hover:bg-primary-hover motion-safe:transition-all disabled:opacity-50 motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_referrals-referrals-managerreferralstable-button-claimed-${mapIndex}`} onClick={() => claimReward(ref.id)} disabled={isClaiming}  type="button">
                          <IndianRupee size={18} strokeWidth={2}/>{t("COPY_CLAIM")}{ManagerReferralsRewardsFormatCurrency(ref.rewardAmount ?? 0, ManagerEnvConfig.currencyCode, locale)}
                        </button>); return (<span className="text-text-secondary text-xs italic">{t("COPY_AWAITING_JOIN")}</span>); })(); })()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
</ManagerInfrastructureResponsiveTable>
        ); })(); })(); })()}
      </div>

      {/* Footer Pagination */}
      {referrals.length > 0 && (
        <div className="shrink-0 p-3 border-t border-border bg-input">
          <ManagerPagination data-testid="manager_referrals-managerreferralstable-managerpagination-2" 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
