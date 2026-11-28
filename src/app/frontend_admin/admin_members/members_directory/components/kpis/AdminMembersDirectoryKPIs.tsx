"use client";
// RESPONSIBILITY: Renders the 4 KPI stat cards for the Admin Members module (total, active, expiring, outstanding).
// DATA FLOW: feature data/state and user input → AdminMembersDirectoryKPIs → accessible UI/events routed to owning hooks (admin_members/members_directory/components/kpis/AdminMembersDirectoryKPIs.tsx)

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';

import { Users, UserCheck, Clock, IndianRupee } from 'lucide-react';
import { useAdminMembersLogic } from '@/app/frontend_admin/admin_members/members_directory/hooks/useAdminMembersDirectoryLogic';
import { useAdminMembersStore } from '@/app/frontend_admin/admin_members/members_directory/state/useAdminMembersDirectoryStore';
import { MEMBER_STATUS_VALUES } from '@/app/frontend_admin/admin_members/members_directory/constants/AdminMembersDirectoryConstants';
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
  const { statusFilter, expiryFilter, setStatusFilter, setExpiryFilter } = useAdminMembersStore();
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
      id: 'all',
      title: t('members.AdminAuditRepair.totalMembers'),
      value: formatNumber(summary.totalMembers, locale),
      sub: t('members.AdminAuditRepair.newThisMonth', { count: summary.newThisMonth }),
      subColor: 'text-success',
      icon: Users,
      iconBg: 'bg-info-bg',
      iconColor: 'text-info',
      active: statusFilter === 'all' && expiryFilter === 'all',
      onClick: () => { setStatusFilter('all'); setExpiryFilter('all'); },
    },
    {
      id: 'active',
      title: t('members.AdminAuditRepair.activeMembers'),
      value: formatNumber(summary.activeMembers, locale),
      sub: t('members.AdminAuditRepair.percentOfTotal', { value: Math.round((summary.activeMembers / Math.max(summary.totalMembers, 1)) * 100) }),
      subColor: 'text-secondary',
      icon: UserCheck,
      iconBg: 'bg-success-bg',
      iconColor: 'text-success',
      active: statusFilter === MEMBER_STATUS_VALUES.ACTIVE,
      onClick: () => setStatusFilter(statusFilter === MEMBER_STATUS_VALUES.ACTIVE ? 'all' : MEMBER_STATUS_VALUES.ACTIVE),
    },
    {
      id: 'expiring',
      title: t('members.AdminAuditRepair.expiringThisMonth'),
      value: formatNumber(summary.expiringThisMonth, locale),
      sub: t('members.AdminAuditRepair.expiringThisWeek', { count: summary.expiringThisWeek }),
      subColor: 'text-warning',
      icon: Clock,
      iconBg: 'bg-warning-bg',
      iconColor: 'text-warning',
      active: expiryFilter === 'this_month',
      onClick: () => setExpiryFilter(expiryFilter === 'this_month' ? 'all' : 'this_month'),
    },
    {
      id: 'dues',
      title: t('members.AdminAuditRepair.totalOutstanding'),
      value: AdminMembersFormatCurrency(summary.totalOutstanding, undefined, locale),
      sub: t('members.AdminAuditRepair.membersWithDues', { count: summary.pendingMembers }),
      subColor: 'text-danger',
      icon: IndianRupee,
      iconBg: 'bg-danger-bg',
      iconColor: 'text-danger',
      active: false,
      href: '/frontend_admin/admin_sales/sales_pending_payments',
    },
  ];

  const accents = {
    all: {
      border: 'border-sky-500/40 hover:border-sky-400/75',
      surface: 'bg-card dark:bg-gradient-to-br dark:from-[#0E2438] dark:via-[#131D2E] dark:to-[#0C1220]',
      topBar: 'from-[#38BDF8] via-[#22D3EE] to-transparent',
      glow: 'bg-sky-400',
      stroke: '#38BDF8',
      badge: 'border-sky-500/35',
    },
    active: {
      border: 'border-emerald-500/40 hover:border-emerald-400/75',
      surface: 'bg-card dark:bg-gradient-to-br dark:from-[#0C2722] dark:via-[#121E2D] dark:to-[#0C1220]',
      topBar: 'from-[#10B981] via-[#34D399] to-transparent',
      glow: 'bg-emerald-400',
      stroke: '#34D399',
      badge: 'border-emerald-500/35',
    },
    expiring: {
      border: 'border-amber-500/40 hover:border-amber-400/75',
      surface: 'bg-card dark:bg-gradient-to-br dark:from-[#281E10] dark:via-[#151B2C] dark:to-[#0C1220]',
      topBar: 'from-[#F59E0B] via-[#FACC15] to-transparent',
      glow: 'bg-amber-400',
      stroke: '#FBBF24',
      badge: 'border-amber-500/35',
    },
    dues: {
      border: 'border-rose-500/40 hover:border-rose-400/75',
      surface: 'bg-card dark:bg-gradient-to-br dark:from-[#2B121B] dark:via-[#141B2D] dark:to-[#0C1220]',
      topBar: 'from-[#F43F5E] via-[#FB7185] to-transparent',
      glow: 'bg-rose-500',
      stroke: '#FB7185',
      badge: 'border-rose-500/35',
    },
  } as const;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4" data-testid="admin_members-adminmemberskpis-summary">
      {cards.map((c) => {
        const Icon = c.icon;
        const accent = accents[c.id as keyof typeof accents] ?? accents.all;
        const inner = (
          <div className={`relative overflow-hidden rounded-2xl p-5 border shadow-card motion-safe:transition-all motion-safe:duration-base motion-safe:hover:-translate-y-0.5 text-left w-full h-full flex flex-col justify-between ${accent.surface} ${c.active ? 'border-primary ring-2 ring-primary/60' : accent.border}`}>
            <span aria-hidden="true" className={`pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${accent.topBar}`} />
            <span aria-hidden="true" className={`pointer-events-none absolute -right-6 -bottom-6 h-24 w-24 rounded-full blur-2xl opacity-20 ${accent.glow}`} />
            <svg aria-hidden="true" viewBox="0 0 150 45" className="pointer-events-none absolute bottom-0 right-0 h-14 w-32 opacity-25">
              <path d="M0 38 Q25 32 45 26 T90 18 T130 12 T150 6" fill="none" stroke={accent.stroke} strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <div className="relative flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-secondary uppercase tracking-wider truncate">{c.title}</p>
                <p className="text-kpi font-extrabold text-text-primary tabular-nums mt-2 truncate">{c.value}</p>
              </div>
              <div className={`p-2.5 rounded-xl border flex items-center justify-center shrink-0 shadow-sm ${c.iconBg} ${accent.badge}`}>
                <Icon size={18} strokeWidth={2.2} className={c.iconColor} />
              </div>
            </div>
            <p className={`relative text-xs mt-3 pt-2.5 border-t border-border/70 font-medium truncate ${c.subColor}`}>{c.sub}</p>
          </div>
        );
        if (c.href) {
          return (
            <Link key={c.id} href={c.href} className="block h-full no-underline rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              {inner}
            </Link>
          );
        }
        return (
          <button key={c.id} type="button" onClick={c.onClick} aria-pressed={c.active} className="block h-full w-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            {inner}
          </button>
        );
      })}
    </div>
  );
}
