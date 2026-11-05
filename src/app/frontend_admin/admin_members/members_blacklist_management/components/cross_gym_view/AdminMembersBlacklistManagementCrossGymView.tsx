"use client";
// RESPONSIBILITY: Consolidated cross-branch view of gym-specific blacklist entries.
// DATA FLOW: feature data/state and user input → AdminMembersBlacklistManagementCrossGymView → accessible UI/events routed to owning hooks (admin_blacklist/blacklist_management/components/cross_gym_view/AdminMembersBlacklistManagementCrossGymView.tsx)

import { useLocale, useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { formatAdminBlacklistDate } from '@/app/frontend_admin/admin_members/members_blacklist_management/utils/AdminMembersBlacklistManagementDateFormatter';
// Shows all branch-scoped bans in one place and allows admin to propagate any entry to all branches.

import { Building2, Globe, ArrowUpRight, Trash2, ArrowUpDown } from 'lucide-react';
import { maskSensitiveData } from '@/app/frontend_admin/admin_members/members_blacklist_management/utils/AdminMembersBlacklistManagementMaskSensitiveData';
import { displayValue } from '@/app/frontend_admin/admin_members/members_blacklist_management/utils/AdminMembersBlacklistManagementDisplayValue';
import { useAdminBlacklistLogic } from '@/app/frontend_admin/admin_members/members_blacklist_management/hooks/useAdminMembersBlacklistManagementLogic';
import type { BlacklistedMember } from '@/app/frontend_admin/admin_members/members_blacklist_management/types/AdminMembersBlacklistManagementTypes';
import AdminNavigationLayoutTableSkeleton from '@/app/frontend_admin/admin_members/members_blacklist_management/components/AdminMembersBlacklistManagementTableSkeleton';
import AdminNavigationLayoutPagination from '@/app/frontend_admin/admin_members/members_blacklist_management/components/AdminMembersBlacklistManagementPagination';

const HEADER_KEYS = [
  'blacklist.admin_blacklist_cross_gym_view.member',
  'blacklist.admin_blacklist_cross_gym_view.contact',
  'blacklist.admin_blacklist_cross_gym_view.reason',
  'blacklist.admin_blacklist_cross_gym_view.bannedAtBranches',
  'blacklist.admin_blacklist_cross_gym_view.blacklistedBy',
  'blacklist.admin_blacklist_cross_gym_view.date',
  'blacklist.admin_blacklist_table.status',
  'blacklist.admin_blacklist_cross_gym_view.actions',
] as const;

/**
 * AdminMembersBlacklistManagementCrossGymView renders the admin blacklist cross gym view UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminMembersBlacklistManagementCrossGymView: Consolidated cross-branch view of gym-specific blacklist entries.
 * @dependencies Consumes AdminNavigationLayoutMaskSensitiveData, AdminNavigationLayoutDisplayValue, useAdminBlacklistLogic, AdminBlacklistTypes, AdminNavigationLayoutTableSkeleton.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminMembersBlacklistManagementCrossGymView() {
  const t = useTranslations();
  const locale = useLocale();
  const { gymSpecificEntries, crossGymStatus, crossGymError, retryCrossGym, propagateToAllBranches, removeFromBlacklist, propagating, currentPage, setCurrentPage, crossGymTotalItems, crossGymTotalPages } = useAdminBlacklistLogic();
  type SortKey = 'memberName' | 'reason' | 'blacklistedBy' | 'blacklistedAt' | 'isActive' | 'assignedGymNames';
  const [sortKey, setSortKey] = useState<SortKey>('blacklistedAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const sortableFields: Record<string, SortKey | undefined> = {
    'blacklist.admin_blacklist_cross_gym_view.member': 'memberName',
    'blacklist.admin_blacklist_cross_gym_view.reason': 'reason',
    'blacklist.admin_blacklist_cross_gym_view.bannedAtBranches': 'assignedGymNames',
    'blacklist.admin_blacklist_cross_gym_view.blacklistedBy': 'blacklistedBy',
    'blacklist.admin_blacklist_cross_gym_view.date': 'blacklistedAt',
    'blacklist.admin_blacklist_table.status': 'isActive',
  };
  const sortedEntries = useMemo(() => [...gymSpecificEntries].sort((left, right) => {
    const a = left[sortKey]; const b = right[sortKey];
    const aValue = Array.isArray(a) ? a.join(', ') : a;
    const bValue = Array.isArray(b) ? b.join(', ') : b;
    const result = typeof aValue === 'boolean' && typeof bValue === 'boolean' ? Number(aValue) - Number(bValue) : String(aValue ?? '').localeCompare(String(bValue ?? ''), locale, { numeric: true, sensitivity: 'base' });
    return sortDirection === 'asc' ? result : -result;
  }), [gymSpecificEntries, locale, sortDirection, sortKey]);
  const activateSort = (field: SortKey) => {
    if (field === sortKey) setSortDirection((current) => current === 'asc' ? 'desc' : 'asc');
    else { setSortKey(field); setSortDirection(field === 'blacklistedAt' ? 'desc' : 'asc'); }
  };

  if (crossGymStatus === 'pending') return <AdminNavigationLayoutTableSkeleton rows={4} cols={HEADER_KEYS.length} />;
  if (crossGymStatus === 'error') return <div role="alert" className="space-y-3 rounded-xl border border-danger bg-danger-bg p-4 text-sm text-danger"><p>{t('blacklist.AdminRepair.crossGymLoadError')}</p><button type="button" onClick={() => void retryCrossGym()} className="min-h-11 rounded-lg border border-border px-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="blacklist-management-blacklist-management-cross-gym-view-retry-cross-gym">{t('blacklist.AdminRepair.retry')}</button></div>;
  if (crossGymError && !gymSpecificEntries.length) return <div role="alert">{t('blacklist.AdminRepair.crossGymLoadError')} <button type="button" onClick={() => void retryCrossGym()} data-testid="blacklist-management-blacklist-management-cross-gym-view-retry-cross-gym-2">{t('blacklist.AdminRepair.retry')}</button></div>;

  if (gymSpecificEntries.length === 0) {
    return (
      <div className="bg-card border border-border rounded-xl p-12 flex flex-col items-center gap-3 text-center">
        <div className="w-12 h-12 rounded-full bg-success-bg flex items-center justify-center" data-testid="admin_blacklist-adminblacklistcrossgymview-status-1">
          <Globe size={18} className="text-success"  strokeWidth={2}/>
        </div>
        <p className="text-base font-semibold text-primary">{t('blacklist.admin_blacklist_cross_gym_view.text_dd683b697d')}</p>
        <p className="text-sm text-secondary max-w-sm">
          {t('blacklist.admin_blacklist_cross_gym_view.text_a956fd7d18')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3 px-4 py-3 bg-warning-bg border border-border rounded-xl">
        <Building2 size={18} className="text-warning mt-0.5 shrink-0"  strokeWidth={2}/>
        <p className="text-sm text-warning">
          <span className="font-semibold">{t('blacklist.admin_blacklist_cross_gym_view.entriesCount', { count: crossGymTotalItems })}</span> {t('blacklist.admin_blacklist_cross_gym_view.text_80929f9c4f')}<span className="font-semibold">{t('blacklist.admin_blacklist_cross_gym_view.text_901bb4c2c3')}</span> {t('blacklist.admin_blacklist_cross_gym_view.text_fcc98f082f')}</p>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table data-admin-responsive-table className="w-full">
            <thead>
              <tr className="bg-warning-bg">
                {HEADER_KEYS.map(h => {
                  const field = sortableFields[h];
                  const ariaSort = field !== sortKey ? 'none' : sortDirection === 'asc' ? 'ascending' : 'descending';
                  return <th key={h} scope="col" aria-sort={field ? ariaSort : undefined} className="px-4 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider whitespace-nowrap">
                    {field ? <button type="button" onClick={() => activateSort(field)} className="inline-flex items-center gap-1.5 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label={t(h)} data-testid="blacklist-management-blacklist-management-cross-gym-view-button">{t(h)}<ArrowUpDown size={14} aria-hidden="true" /></button> : t(h)}
                  </th>;
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sortedEntries.map((m: BlacklistedMember , __testIdIndex64) => (
                <tr key={m.id} className="hover:bg-warning-bg motion-safe:transition-colors group motion-safe:duration-base">
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-primary">{m.memberName}</p>
                    <p className="text-xs text-secondary">{t('blacklist.admin_blacklist_cross_gym_view.text_d789a1e992')}{m.memberId}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-primary">{maskSensitiveData(m.memberPhone)}</p>
                    <p className="text-xs text-secondary truncate max-w-40">{displayValue(m.memberEmail)}</p>
                  </td>
                  <td className="px-4 py-3 max-w-56">
                    <p className="text-sm text-primary line-clamp-2">{m.reason}</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {m.assignedGymNames.map((gym: string , __testIdIndex79) => (
                        <span key={gym} className="inline-flex items-center gap-1 px-2 py-0.5 bg-warning-bg text-warning rounded-full text-xs font-medium" data-testid={`admin_blacklist-adminblacklistcrossgymview-status-2-map64-${__testIdIndex64}-1`}>
                          <Building2 size={18}  strokeWidth={2}/>
                          {gym}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-secondary">{m.blacklistedBy}</td>
                  <td className="px-4 py-3 text-sm text-secondary whitespace-nowrap">{formatAdminBlacklistDate(m.blacklistedAt, locale)}</td>
                  <td className="px-4 py-3"><span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${m.isActive ? 'bg-success-bg text-success' : 'bg-surface-highlight text-secondary'}`} data-testid="blacklist-management-blacklist-management-cross-gym-view-status-badge">{m.isActive ? t('blacklist.admin_blacklist_table.auto_0aecfd61ed') : t('blacklist.admin_blacklist_table.auto_dfef94ff4f')}</span></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100 motion-safe:transition-opacity motion-safe:duration-base">
                      <button type="button"
                        onClick={() => propagateToAllBranches(m.id, m.memberName)}
                        disabled={propagating || !m.isActive}
                        className="min-h-11 min-w-11 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-danger text-on-danger text-xs font-semibold hover:opacity-80 motion-safe:transition-opacity disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out motion-safe:active:scale-95"
                        aria-label={t('blacklist.admin_blacklist_cross_gym_view.text_bb67a0d7d8')}
                       data-testid={`admin_blacklist-admin_blacklist-cross-gym-view-control-map64-${__testIdIndex64}-2`}>
                        <ArrowUpRight size={18}  strokeWidth={2}/>
                        {t('blacklist.admin_blacklist_cross_gym_view.text_901bb4c2c3')}</button>
                      <button type="button"
                        onClick={() => removeFromBlacklist(m.id, m.memberName)}
                        className="min-h-11 min-w-11 p-1.5 rounded-lg hover:bg-danger-bg text-secondary hover:text-danger motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out motion-safe:active:scale-95"
                        aria-label={t('blacklist.admin_blacklist_cross_gym_view.text_95f4f02070')}
                       data-testid={`admin_blacklist-admin_blacklist-cross-gym-view-control-2-map64-${__testIdIndex64}-3`}>
                        <Trash2 size={18}  strokeWidth={2}/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="rounded-xl border border-border bg-card">
        <AdminNavigationLayoutPagination currentPage={currentPage} totalPages={crossGymTotalPages} onPageChange={setCurrentPage} totalItems={crossGymTotalItems} itemsPerPage={10} />
      </div>
    </div>
  );
}
