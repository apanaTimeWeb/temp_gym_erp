"use client";
// RESPONSIBILITY: Table showing blacklisted members with toggle and remove actions.
// DATA FLOW: feature data/state and user input → AdminMembersBlacklistManagementTable → accessible UI/events routed to owning hooks (admin_blacklist/blacklist_management/components/table/AdminMembersBlacklistManagementTable.tsx)

import { useTranslations, useLocale } from 'next-intl';
import { useMemo, useState } from 'react';
import { ArrowUpDown } from 'lucide-react';
import { formatAdminBlacklistDate } from '@/app/frontend_admin/admin_members/members_blacklist_management/utils/AdminMembersBlacklistManagementDateFormatter';

import { Globe, Building2, ToggleLeft, ToggleRight, Trash2, Unlock } from 'lucide-react';
import { useAdminBlacklistLogic } from '@/app/frontend_admin/admin_members/members_blacklist_management/hooks/useAdminMembersBlacklistManagementLogic';
import type { BlacklistedMember } from '@/app/frontend_admin/admin_members/members_blacklist_management/types/AdminMembersBlacklistManagementTypes';
import AdminNavigationLayoutTableSkeleton from '@/app/frontend_admin/admin_members/members_blacklist_management/components/AdminMembersBlacklistManagementTableSkeleton';
import AdminNavigationLayoutPagination from '@/app/frontend_admin/admin_members/members_blacklist_management/components/AdminMembersBlacklistManagementPagination';
import AdminBlacklistEmptyState from '@/app/frontend_admin/admin_members/members_blacklist_management/components/empty_state/AdminMembersBlacklistManagementEmptyState';
import { maskSensitiveData } from '@/app/frontend_admin/admin_members/members_blacklist_management/utils/AdminMembersBlacklistManagementMaskSensitiveData';
import { displayValue } from '@/app/frontend_admin/admin_members/members_blacklist_management/utils/AdminMembersBlacklistManagementDisplayValue';
import { BLACKLIST_SCOPE_VALUES, BLACKLIST_SCOPE_STYLES, BLACKLIST_STATUS_STYLES } from '@/app/frontend_admin/admin_members/members_blacklist_management/constants/AdminMembersBlacklistManagementConstants';

const HEADER_KEYS = [
  'blacklist.admin_blacklist_table.member',
  'blacklist.admin_blacklist_table.contact',
  'blacklist.admin_blacklist_table.reason',
  'blacklist.admin_blacklist_table.scope',
  'blacklist.admin_blacklist_table.blacklistedBy',
  'blacklist.admin_blacklist_table.date',
  'blacklist.admin_blacklist_table.status',
  'blacklist.admin_blacklist_table.actions',
] as const;

/**
 * AdminMembersBlacklistManagementTable renders the admin blacklist table UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminMembersBlacklistManagementTable: Table showing blacklisted members with toggle and remove actions.
 * @dependencies Consumes useAdminBlacklistLogic, AdminBlacklistTypes, AdminNavigationLayoutTableSkeleton, AdminNavigationLayoutPagination, AdminBlacklistEmptyState.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminMembersBlacklistManagementTable() {
  const t = useTranslations();
  const locale = useLocale();

  const { members, status, error, retry, removeFromBlacklist, toggleBlacklist, currentPage, setCurrentPage, totalPages, totalItems } = useAdminBlacklistLogic();
  type SortKey = 'memberName' | 'reason' | 'scope' | 'blacklistedBy' | 'blacklistedAt' | 'isActive';
  const [sortKey, setSortKey] = useState<SortKey>('blacklistedAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const sortableFields: Record<string, SortKey | undefined> = {
    'blacklist.admin_blacklist_table.member': 'memberName',
    'blacklist.admin_blacklist_table.reason': 'reason',
    'blacklist.admin_blacklist_table.scope': 'scope',
    'blacklist.admin_blacklist_table.blacklistedBy': 'blacklistedBy',
    'blacklist.admin_blacklist_table.date': 'blacklistedAt',
    'blacklist.admin_blacklist_table.status': 'isActive',
  };
  const sortedMembers = useMemo(() => [...members].sort((left, right) => {
    const a = left[sortKey];
    const b = right[sortKey];
    const result = typeof a === 'boolean' && typeof b === 'boolean' ? Number(a) - Number(b) : String(a ?? '').localeCompare(String(b ?? ''), locale, { numeric: true, sensitivity: 'base' });
    return sortDirection === 'asc' ? result : -result;
  }), [members, sortDirection, sortKey, locale]);
  const activateSort = (field: SortKey) => {
    if (field === sortKey) setSortDirection((current) => current === 'asc' ? 'desc' : 'asc');
    else { setSortKey(field); setSortDirection(field === 'blacklistedAt' ? 'desc' : 'asc'); }
  };

  if (status === 'pending') return <AdminNavigationLayoutTableSkeleton rows={5} cols={HEADER_KEYS.length} />;
  if (status === 'error') return <div role="alert" className="space-y-3 rounded-xl border border-danger bg-danger-bg p-4"><p>{t('blacklist.table.loadError')}</p><button type="button" onClick={() => retry()} className="min-h-11 rounded-lg border border-border px-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="blacklist-management-blacklist-management-table-retry">{t('blacklist.table.retry')}</button></div>;
  if (members.length === 0) return <AdminBlacklistEmptyState />;

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table data-admin-responsive-table className="w-full">
          <thead>
            <tr className="bg-danger-bg">
              {HEADER_KEYS.map(h => {
                const field = sortableFields[h];
                const ariaSort = field !== sortKey ? 'none' : sortDirection === 'asc' ? 'ascending' : 'descending';
                return <th key={h} scope="col" aria-sort={field ? ariaSort : undefined} className="px-4 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider whitespace-nowrap">
                  {field ? <button type="button" onClick={() => activateSort(field)} className="inline-flex items-center gap-1.5 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label={t(h)} data-testid="blacklist-management-blacklist-management-table-button">{t(h)}<ArrowUpDown size={14} aria-hidden="true" /></button> : t(h)}
                </th>;
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedMembers.map((m: BlacklistedMember , __testIdIndex41) => (
              <tr key={m.id} className="hover:bg-danger-bg motion-safe:transition-colors group motion-safe:duration-base">
                <td className="px-4 py-3">
                  <p className="text-sm font-medium text-primary">{m.memberName}</p>
                  <p className="text-xs text-secondary">{t('blacklist.admin_blacklist_table.text_d789a1e992')}{m.memberId}</p>
                </td>
                <td className="px-4 py-3">
                  <p className="text-sm text-primary">{maskSensitiveData(m.memberPhone)}</p>
                  <p className="text-xs text-secondary truncate max-w-40">{displayValue(m.memberEmail)}</p>
                </td>
                <td className="px-4 py-3 max-w-56">
                  <p className="text-sm text-primary line-clamp-2">{m.reason}</p>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${m.scope === 'global' ? 'bg-danger-bg text-danger-text' : 'bg-warning-bg text-warning'}`} data-testid={`admin_blacklist-adminblacklisttable-status-1-map41-${__testIdIndex41}-1`}>
                    {m.scope === BLACKLIST_SCOPE_VALUES.GLOBAL ? <Globe size={18}  strokeWidth={2}/> : <Building2 size={18}  strokeWidth={2}/>}
                    {m.scope === BLACKLIST_SCOPE_VALUES.GLOBAL ? t('blacklist.admin_blacklist_table.auto_4666088d01') : m.assignedGymNames.join(', ')}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-secondary">{m.blacklistedBy}</td>
                <td className="px-4 py-3 text-sm text-secondary whitespace-nowrap">{formatAdminBlacklistDate(m.blacklistedAt, locale)}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${BLACKLIST_STATUS_STYLES[m.isActive ? 'active' : 'inactive']}`} data-testid={`admin_blacklist-adminblacklisttable-status-2-map41-${__testIdIndex41}-2`}>
                    {m.isActive ? t('blacklist.admin_blacklist_table.auto_0aecfd61ed') : t('blacklist.admin_blacklist_table.auto_dfef94ff4f')}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100 motion-safe:transition-opacity motion-safe:duration-base">
                    <button type="button" onClick={() => toggleBlacklist(m.id)} className="min-h-11 min-w-11 p-1.5 rounded-lg hover:bg-input text-secondary hover:text-primary motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out motion-safe:active:scale-95" aria-label={t('blacklist.admin_blacklist_table.text_e922812370')} data-testid={`admin_blacklist-admin_blacklist-table-click-map41-${__testIdIndex41}-3`}>
                      {m.isActive ? <ToggleRight size={18} className="text-danger"  strokeWidth={2}/> : <ToggleLeft size={18}  strokeWidth={2}/>}
                    </button>
                    <button type="button" onClick={() => removeFromBlacklist(m.id, m.memberName)} className="min-h-11 min-w-11 p-1.5 rounded-lg hover:bg-success-bg text-secondary hover:text-success motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out motion-safe:active:scale-95" aria-label={t('blacklist.admin_blacklist_table.text_ed59206098')} title={t('blacklist.admin_blacklist_table.text_12aabd251c')} data-testid={`admin_blacklist-admin_blacklist-table-click-2-map41-${__testIdIndex41}-4`}>
                      <Unlock size={18}  strokeWidth={2}/>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border-t border-border">
        <AdminNavigationLayoutPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} totalItems={totalItems} itemsPerPage={10} />
      </div>
    </div>
  );
}
