"use client";
// RESPONSIBILITY: Renders the 4 KPI stat cards for the Admin Members module (total, active, expiring, outstanding).
// DATA FLOW: feature data/state and user input → AdminMembersDirectoryKPIs → accessible UI/events routed to owning hooks (admin_members/members_directory/components/kpis/AdminMembersDirectoryKPIs.tsx)

import { useLocale, useTranslations } from 'next-intl';

import { Users, UserCheck, Clock, IndianRupee } from 'lucide-react';
import { useAdminMembersLogic } from '@/app/frontend_admin/admin_members/members_directory/hooks/useAdminMembersDirectoryLogic';
import { AdminMembersFormatCurrency } from '@/app/frontend_admin/admin_members/members_directory/utils/AdminMembersDirectoryFormatCurrency';
import { formatNumber } from '@/app/frontend_admin/admin_members/members_directory/utils/AdminMembersDirectoryFormatters';

/**
 * AdminMembersDirectoryKPIs renders the admin members kpis UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminMembersDirectoryKPIs: Renders the 4 KPI stat cards for the Admin Members module (total, active, expiring, outstanding).
 * @dependencies Consumes useAdminMembersLogic, AdminMembersFormatCurrency, AdminMembersFormatters.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminMembersDirectoryKPIs() {
  const t = useTranslations();
  const locale = useLocale();
  const { summary, summaryStatus, retrySummary } = useAdminMembersLogic();
  if (summaryStatus === 'pending') {
    return <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-busy="true" aria-label={t('members.AdminAuditRepair.summaryLoading')}>
      {['total-members', 'active-members', 'expiring-members', 'outstanding-members'].map((key) => <div key={key} className="h-28 rounded-xl border border-border bg-card p-5"><div className="h-3 w-24 animate-pulse rounded bg-skeleton-base"/><div className="mt-4 h-7 w-16 animate-pulse rounded bg-skeleton-base"/><div className="mt-3 h-3 w-32 animate-pulse rounded bg-skeleton-base"/></div>)}
    </div>;
  }
  if (summaryStatus === 'error') {
    return <div className="rounded-xl border border-border bg-danger-bg p-4 text-sm text-danger" role="alert" data-testid="admin_members-adminmemberskpis-error">
      <p>{t('members.AdminAuditRepair.summaryFailed')}</p>
      <button type="button" onClick={() => void retrySummary()} className="mt-2 min-h-11 rounded-lg px-3 font-semibold text-primary underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="members-directory-members-directory-kp-is-retry-summary">{t('members.AdminAuditRepair.retrySummary')}</button>
    </div>;
  }
  if (!summary) return null;

  const cards = [
    {
      title: t('members.AdminAuditRepair.totalMembers'),
      value: formatNumber(summary.totalMembers, locale),
      sub: t('members.AdminAuditRepair.newThisMonth', { count: summary.newThisMonth }),
      subColor: 'text-success',
      icon: Users,
      iconBg: 'bg-info-bg',
      iconColor: 'text-info',
    },
    {
      title: t('members.AdminAuditRepair.activeMembers'),
      value: formatNumber(summary.activeMembers, locale),
      sub: t('members.AdminAuditRepair.percentOfTotal', { value: Math.round((summary.activeMembers / Math.max(summary.totalMembers, 1)) * 100) }),
      subColor: 'text-secondary',
      icon: UserCheck,
      iconBg: 'bg-success-bg',
      iconColor: 'text-success',
    },
    {
      title: t('members.AdminAuditRepair.expiringThisMonth'),
      value: formatNumber(summary.expiringThisMonth, locale),
      sub: t('members.AdminAuditRepair.expiringThisWeek', { count: summary.expiringThisWeek }),
      subColor: 'text-warning',
      icon: Clock,
      iconBg: 'bg-warning-bg',
      iconColor: 'text-warning',
    },
    {
      title: t('members.AdminAuditRepair.totalOutstanding'),
      value: AdminMembersFormatCurrency(summary.totalOutstanding, undefined, locale),
      sub: t('members.AdminAuditRepair.membersWithDues', { count: summary.pendingMembers }),
      subColor: 'text-danger',
      icon: IndianRupee,
      iconBg: 'bg-danger-bg',
      iconColor: 'text-danger',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4" data-testid="admin_members-adminmemberskpis-summary">
      {cards.map((c) => {
        const Icon = c.icon;
        return (
          <div key={c.title} className="bg-card rounded-xl p-5 border border-border hover:border-focus motion-safe:transition-all motion-safe:duration-base">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-secondary uppercase tracking-wider">{c.title}</p>
                <p className="text-2xl font-bold text-primary mt-1">{c.value}</p>
                <p className={`text-xs mt-1 font-medium ${c.subColor}`}>{c.sub}</p>
              </div>
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ml-3 ${c.iconBg}`}>
                <Icon size={18} strokeWidth={2} className={c.iconColor} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
