// RESPONSIBILITY: Renders and orchestrates SuperadminCommunicationBroadcastsMain for the owning Superadmin feature module; presentation stays free of direct API calls.
'use client';
/**
 * RESPONSIBILITY: React component SuperadminCommunicationBroadcastsMain owned by the superadmin_communication_broadcasts feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: Imported hook APIs: useSuperadminCommunicationBroadcastsCampaignsPage, useTranslations.
 * MODULE DEPENDENCIES: next-intl, @/components/ui/Pagination, @/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/components/broadcasts_campaigns_empty_state/SuperadminCommunicationBroadcastsCampaignsEmptyState, @/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/components/broadcasts_campaigns_header/SuperadminCommunicationBroadcastsCampaignsHeader, @/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/components/broadcasts_campaigns_table/SuperadminCommunicationBroadcastsCampaignsTable, @/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/components/broadcasts_campaigns_modals/SuperadminCommunicationBroadcastsCampaignsBroadcastModal, @/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/components/broadcasts_campaigns_modals/SuperadminCommunicationBroadcastsCampaignsBroadcastQueueModal, @/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/components/broadcasts_campaigns_modals/SuperadminCommunicationBroadcastsCampaignsSendNowConfirmationDialog, @/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/hooks/useSuperadminCommunicationBroadcastsCampaignsPage
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Root orchestrator for the Broadcasts page. Composes isolated sub-components and passes state from useSuperadminCommunicationBroadcastsCampaignsPage. No business logic here.
import { useTranslations } from 'next-intl';

import Pagination from '@/components/ui/Pagination';

import SuperadminCommunicationBroadcastsEmptyState from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/components/broadcasts_campaigns_empty_state/SuperadminCommunicationBroadcastsCampaignsEmptyState';
import SuperadminCommunicationBroadcastsHeader from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/components/broadcasts_campaigns_header/SuperadminCommunicationBroadcastsCampaignsHeader';
import { SuperadminCommunicationBroadcastsBroadcastModal } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/components/broadcasts_campaigns_modals/SuperadminCommunicationBroadcastsCampaignsBroadcastModal';
import SuperadminCommunicationBroadcastsBroadcastQueueModal from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/components/broadcasts_campaigns_modals/SuperadminCommunicationBroadcastsCampaignsBroadcastQueueModal';
import SuperadminCommunicationBroadcastsSendNowConfirmationDialog from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/components/broadcasts_campaigns_modals/SuperadminCommunicationBroadcastsCampaignsSendNowConfirmationDialog';
import SuperadminCommunicationBroadcastsTable from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/components/broadcasts_campaigns_table/SuperadminCommunicationBroadcastsCampaignsTable';
import { useSuperadminCommunicationBroadcastsCampaignsPage } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/hooks/useSuperadminCommunicationBroadcastsCampaignsPage';


/**
 * @description Owns the SuperadminCommunicationBroadcastsMain responsibility within the superadmin_role feature boundary.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminCommunicationBroadcastsCampaignsMain() {
  const t = useTranslations('superadmin_communication_broadcasts');
    const { broadcasts, searchQuery, setSearchQuery, statusFilter, setStatusFilter, currentPage, totalPages, setCurrentPage, isModalOpen, setIsModalOpen, form, handleCreateBroadcast, handleDeleteBroadcast, handleSendBroadcast, sendConfirmationBroadcast, isConfirmingSend, confirmSendBroadcast, cancelSendConfirmation, openEditModal, openCreateModal, editingId, isMutating, status, error, retryBroadcasts, queueModalOpen, queueRecipients, queueBroadcastId, queueTitle, onQueueComplete, setQueueModalOpen } = useSuperadminCommunicationBroadcastsCampaignsPage();
    if (status === 'pending')
        return (<div className="space-y-6 motion-safe:animate-pulse">
      <div className="h-8 bg-card rounded w-48"/>
      <div className="h-96 bg-card rounded-xl border border-border"/>
    </div>);
    if (error)
        return <section role="alert" className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-8 text-center"><p className="text-danger">{t('ui.broadcasts_could_not_be_loaded_please_retry_5c1c1316')}</p><button type="button" onClick={() => void retryBroadcasts()} className="min-h-11 rounded-lg border border-border px-4 py-2 text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{t('ui.retry_6327b4e5')}</button></section>;
    return (<div className="flex flex-col gap-6 w-full max-w-7xl mx-auto" data-testid="superadmin_communication_broadcasts-superadmin-broadcasts-main-page-ready">
      <SuperadminCommunicationBroadcastsHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} statusFilter={statusFilter} onStatusFilterChange={setStatusFilter} onCreateClick={openCreateModal}/>

      {broadcasts.length === 0 ? (<SuperadminCommunicationBroadcastsEmptyState onCreateClick={openCreateModal}/>) : (<>
          <SuperadminCommunicationBroadcastsTable onCreateClick={openCreateModal} broadcasts={broadcasts} onSend={handleSendBroadcast} onEdit={openEditModal} onDelete={handleDeleteBroadcast}/>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage}/>
        </>)}

      <SuperadminCommunicationBroadcastsBroadcastModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} form={form} onSubmit={handleCreateBroadcast} isEditMode={!!editingId} isMutating={isMutating}/>
      <SuperadminCommunicationBroadcastsSendNowConfirmationDialog broadcast={sendConfirmationBroadcast} isPending={isConfirmingSend} onCancel={cancelSendConfirmation} onConfirm={confirmSendBroadcast}/>

      <SuperadminCommunicationBroadcastsBroadcastQueueModal isOpen={queueModalOpen} onClose={() => setQueueModalOpen(false)} recipients={queueRecipients} broadcastId={queueBroadcastId} broadcastTitle={queueTitle} onComplete={onQueueComplete}/>
    </div>);
}
