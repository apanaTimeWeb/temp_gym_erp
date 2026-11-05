// RESPONSIBILITY: Renders ManagerReportsOverviewKPIs's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { TrendingUp, Users, CalendarCheck, TrendingDown, IndianRupee, UserPlus, UserMinus, Activity } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { useDateRangeSuffix } from '@/lib/useDateRangeSuffix';

import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureEnvConfig';

import { ManagerReportsOverviewKpiCard } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/components/ManagerReportsOverviewKpiCard';
import { useManagerReportsOverviewLogic } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/hooks/useManagerReportsOverviewLogic';
import { ManagerReportsOverviewFormatCurrency, ManagerReportsOverviewFormatNumber } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/utils/ManagerReportsOverviewFormatters';



/**
 * Formats report currency using the active UI locale and the Manager environment currency contract.
 * Business intent: keep KPI currency values consistent with locale-aware module formatting.
 * State dependencies: reads the active `next-intl` locale from the containing component.
 * Edge cases: callers pass `undefined` only by guarding before invocation; zero and negative values remain valid.
 */
const formatReportCurrency = (value: number, locale: string) => ManagerReportsOverviewFormatCurrency(value, ManagerEnvConfig.currencyCode, locale);

/** @description Renders the ManagerReportsOverviewKPIs component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (5 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerReportsOverviewKPIs() {
  const locale = useLocale();
  const t = useTranslations('MANAGER_REPORTS_OVERVIEW');
  const { summary } = useManagerReportsOverviewLogic();
  const dateSuffix = useDateRangeSuffix();
  const k = summary?.kpis;

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
      <ManagerReportsOverviewKpiCard label={t('TEXT_KPI_TOTAL_INCOME', { suffix: dateSuffix })} value={k ? formatReportCurrency(k.totalRevenue, locale) : '—'} icon={TrendingUp} iconBg="bg-success-bg" iconColor="text-success-text" sub={k ? t('TEXT_KPI_NET', { amount: formatReportCurrency(k.netProfit, locale) }) : undefined} subColor="text-success-text" />
      <ManagerReportsOverviewKpiCard label={t('TEXT_KPI_TOTAL_EXPENSES', { suffix: dateSuffix })} value={k ? formatReportCurrency(k.totalExpenses, locale) : '—'} icon={TrendingDown} iconBg="bg-danger-bg" iconColor="text-danger-text" />
      <ManagerReportsOverviewKpiCard label={t('TEXT_KPI_ACTIVE_MEMBERS', { suffix: dateSuffix })} value={k ? ManagerReportsOverviewFormatNumber(k.activeMembers) : '—'} icon={Users} iconBg="bg-info-bg" iconColor="text-info-text" sub={k ? t('TEXT_KPI_NEW_THIS_MONTH', { count: ManagerReportsOverviewFormatNumber(k.newMembersThisMonth) }) : undefined} subColor="text-success-text" />
      <ManagerReportsOverviewKpiCard label={t('TEXT_KPI_AVG_ATTENDANCE', { suffix: dateSuffix })} value={k ? t('TEXT_KPI_PERCENT', { value: k.avgAttendanceRate }) : '—'} icon={CalendarCheck} iconBg="bg-primary-subtle" iconColor="text-primary" />
      <ManagerReportsOverviewKpiCard label={t('TEXT_KPI_NEW_MEMBERS', { suffix: dateSuffix })} value={k ? ManagerReportsOverviewFormatNumber(k.newMembersThisMonth) : '—'} icon={UserPlus} iconBg="bg-success-bg" iconColor="text-success-text" />
      <ManagerReportsOverviewKpiCard label={t('TEXT_KPI_MEMBERS_LOST', { suffix: dateSuffix })} value={k ? t('TEXT_KPI_PERCENT', { value: k.churnRate }) : '—'} icon={UserMinus} iconBg="bg-warning-bg" iconColor="text-warning-text" />
      <ManagerReportsOverviewKpiCard label={t('TEXT_KPI_TOTAL_MEMBERS', { suffix: dateSuffix })} value={k ? ManagerReportsOverviewFormatNumber(k.totalMembers) : '—'} icon={Activity} iconBg="bg-purple-bg" iconColor="text-purple-text" />
      <ManagerReportsOverviewKpiCard label={t('TEXT_KPI_NET_PROFIT', { suffix: dateSuffix })} value={k ? formatReportCurrency(k.netProfit, locale) : '—'} icon={IndianRupee} iconBg="bg-success-bg" iconColor="text-success-text" />
    </div>
  );
}
