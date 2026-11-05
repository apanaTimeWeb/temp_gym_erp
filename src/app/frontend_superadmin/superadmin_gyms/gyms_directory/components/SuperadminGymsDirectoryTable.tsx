// RESPONSIBILITY: Renders/orchestrates SuperadminGymsTable within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders and composes SuperadminGymsTable for the owning feature module; business logic and API transport remain in module-owned hooks/services.


import { Ban, LogIn, PlayCircle, MessageCircle, Trash2, Loader2 } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

import CopyButton from '@/components/ui/CopyButton';
import Pagination from '@/components/ui/Pagination';
import { maskSensitiveData } from '@/lib/formatters';

import SuperadminGymsEmptyState from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/components/SuperadminGymsDirectoryEmptyState';
import SuperadminGymsGymDeleteModal from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/components/SuperadminGymsDirectoryGymDeleteModal';
import SuperadminGymsGymEditModal from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/components/SuperadminGymsDirectoryGymEditModal';
import SuperadminGymsGymWhatsappModal from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/components/SuperadminGymsDirectoryGymWhatsappModal';
import SuperadminGymsTableSortIcon from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/components/SuperadminGymsDirectoryTableSortIcon';
import { GYMS_PLAN_COLORS, SUPERADMIN_GYM_STATUS_CODES, getSuperadminGymStatusBadgeClasses } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/constants/superadmin_gyms_directory.constants';
import { useSuperadminGymsDirectoryTable } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/hooks/useSuperadminGymsDirectoryTable';
import { formatCurrency as SuperadminGymsFormatCurrency } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/utils/SuperadminGymsDirectoryFormatCurrency';
import { formatSuperadminGymsDate } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/utils/SuperadminGymsDirectoryFormatDate';

import type { Tenant } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/types/superadmin_gyms_directory.types';
import type { KeyboardEvent } from 'react';

// Rule 68: TABLE_COLUMN_COUNT must match <th> count AND colSpan on empty state
const TABLE_COLUMN_COUNT = 8; // Name | Owner | Plan | Members | MRR | Status | Last Login | Actions
/**
 * Returns the Tailwind badge classes for a given plan tier name.
 * Source of truth: GYMS_PLAN_COLORS constant â€” never inline in JSX.
 */
function getPlanBadgeClasses(plan: string | undefined): string {
    const key = plan?.toUpperCase() as keyof typeof GYMS_PLAN_COLORS;
    return GYMS_PLAN_COLORS[key] ?? GYMS_PLAN_COLORS.DEFAULT;
}
/**
 * @description Renders GymsTable within the owning Superadmin feature module.
 * @dependencies Uses only dependencies declared in this module file and documented feature infrastructure.
 * @edge-case Preserves documented loading, empty, error, disabled, retry, and repeated-action behavior.
 */
export default function SuperadminGymsDirectoryTable() {
  const t = useTranslations('superadmin_gyms');
    const locale = useLocale();

    const { filteredGyms, isPending, isError, total, actionLoadingId, handleRowClick, onGhostLoginClick, onSuspendClick, onDeleteClick, openWhatsappModal, currentPage, pageLimit, setCurrentPage, setSortBy, setSortOrder, sortBy, sortOrder, refetch } = useSuperadminGymsDirectoryTable();
    const totalPages = Math.ceil(total / pageLimit) || 1;
    const handleSort = (col: string) => {
        if (sortBy === col) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        }
        else {
            setSortBy(col);
            setSortOrder('desc');
        }
    };
    if (isPending) {
        return (<div className="overflow-x-auto">
        <table className="w-full text-start border-collapse">
          <thead>
            <tr className="bg-primary-subtle border-b border-border">
              {[t('ui.gym_name_4ad76c40'), t('ui.owner_b6f4a2ec'), t('ui.plan_0b6cbdf7'), t('ui.members_ef53538a'), t('ui.mrr_35432afe'), t('ui.status_ec53a8c4'), t('ui.last_active_b32a44ea'), t('ui.actions_06df3300')].map((h) => (<th key={h} className="p-4">
                  <div className="h-3 bg-skeleton-base motion-safe:animate-pulse rounded w-16"/>
                </th>))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {[...Array(5)].map((_, i) => (<tr key={`skeleton-row-${i}`}>
                <td className="p-4"><div className="h-4 bg-skeleton-base motion-safe:animate-pulse rounded w-32"/></td>
                <td className="p-4"><div className="h-4 bg-skeleton-base motion-safe:animate-pulse rounded w-24"/></td>
                <td className="p-4"><div className="h-5 bg-skeleton-base motion-safe:animate-pulse rounded-full w-16"/></td>
                <td className="p-4"><div className="h-4 bg-skeleton-base motion-safe:animate-pulse rounded w-10 ms-auto"/></td>
                <td className="p-4"><div className="h-4 bg-skeleton-base motion-safe:animate-pulse rounded w-20 ms-auto"/></td>
                <td className="p-4"><div className="h-5 bg-skeleton-base motion-safe:animate-pulse rounded-full w-16 mx-auto"/></td>
                <td className="p-4"><div className="h-4 bg-skeleton-base motion-safe:animate-pulse rounded w-20 ms-auto"/></td>
                <td className="p-4"><div className="h-6 bg-skeleton-base motion-safe:animate-pulse rounded w-20 ms-auto"/></td>
              </tr>))}
          </tbody>
        </table>
      </div>);
    }
    if (isError) {
        return (<div role="alert" className="flex min-h-80 flex-col items-center justify-center gap-3 rounded-xl border border-border bg-danger-bg p-8 text-center" data-testid="superadmin_gyms-table-error-state">
        <p className="text-danger">{t('ui.unable_to_load_gyms_296d2be0')}</p>
        <button type="button" onClick={() => void refetch()} className="min-h-11 rounded-md border border-border px-4 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="superadmin_gyms-superadmin-gyms-table-superadmin-gyms-table-retry">{t('ui.retry_6327b4e5')}</button>
      </div>);
    }
    return (<div className="overflow-x-auto flex flex-col min-h-96">
      <table className="w-full text-start border-collapse flex-1">
        <thead>
          <tr className="bg-primary-subtle border-b border-border text-secondary text-sm">
            <th className="sticky start-0 z-20 w-48 bg-primary-subtle p-4 font-semibold uppercase text-xs tracking-wider">{t('ui.gym_name_4ad76c40')}</th>
            <th className="p-4 font-semibold uppercase text-xs tracking-wider min-w-40">{t('ui.owner_b6f4a2ec')}</th>
            <th className="p-4 font-semibold uppercase text-xs tracking-wider w-32">{t('ui.plan_0b6cbdf7')}</th>
            <th className="p-2 font-semibold uppercase text-xs tracking-wider text-end w-24" aria-sort={(() => { if (sortBy === 'memberCount') { if (sortOrder === 'asc') { return ('ascending'); } return ('descending'); } return ('none'); })()}>
              <button type="button" onClick={() => handleSort('memberCount')} className="min-h-11 w-full justify-end rounded-md px-2 text-end hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-colors" aria-label={t('ui.sort_member_count_aria', { order: (() => { if (sortBy === 'memberCount') { if (sortOrder === 'asc') { return (t('ui.descending')); } return (t('ui.ascending')); } return (t('ui.descending')); })() })} data-testid="superadmin_gyms-superadmin-gyms-table-superadmin-gyms-table-button">
                <span className="inline-flex items-center gap-1">{t('ui.members_ef53538a')}<SuperadminGymsTableSortIcon col="memberCount" active={sortBy === 'memberCount'} /></span>
              </button>
            </th>
            <th className="p-2 font-semibold uppercase text-xs tracking-wider text-end w-32" aria-sort={(() => { if (sortBy === 'monthlyRevenue') { if (sortOrder === 'asc') { return ('ascending'); } return ('descending'); } return ('none'); })()}>
              <button type="button" onClick={() => handleSort('monthlyRevenue')} className="min-h-11 w-full justify-end rounded-md px-2 text-end hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-colors" aria-label={t('ui.sort_monthly_revenue_aria', { order: (() => { if (sortBy === 'monthlyRevenue') { if (sortOrder === 'asc') { return (t('ui.descending')); } return (t('ui.ascending')); } return (t('ui.descending')); })() })} data-testid="superadmin_gyms-table-sort-monthly-revenue">
                <span className="inline-flex items-center gap-1">{t('ui.mrr_35432afe')}<SuperadminGymsTableSortIcon col="monthlyRevenue" active={sortBy === 'monthlyRevenue'} /></span>
              </button>
            </th>
            <th className="p-4 font-semibold uppercase text-xs tracking-wider text-center w-32">{t('ui.status_ec53a8c4')}</th>
            <th className="p-2 font-semibold uppercase text-xs tracking-wider text-end w-32" aria-sort={(() => { if (sortBy === 'lastActiveAt') { if (sortOrder === 'asc') { return ('ascending'); } return ('descending'); } return ('none'); })()}>
              <button type="button" onClick={() => handleSort('lastActiveAt')} className="min-h-11 w-full justify-end rounded-md px-2 text-end hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-colors" aria-label={t('ui.sort_last_active_time_aria', { order: (() => { if (sortBy === 'lastActiveAt') { if (sortOrder === 'asc') { return (t('ui.descending')); } return (t('ui.ascending')); } return (t('ui.descending')); })() })} data-testid="superadmin_gyms-table-sort-last-active">
                <span className="inline-flex items-center gap-1">{t('ui.last_active_b32a44ea')}<SuperadminGymsTableSortIcon col="lastActiveAt" active={sortBy === 'lastActiveAt'} /></span>
              </button>
            </th>
            <th className="p-4 font-semibold uppercase text-xs tracking-wider text-end w-40">{t('ui.actions_06df3300')}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {filteredGyms.map((gym: Tenant) => {
            const isActionLoading = actionLoadingId === gym.id;
            const maskedAdminEmail = maskSensitiveData(gym.adminEmail, 'email');
            const handleRowKeyDown = (event: KeyboardEvent<HTMLTableRowElement>) => {
              if (event.target !== event.currentTarget) return;
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                handleRowClick(gym);
              }
            };
            return (<tr key={gym.id} onClick={() => handleRowClick(gym)} onKeyDown={handleRowKeyDown} tabIndex={0} className="hover:bg-card focus-visible:bg-card motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset" data-testid={`superadmin_gyms-table-row-${gym.id}`}>
                <td className="sticky start-0 z-10 max-w-48 border-e border-border bg-card p-4 group-hover:bg-surface-hover group-focus-visible:bg-surface-hover">
                  <p className="font-semibold text-primary truncate" title={gym.name}>{gym.name}</p>
                  <span className="flex items-center gap-1 text-xs text-disabled mt-1">
                    <span className="truncate font-mono" title={gym.id}>{gym.id}</span>
                    <CopyButton value={gym.id} label={`Copy gym ID ${gym.id}`} data-testid="superadmin_gyms-table-copy-id"/>
                  </span>
                </td>
                <td className="p-4 max-w-40">
                  <p className="text-secondary truncate" title={gym.ownerName}>{gym.ownerName}</p>
                  <p className="text-xs text-disabled mt-1 truncate" title={maskedAdminEmail}>{maskedAdminEmail}</p>
                </td>
                <td className="px-4 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide ${getPlanBadgeClasses(gym.plan)}`}>
                    {gym.plan?.toUpperCase() || 'UNKNOWN'}
                  </span>
                </td>
                <td className="p-4 text-secondary font-medium text-end">
                  {gym.memberCount}
                </td>
                <td className="p-4 text-success font-medium text-end">
                  {/* Design Â§21: Indian Numbering System â€” â‚¹1,23,456 */}
                  {SuperadminGymsFormatCurrency(gym.monthlyRevenue, gym.currency || 'INR', locale)}
                </td>
                <td className="p-4">
                  <div className="flex justify-center">
                    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${getSuperadminGymStatusBadgeClasses(gym.status)}`}>
                      {(() => { if (gym.status === SUPERADMIN_GYM_STATUS_CODES.ACTIVE) { return (t('ui.active_4d3d769b')); } if (gym.status === SUPERADMIN_GYM_STATUS_CODES.SUSPENDED) { return (t('ui.suspended_8bf90683')); } if (gym.status === SUPERADMIN_GYM_STATUS_CODES.TRIAL) { return (t('ui.status_trial')); } if (gym.status === SUPERADMIN_GYM_STATUS_CODES.EXPIRED) { return (t('ui.status_expired')); } return (t('ui.status_cancelled')); })()}
                    </span>
                  </div>
                </td>
                <td className="p-4 text-end">
                  <span className="text-xs text-secondary">
                    {formatSuperadminGymsDate(gym.lastActiveAt ?? gym.lastLoginAt, locale)}
                  </span>
                </td>
                <td className="p-4 text-end">
                  {/* Rule 64: opacity-100 on mobile, hover-only on lg+ */}
                  <div className="flex items-center justify-end gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100 motion-safe:transition-opacity">
                    {isActionLoading ? (<div className="p-2 text-primary">
                        <Loader2 size={18} className="motion-safe:animate-spin"/>
                      </div>) : (<>
                        <button type="button" onClick={(e) => onGhostLoginClick(e, gym.id, gym.name)} className="min-h-11 min-w-11 p-2 text-primary hover:bg-primary-subtle rounded-lg motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" title={t('ui.ghost_login_login_as_admin_a57b6a13')} aria-label={t('ui.ghost_login_aria', { name: gym.name })} data-testid="superadmin_gyms-superadmin-gyms-table-login-login-as-admin">
                          <LogIn size={18}/>
                        </button>
                        <button type="button" onClick={(e) => onSuspendClick(e, gym.id, gym.name, gym.status)} className={`min-h-11 min-w-11 p-2 rounded-lg motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page ${gym.status === SUPERADMIN_GYM_STATUS_CODES.SUSPENDED
                        ? 'text-success hover:bg-success-bg'
                        : 'text-danger hover:bg-danger-bg'}`} title={gym.status === SUPERADMIN_GYM_STATUS_CODES.SUSPENDED ? t('ui.activate_gym_aria', { name: gym.name }) : t('ui.suspend_gym_aria', { name: gym.name })} aria-label={gym.status === SUPERADMIN_GYM_STATUS_CODES.SUSPENDED ? t('ui.activate_gym_aria', { name: gym.name }) : t('ui.suspend_gym_aria', { name: gym.name })} data-testid="superadmin_gyms-table-toggle-status">
                          {gym.status === SUPERADMIN_GYM_STATUS_CODES.SUSPENDED ? <PlayCircle size={18}/> : <Ban size={18}/>}
                        </button>
                        <button type="button" onClick={(e) => { e.stopPropagation(); openWhatsappModal(gym); }} className="min-h-11 min-w-11 p-2 text-secondary hover:bg-success-bg hover:text-success rounded-lg motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" title={t('ui.whatsapp_owner_d88ef9f0')} aria-label={t('ui.whatsapp_owner_aria', { name: gym.name })} data-testid="superadmin_gyms-superadmin-gyms-table-table-whats-app-owner">
                          <MessageCircle size={18}/>
                        </button>

                        <button type="button" onClick={(e) => onDeleteClick(e, gym)} className="min-h-11 min-w-11 p-2 text-secondary hover:bg-danger-bg hover:text-danger rounded-lg motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" title={t('ui.delete_gym_326630c6')} aria-label={t('ui.delete_gym_aria', { name: gym.name })} data-testid="superadmin_gyms-superadmin-gyms-table-gyms-table-delete-gym">
                          <Trash2 size={18}/>
                        </button>
                      </>)}
                  </div>
                </td>
              </tr>);
        })}

          {filteredGyms.length === 0 && (<tr>
              {/* Rule 68: colSpan must exactly match TABLE_COLUMN_COUNT */}
              <td colSpan={TABLE_COLUMN_COUNT}><SuperadminGymsEmptyState /></td>
            </tr>)}
        </tbody>
      </table>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} data-testid="superadmin_gyms-superadmin-gyms-table-superadmin-gyms-table-pagination"/>

      <SuperadminGymsGymEditModal />
      <SuperadminGymsGymWhatsappModal />
      <SuperadminGymsGymDeleteModal />
    </div>);
}

