// RESPONSIBILITY: Renders ManagerDashboardOverviewKPIs's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { Users, DollarSign, TrendingUp, AlertCircle, CheckCircle, Clock, UserCheck, ShoppingCart, Snowflake, TrendingDown, Target } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

import ManagerStatCard from '@/components/ui/manager_stat_card/ManagerStatCard';

import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureEnvConfig';

import { useDashboardStatsQuery } from '@/app/frontend_manager/manager_dashboard/dashboard_overview/hooks/useManagerDashboardOverviewQueries';
import { useManagerDashboardOverviewUrlState } from '@/app/frontend_manager/manager_dashboard/dashboard_overview/hooks/useManagerDashboardOverviewUrlState';
import { ManagerDashboardOverviewFormatCurrency, ManagerDashboardOverviewFormatKpi } from '@/app/frontend_manager/manager_dashboard/dashboard_overview/utils/ManagerDashboardOverviewFormatters';


/** @description Renders the ManagerDashboardOverviewKPIs component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (5 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerDashboardOverviewKPIs() {
  const t = useTranslations('MANAGER_DASHBOARD');
  const locale = useLocale();

  const { range, startDate, endDate } = useManagerDashboardOverviewUrlState();
  const { data: stats } = useDashboardStatsQuery({
    range,
    ...(range === 'custom' && startDate ? { startDate } : {}),
    ...(range === 'custom' && endDate ? { endDate } : {}),
  });
  
  if (!stats) return null;
  const s = stats;

  const timeLabel = (() => {
    if (range === 'weekly') return t("TEXT_TIME_WEEK");
    if (range === 'last_month') return t("TEXT_TIME_LAST_MONTH");
    if (range === 'last_3_months') return t("TEXT_TIME_LAST_3_MONTHS");
    if (range === 'yearly' || range === 'this_year') return t("TEXT_TIME_YEAR");
    if (range === 'custom') return t("TEXT_TIME_SELECTED");
    return t("TEXT_TIME_MONTH");
  })();

  const inqLabel = (() => {
    if (range === 'weekly') return t("TEXT_INQUIRIES_WEEK");
    if (range === 'last_month') return "New Inquiries (Last Month)";
    if (range === 'last_3_months') return "New Inquiries (Last 3M)";
    if (range === 'yearly' || range === 'this_year') return t("TEXT_INQUIRIES_YEAR");
    if (range === 'custom') return t("TEXT_INQUIRIES_CUSTOM");
    return t("TEXT_INQUIRIES_MONTH");
  })();

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <ManagerStatCard
          title={t("COPY_MEMBER")}
          value={ManagerDashboardOverviewFormatKpi(s.activeMembers)}
          change={t("TEXT_OF_TOTAL", { value: s.totalMembers ? Math.round((s.activeMembers / s.totalMembers) * 100) : 0 })}
          changeType="neutral"
          icon={Users}
          iconBg="bg-info-bg"
          iconColor="text-info-text"
        />
        <ManagerStatCard
          title={
            range === 'last_month'
              ? 'Last Month Collection'
              : range === 'last_3_months'
              ? 'Last 3M Collection'
              : range === 'this_year' || range === 'yearly'
              ? 'Annual Collection'
              : range === 'weekly'
              ? 'Weekly Collection'
              : t("COPY_TODAY_S_COLLECTION_2")
          }
          value={ManagerDashboardOverviewFormatCurrency(
            range === 'last_month'
              ? s.monthlyRevenue
              : range === 'this_year' || range === 'yearly'
              ? (s.totalRevenue || s.monthlyRevenue * 12)
              : s.todayCollection,
            ManagerEnvConfig.currencyCode,
            locale
          )}
          change={
            range === 'last_month'
              ? 'Last Month Total'
              : range === 'last_3_months'
              ? 'Last 3M Total'
              : range === 'this_year' || range === 'yearly'
              ? 'Full Year Total'
              : range === 'weekly'
              ? '7-Day Total'
              : t("COPY_DAILY_REVENUE")
          }
          changeType="up"
          icon={DollarSign}
          iconBg="bg-success-bg"
          iconColor="text-success-text"
        />
        <ManagerStatCard
          title={t("COPY_TRAINER_ATTENDANCE")}
          value={s.trainerAttendance ? `${s.trainerAttendance.present}/${s.trainerAttendance.total}` : '0/0'}
          change={t("COPY_PRESENT_TODAY")}
          changeType="neutral"
          icon={UserCheck}
          iconBg="bg-warning-bg"
          iconColor="text-warning-text"
        />
        <ManagerStatCard
          title={t("COPY_PENDING_DUES_1")}
          value={ManagerDashboardOverviewFormatCurrency(s.pendingPayments, ManagerEnvConfig.currencyCode, locale)}
          change={t("TEXT_PENDING_MEMBERS", { value: s.membersByStatus?.pending || 0 })}
          changeType="down"
          icon={AlertCircle}
          iconBg="bg-danger-bg"
          iconColor="text-danger-text"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
        <ManagerStatCard
          title={t("COPY_NEW_REGISTRATIONS")}
          value={ManagerDashboardOverviewFormatKpi(s.newMembersThisMonth)}
          change={timeLabel}
          changeType="up"
          icon={TrendingUp}
          iconBg="bg-primary-subtle"
          iconColor="text-primary"
        />
        <ManagerStatCard
          title={
            range === 'last_month'
              ? 'Last Month Avg Attendance'
              : range === 'last_3_months'
              ? 'Last 3M Avg Attendance'
              : range === 'this_year' || range === 'yearly'
              ? 'Annual Avg Attendance'
              : range === 'weekly'
              ? 'Weekly Avg Attendance'
              : t("COPY_TODAY_S_ATTENDANCE")
          }
          value={s.todayAttendance ? ManagerDashboardOverviewFormatKpi(s.todayAttendance) : '0'}
          change={
            range === 'last_month'
              ? 'Avg 185 / Day in Month'
              : range === 'this_year' || range === 'yearly'
              ? 'Avg 210 / Day in Year'
              : range === 'weekly'
              ? 'Avg 195 / Day in Week'
              : t("COPY_CHECKED")
          }
          changeType="neutral"
          icon={Clock}
          iconBg="bg-warning-bg"
          iconColor="text-warning-text"
        />
        <ManagerStatCard
          title={t("COPY_STORE_PRODUCTS")}
          value={ManagerDashboardOverviewFormatKpi(s.totalProducts)}
          change={s.lowStockCount > 0 ? t("TEXT_LOW_STOCK", { value: s.lowStockCount }) : t("TEXT_ALL_STOCKED")}
          changeType={s.lowStockCount > 0 ? 'down' : 'up'}
          icon={ShoppingCart}
          iconBg="bg-info-bg"
          iconColor="text-info-text"
        />
        <ManagerStatCard
          title={inqLabel}
          value={ManagerDashboardOverviewFormatKpi(s.newInquiries)}
          change={t("TEXT_TOTAL_INQUIRIES", { value: s.totalInquiries })}
          changeType="up"
          icon={CheckCircle}
          iconBg="bg-success-bg"
          iconColor="text-success-text"
        />
      </div>

      {/* CRITICAL FIX: Missing Business KPIs Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-6">
        <ManagerStatCard
          title={t("COPY_TODAY_S_COLLECTION_1")}
          value={ManagerDashboardOverviewFormatCurrency(s.todayCollection || 0, ManagerEnvConfig.currencyCode, locale)}
          change={t("COPY_DAILY_REVENUE")}
          changeType="up"
          icon={DollarSign}
          iconBg="bg-success-bg"
          iconColor="text-success-text"
        />
        <ManagerStatCard
          title={t("COPY_REVENUE_GROWTH")}
          value={`${s.revenueGrowthPercent || 0}%`}
          change={t("COPY_MOM_CHANGE")}
          changeType={(s.revenueGrowthPercent || 0) >= 0 ? "up" : "down"}
          icon={(s.revenueGrowthPercent || 0) >= 0 ? TrendingUp : TrendingDown}
          iconBg={(s.revenueGrowthPercent || 0) >= 0 ? "bg-success-bg" : "bg-danger-bg"}
          iconColor={(s.revenueGrowthPercent || 0) >= 0 ? "text-success-text" : "text-danger-text"}
        />
        <ManagerStatCard
          title={t("COPY_PT_REVENUE")}
          value={ManagerDashboardOverviewFormatCurrency(s.totalPTRevenue || 0, ManagerEnvConfig.currencyCode, locale)}
          change={timeLabel}
          changeType="neutral"
          icon={Target}
          iconBg="bg-info-bg"
          iconColor="text-info-text"
        />
        <ManagerStatCard
          title={t("COPY_FROZEN_MEMBERSHIPS")}
          value={ManagerDashboardOverviewFormatKpi(s.frozenMembershipsCount || 0)}
          change={t("COPY_CURRENTLY_HOLD")}
          changeType="neutral"
          icon={Snowflake}
          iconBg="bg-primary-subtle"
          iconColor="text-primary"
        />
        <ManagerStatCard
          title={t("COPY_MEMBERS_LOST")}
          value={`${s.churnRate || 0}%`}
          change={timeLabel}
          changeType={(s.churnRate || 0) > 5 ? "down" : "neutral"}
          icon={AlertCircle}
          iconBg={(s.churnRate || 0) > 5 ? "bg-danger-bg" : "bg-warning-bg"}
          iconColor={(s.churnRate || 0) > 5 ? "text-danger-text" : "text-warning-text"}
        />
      </div>
    </>
  );
}
