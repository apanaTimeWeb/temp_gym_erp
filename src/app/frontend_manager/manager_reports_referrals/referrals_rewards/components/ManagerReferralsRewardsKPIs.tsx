// RESPONSIBILITY: Renders ManagerReferralsRewardsKPIs's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { Users, UserCheck, Gift, CheckCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

import ManagerStatCard from '@/components/ui/manager_stat_card/ManagerStatCard';
import { useDateRangeSuffix } from '@/lib/useDateRangeSuffix';

import { useManagerReferralsRewardsLogic } from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/hooks/useManagerReferralsRewardsLogic';


/** @description Display 4 key referral stats using ManagerStatCard. @dependencies Local dependencies are owned by this feature module (3 documented module/import dependencies).. @edge-case Preserves loading state. */
export default function ManagerReferralsRewardsKPIs() {
  const t = useTranslations('MANAGER_REFERRALS_REWARDS');
  const { kpis, isKpisLoading, isKpisError, reloadKpis } = useManagerReferralsRewardsLogic();
  const dateSuffix = useDateRangeSuffix();

  if (isKpisError) return <div role="alert" className="rounded-lg border border-danger p-4 text-sm text-danger-text">{t('TEXT_GENERIC_ERROR')} <button type="button" className="min-h-11 underline" onClick={() => void reloadKpis()}>{t('COPY_TRY_AGAIN_2')}</button></div>;
  if (isKpisError) return <div role="alert" className="rounded-lg border border-danger p-4 text-sm text-danger-text">{t('TEXT_GENERIC_ERROR')} <button type="button" className="min-h-11 underline" onClick={() => void reloadKpis()}>{t('COPY_TRY_AGAIN_2')}</button></div>;
  if (isKpisLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 motion-safe:animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div key={`skeleton-${i}`} className="bg-card h-28 rounded-xl border border-border"></div>
        ))}
      </div>
    );
  }

  if (!kpis) return <div role="alert" className="rounded-lg border border-danger p-4 text-sm text-danger-text">{t('TEXT_GENERIC_ERROR')} <button type="button" className="min-h-11 underline" onClick={() => void reloadKpis()}>{t('COPY_TRY_AGAIN_2')}</button></div>;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <ManagerStatCard 
        title={t("TEXT_KPI_TOTAL_REFERRALS") + dateSuffix} 
        value={kpis.totalReferrals.toString()} 
        icon={Users} 
        change={undefined}
        iconBg="bg-primary-subtle"
        iconColor="text-primary"
      />
      <ManagerStatCard 
        title={t("TEXT_KPI_CONVERTED_MEMBERS") + dateSuffix} 
        value={kpis.totalConverted.toString()} 
        icon={UserCheck} 
        change={undefined}
        iconBg="bg-success-bg"
        iconColor="text-success-text"
      />
      <ManagerStatCard 
        title={t("TEXT_KPI_PENDING_REWARDS") + dateSuffix} 
        value={kpis.pendingRewards.toString()} 
        icon={Gift} 
        change={kpis.pendingRewards > 5 ? t('TEXT_KPI_ACTION_NEEDED') : undefined}
        changeType={kpis.pendingRewards > 5 ? 'down' : 'neutral'}
        iconBg="bg-warning-bg"
        iconColor="text-warning-text"
      />
      <ManagerStatCard 
        title={t("TEXT_KPI_CLAIMED_REWARDS") + dateSuffix} 
        value={kpis.claimedRewards.toString()} 
        icon={CheckCircle} 
        iconBg="bg-primary-subtle"
        iconColor="text-primary"
      />
    </div>
  );
}
