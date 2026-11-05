// RESPONSIBILITY: Renders ManagerCommunicationsChurnRecoveryTable's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';

import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import ManagerInfrastructureResponsiveTable from '@/app/frontend_manager/manager_infrastructure/components/ManagerInfrastructureResponsiveTable';
import ManagerCommunicationsCampaignsChurnRecoveryEmptyState from '@/app/frontend_manager/manager_communications/communications_churn_recovery/components/ManagerCommunicationsChurnRecoveryEmptyState';
import ManagerCommunicationsCampaignsChurnRecoveryTableRow from '@/app/frontend_manager/manager_communications/communications_churn_recovery/components/ManagerCommunicationsChurnRecoveryTableRow';
import { CANCELLATIONS_REASON_OPTIONS, CANCELLATIONS_ITEMS_PER_PAGE } from '@/app/frontend_manager/manager_communications/communications_churn_recovery/constants/manager_communications_campaigns_shared.constants';
import { MANAGER_CHURN_RECOVERY_TABLE_HEADERS } from '@/app/frontend_manager/manager_communications/communications_churn_recovery/constants/manager_communications_campaigns_table.constants';
import type { ManagerCommunicationsCampaignsChurnRecoveryTableProps } from '@/app/frontend_manager/manager_communications/communications_churn_recovery/types/manager_communications_campaigns_churn_recovery_table.types';




/** Masks a phone number: 98****2310 */
/**
 * @description Provides the `maskPhone` transformation used by the owning Manager feature. Keeps display/domain shaping local so components remain focused on rendering and interaction orchestration.
 * @dependencies Uses only the values and module constants visible in this file; it does not call APIs or cross feature boundaries.
 * @edge-case Handles missing, empty, nullable, and boundary inputs according to the caller's documented UI contract without inventing business data.
 */
function maskPhone(phone: string): string {
  const normalizedPhone = phone.replace(/\D/g, '');
  if (normalizedPhone.length < 7) return normalizedPhone ? `${'*'.repeat(Math.max(0, normalizedPhone.length - 2))}${normalizedPhone.slice(-2)}` : '—';
  return normalizedPhone.slice(0, 2) + '****' + normalizedPhone.slice(-4);
}



const SKELETON_ROW_COUNT = 5;

/** @description Renders the ManagerCommunicationsCampaignsChurnRecoveryTable component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (6 documented module/import dependencies).. @edge-case Preserves empty state, error state. */
export default function ManagerCommunicationsCampaignsChurnRecoveryTable({
  members,
  allFilteredCount,
  isPending, isError, errorMessage,
  churnSearch,
  onSearchChange,
  churnReasonFilter,
  onReasonFilterChange,
  currentPage,
  totalPages,
  onPageChange,
  onOpenComposer }: ManagerCommunicationsCampaignsChurnRecoveryTableProps) {
  const t = useTranslations('MANAGER_COMMUNICATIONS_CAMPAIGNS');

  const startEntry = allFilteredCount === 0 ? 0 : (currentPage - 1) * CANCELLATIONS_ITEMS_PER_PAGE + 1;
  const endEntry   = Math.min(currentPage * CANCELLATIONS_ITEMS_PER_PAGE, allFilteredCount);

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:hover:-translate-y-1">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 border-b border-border">
        {/* Search */}
        <div className="relative flex-1 w-full sm:max-w-xs">
          <Search size={18} strokeWidth={2} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none"/>
          <input className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "w-full pl-9 pr-3 py-2 text-sm bg-input border border-border rounded-lg text-text-primary placeholder:text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:border-primary motion-safe:transition-all motion-safe:duration-200 ease-in-out"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_communications-manager-churn-recovery-input-text"
            type="text"
            placeholder={t("COPY_SEARCH_NAME")}
            value={churnSearch}
            onChange={(e) => onSearchChange(e.target.value)}
            
            aria-label={t("COPY_SEARCH_CHURNED_MEMBERS")}
          />
        </div>

        {/* Reason Filter */}
        <div className="flex items-center gap-2 flex-wrap">
          {CANCELLATIONS_REASON_OPTIONS.map((opt, mapIndex) => (
            <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", (`px-3 py-1.5 rounded-lg text-xs font-medium motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring ${
                churnReasonFilter === opt.value
                  ? 'bg-primary text-on-primary'
                  : 'bg-input border border-border text-text-secondary hover:text-primary'
              } motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 hover:brightness-110`)].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_communications-communications-managerchurnrecoverytable-button-primary-${mapIndex}`}
              key={opt.value}
              type="button"
              onClick={() => onReasonFilterChange(opt.value)}
              
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <ManagerInfrastructureResponsiveTable labels={MANAGER_CHURN_RECOVERY_TABLE_HEADERS}>
<table data-testid="manager_communications-managercommunicationschurnrecoverytable-grid" className="w-full text-left" aria-label={t("COPY_CHURNED_MEMBERS_TABLE")}>
          <thead>
            <tr className="bg-primary-subtle border-b border-border">
              {MANAGER_CHURN_RECOVERY_TABLE_HEADERS.map((h) => (
                <th
                  key={h}
                  scope="col"
                  className="px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(() => { if (isPending) { return (
              Array.from({ length: SKELETON_ROW_COUNT }).map((_, i) => (
                <tr key={`churn-skeleton-${i}`} className="border-b border-border">
                  {MANAGER_CHURN_RECOVERY_TABLE_HEADERS.map((h) => (
                    <td key={h} className="px-4 py-3">
                      <div className="h-4 w-3/4 bg-skeleton-base rounded motion-safe:animate-pulse" />
                    </td>
                  ))}
                </tr>
              ))
            ); } return (() => { if (isError) { return (
              <tr><td colSpan={MANAGER_CHURN_RECOVERY_TABLE_HEADERS.length} className="py-12 text-center text-danger-text text-sm">{errorMessage || t("TEXT_GENERIC_ERROR")}</td></tr>
            ); } return (() => { if (members.length === 0) { return (
              <tr>
                <td colSpan={MANAGER_CHURN_RECOVERY_TABLE_HEADERS.length}>
                  <ManagerCommunicationsCampaignsChurnRecoveryEmptyState />
                </td>
              </tr>
            ); } return (
              members.map((member) => (
                <ManagerCommunicationsCampaignsChurnRecoveryTableRow data-testid={`manager_communications-managercommunicationschurnrecoverytable-row-${member.memberId}`}
                  key={member.memberId}
                  member={member}
                  onOpenComposer={onOpenComposer}
                  maskPhone={maskPhone}
                />
              ))
            ); })(); })(); })()}
          </tbody>
        </table>
</ManagerInfrastructureResponsiveTable>
      </div>

      {/* Pagination */}
      {allFilteredCount > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-border">
          <p className="text-xs text-text-secondary">{t("COPY_SHOWING")}{startEntry}–{endEntry}{t("COPY_TEXT")}{allFilteredCount}{t("COPY_CHURNED_MEMBERS")}</p>
          <div className="flex items-center gap-2">
            <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "p-1.5 rounded-lg border border-border text-text-secondary hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_communications-manager-churn-recovery-button-pagination-1"
              type="button"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label={t("COPY_PREVIOUS_PAGE")}
              
            >
              <ChevronLeft size={18} strokeWidth={2}/>
            </button>
            <span className="text-xs text-text-primary font-medium px-2">
              {currentPage} / {totalPages}
            </span>
            <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "p-1.5 rounded-lg border border-border text-text-secondary hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_communications-manager-churn-recovery-button-pagination-2"
              type="button"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label={t("COPY_NEXT_PAGE")}
              
            >
              <ChevronRight size={18} strokeWidth={2}/>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
