"use client";
// RESPONSIBILITY: Renders the paginated, filterable table of all gym memberships. KPI cards (Rule 74) double as interactive filters. Receives data via useAdminSalesLogic state. No API calls.
// DATA FLOW: feature data/state and user input → AdminSalesAnalyticsAllMemberships → accessible UI/events routed to owning hooks (admin_sales/sales_memberships/components/all_memberships/AdminSalesAnalyticsAllMemberships.tsx)

import { useLocale, useTranslations } from 'next-intl';
import { formatDate, getAdminSalesMembershipsDaysLeft } from '@/app/frontend_admin/admin_sales/sales_memberships/utils/AdminSalesMembershipsFormatters';
import { AdminSalesFormatCurrency } from '@/app/frontend_admin/admin_sales/sales_memberships/utils/AdminSalesMembershipsFormatCurrency';

import type { MembershipFilter } from '@/app/frontend_admin/admin_sales/sales_memberships/types/AdminSalesMembershipsTypes';
import { ADMIN_SALES_MEMBERSHIP_FILTER, ADMIN_SALES_MEMBERSHIP_STATUS, ADMIN_SALES_MEMBERSHIP_STATUS_LABEL_KEYS } from '@/app/frontend_admin/admin_sales/sales_memberships/constants/AdminSalesMembershipsConstants';
import { SALES_ITEMS_PER_PAGE } from '@/app/frontend_admin/admin_sales/sales_memberships/constants/AdminSalesMembershipsConstants';

import { useMemo } from 'react';
import { useAdminSalesLogic } from '@/app/frontend_admin/admin_sales/sales_memberships/hooks/useAdminSalesMembershipsLogic';
import AdminNavigationLayoutPagination from '@/app/frontend_admin/admin_sales/sales_memberships/components/AdminSalesMembershipsPagination';
import AdminSalesEmptyState from '@/app/frontend_admin/admin_sales/sales_memberships/components/empty_state/AdminSalesMembershipsEmptyState';
import type { Member } from '@/app/frontend_admin/admin_sales/sales_memberships/types/AdminSalesMembershipsTypes';
import { Users, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';




/**
 * getDaysLeftColorClass is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
function getDaysLeftColorClass(daysLeft: number): string {
  if (!Number.isFinite(daysLeft)) return 'text-secondary';
  if (daysLeft <= 0) return 'text-danger';
  if (daysLeft <= 7) return 'text-danger';
  if (daysLeft <= 30) return 'text-warning';
  return 'text-success';
}

/**
 * getMembershipFilter is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
function getMembershipFilter(member: Member): MembershipFilter {
  if (member.status?.toLowerCase() === ADMIN_SALES_MEMBERSHIP_STATUS.EXPIRED) return ADMIN_SALES_MEMBERSHIP_FILTER.EXPIRED;
  const days = getAdminSalesMembershipsDaysLeft(member.expiryDate);
  if (!Number.isFinite(days)) return ADMIN_SALES_MEMBERSHIP_FILTER.ALL;
  if (days <= 0) return ADMIN_SALES_MEMBERSHIP_FILTER.EXPIRED;
  if (days <= 30) return ADMIN_SALES_MEMBERSHIP_FILTER.EXPIRING_SOON;
  return ADMIN_SALES_MEMBERSHIP_FILTER.ACTIVE;
}

/**
 * AdminSalesAnalyticsAllMemberships renders the admin sales all memberships UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminSalesAnalyticsAllMemberships: Renders the paginated, filterable table of all gym memberships. KPI cards (Rule 74) double as interactive filters. Receives data via useAdminSalesLogic state. No API calls.
 * @dependencies Consumes AdminSalesFormatters, AdminSalesFormatCurrency, AdminSalesConstants, useAdminSalesLogic.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminSalesAnalyticsAllMemberships() {
  const locale = useLocale();
  const t = useTranslations();
  const { currentPage, setCurrentPage, allMemberships, allMembershipsTotal, allMembershipsStatus, allMembershipsError, retryAllMemberships, membershipFilter, setMembershipFilter, membershipKpiCounts, membershipKpiCountsPending, membershipKpiCountsError, retryMembershipKpiCounts } = useAdminSalesLogic();
  const activeFilter = membershipFilter;
  const tableHeaders = [
    t('sales.AdminAuditRepair.member'),
    t('sales.AdminAuditRepair.plan'),
    t('sales.AdminAuditRepair.start'),
    t('sales.AdminAuditRepair.endDate'),
    t('sales.AdminAuditRepair.status'),
    t('sales.AdminAuditRepair.amount'),
    t('sales.AdminAuditRepair.daysLeft'),
  ] as const;

  // Compute per-status counts for the KPI bar (Rule 74)
  const counts = useMemo(() => ({
    All: allMembershipsTotal,
    Active: membershipKpiCounts.active,
    'Expiring Soon': membershipKpiCounts.expiringSoon,
    Expired: membershipKpiCounts.expired,
  }), [allMembershipsTotal, membershipKpiCounts]);

  // Apply client-side filter
  const filtered = useMemo(() => {
    if (activeFilter === ADMIN_SALES_MEMBERSHIP_FILTER.ALL) return allMemberships;
    return allMemberships;
  }, [allMemberships]);

  const totalPages = Math.ceil(allMembershipsTotal / SALES_ITEMS_PER_PAGE) || 1;

  const kpiCards = [
    { filter: ADMIN_SALES_MEMBERSHIP_FILTER.ALL as MembershipFilter, label: t('sales.AdminAuditRepair.totalMembers'), count: counts.All, icon: Users, color: 'text-primary', bg: 'bg-primary-subtle', activeBorder: 'border-focus' },
    { filter: ADMIN_SALES_MEMBERSHIP_FILTER.ACTIVE as MembershipFilter, label: t('sales.AdminAuditRepair.active'), count: counts.Active, icon: CheckCircle, color: 'text-success', bg: 'bg-success-bg', activeBorder: 'border-border' },
    { filter: ADMIN_SALES_MEMBERSHIP_FILTER.EXPIRING_SOON as MembershipFilter, label: t('sales.AdminAuditRepair.expiringSoon'), count: counts['Expiring Soon'], icon: AlertTriangle, color: 'text-warning', bg: 'bg-warning-bg', activeBorder: 'border-border' },
    { filter: ADMIN_SALES_MEMBERSHIP_FILTER.EXPIRED as MembershipFilter, label: t('sales.AdminAuditRepair.expired'), count: counts.Expired, icon: XCircle, color: 'text-danger', bg: 'bg-danger-bg', activeBorder: 'border-border' },
  ];

  if (allMembershipsStatus === 'pending') {
    return (
      <div className="space-y-4" aria-busy="true">
        <p className="sr-only" role="status" aria-live="polite">{t('sales.AdminRepair.loadingCount')}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {["row-1", "row-2", "row-3", "row-4"].map(i => <div key={`sales-membership-skeleton-${i}`} className="motion-safe:animate-pulse h-20 bg-input rounded-xl border border-border motion-safe:duration-base" />)}
        </div>
        <div className="space-y-2">
          {[...Array(6)].map((_, i) => (
            <div key={`sales-membership-skeleton-${i}`} className="motion-safe:animate-pulse h-12 bg-card rounded border border-border motion-safe:duration-base" />
          ))}
        </div>
      </div>
    );
  }

  if (allMembershipsStatus === 'error') {
    return (
      <div role="alert" className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-danger-bg p-4">
        <p className="text-danger">{allMembershipsError || t('sales.admin_sales_all_memberships.auto_loadFailed')}</p>
        <button type="button" onClick={() => void retryAllMemberships()} className="min-h-11 rounded-md border border-border px-3 text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="sales-analytics-sales-analytics-all-memberships-retry-all-memberships">{t('sales.SalesError.text_042c862e44')}</button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* KPI Filter Cards (Rule 74) */}
      {membershipKpiCountsError && <div role="alert" className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-danger bg-danger-bg p-3 text-sm text-danger"><span>{t('sales.AdminRepair.membershipKpiError')}</span><button type="button" onClick={() => void retryMembershipKpiCounts()} className="min-h-11 rounded-lg border border-border px-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="sales-analytics-sales-analytics-all-memberships-retry-membership-kpi-counts">{t('sales.AdminRepair.retry')}</button></div>}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {kpiCards.map(({ filter, label, count, icon: Icon, color, bg, activeBorder } , __testIdIndex115) => (
          <button type="button"
            key={filter}
            aria-pressed={activeFilter === filter}
            onClick={() => { setMembershipFilter(filter); }}
            className={`ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page text-left p-4 rounded-xl border-2 motion-safe:transition-all motion-safe:duration-base bg-card hover:shadow-card ${
              activeFilter === filter
                ? `${activeBorder} shadow-card`
                : 'border-border hover:border-border'
            }`}
           data-testid={`admin_sales-admin_sales-all-memberships-click-map115-${__testIdIndex115}-1`}>
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${bg}`}>
                <Icon size={18} className={color} />
              </div>
              <span className="text-xs font-medium text-secondary">{label}</span>
            </div>
            <div className={`text-2xl font-bold ${activeFilter === filter ? color : 'text-primary'}`}>
              {count === null ? (membershipKpiCountsPending ? t('sales.AdminRepair.loadingCount') : '—') : count}
            </div>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-border">
        <table data-admin-responsive-table className="w-full">
          <thead className="bg-input">
            <tr>
              {tableHeaders.map(h => (
                <th key={h} className="text-left text-xs font-semibold text-secondary uppercase tracking-wider px-4 py-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((r: Member , __testIdIndex151) => {
              const daysLeft = getAdminSalesMembershipsDaysLeft(r.expiryDate);
              return (
                <tr key={r.id} className="hover:bg-surface-highlight motion-safe:transition-colors bg-card motion-safe:duration-base">
                  <td className="px-4 py-3 text-sm font-medium text-primary">{r.name}</td>
                  <td className="px-4 py-3 text-sm text-secondary">{r.plan?.name ?? `Plan #${r.planId}`}</td>
                  <td className="px-4 py-3 text-sm text-secondary">{formatDate(r.joinDate, locale)}</td>
                  <td className="px-4 py-3 text-sm text-secondary">{formatDate(r.expiryDate, locale)}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                      r.status?.toLowerCase() === ADMIN_SALES_MEMBERSHIP_STATUS.ACTIVE
                        ? 'bg-success-bg text-success-text'
                        : 'bg-danger-bg text-danger-text'
                    }`} data-testid={`admin_sales-adminsalesallmemberships-status-1-map151-${__testIdIndex151}-1`}>
                      {t(ADMIN_SALES_MEMBERSHIP_STATUS_LABEL_KEYS[r.status] ?? r.status)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-primary">{AdminSalesFormatCurrency(r.paidAmount || 0, undefined, locale)}</td>
                  <td className={`px-4 py-3 text-sm font-medium ${getDaysLeftColorClass(daysLeft)}`}>
                    {!Number.isFinite(daysLeft) ? '—' : daysLeft <= 0 ? t('sales.admin_sales_all_memberships.auto_112a3f9892') : `${daysLeft}d`}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <AdminSalesEmptyState message={t('sales.AdminSalesAllMemberships.auto_4b31b4cf4c')} subtext={t('sales.admin_sales_all_memberships.auto_7f704f07a0')} />
      )}

      <div className="pt-2 border-t border-border">
        <AdminNavigationLayoutPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
