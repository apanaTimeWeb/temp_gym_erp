// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
'use client';

import { Edit, MessageCircle, Mail, Trash2, Banknote, Ban } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

import ManagerInfrastructureResponsiveTable from '@/app/frontend_manager/manager_infrastructure/components/ManagerInfrastructureResponsiveTable';
import { useConfirm } from '@/components/ui/manager_confirm_provider/ManagerConfirmProvider';
import ManagerPagination from '@/components/ui/manager_pagination/ManagerPagination';
import ManagerTableSkeleton from '@/components/ui/manager_table_skeleton/ManagerTableSkeleton';

import { ManagerEnvConfig } from '@/app/frontend_manager/manager_members/members_directory/constants/ManagerMembersDirectoryLocalEnvConfig';
import { MANAGER_ITEMS_PER_PAGE } from '@/app/frontend_manager/manager_members/members_directory/constants/ManagerMembersDirectoryLocalPaginationDefaults';
import { ManagerInfrastructureGetErrorMessage } from '@/app/frontend_manager/manager_members/members_directory/utils/ManagerMembersDirectoryLocalGetErrorMessage';

import ManagerMembersDirectorySortIcon from '@/app/frontend_manager/manager_members/members_directory/components/ManagerMembersDirectorySortIcon';
import ManagerMembersDirectoryEmptyState from '@/app/frontend_manager/manager_members/members_directory/components/ManagerMembersDirectoryEmptyState';
import { MEMBER_SUSPENDED_STATUS } from '@/app/frontend_manager/manager_members/members_directory/constants/manager_members_directory.constants';
import { MEMBERS_TABLE_HEADERS } from '@/app/frontend_manager/manager_members/members_directory/constants/manager_members_directory_shared.constants';
import { MEMBERS_STATUS_COLORS } from '@/app/frontend_manager/manager_members/members_directory/constants/manager_members_directory_ui.constants';
import { useManagerMembersDirectoryLogic } from '@/app/frontend_manager/manager_members/members_directory/hooks/useManagerMembersDirectoryLogic';
import { useFetchMembers } from '@/app/frontend_manager/manager_members/members_directory/hooks/useManagerMembersDirectoryQueries';
import { ManagerMembersDirectoryFormatCurrency, ManagerMembersDirectoryDisplayValue, ManagerMembersDirectoryMaskSensitiveData, ManagerMembersDirectoryFormatDate } from '@/app/frontend_manager/manager_members/members_directory/utils/ManagerMembersDirectoryFormatters';
import type { MemberSortColumn } from '@/app/frontend_manager/manager_members/members_directory/types/manager_members_directory.types';


/** @description Renders the ManagerMembersDirectoryTable component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (15 documented module/import dependencies).. @edge-case Preserves empty state, error state, modal lifecycle. */
export default function ManagerMembersDirectoryTable() {
  const t = useTranslations('MANAGER_MEMBERS_DIRECTORY');
  const locale = useLocale();

  // useConfirm provides the design-system confirm modal (Rule 71 — no window.confirm)
  const { confirm } = useConfirm();
  const { 
    debouncedSearch, search, statusFilter, genderFilter, planFilter, expiryFrom, expiryTo, currentPage, setCurrentPage,
    setSelectedMember, openMemberProfile, openEdit, openMsg, deleteMember, setShowPaymentModal, toggleSuspend,
    sortColumn, sortDirection, setSortColumn, setSortDirection
  } = useManagerMembersDirectoryLogic();


  const { data: membersRes, isPending, isError, error, refetch } = useFetchMembers({ 
    search: debouncedSearch,
    status: statusFilter, 
    gender: genderFilter, 
    plan: planFilter, 
    expiryFrom, 
    expiryTo, 
    sort: sortColumn, 
    dir: sortDirection, 
    page: currentPage.toString(),
    limit: MANAGER_ITEMS_PER_PAGE.toString() });
  const members = membersRes?.members || [];
  const totalMembers = membersRes?.total || 0;

  const totalPages = Math.ceil(totalMembers / MANAGER_ITEMS_PER_PAGE);

  const handleSort = (column: MemberSortColumn) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };



  return (
    <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden flex flex-col h-full min-h-96">
      {(() => { if (isPending) { return (
        <ManagerTableSkeleton rows={6} />
      ); } return (() => { if (isError) { return (
        <div data-testid="manager_members-manager-members-table-status" role="alert" className="p-8 text-center text-danger-text space-y-3"><p>{ManagerInfrastructureGetErrorMessage(error, t('TEXT_GENERIC_ERROR'))}</p><button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "px-4 py-2 rounded-lg bg-primary text-on-primary text-sm font-semibold motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_members-manager-members-table-button-refresh" type="button" onClick={() => void refetch()} >{t("COPY_RETRY")}</button></div>
      ); } return (
        <>
          <ManagerInfrastructureResponsiveTable labels={MEMBERS_TABLE_HEADERS.map((header) => t(header.labelKey))}>
              <table className="w-full text-left border-collapse">
                <thead className="bg-primary-subtle/60 border-b border-border">
                  <tr>
                    <th scope="col" className="text-left text-xs font-bold text-text-secondary uppercase tracking-wider px-4 py-3.5 whitespace-nowrap w-16">{t("COPY_ID")}</th>
                    <th scope="col" className="text-left text-xs font-bold text-text-secondary uppercase tracking-wider px-4 py-3.5 whitespace-nowrap min-w-[200px]" aria-sort={(() => { if (sortColumn === 'name') { return (sortDirection === 'asc' ? 'ascending' : 'descending'); } return 'none'; })()}>
                      <button data-testid="manager_members-manager-members-table-button-sort-name" type="button" className="inline-flex items-center gap-1.5 motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:text-primary" onClick={() => handleSort('name')} aria-label={t("COPY_SORT_MEMBER")}>
                        {t("COPY_MEMBER_1")}<ManagerMembersDirectorySortIcon column="name" activeColumn={sortColumn} direction={sortDirection} />
                      </button>
                    </th>
                    <th scope="col" className="text-left text-xs font-bold text-text-secondary uppercase tracking-wider px-4 py-3.5 whitespace-nowrap w-24">{t("COPY_GENDER_2")}</th>
                    <th scope="col" className="text-left text-xs font-bold text-text-secondary uppercase tracking-wider px-4 py-3.5 whitespace-nowrap min-w-[130px]">{t("COPY_PLAN_2")}</th>
                    <th scope="col" className="text-left text-xs font-bold text-text-secondary uppercase tracking-wider px-4 py-3.5 whitespace-nowrap w-28" aria-sort={(() => { if (sortColumn === 'status') { return (sortDirection === 'asc' ? 'ascending' : 'descending'); } return 'none'; })()}>
                      <button data-testid="manager_members-manager-members-table-button-sort-status" type="button" className="inline-flex items-center gap-1.5 motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:text-primary" onClick={() => handleSort('status')} aria-label={t("COPY_SORT_STATUS")}>
                        {t("COPY_STATUS")}<ManagerMembersDirectorySortIcon column="status" activeColumn={sortColumn} direction={sortDirection} />
                      </button>
                    </th>
                    <th scope="col" className="text-left text-xs font-bold text-text-secondary uppercase tracking-wider px-4 py-3.5 whitespace-nowrap w-32" aria-sort={(() => { if (sortColumn === 'joinDate') { return (sortDirection === 'asc' ? 'ascending' : 'descending'); } return 'none'; })()}>
                      <button data-testid="manager_members-manager-members-table-sort-join-date" type="button" className="inline-flex items-center gap-1.5 motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:text-primary" onClick={() => handleSort('joinDate')} aria-label={t("COPY_SORT_JOIN_DATE")}>
                        {t("COPY_JOIN_DATE_3")}<ManagerMembersDirectorySortIcon column="joinDate" activeColumn={sortColumn} direction={sortDirection} />
                      </button>
                    </th>
                    <th scope="col" className="text-left text-xs font-bold text-text-secondary uppercase tracking-wider px-4 py-3.5 whitespace-nowrap w-32" aria-sort={(() => { if (sortColumn === 'expiryDate') { return (sortDirection === 'asc' ? 'ascending' : 'descending'); } return 'none'; })()}>
                      <button data-testid="manager_members-manager-members-table-sort-expiry-date" type="button" className="inline-flex items-center gap-1.5 motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:text-primary" onClick={() => handleSort('expiryDate')} aria-label={t("COPY_SORT_EXPIRY")}>
                        {t("COPY_EXPIRY_1")}<ManagerMembersDirectorySortIcon column="expiryDate" activeColumn={sortColumn} direction={sortDirection} />
                      </button>
                    </th>
                    <th scope="col" className="text-left text-xs font-bold text-text-secondary uppercase tracking-wider px-4 py-3.5 whitespace-nowrap w-32" aria-sort={(() => { if (sortColumn === 'paidAmount') { return (sortDirection === 'asc' ? 'ascending' : 'descending'); } return 'none'; })()}>
                      <button data-testid="manager_members-manager-members-table-sort-paid-amount" type="button" className="inline-flex items-center gap-1.5 motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:text-primary" onClick={() => handleSort('paidAmount')} aria-label={t("COPY_SORT_PAID")}>
                        {t("COPY_PAID")}<ManagerMembersDirectorySortIcon column="paidAmount" activeColumn={sortColumn} direction={sortDirection} />
                      </button>
                    </th>
                    <th scope="col" className="text-left text-xs font-bold text-text-secondary uppercase tracking-wider px-4 py-3.5 whitespace-nowrap w-28">{t("COPY_PENDING")}</th>
                    <th scope="col" className="text-right text-xs font-bold text-text-secondary uppercase tracking-wider px-4 py-3.5 whitespace-nowrap">{t("COPY_ACTIONS")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {members.map((m, mapIndex) => {
                    const statusStyle = MEMBERS_STATUS_COLORS[m.status] || { bg: 'bg-input', text: 'text-text-secondary' };
                    return (
                    <tr
                      data-testid={`manager_members-members-managermemberstable-row-${m.id}`}
                      key={m.id} 
                      className="hover:bg-primary-subtle/50 motion-safe:transition-colors cursor-pointer"
                      tabIndex={0}
                      role="button"
                      aria-label={t("TEXT_OPEN_MEMBER", { value: m.name })}
                      onClick={() => { openMemberProfile(m); }}
                      onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openMemberProfile(m); } }}
                    >
                      <td className="px-4 py-3.5 text-xs text-text-secondary font-medium whitespace-nowrap">
                        <span className="font-mono font-bold text-text-primary">#{m.id}</span>
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs bg-primary-subtle text-primary shrink-0 ring-1 ring-primary/20">
                            {m.name?.charAt(0) || '?'}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-text-primary truncate">{ManagerMembersDirectoryDisplayValue(m.name)}</p>
                            <p className="text-xs text-text-secondary font-mono">{ManagerMembersDirectoryMaskSensitiveData(m.phone || '', 'phone')}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-xs text-text-secondary whitespace-nowrap">{ManagerMembersDirectoryDisplayValue(m.gender)}</td>
                      <td className="px-4 py-3.5 text-xs font-medium text-text-primary whitespace-nowrap">{ManagerMembersDirectoryDisplayValue(m.plan?.name)}</td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <span
                          data-testid={`manager_members-members-managermemberstable-status-${m.id}`}
                          className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusStyle.bg} ${statusStyle.text} border border-border/40`}
                        >
                          {t(({ ACTIVE: 'COPY_ACTIVE', PENDING: 'COPY_PENDING', EXPIRED: 'COPY_EXPIRED', FROZEN: 'COPY_FROZEN', SUSPENDED: 'COPY_SUSPENDED', BANNED: 'COPY_BANNED' } as Record<string, string>)[m.status] || 'COPY_STATUS')}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-xs text-text-secondary whitespace-nowrap">{ManagerMembersDirectoryFormatDate(m.joinDate)}</td>
                      <td className="px-4 py-3.5 text-xs text-text-secondary whitespace-nowrap">{ManagerMembersDirectoryFormatDate(m.expiryDate)}</td>
                      <td className="px-4 py-3.5 text-xs font-semibold text-success-text whitespace-nowrap">{ManagerMembersDirectoryFormatCurrency(m.paidAmount, ManagerEnvConfig.currencyCode, locale)}</td>
                      <td className="px-4 py-3.5 text-xs font-semibold whitespace-nowrap">
                        {m.pendingAmount > 0 ? (
                          <span className="text-danger-text bg-danger-bg/50 px-2 py-0.5 rounded font-bold">{ManagerMembersDirectoryFormatCurrency(m.pendingAmount, ManagerEnvConfig.currencyCode, locale)}</span>
                        ) : (
                          <span className="text-text-secondary">{ManagerMembersDirectoryDisplayValue(null)}</span>
                        )}
                      </td>
                      <td className="px-4 py-3.5 text-xs whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          {m.pendingAmount > 0 && (
                            <button
                              className="min-h-11 min-w-11 md:min-h-8 md:min-w-8 inline-flex items-center justify-center p-1.5 rounded-lg bg-warning-bg text-warning-text hover:bg-warning hover:text-on-warning border border-warning/30 transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring shrink-0"
                              data-testid={`manager_members-members-managermemberstable-button-collect-dues-${m.id}`}
                              onClick={(e) => { e.stopPropagation(); setSelectedMember(m); setShowPaymentModal(true); }}
                              title={t("COPY_COLLECT_DUES")}
                              aria-label={t("TEXT_COLLECT_DUES", { value: m.name })}
                              type="button"
                            >
                              <Banknote size={16} strokeWidth={2}/>
                            </button>
                          )}
                          <button
                            className="min-h-11 min-w-11 md:min-h-8 md:min-w-8 inline-flex items-center justify-center p-1.5 rounded-lg bg-input text-text-secondary hover:text-text-primary hover:bg-surface-hover border border-border/40 transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring shrink-0"
                            data-testid={`manager_members-members-managermemberstable-button-edit-${m.id}`}
                            onClick={(e) => { e.stopPropagation(); openEdit(m); }}
                            title={t("COPY_EDIT_2")}
                            aria-label={t("TEXT_EDIT_MEMBER_ROW", { value: m.name })}
                            type="button"
                          >
                            <Edit size={16} strokeWidth={2} />
                          </button>
                          <button
                            className="min-h-11 min-w-11 md:min-h-8 md:min-w-8 inline-flex items-center justify-center p-1.5 rounded-lg bg-success-bg text-success-text hover:bg-success hover:text-on-success border border-success/30 transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring shrink-0"
                            data-testid={`manager_members-members-managermemberstable-button-whatsapp-${m.id}`}
                            onClick={(e) => { e.stopPropagation(); openMsg(m, 'whatsapp'); }}
                            title={t("COPY_WHATSAPP_1")}
                            aria-label={t("TEXT_WHATSAPP_MEMBER", { value: m.name })}
                            type="button"
                          >
                            <MessageCircle size={16} strokeWidth={2}/>
                          </button>
                          <button
                            className="min-h-11 min-w-11 md:min-h-8 md:min-w-8 inline-flex items-center justify-center p-1.5 rounded-lg bg-info-bg text-info-text hover:bg-info hover:text-on-info border border-info/30 transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring shrink-0"
                            data-testid={`manager_members-members-managermemberstable-button-email-${m.id}`}
                            onClick={(e) => { e.stopPropagation(); openMsg(m, 'email'); }}
                            title={t("COPY_EMAIL_4")}
                            aria-label={t("TEXT_EMAIL_MEMBER", { value: m.name })}
                            type="button"
                          >
                            <Mail size={16} strokeWidth={2}/>
                          </button>
                          {(() => {
                            if (m.status !== MEMBER_SUSPENDED_STATUS && m.pendingAmount > 0) {
                              return (
                                <button
                                  className="min-h-11 min-w-11 md:min-h-8 md:min-w-8 inline-flex items-center justify-center p-1.5 rounded-lg bg-danger-bg text-danger-text hover:bg-danger hover:text-on-danger border border-danger/30 transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring shrink-0"
                                  data-testid={`manager_members-members-managermemberstable-button-suspend-member-${mapIndex}`}
                                  onClick={(e) => { e.stopPropagation(); setSelectedMember(m); toggleSuspend(true); }}
                                  title={t("COPY_SUSPEND_MEMBER")}
                                  aria-label={t("TEXT_SUSPEND_MEMBER", { value: m.name })}
                                  type="button"
                                >
                                  <Ban size={16} strokeWidth={2}/>
                                </button>
                              );
                            }
                            if (m.status === MEMBER_SUSPENDED_STATUS) {
                              return (
                                <button
                                  className="min-h-11 min-w-11 md:min-h-8 md:min-w-8 inline-flex items-center justify-center p-1.5 rounded-lg bg-success-bg text-success-text hover:bg-success hover:text-on-success border border-success/30 transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring shrink-0"
                                  data-testid={`manager_members-members-managermemberstable-button-unsuspend-member-${m.id}`}
                                  onClick={(e) => { e.stopPropagation(); setSelectedMember(m); toggleSuspend(false); }}
                                  title={t("COPY_UNSUSPEND_MEMBER")}
                                  aria-label={t("TEXT_UNSUSPEND_MEMBER", { value: m.name })}
                                  type="button"
                                >
                                  <Ban size={16} strokeWidth={2}/>
                                </button>
                              );
                            }
                            return null;
                          })()}
                          <button
                            className="min-h-11 min-w-11 md:min-h-8 md:min-w-8 inline-flex items-center justify-center p-1.5 rounded-lg bg-danger-bg text-danger-text hover:bg-danger hover:text-on-danger border border-danger/30 transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring shrink-0"
                            data-testid={`manager_members-members-managermemberstable-button-delete-member-${m.id}`}
                            onClick={async (e) => { 
                              e.stopPropagation();
                              const confirmed = await confirm({
                                title: t("COPY_DELETE_MEMBER"),
                                message: t("TEXT_DELETE_MEMBER_CONFIRM_MESSAGE", { value: m.name }),
                                confirmText: t("COPY_DELETE_1"),
                                type: 'danger'
                              });
                              if (confirmed) deleteMember(m.id);
                            }}
                            title={t("COPY_DELETE_2")}
                            aria-label={t("TEXT_DELETE_MEMBER_ROW", { value: m.name })}
                            type="button"
                          >
                            <Trash2 size={16} strokeWidth={2}/>
                          </button>
                        </div>
                      </td>
                    </tr>
                  )})}
                {members.length === 0 && !isPending && !isError && (
                  <tr>
                    <td colSpan={MEMBERS_TABLE_HEADERS.length} className="p-0 border-b-0">
                      <ManagerMembersDirectoryEmptyState />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
</ManagerInfrastructureResponsiveTable>
          <ManagerPagination data-testid="manager_members-managermemberstable-managerpagination-1" 
            currentPage={currentPage} 
            totalPages={totalPages} 
            totalItems={totalMembers} 
            itemsPerPage={MANAGER_ITEMS_PER_PAGE} 
            onPageChange={setCurrentPage} 
          />
        </>
      ); })(); })()}
    </div>
 );
}
