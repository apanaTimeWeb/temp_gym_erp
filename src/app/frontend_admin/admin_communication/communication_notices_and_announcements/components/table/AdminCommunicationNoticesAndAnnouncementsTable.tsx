"use client";
// RESPONSIBILITY: Announcements table with search/filter toolbar, status badges, pin/edit/delete row actions.
// DATA FLOW: feature data/state and user input → AdminCommunicationNoticesAndAnnouncementsTable → accessible UI/events routed to owning hooks (admin_communication/communication_notices_and_announcements/components/table/AdminCommunicationNoticesAndAnnouncementsTable.tsx)

import { useLocale } from 'next-intl';
import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { formatDate } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/utils/AdminCommunicationNoticesAndAnnouncementsFormatters';
import { formatNumber } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/utils/AdminCommunicationNoticesAndAnnouncementsFormatters';

import { Search, Plus, Pin, PinOff, Edit2, Trash2, Eye, Megaphone, RotateCcw, ArrowUpDown } from 'lucide-react';
import AdminNavigationLayoutPagination from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/components/AdminCommunicationNoticesAndAnnouncementsPagination';
import AdminNavigationLayoutTableSkeleton from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/components/AdminCommunicationNoticesAndAnnouncementsTableSkeleton';
import { useAdminAnnouncementsLogic } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/hooks/useAdminCommunicationNoticesAndAnnouncementsLogic';
import { useAdminAnnouncementsStore } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/state/useAdminCommunicationNoticesAndAnnouncementsStore';
import {
  ANNOUNCEMENT_STATUS_OPTIONS,
  ANNOUNCEMENT_PRIORITY_OPTIONS,
  ANNOUNCEMENT_GYM_OPTIONS,
  ANNOUNCEMENT_STATUS_STYLES, ANNOUNCEMENT_STATUS_LABEL_KEYS, ANNOUNCEMENT_PRIORITY_LABEL_KEYS,
  ANNOUNCEMENT_PRIORITY_STYLES,
} from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/constants/AdminCommunicationNoticesAndAnnouncementsConstants';
import type { AnnouncementStatus, AnnouncementPriority } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/types/AdminCommunicationNoticesAndAnnouncementsTypes';
import AdminAnnouncementsEmptyState from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/components/empty_state/AdminCommunicationNoticesAndAnnouncementsEmptyState';

/**
 * AdminCommunicationNoticesAndAnnouncementsTable renders the admin announcements table UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminCommunicationNoticesAndAnnouncementsTable: Announcements table with search/filter toolbar, status badges, pin/edit/delete row actions.
 * @dependencies Consumes AdminAnnouncementsFormatters, AdminAnnouncementsFormatters, AdminNavigationLayoutPagination, AdminNavigationLayoutTableSkeleton, useAdminAnnouncementsLogic.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
const ANNOUNCEMENT_HEADER_KEYS = ['empty', 'titlePreview', 'audience', 'branches', 'schedule', 'priority', 'status', 'views', 'acknowledged', 'delivery', 'actions'] as const;

/**
 * AdminCommunicationNoticesAndAnnouncementsTable is the table-level interaction surface for the Admin Announcements feature.
 * @remarks Owns table presentation, filters, pagination, row actions, and their feature-local wiring; it does not own API or mutation implementation.
 * @dependencies Consumes AdminAnnouncementsConstants, useAdminAnnouncementsLogic, useAdminAnnouncementsStore, AdminNavigationLayoutPagination, AdminNavigationLayoutTableSkeleton, and module formatters.
 * @edge-case Preserves loading/error/empty states, filtered-empty states, keyboard-accessible row actions, and repeatable pagination/filter interactions.
 
 * @description AdminCommunicationNoticesAndAnnouncementsTable renders the AnnouncementsManagementTable interface for its owning feature.
 */
export default function AdminCommunicationNoticesAndAnnouncementsTable() {
  const locale = useLocale();
  const t = useTranslations();

  const {
    paginated, status, retryAnnouncements, openCreate, openEdit,
    deleteAnnouncement, togglePin,
    currentPage, setCurrentPage, totalPages, totalItems,
  } = useAdminAnnouncementsLogic();

  const {
    search, setSearch,
    statusFilter, setStatusFilter,
    priorityFilter, setPriorityFilter,
    gymFilter, setGymFilter,
  } = useAdminAnnouncementsStore();

  const hasFilters = Boolean(search || statusFilter !== 'all' || priorityFilter !== 'all' || gymFilter !== 'all');
  const resetFilters = () => { setSearch(''); setStatusFilter('all'); setPriorityFilter('all'); setGymFilter('all'); setCurrentPage(1); };
  type SortKey = 'title' | 'branches' | 'publishedAt' | 'priority' | 'status' | 'viewCount' | 'acknowledgedCount';
  const [sortKey, setSortKey] = useState<SortKey>('publishedAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const sortableFields: Record<string, SortKey | undefined> = {
    titlePreview: 'title', branches: 'branches', schedule: 'publishedAt', priority: 'priority',
    status: 'status', views: 'viewCount', acknowledged: 'acknowledgedCount',
  };
  const sortedAnnouncements = useMemo(() => [...paginated].sort((left, right) => {
    const getValue = (item: (typeof paginated)[number]): string | number => {
      if (sortKey === 'branches') return item.gymNames.join(', ');
      if (sortKey === 'priority') return ({ high: 3, medium: 2, low: 1 } as const)[item.priority] ?? 0;
      const value = item[sortKey];
      return typeof value === 'number' ? value : String(value ?? '');
    };
    const a = getValue(left); const b = getValue(right);
    const result = typeof a === 'number' && typeof b === 'number' ? a - b : String(a).localeCompare(String(b), locale, { numeric: true, sensitivity: 'base' });
    return sortDirection === 'asc' ? result : -result;
  }), [paginated, locale, sortDirection, sortKey]);
  const activateSort = (field: SortKey) => {
    if (field === sortKey) setSortDirection((current) => current === 'asc' ? 'desc' : 'asc');
    else { setSortKey(field); setSortDirection(field === 'publishedAt' ? 'desc' : 'asc'); }
  };

  if (status === 'pending') return <AdminNavigationLayoutTableSkeleton rows={6} cols={7} />;

  if (status === 'error' && !paginated.length) return (
    <div role="alert" className="bg-danger-bg border border-danger rounded-xl p-6 flex flex-wrap items-center justify-between gap-3">
      <span className="text-sm text-danger font-medium">{t('announcements.admin_announcements_table.text_931dc77aed')}</span>
      <button type="button" onClick={() => { void retryAnnouncements(); }} className="min-h-11 rounded-lg border border-danger px-3 font-semibold text-danger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="announcements-management-announcements-management-table-retry-announcements">{t('announcements.admin_announcements_table.retry')}</button>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="bg-card border border-border rounded-xl p-4 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-3 flex items-center"><Search size={18} className="text-secondary"  strokeWidth={2}/></span>
            <input
              type="text"
              placeholder={t('announcements.admin_announcements_table.text_52fbc15299')}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-xl text-sm text-primary focus-visible:outline-none focus-visible:border-focus focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11"
              aria-label={t('announcements.admin_announcements_table.text_26b646aa94')}
             data-testid="admin_announcements-admin_announcements-table-control"/>
          </div>
          <button type="button"
            onClick={openCreate}
            className="flex items-center gap-2 px-4 py-2 border border-border bg-card hover:bg-surface-hover text-primary rounded-xl text-sm font-semibold motion-safe:transition-colors shrink-0 motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95"
           data-testid="admin_announcements-admin_announcements-table-click">
            <Plus size={18}  strokeWidth={2}/> {t('announcements.admin_announcements_table.text_30642945b5')}</button>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="bg-input border border-border rounded-xl px-3 py-2 text-sm text-primary focus-visible:outline-none focus-visible:border-focus motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11"
            aria-label={t('announcements.admin_announcements_table.text_f43653d7fa')}
           data-testid="admin_announcements-admin_announcements-table-control-2">
            {ANNOUNCEMENT_STATUS_OPTIONS.map((o, __testIdIndex98) => <option key={o.value} value={o.value} data-testid={`admin_announcements-admin_announcements-table-control-3-map98-${__testIdIndex98}-1`}>{t(o.labelKey)}</option>)}
          </select>
          <select
            value={priorityFilter}
            onChange={e => setPriorityFilter(e.target.value)}
            className="bg-input border border-border rounded-xl px-3 py-2 text-sm text-primary focus-visible:outline-none focus-visible:border-focus motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11"
            aria-label={t('announcements.admin_announcements_table.text_870c2d046e')}
           data-testid="admin_announcements-admin_announcements-table-control-4">
            <option value="all" data-testid="admin_announcements-admin_announcements-table-control-5">{t('announcements.admin_announcements_table.text_8b807ad7ec')}</option>
            {ANNOUNCEMENT_PRIORITY_OPTIONS.map((o, __testIdIndex107) => <option key={o.value} value={o.value} data-testid={`admin_announcements-admin_announcements-table-control-6-map107-${__testIdIndex107}-1`}>{t(o.labelKey)}</option>)}
          </select>
          <select
            value={gymFilter}
            onChange={e => setGymFilter(e.target.value)}
            className="bg-input border border-border rounded-xl px-3 py-2 text-sm text-primary focus-visible:outline-none focus-visible:border-focus motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11"
            aria-label={t('announcements.admin_announcements_table.text_aee7f4f0e8')}
           data-testid="admin_announcements-admin_announcements-table-control-7">
            {ANNOUNCEMENT_GYM_OPTIONS.map((o, __testIdIndex115) => <option key={o.value} value={o.value} data-testid={`admin_announcements-admin_announcements-table-control-8-map115-${__testIdIndex115}-1`}>{t(o.labelKey)}</option>)}
          </select>
          {hasFilters && (
            <button type="button"
              onClick={() => { setSearch(''); setStatusFilter('all'); setPriorityFilter('all'); setGymFilter('all'); }}
              className="min-h-11 min-w-11 flex items-center gap-1.5 px-3 py-2 bg-input border border-border rounded-xl text-xs text-secondary hover:text-primary motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out motion-safe:active:scale-95"
              aria-label={t('announcements.admin_announcements_table.text_56553100b0')}
             data-testid="admin_announcements-admin_announcements-table-click-2">
              <RotateCcw size={18}  strokeWidth={2}/> {t('announcements.admin_announcements_table.text_44c57abd88')}</button>
          )}
          <span className="ml-auto text-xs text-secondary">{totalItems} {t('announcements.admin_announcements_table.text_bd63359087')}{totalItems !== 1 ? 's' : ''}</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table data-admin-responsive-table className="w-full text-left border-collapse min-w-[920px] md:min-w-0">
            <thead>
              <tr className="bg-surface-highlight border-b border-border">
                {ANNOUNCEMENT_HEADER_KEYS.map((key) => {
                  const field = sortableFields[key];
                  const ariaSort = field !== sortKey ? 'none' : sortDirection === 'asc' ? 'ascending' : 'descending';
                  return <th key={key} scope="col" aria-sort={field ? ariaSort : undefined} className="p-4 text-xs font-semibold text-secondary uppercase tracking-wider whitespace-nowrap">
                    {key === 'empty' ? '' : field ? <button type="button" onClick={() => activateSort(field)} className="inline-flex items-center gap-1.5 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label={t(`announcements.admin_announcements_table.header.${key}`)} data-testid="announcements-management-announcements-management-table-header-key">{t(`announcements.admin_announcements_table.header.${key}`)}<ArrowUpDown size={14} aria-hidden="true" /></button> : t(`announcements.admin_announcements_table.header.${key}`)}
                  </th>;
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={11}><AdminAnnouncementsEmptyState hasFilters={hasFilters} onResetFilters={resetFilters} /></td>
                </tr>
              ) : sortedAnnouncements.map((a , __testIdIndex145) => (
                <tr key={a.id} className="hover:bg-input motion-safe:transition-colors group motion-safe:duration-base">
                  {/* Pin indicator */}
                  <td className="p-4 w-8">
                    {a.isPinned && <Pin size={18} className="text-warning"  strokeWidth={2}/>}
                  </td>
                  {/* Title + preview */}
                  <td className="p-4 max-w-xs">
                    <p className="text-sm font-semibold text-primary truncate">{a.title}</p>
                    <p className="text-xs text-secondary truncate mt-0.5">{a.body.slice(0, 65)}…</p>
                  </td>
                  {/* Audience */}
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {a.audience.map((aud: string) => (
                        <span key={aud} className="px-2 py-0.5 bg-primary-subtle text-primary text-xs rounded-full font-medium capitalize" data-testid="announcements-management-announcements-management-table-status-badge">{aud}</span>
                      ))}
                    </div>
                  </td>
                  {/* Branches */}
                  <td className="p-4 text-xs text-secondary whitespace-nowrap">{a.gymNames.join(', ')}</td>
                  {/* Schedule */}
                  <td className="p-4 text-xs text-secondary whitespace-nowrap">
                    <p>{formatDate(a.publishedAt, locale)}</p>
                    <p className="text-disabled">→ {formatDate(a.expiresAt, locale)}</p>
                  </td>
                  {/* Priority */}
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${ANNOUNCEMENT_PRIORITY_STYLES[a.priority as AnnouncementPriority]}`} data-testid="announcements-management-announcements-management-table-status-badge-2">
                      {t(ANNOUNCEMENT_PRIORITY_LABEL_KEYS[a.priority as AnnouncementPriority])}
                    </span>
                  </td>
                  {/* Status */}
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold border capitalize ${ANNOUNCEMENT_STATUS_STYLES[a.status as AnnouncementStatus]}`} data-testid="announcements-management-announcements-management-table-status-badge-3">
                      {t(ANNOUNCEMENT_STATUS_LABEL_KEYS[a.status as AnnouncementStatus])}
                    </span>
                  </td>
                  {/* Views */}
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-xs text-secondary">
                      <Eye size={18}  strokeWidth={2}/> {(a.viewCount === null || a.viewCount === undefined ? '—' : formatNumber(a.viewCount, locale))}
                    </div>
                  </td>
                  {/* Acknowledged */}
                  <td className="p-4 text-xs text-secondary whitespace-nowrap">
                    {(a.acknowledgedCount === null || a.acknowledgedCount === undefined ? '—' : formatNumber(a.acknowledgedCount, locale))}
                  </td>
                  {/* Delivery */}
                  <td className="p-4 text-xs text-secondary whitespace-nowrap capitalize">
                    {a.deliveryStatus || '—'}
                  </td>
                  {/* Actions */}
                  <td className="p-4">
                    <div className="flex items-center gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100 motion-safe:transition-opacity motion-safe:duration-base">
                      <button type="button"
                        onClick={() => togglePin(a.id)}
                        className={`motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 min-h-11 min-w-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page p-1.5 rounded-lg motion-safe:transition-colors ${a.isPinned ? 'text-warning hover:bg-warning-bg' : 'text-secondary hover:text-warning hover:bg-warning-bg'}`}
                        aria-label={a.isPinned ? t('announcements.admin_announcements_table.auto_ed86d9759e') : t('announcements.admin_announcements_table.auto_8f947cbef2')}
                       data-testid={`admin_announcements-admin_announcements-table-click-3-map145-${__testIdIndex145}-1`}>
                        {a.isPinned ? <PinOff size={18}  strokeWidth={2}/> : <Pin size={18}  strokeWidth={2}/>}
                      </button>
                      <button type="button"
                        onClick={() => openEdit(a)}
                        className="min-h-11 min-w-11 p-1.5 rounded-lg text-secondary hover:text-primary hover:bg-input motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out motion-safe:active:scale-95"
                        aria-label={t('announcements.admin_announcements_table.text_e8b9965bfd')}
                       data-testid={`admin_announcements-admin_announcements-table-click-4-map145-${__testIdIndex145}-2`}>
                        <Edit2 size={18}  strokeWidth={2}/>
                      </button>
                      <button type="button"
                        onClick={() => deleteAnnouncement(a.id, a.title)}
                        className="min-h-11 min-w-11 p-1.5 rounded-lg text-secondary hover:text-danger hover:bg-danger-bg motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out motion-safe:active:scale-95"
                        aria-label={t('announcements.admin_announcements_table.text_bec58ef798')}
                       data-testid={`admin_announcements-admin_announcements-table-click-5-map145-${__testIdIndex145}-3`}>
                        <Trash2 size={18}  strokeWidth={2}/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div className="border-t border-border">
            <AdminNavigationLayoutPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              totalItems={totalItems}
              itemsPerPage={10}
            />
          </div>
        )}
      </div>
    </div>
  );
}
