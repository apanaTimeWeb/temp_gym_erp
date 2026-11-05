// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';

import ManagerInfrastructureResponsiveTable from '@/app/frontend_manager/manager_infrastructure/components/ManagerInfrastructureResponsiveTable';
import ManagerPagination from '@/components/ui/manager_pagination/ManagerPagination';

import { ManagerEnvConfig } from '@/app/frontend_manager/manager_sales_billing/sales_overview/constants/ManagerSalesOverviewLocalEnvConfig';
import { MANAGER_ITEMS_PER_PAGE } from '@/app/frontend_manager/manager_sales_billing/sales_overview/constants/ManagerSalesOverviewLocalPaginationDefaults';

import ManagerSalesOverviewEmptyState from '@/app/frontend_manager/manager_sales_billing/sales_overview/components/ManagerSalesOverviewEmptyState';
import { MANAGER_MEMBERS_DIRECTORYHIP_FILTERS, MANAGER_SALES_OVERVIEW_MEMBERSHIP_FILTER_VALUES } from '@/app/frontend_manager/manager_sales_billing/sales_overview/constants/manager_sales_overview_filter.constants';
import { SALES_ACTIVE_STATUS } from '@/app/frontend_manager/manager_sales_billing/sales_overview/constants/manager_sales_overview_shared.constants';
import { MANAGER_SALES_OVERVIEW_MEMBERSHIP_TABLE_HEADERS } from '@/app/frontend_manager/manager_sales_billing/sales_overview/constants/manager_sales_overview_table.constants';
import { useManagerSalesOverviewLogic } from '@/app/frontend_manager/manager_sales_billing/sales_overview/hooks/useManagerSalesOverviewLogic';
import { ManagerSalesOverviewFormatCurrency, ManagerSalesOverviewFormatDate } from '@/app/frontend_manager/manager_sales_billing/sales_overview/utils/ManagerSalesOverviewFormatters';
import type { SalesMemberSnapshot } from '@/app/frontend_manager/manager_sales_billing/sales_overview/types/manager_sales_overview_member_snapshot.types';



/** Returns the Tailwind text color class for the days-left column based on urgency. */
/**
 * @description Provides the `getDaysLeftColorClass` transformation used by the owning Manager feature. Keeps display/domain shaping local so components remain focused on rendering and interaction orchestration.
 * @dependencies Uses only the values and module constants visible in this file; it does not call APIs or cross feature boundaries.
 * @edge-case Handles missing, empty, nullable, and boundary inputs according to the caller's documented UI contract without inventing business data.
 */
function getDaysLeftColorClass(daysLeft: number): string {
  if (daysLeft === 0) return 'text-danger-text';
  if (daysLeft <= 7) return 'text-danger-text';
  if (daysLeft <= 30) return 'text-warning-text';
  return 'text-success-text';
}

/** @description Renders the ManagerSalesOverviewAllMemberships component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (10 documented module/import dependencies).. @edge-case Preserves empty state, error state. */
export default function ManagerSalesOverviewAllMemberships() {
  const t = useTranslations('MANAGER_SALES_OVERVIEW');
  const locale = useLocale();

  const { currentPage, setCurrentPage, allMemberships, allMembershipsTotal, isPending, isError, errorMessage, membershipFilter: filter, setMembershipFilter: setFilter } = useManagerSalesOverviewLogic();
  const [now] = useState(() => Date.now());

  const totalPages = Math.ceil(allMembershipsTotal / MANAGER_ITEMS_PER_PAGE) || 1;

  const filteredMemberships = allMemberships.filter((m: SalesMemberSnapshot) => {
    if (filter === MANAGER_SALES_OVERVIEW_MEMBERSHIP_FILTER_VALUES.ALL) return true;
    if (filter === MANAGER_SALES_OVERVIEW_MEMBERSHIP_FILTER_VALUES.ACTIVE) return m.status === SALES_ACTIVE_STATUS && Date.parse(String(m.expiryDate ?? '')) >= now;
    if (filter === MANAGER_SALES_OVERVIEW_MEMBERSHIP_FILTER_VALUES.EXPIRED) return Date.parse(String(m.expiryDate ?? '')) < now;
    if (filter === MANAGER_SALES_OVERVIEW_MEMBERSHIP_FILTER_VALUES.EXPIRING_SOON) {
      const daysLeft = Math.floor((Date.parse(String(m.expiryDate ?? '')) - now) / 86400000);
      return daysLeft >= 0 && daysLeft <= 7;
    }
    return true;
  });

  if (isPending) {
    return (
      <div className="space-y-2">
        {[...Array(6)].map((_, i) => (
          <div key={`skeleton-${i}`} className="motion-safe:animate-pulse h-12 bg-card rounded border border-border" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-16 bg-card rounded-2xl border border-danger motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:hover:-translate-y-1">
        <p className="text-danger-text font-medium">{errorMessage || t("TEXT_GENERIC_ERROR")}</p>
        <span className="text-sm text-text-secondary">{t("COPY_RETRY_REQUEST_1")}</span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {MANAGER_MEMBERS_DIRECTORYHIP_FILTERS.map((f, mapIndex) => (
          <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", (`min-h-11 px-3 py-2 text-xs rounded-full font-medium border motion-safe:transition-all ${
              f === filter
                ? 'bg-primary-subtle text-primary border-transparent'
                : 'border-border text-text-secondary hover:text-primary'
            } motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110`)].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_sales-sales-managersalesallmemberships-button-primary-${mapIndex}`}
            key={f}
            onClick={() => setFilter(f)}
            
           type="button">
            {f}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <ManagerInfrastructureResponsiveTable labels={MANAGER_SALES_OVERVIEW_MEMBERSHIP_TABLE_HEADERS}>
<table className="w-full">
          <thead className="bg-input">
            <tr>
              {MANAGER_SALES_OVERVIEW_MEMBERSHIP_TABLE_HEADERS.map(h => (
                <th key={h} className="text-left text-xs font-semibold text-text-secondary uppercase tracking-wider px-4 py-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredMemberships.map((r: SalesMemberSnapshot) => {
              const expiryTimestamp = Date.parse(String(r.expiryDate ?? ''));
              const daysLeft = Math.floor((expiryTimestamp - now) / 86400000);
              const daysLeftLabel = !Number.isFinite(expiryTimestamp) ? '—' : expiryTimestamp < now ? t('COPY_EXPIRED') : new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }).format(daysLeft, 'day');
              const statusLabel = locale.startsWith('hi') ? ({ active: 'सक्रिय', pending: 'लंबित', inactive: 'निष्क्रिय', expired: 'समाप्त', suspended: 'निलंबित', frozen: 'स्थगित' }[String(r.status).toLowerCase()] ?? String(r.status)) : ({ active: 'Active', pending: 'Pending', inactive: 'Inactive', expired: 'Expired', suspended: 'Suspended', frozen: 'Frozen' }[String(r.status).toLowerCase()] ?? String(r.status));
              return (
              <tr key={r.id} className="hover:bg-primary-subtle motion-safe:transition-all motion-safe:duration-200 ease-in-out">
                <td className="px-4 py-3 text-sm font-medium text-text-primary">{r.name || '—'}</td>
                <td className="px-4 py-3 text-sm text-text-secondary">{typeof r.plan === 'object' && r.plan ? r.plan.name : (r.planId ? `Plan #${r.planId}` : t('COPY_STANDARD'))}</td>
                <td className="px-4 py-3 text-sm text-text-secondary">{r.joinDate ? ManagerSalesOverviewFormatDate(r.joinDate, locale) : '—'}</td>
                <td className="px-4 py-3 text-sm text-text-secondary">{r.expiryDate ? ManagerSalesOverviewFormatDate(r.expiryDate, locale) : '—'}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                    r.status === SALES_ACTIVE_STATUS
                      ? 'bg-success text-on-success'
                      : 'bg-danger text-on-danger'
                  }`} data-testid="manager_sales-managersalesallmemberships-status-badge-1">
                    {r.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm font-medium text-text-primary">{ManagerSalesOverviewFormatCurrency(r.paidAmount || 0, ManagerEnvConfig.currencyCode, locale)}</td>
                <td className={`px-4 py-3 text-sm font-medium ${getDaysLeftColorClass(Math.max(0, daysLeft))}`}>
                  {daysLeftLabel}
                </td>
              </tr>
              );
            })}
          </tbody>
        </table>
</ManagerInfrastructureResponsiveTable>
      </div>

      {filteredMemberships.length === 0 && (
        <ManagerSalesOverviewEmptyState message={t("COPY_NO_MEMBERSHIPS_FOUND")} subtext={t("COPY_TRY_ADJUSTING_FILTERS")} />
      )}

      <div className="mt-4 pt-4 border-t border-border">
          <ManagerPagination data-testid="manager_sales-managersalesallmemberships-managerpagination-1"
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
    </div>
  );
}
