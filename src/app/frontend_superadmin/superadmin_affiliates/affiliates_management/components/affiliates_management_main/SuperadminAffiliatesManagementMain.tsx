// RESPONSIBILITY: Renders/orchestrates SuperadminAffiliatesMain within its owning Superadmin feature module; no direct backend implementation.
'use client';
import { useEffect } from 'react';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import SuperadminAffiliatesEmptyState from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/components/affiliates_management_empty_state/SuperadminAffiliatesManagementEmptyState';
import SuperadminAffiliatesHeader from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/components/affiliates_management_header/SuperadminAffiliatesManagementHeader';
import { SuperadminAffiliatesAffiliateModal } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/components/affiliates_management_modals/SuperadminAffiliatesManagementAffiliateModal';
import SuperadminAffiliatesStatsBar from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/components/affiliates_management_stats_bar/SuperadminAffiliatesManagementStatsBar';
import SuperadminAffiliatesTable from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/components/affiliates_management_table/SuperadminAffiliatesManagementTable';
import { SuperadminAffiliatesManagementErrorBoundary } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/components/SuperadminAffiliatesManagementErrorBoundary';
import { SUPERADMIN_AFFILIATES_MANAGEMENT_ROUTES } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/config/superadmin_affiliates_management.url_config';
import { useSuperadminAffiliatesManagementPage } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/hooks/useSuperadminAffiliatesManagementPage';

// RESPONSIBILITY: Root orchestrator for the Affiliates page. Composes isolated sub-components and passes state from useSuperadminAffiliatesManagementPage. No business logic here.


/**
 * @description Root orchestrator for the Affiliates page. Composes isolated sub-components and passes state from useSuperadminAffiliatesManagementPage. No business logic here.
 * @dependencies Uses the existing feature-local API, query, state, and approved UI/infrastructure contracts imported by this component.
 * @edge-case Interactive, loading, empty, error, disabled, and repeated-action paths must remain recoverable through the owning feature contract.
 */
export default function SuperadminAffiliatesManagementMain() {
  const t = useTranslations('superadmin_affiliates');
    const { affiliates, searchQuery, setSearchQuery, statusFilter, setStatusFilter, isModalOpen, setIsModalOpen, handleCloseModal, form, handleAddAffiliate, handleEditAffiliate, handleToggleAffiliateStatus, handleDeleteAffiliate, handlePayCommission, openEditModal, totalAffiliates, totalCommission, startDate, setStartDate, endDate, setEndDate, currentPage, totalPages, setPage, editingAffiliate, isMutating, status, isError, retryAffiliates } = useSuperadminAffiliatesManagementPage();
    const router=useRouter();const params=useSearchParams();
    useEffect(()=>{if(params.get('tab')?.toUpperCase()==='PAYOUTS')router.replace(SUPERADMIN_AFFILIATES_MANAGEMENT_ROUTES.DESTINATION_1);},[router,params]);
    if (status === 'pending')
        return (<div className="space-y-6 motion-safe:animate-pulse" data-testid="superadmin_affiliates-superadmin-affiliates-main-page">
      <div className="h-8 bg-card rounded w-48"/>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(2)].map((_, i) => <div key={`skeleton-${i}`} className="h-24 bg-card rounded-xl border border-border"/>)}
      </div>
      <div className="h-96 bg-card rounded-xl border border-border"/>
    </div>);
    if (isError)
        return <div className="p-8 text-center text-danger" role="alert" data-testid="superadmin_affiliates-superadmin-affiliates-main-affiliates-affiliates-client-alert">
          <p>{t('ui.affiliates_could_not_be_loaded_6ac4dd1')}</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <button type="button" onClick={retryAffiliates} className="min-h-11 rounded-md bg-primary px-4 py-2 text-sm font-medium text-on-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">{t('actions.retry')}</button>
            <button type="button" onClick={() => router.push(SUPERADMIN_AFFILIATES_MANAGEMENT_ROUTES.DESTINATION_1)} className="min-h-11 rounded-md border border-border px-4 py-2 text-sm font-medium text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">{t('ui.payout_history_625c04c')}</button>
          </div>
        </div>;
    return (<div className="flex flex-col gap-6 w-full max-w-7xl mx-auto" data-testid="superadmin_affiliates-superadmin-affiliates-main-page-ready">
      <SuperadminAffiliatesHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} statusFilter={statusFilter} onStatusFilterChange={setStatusFilter} onAddClick={() => setIsModalOpen(true)} startDate={startDate ?? ''} onStartDateChange={(value) => setStartDate(value)} endDate={endDate ?? ''} onEndDateChange={(value) => setEndDate(value)}/>

      <SuperadminAffiliatesStatsBar totalAffiliates={totalAffiliates} totalCommission={totalCommission} currency={affiliates[0]?.currency || 'INR'}/>

      <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
        <div className="border-b border-border p-4"><Link href={SUPERADMIN_AFFILIATES_MANAGEMENT_ROUTES.DESTINATION_1} className="inline-flex min-h-11 items-center rounded-md border border-border bg-card px-4 text-primary focus-visible:ring-2 focus-visible:ring-primary">{t('ui.payout_history_625c04c')}</Link></div>
        <SuperadminAffiliatesManagementErrorBoundary variant="inline">
          {affiliates.length===0 ? <SuperadminAffiliatesEmptyState onAddClick={()=>setIsModalOpen(true)}/> : <SuperadminAffiliatesTable onAddClick={()=>setIsModalOpen(true)} affiliates={affiliates} onToggleStatus={handleToggleAffiliateStatus} onEdit={openEditModal} onDelete={handleDeleteAffiliate} onPayCommission={handlePayCommission} currentPage={currentPage} totalPages={totalPages} setPage={setPage}/>}
        </SuperadminAffiliatesManagementErrorBoundary>
      </div>

      <SuperadminAffiliatesAffiliateModal isOpen={isModalOpen} onClose={handleCloseModal} form={form} onSubmit={editingAffiliate ? handleEditAffiliate : handleAddAffiliate} isEdit={!!editingAffiliate} isMutating={isMutating}/>
    </div>);
}


