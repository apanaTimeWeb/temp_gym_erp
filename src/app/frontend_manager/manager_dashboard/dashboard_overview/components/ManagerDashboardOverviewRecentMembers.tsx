// RESPONSIBILITY: Renders ManagerDashboardOverviewRecentMembers's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';

import { Search } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

import ManagerPagination from '@/components/ui/manager_pagination/ManagerPagination';

import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureEnvConfig';
import { useManagerInfrastructureDebounce } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureDebounce';

import { useManagerInfrastructureNavigationDestination } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureNavigationDestination';

import { DASHBOARD_RECENT_MEMBERS_PAGE_SIZE, RECENT_MEMBERS_HEADERS, DASHBOARD_STATUS_STYLES } from '@/app/frontend_manager/manager_dashboard/dashboard_overview/constants/manager_dashboard_overview_shared.constants';
import { useDashboardStatsQuery } from '@/app/frontend_manager/manager_dashboard/dashboard_overview/hooks/useManagerDashboardOverviewQueries';
import { useManagerDashboardOverviewUrlState } from '@/app/frontend_manager/manager_dashboard/dashboard_overview/hooks/useManagerDashboardOverviewUrlState';
import { ManagerDashboardOverviewFormatCurrency, ManagerDashboardOverviewFormatDate, ManagerDashboardOverviewDisplayValue } from '@/app/frontend_manager/manager_dashboard/dashboard_overview/utils/ManagerDashboardOverviewFormatters';
/** @description Renders the ManagerDashboardOverviewRecentMembers component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (8 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerDashboardOverviewRecentMembers() {
  const t = useTranslations('MANAGER_DASHBOARD');
  const navigationDestination = useManagerInfrastructureNavigationDestination('MEMBERS');
  const locale = useLocale();

  const { range } = useManagerDashboardOverviewUrlState();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.get('recentMembersSearch') || '';
  const currentPage = Number(searchParams.get('recentMembersPage') || '1');
  const [localSearch, setLocalSearch] = useState(search);
  const debouncedSearch = useManagerInfrastructureDebounce(localSearch, 300);
  const queryParams = useMemo(() => ({ range, recentMembersSearch: debouncedSearch, recentMembersPage: String(currentPage), recentMembersLimit: String(DASHBOARD_RECENT_MEMBERS_PAGE_SIZE) }), [range, debouncedSearch, currentPage]);
  const { data: stats } = useDashboardStatsQuery(queryParams);

  if (!stats) return null;
  const paginated = stats.recentMembers || [];
  const totalRecentMembers = stats.totalRecentMembers ?? paginated.length;
  const totalPages = Math.max(1, Math.ceil(totalRecentMembers / DASHBOARD_RECENT_MEMBERS_PAGE_SIZE));

  const handleSearchChange = (value: string) => {
    setLocalSearch(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set('recentMembersSearch', value); else params.delete('recentMembersSearch');
    params.set('recentMembersPage', '1');
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('recentMembersPage', String(page));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="xl:col-span-2 rounded-xl shadow-card border overflow-hidden bg-card border-border motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:hover:-translate-y-1">
      <div className="min-w-0 px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-3 border-b border-border">
        <h2 className="font-semibold text-text-primary">{t("COPY_RECENT_MEMBERS")}</h2>
        <div className="min-w-0 flex flex-wrap items-center gap-3">
          <div className="relative min-w-0 w-full sm:w-auto">
            <Search size={18} strokeWidth={2} className="absolute start-2.5 top-1/2 -translate-y-1/2 text-text-secondary" />
            <input className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "ps-8 pe-3 py-1.5 min-h-11 text-sm border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page w-full sm:w-52 max-w-full bg-input text-text-primary"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_dashboard-manager-dashboard-recent-members-input-value"
              value={localSearch}
              onChange={e => handleSearchChange(e.target.value)}
              placeholder={t("COPY_SEARCH_MEMBERS")}
              
             aria-label={t("COPY_SEARCH_MEMBERS")}/>
          </div>
          <Link data-testid="manager_dashboard-manager-dashboard-recent-members-navigation" href={navigationDestination} className="text-sm font-medium hover:underline text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page">{t("COPY_VIEW_ALL")}</Link>
        </div>
      </div>

      <div className="md:hidden space-y-3 p-3" data-testid="manager_dashboard-dashboard-recent-members-mobile-list" role="list" aria-label={t('COPY_RECENT_MEMBERS_TABLE_LABEL')}>
        {paginated.map((m) => {
          const statusStyle = DASHBOARD_STATUS_STYLES[m.status] || { bg: 'bg-input', text: 'text-text-secondary' };
          const statusKey = m.status === 'ACTIVE' ? 'COPY_STATUS_ACTIVE' : m.status === 'PENDING' ? 'COPY_STATUS_PENDING' : m.status === 'EXPIRED' ? 'COPY_STATUS_EXPIRED' : null;
          return (
            <article key={m.id} role="listitem" className="min-w-0 rounded-lg border border-border bg-card p-3">
              <div className="flex min-w-0 flex-wrap items-start justify-between gap-2">
                <h3 className="min-w-0 break-words font-medium text-text-primary">{m.name}</h3>
                <span data-testid={`manager_dashboard-dashboard-recent-members-status-${m.id}`} className={`inline-flex max-w-full whitespace-normal break-words rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyle.bg} ${statusStyle.text}`}>
                  {statusKey ? t(statusKey) : m.status}
                </span>
              </div>
              <dl className="mt-3 grid min-w-0 grid-cols-1 gap-2 text-sm">
                <div className="flex min-w-0 flex-wrap justify-between gap-x-3 gap-y-1">
                  <dt className="text-text-secondary">{t('COPY_PLAN')}</dt>
                  <dd className="min-w-0 break-words text-end text-text-primary">{typeof m.plan === 'string' ? m.plan : ManagerDashboardOverviewDisplayValue(m.plan?.name)}</dd>
                </div>
                <div className="flex min-w-0 flex-wrap justify-between gap-x-3 gap-y-1">
                  <dt className="text-text-secondary">{t('COPY_JOINED')}</dt>
                  <dd className="min-w-0 break-words text-end text-text-primary">{ManagerDashboardOverviewFormatDate(m.joinDate, locale)}</dd>
                </div>
                <div className="flex min-w-0 flex-wrap justify-between gap-x-3 gap-y-1">
                  <dt className="text-text-secondary">{t('COPY_AMOUNT')}</dt>
                  <dd className="min-w-0 break-words text-end font-medium text-text-primary">{ManagerDashboardOverviewFormatCurrency(m.paidAmount, ManagerEnvConfig.currencyCode, locale)}</dd>
                </div>
              </dl>
            </article>
          );
        })}
        {paginated.length === 0 && (
          <p className="py-8 text-center text-sm text-text-secondary">
            {search ? t('TEXT_NO_MEMBERS_MATCHING_QUERY', { query: search }) : t('COPY_NO_MEMBERS_YET_ADD_FIRST_MEMBER')}
          </p>
        )}
      </div>

      <div className="hidden max-w-full overflow-x-auto md:block" tabIndex={0} role="region" aria-label={t('COPY_RECENT_MEMBERS_TABLE_LABEL')} data-testid="manager_dashboard-dashboard-recent-members-desktop-table">
        <table className="w-full">
          <caption className="sr-only">{t('COPY_RECENT_MEMBERS_TABLE_LABEL')}</caption>
          <thead className="bg-primary-subtle">
            <tr>
              {RECENT_MEMBERS_HEADERS.map(h => (
                <th key={h} scope="col" className="text-start text-xs font-semibold uppercase tracking-wider px-6 py-3 text-text-secondary">{t(h)}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginated.map(m => {
              const statusStyle = DASHBOARD_STATUS_STYLES[m.status] || { bg: 'bg-input', text: 'text-text-secondary' };
              return (
                <tr key={m.id} className="motion-safe:transition-all hover:bg-primary-subtle bg-card motion-safe:duration-200 ease-in-out">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm bg-primary-subtle text-primary">
                        {m.name.charAt(0) || '?'}
                      </div>
                      <span className="text-sm font-medium text-text-primary">{m.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-secondary">
                    {typeof m.plan === 'string' ? m.plan : ManagerDashboardOverviewDisplayValue(m.plan?.name)}
                  </td>
                  <td className="px-6 py-4">
                    <span data-testid={`manager_dashboard-dashboard-recent-members-mobile-status-${m.id}`} className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusStyle.bg} ${statusStyle.text}`}>
                      {m.status === 'ACTIVE' ? t('COPY_STATUS_ACTIVE') : m.status === 'PENDING' ? t('COPY_STATUS_PENDING') : m.status === 'EXPIRED' ? t('COPY_STATUS_EXPIRED') : m.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-secondary">
                    {ManagerDashboardOverviewFormatDate(m.joinDate, locale)}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-text-primary">{ManagerDashboardOverviewFormatCurrency(m.paidAmount, ManagerEnvConfig.currencyCode, locale)}</td>
                </tr>
              );
            })}
            {paginated.length === 0 && (
              <tr>
                <td colSpan={RECENT_MEMBERS_HEADERS.length} className="text-center py-8 text-sm text-text-secondary">
                  {search ? t('TEXT_NO_MEMBERS_MATCHING_QUERY', { query: search }) : t('COPY_NO_MEMBERS_YET_ADD_FIRST_MEMBER')}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="border-t border-border mt-2 p-2">
          <ManagerPagination data-testid="manager_dashboard-managerdashboardrecentmembers-managerpagination-1" 
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalRecentMembers}
            itemsPerPage={DASHBOARD_RECENT_MEMBERS_PAGE_SIZE}
            onPageChange={handlePageChange}
          />
        </div>
    </div>
  );
}
