// RESPONSIBILITY: Renders ManagerCommunicationsChurnRecoveryTab's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useTranslations } from 'next-intl';

import ManagerCommunicationsCampaignsChurnRecoveryComposer from '@/app/frontend_manager/manager_communications/communications_churn_recovery/components/ManagerCommunicationsChurnRecoveryComposer';
import ManagerCommunicationsCampaignsChurnRecoveryKPIs from '@/app/frontend_manager/manager_communications/communications_churn_recovery/components/ManagerCommunicationsChurnRecoveryKPIs';
import ManagerCommunicationsCampaignsChurnRecoveryTable from '@/app/frontend_manager/manager_communications/communications_churn_recovery/components/ManagerCommunicationsChurnRecoveryTable';
import { useManagerCommunicationsCampaignsChurnRecoveryLogic } from '@/app/frontend_manager/manager_communications/communications_churn_recovery/hooks/useManagerCommunicationsChurnRecoveryLogic';


/** @description Renders the ManagerCommunicationsCampaignsChurnRecoveryTab component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (4 documented module/import dependencies).. @edge-case Preserves error state, drawer lifecycle. */
export default function ManagerCommunicationsCampaignsChurnRecoveryTab() {
  const t = useTranslations('MANAGER_COMMUNICATIONS_CAMPAIGNS');

  const {
    churnKPIs,
    paginatedMembers,
    filteredMembers,
    isPending, isError,
    totalPages,
    churnSearch,
    setChurnSearch,
    churnReasonFilter,
    setChurnReasonFilter,
    churnCurrentPage,
    setChurnCurrentPage,
    isChurnComposerOpen,
    openChurnComposer,
    closeChurnComposer,
    selectedMember,
    handleSendWinBack,
    isSending,
    getTemplateTier } = useManagerCommunicationsCampaignsChurnRecoveryLogic();

  const defaultTier = selectedMember ? getTemplateTier(selectedMember.daysSinceExit) : '30_days';

  return (
    <div className="space-y-5">
      {/* Section header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-text-primary">{t("COPY_MEMBER_RECOVERY_WIN_BACK")}</h2>
          <p className="text-xs text-text-secondary mt-0.5">{t("COPY_TARGET_EXITED_MEMBERS_PERSONALISED_WIN_BACK_CAMPAIGNS_RE_ENGAGE")}</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-danger border border-danger text-on-danger text-xs font-medium">
          {filteredMembers.length}{t("COPY_CHURNED_MEMBER")}{filteredMembers.length !== 1 ? 's' : ''}{t("COPY_FOUND")}</div>
      </div>

      {/* KPI Cards */}
      <ManagerCommunicationsCampaignsChurnRecoveryKPIs kpis={churnKPIs} />

      {/* Members Table */}
      <ManagerCommunicationsCampaignsChurnRecoveryTable data-testid="manager_communications-managercommunicationschurnrecoverytab-managercommunicationschurnrecoverytable-1"
        members={paginatedMembers}
        allFilteredCount={filteredMembers.length}
        isPending={isPending} isError={isError}
        churnSearch={churnSearch}
        onSearchChange={setChurnSearch}
        churnReasonFilter={churnReasonFilter}
        onReasonFilterChange={setChurnReasonFilter}
        currentPage={churnCurrentPage}
        totalPages={totalPages}
        onPageChange={setChurnCurrentPage}
        onOpenComposer={openChurnComposer}
      />

      {/* Win-Back Composer Drawer */}
      <ManagerCommunicationsCampaignsChurnRecoveryComposer data-testid="manager_communications-managercommunicationschurnrecoverytab-managercommunicationschurnrecoverycomposer-2"
        member={selectedMember}
        isOpen={isChurnComposerOpen}
        onClose={closeChurnComposer}
        onSend={handleSendWinBack}
        isSending={isSending}
        defaultTier={defaultTier}
      />
    </div>
  );
}
