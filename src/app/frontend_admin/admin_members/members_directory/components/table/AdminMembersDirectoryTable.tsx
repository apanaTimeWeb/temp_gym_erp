"use client";
// RESPONSIBILITY: Renders the paginated members table with clickable rows, status badges, and branch info.
// DATA FLOW: feature data/state and user input → AdminMembersDirectoryTable → accessible UI/events routed to owning hooks (admin_members/members_directory/components/table/AdminMembersDirectoryTable.tsx)

import { useLocale, useTranslations } from 'next-intl';
import { formatDate } from '@/app/frontend_admin/admin_members/members_directory/utils/AdminMembersDirectoryFormatters';

import { useAdminMembersLogic } from '@/app/frontend_admin/admin_members/members_directory/hooks/useAdminMembersDirectoryLogic';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ADMIN_MEMBERS_ROUTES } from '@/app/frontend_admin/admin_members/members_directory/config/admin_members_directory.url_config';
import { useAdminMembersStore } from '@/app/frontend_admin/admin_members/members_directory/state/useAdminMembersDirectoryStore';
import AdminMembersEmptyState from '@/app/frontend_admin/admin_members/members_directory/components/empty_state/AdminMembersDirectoryEmptyState';
import AdminNavigationLayoutPagination from '@/app/frontend_admin/admin_members/members_directory/components/AdminMembersDirectoryPagination';
import { AdminMembersFormatCurrency } from '@/app/frontend_admin/admin_members/members_directory/utils/AdminMembersDirectoryFormatCurrency';

import { maskSensitiveData } from '@/app/frontend_admin/admin_members/members_directory/utils/AdminMembersDirectoryMaskSensitiveData';
import { ADMIN_MEMBERS_ITEMS_PER_PAGE, MEMBER_STATUS_LABEL_KEYS, MEMBER_STATUS_STYLES, MEMBER_TABLE_HEADER_KEYS } from '@/app/frontend_admin/admin_members/members_directory/constants/AdminMembersDirectoryConstants';


/**
 * AdminMembersDirectoryTable renders the admin members table UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminMembersDirectoryTable: Renders the paginated members table with clickable rows, status badges, and branch info.
 * @dependencies Consumes AdminMembersFormatters, useAdminMembersLogic, admin_members_url_config, useAdminMembersStore, AdminMembersEmptyState.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminMembersDirectoryTable() {
  const locale = useLocale();
  const t = useTranslations();
  const { members, allFilteredCount, totalPages, status, retryMembers } = useAdminMembersLogic();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { search, statusFilter, branchFilter, expiryFilter, genderFilter, planFilter, currentPage, setCurrentPage } = useAdminMembersStore();
  const memberProfileHref = (memberId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('memberId', memberId);
    const query = params.toString();
    return query ? `${ADMIN_MEMBERS_ROUTES.root}?${query}` : ADMIN_MEMBERS_ROUTES.root;
  };

  const hasFilters = search !== '' || statusFilter !== 'all' || branchFilter !== 'all' || expiryFilter !== 'all' || genderFilter !== 'all' || planFilter !== 'all';

  if (status === 'pending') {
    return <div className="space-y-2" aria-busy="true" aria-label={t('members.AdminAuditRepair.listLoading')} data-testid="admin_members-adminmembers-table-loading">
      {['member-row-1', 'member-row-2', 'member-row-3', 'member-row-4', 'member-row-5'].map((key) => <div key={key} className="h-14 rounded-lg border border-border bg-card motion-safe:animate-pulse" />)}
    </div>;
  }
  if (status === 'error') {
    return <div className="rounded-xl border border-border bg-danger-bg p-4 text-sm text-danger" role="alert" data-testid="admin_members-adminmembers-table-error">
      <p>{t('members.AdminAuditRepair.listFailed')}</p>
      <button type="button" onClick={() => void retryMembers()} className="mt-2 min-h-11 rounded-lg px-3 font-semibold text-primary underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="members-directory-members-directory-table-retry-members">{t('members.AdminAuditRepair.retryList')}</button>
    </div>;
  }

  if (members.length === 0) {
    return <AdminMembersEmptyState hasFilters={hasFilters} />;
  }

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table data-admin-responsive-table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-highlight border-b border-border">
              {MEMBER_TABLE_HEADER_KEYS.map((key) => (
                <th key={key} className="px-4 py-3 text-xs font-semibold text-secondary uppercase tracking-wider whitespace-nowrap">
                  {t(key)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {members.map((m , __testIdIndex61) => (
              <tr
                key={m.id}
                role="link"
                tabIndex={0}
                aria-label={t('admin_members_table.auto_openProfile', { name: m.name })}
                onClick={(event) => { if ((event.target as HTMLElement).closest('a,button')) return; router.push(memberProfileHref(m.id)); }}
                onKeyDown={(event) => { if ((event.key === 'Enter' || event.key === ' ') && event.target === event.currentTarget) { event.preventDefault(); router.push(memberProfileHref(m.id)); } }}
                className="hover:bg-surface-highlight motion-safe:transition-colors group motion-safe:duration-base cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                data-testid={`admin_members-admin_members-table-row-map61-${__testIdIndex61}`}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-subtle flex items-center justify-center text-primary text-xs font-bold flex-shrink-0" aria-hidden="true">
                      {m.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <Link href={memberProfileHref(m.id)} aria-label={t('admin_members_table.auto_openProfile', { name: m.name })} className="text-sm font-semibold text-primary underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page rounded" data-testid="members-directory-members-directory-table-admin-members-table-auto-open-profile">
                        {m.name}
                      </Link>
                      <p className="text-xs text-secondary">{maskSensitiveData(m.phone)}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-primary">{m.branchName}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-primary">{m.planName}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-primary whitespace-nowrap">
                    {formatDate(m.joinDate, locale)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${MEMBER_STATUS_STYLES[m.status] ?? 'bg-input text-secondary'}`} data-testid="members-directory-members-directory-table-status-badge">
                    {t(MEMBER_STATUS_LABEL_KEYS[m.status] ?? m.status)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-primary whitespace-nowrap">
                    {formatDate(m.expiryDate, locale)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-sm font-semibold ${m.pendingAmount > 0 ? 'text-danger' : 'text-success'}`}>
                    {m.pendingAmount > 0 ? AdminMembersFormatCurrency(m.pendingAmount, undefined, locale) : '—'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border-t border-border">
        <AdminNavigationLayoutPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={allFilteredCount}
          itemsPerPage={ADMIN_MEMBERS_ITEMS_PER_PAGE}
        />
      </div>
    </div>
  );
}
