// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
'use client';

import { useTranslations, useLocale } from 'next-intl';

import ManagerInfrastructureResponsiveTable from '@/app/frontend_manager/manager_infrastructure/components/ManagerInfrastructureResponsiveTable';
import ManagerPagination from '@/components/ui/manager_pagination/ManagerPagination';
import ManagerTableSkeleton from '@/components/ui/manager_table_skeleton/ManagerTableSkeleton';

import { MANAGER_ITEMS_PER_PAGE } from '@/app/frontend_manager/manager_members/members_directory/constants/ManagerMembersDirectoryLocalPaginationDefaults';
import { ManagerInfrastructureGetErrorMessage } from '@/app/frontend_manager/manager_members/members_directory/utils/ManagerMembersDirectoryLocalGetErrorMessage';

import ManagerMembersDirectorySortIcon from '@/app/frontend_manager/manager_members/members_directory/components/ManagerMembersDirectorySortIcon';
import ManagerMembersDirectoryEmptyState from '@/app/frontend_manager/manager_members/members_directory/components/ManagerMembersDirectoryEmptyState';
import ManagerMembersDirectoryTableRow from '@/app/frontend_manager/manager_members/members_directory/components/ManagerMembersDirectoryTableRow';
import { MEMBERS_TABLE_HEADERS } from '@/app/frontend_manager/manager_members/members_directory/constants/manager_members_directory_shared.constants';
import { useManagerMembersDirectoryLogic } from '@/app/frontend_manager/manager_members/members_directory/hooks/useManagerMembersDirectoryLogic';
import { useFetchMembers } from '@/app/frontend_manager/manager_members/members_directory/hooks/useManagerMembersDirectoryQueries';
import type { MemberSortColumn } from '@/app/frontend_manager/manager_members/members_directory/types/manager_members_directory.types';

const TABLE_COLUMN_COUNT = 10;

/** @description Renders the ManagerMembersDirectoryTable component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (15 documented module/import dependencies).. @edge-case Preserves empty state, error state, modal lifecycle. */
export default function ManagerMembersDirectoryTable() {
  const t = useTranslations('MANAGER_MEMBERS_DIRECTORY');
  const locale = useLocale();

  const { 
    debouncedSearch, statusFilter, genderFilter, planFilter, expiryFrom, expiryTo, currentPage, setCurrentPage,
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
    <div className="bg-card rounded-2xl shadow-card border border-border overflow-hidden flex flex-col h-full min-h-96">
      {(() => {
        if (isPending) {
          return <ManagerTableSkeleton rows={6} />;
        }
        if (isError) {
          return (
            <div data-testid="manager_members-manager-members-table-status" role="alert" className="p-8 text-center text-danger-text space-y-3">
              <p>{ManagerInfrastructureGetErrorMessage(error, t('TEXT_GENERIC_ERROR'))}</p>
              <button
                className="px-4 py-2 rounded-lg bg-primary text-on-primary text-sm font-semibold motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"
                data-testid="manager_members-manager-members-table-button-refresh"
                type="button"
                onClick={() => void refetch()}
              >
                {t("COPY_RETRY")}
              </button>
            </div>
          );
        }
        return (
          <>
            <div className="max-h-[640px] overflow-auto">
              <ManagerInfrastructureResponsiveTable labels={MEMBERS_TABLE_HEADERS.map((header) => t(header.labelKey))}>
                <table className="w-full text-left border-collapse">
                  <thead className="sticky top-0 z-20 bg-surface-highlight border-b border-border">
                    <tr>
                      <th scope="col" className="sticky start-0 z-30 bg-surface-highlight border-e border-border text-left text-xs font-bold text-text-secondary uppercase tracking-wider px-4 py-3.5 whitespace-nowrap w-16">
                        {t("COPY_ID")}
                      </th>
                      <th scope="col" className="text-left text-xs font-bold text-text-secondary uppercase tracking-wider px-4 py-3.5 whitespace-nowrap min-w-[200px]" aria-sort={sortColumn === 'name' ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}>
                        <button data-testid="manager_members-manager-members-table-button-sort-name" type="button" className="inline-flex items-center gap-1.5 motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:text-primary" onClick={() => handleSort('name')} aria-label={t("COPY_SORT_MEMBER")}>
                          {t("COPY_MEMBER_1")}<ManagerMembersDirectorySortIcon column="name" activeColumn={sortColumn} direction={sortDirection} />
                        </button>
                      </th>
                      <th scope="col" className="text-left text-xs font-bold text-text-secondary uppercase tracking-wider px-4 py-3.5 whitespace-nowrap w-24">{t("COPY_GENDER_2")}</th>
                      <th scope="col" className="text-left text-xs font-bold text-text-secondary uppercase tracking-wider px-4 py-3.5 whitespace-nowrap min-w-[130px]">{t("COPY_PLAN_2")}</th>
                      <th scope="col" className="text-left text-xs font-bold text-text-secondary uppercase tracking-wider px-4 py-3.5 whitespace-nowrap w-28" aria-sort={sortColumn === 'status' ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}>
                        <button data-testid="manager_members-manager-members-table-button-sort-status" type="button" className="inline-flex items-center gap-1.5 motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:text-primary" onClick={() => handleSort('status')} aria-label={t("COPY_SORT_STATUS")}>
                          {t("COPY_STATUS")}<ManagerMembersDirectorySortIcon column="status" activeColumn={sortColumn} direction={sortDirection} />
                        </button>
                      </th>
                      <th scope="col" className="text-left text-xs font-bold text-text-secondary uppercase tracking-wider px-4 py-3.5 whitespace-nowrap w-32" aria-sort={sortColumn === 'joinDate' ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}>
                        <button data-testid="manager_members-manager-members-table-sort-join-date" type="button" className="inline-flex items-center gap-1.5 motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:text-primary" onClick={() => handleSort('joinDate')} aria-label={t("COPY_SORT_JOIN_DATE")}>
                          {t("COPY_JOIN_DATE_3")}<ManagerMembersDirectorySortIcon column="joinDate" activeColumn={sortColumn} direction={sortDirection} />
                        </button>
                      </th>
                      <th scope="col" className="text-left text-xs font-bold text-text-secondary uppercase tracking-wider px-4 py-3.5 whitespace-nowrap w-32" aria-sort={sortColumn === 'expiryDate' ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}>
                        <button data-testid="manager_members-manager-members-table-sort-expiry-date" type="button" className="inline-flex items-center gap-1.5 motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:text-primary" onClick={() => handleSort('expiryDate')} aria-label={t("COPY_SORT_EXPIRY")}>
                          {t("COPY_EXPIRY_1")}<ManagerMembersDirectorySortIcon column="expiryDate" activeColumn={sortColumn} direction={sortDirection} />
                        </button>
                      </th>
                      <th scope="col" className="text-left text-xs font-bold text-text-secondary uppercase tracking-wider px-4 py-3.5 whitespace-nowrap w-32" aria-sort={sortColumn === 'paidAmount' ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}>
                        <button data-testid="manager_members-manager-members-table-sort-paid-amount" type="button" className="inline-flex items-center gap-1.5 motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:text-primary" onClick={() => handleSort('paidAmount')} aria-label={t("COPY_SORT_PAID")}>
                          {t("COPY_PAID")}<ManagerMembersDirectorySortIcon column="paidAmount" activeColumn={sortColumn} direction={sortDirection} />
                        </button>
                      </th>
                      <th scope="col" className="text-left text-xs font-bold text-text-secondary uppercase tracking-wider px-4 py-3.5 whitespace-nowrap w-28">{t("COPY_PENDING")}</th>
                      <th scope="col" className="text-right text-xs font-bold text-text-secondary uppercase tracking-wider px-4 py-3.5 whitespace-nowrap">{t("COPY_ACTIONS")}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {members.map((m, mapIndex) => (
                      <ManagerMembersDirectoryTableRow
                        key={m.id}
                        m={m}
                        mapIndex={mapIndex}
                        locale={locale}
                        openMemberProfile={openMemberProfile}
                        setSelectedMember={setSelectedMember}
                        setShowPaymentModal={setShowPaymentModal}
                        openEdit={openEdit}
                        openMsg={openMsg}
                        toggleSuspend={toggleSuspend}
                        deleteMember={deleteMember}
                      />
                    ))}
                    {members.length === 0 && !isPending && !isError && (
                      <tr>
                        <td colSpan={TABLE_COLUMN_COUNT} className="p-0 border-b-0">
                          <ManagerMembersDirectoryEmptyState />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </ManagerInfrastructureResponsiveTable>
            </div>
            <div className="border-t border-border px-4 py-3 bg-card">
              <ManagerPagination data-testid="manager_members-managermemberstable-managerpagination-1" 
                currentPage={currentPage} 
                totalPages={totalPages} 
                totalItems={totalMembers} 
                itemsPerPage={MANAGER_ITEMS_PER_PAGE} 
                onPageChange={setCurrentPage} 
              />
            </div>
          </>
        );
      })()}
    </div>
  );
}
