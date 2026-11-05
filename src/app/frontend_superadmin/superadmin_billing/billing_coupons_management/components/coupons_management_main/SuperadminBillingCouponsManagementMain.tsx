// RESPONSIBILITY: Renders and orchestrates SuperadminBillingCouponsMain for the owning Superadmin feature module; presentation stays free of direct API calls.
'use client';
/**
 * RESPONSIBILITY: React component SuperadminBillingCouponsMain owned by the superadmin_coupons feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: Imported hook APIs: useSuperadminBillingCouponsManagementMain, useTranslations.
 * MODULE DEPENDENCIES: next-intl, @/app/frontend_superadmin/superadmin_billing/billing_coupons_management/components/coupons_management_empty_state/SuperadminBillingCouponsManagementEmptyState, @/app/frontend_superadmin/superadmin_billing/billing_coupons_management/components/coupons_management_header/SuperadminBillingCouponsManagementHeader, @/app/frontend_superadmin/superadmin_billing/billing_coupons_management/components/coupons_management_stats_bar/SuperadminBillingCouponsManagementStatsBar, @/app/frontend_superadmin/superadmin_billing/billing_coupons_management/components/coupons_management_table/SuperadminBillingCouponsManagementTable, @/app/frontend_superadmin/superadmin_billing/billing_coupons_management/components/coupons_management_modals/SuperadminBillingCouponsManagementCouponEditModal, @/app/frontend_superadmin/superadmin_billing/billing_coupons_management/components/coupons_management_modals/SuperadminBillingCouponsManagementCouponModal, @/app/frontend_superadmin/superadmin_billing/billing_coupons_management/components/coupons_management_modals/SuperadminBillingCouponsManagementRedemptionDrawer, @/app/frontend_superadmin/superadmin_billing/billing_coupons_management/hooks/useSuperadminBillingCouponsManagementMain
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Root orchestrator for the Coupons page. Composes isolated sub-components and consumes the main feature hook.
import { useTranslations } from 'next-intl';

import SuperadminBillingCouponsEmptyState from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/components/coupons_management_empty_state/SuperadminBillingCouponsManagementEmptyState';
import SuperadminBillingCouponsHeader from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/components/coupons_management_header/SuperadminBillingCouponsManagementHeader';
import { SuperadminBillingCouponsCouponEditModal } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/components/coupons_management_modals/SuperadminBillingCouponsManagementCouponEditModal';
import { SuperadminBillingCouponsCouponModal } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/components/coupons_management_modals/SuperadminBillingCouponsManagementCouponModal';
import SuperadminBillingCouponsRedemptionDrawer from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/components/coupons_management_modals/SuperadminBillingCouponsManagementRedemptionDrawer';
import SuperadminBillingCouponsStatsBar from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/components/coupons_management_stats_bar/SuperadminBillingCouponsManagementStatsBar';
import SuperadminBillingCouponsTable from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/components/coupons_management_table/SuperadminBillingCouponsManagementTable';
import { useSuperadminBillingCouponsManagementMain } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/hooks/useSuperadminBillingCouponsManagementMain';


/**
 * @description Owns the SuperadminBillingCouponsMain responsibility within the superadmin_role feature boundary.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminBillingCouponsManagementMain() {
  const t = useTranslations('superadmin_coupons');
  const { coupons, searchQuery, setSearchQuery, isModalOpen, setIsModalOpen, form, handleCreateCoupon, activeCoupons, totalRedeemed, status, error, isEditModalOpen, setIsEditModalOpen, selectedCoupon, setSelectedCoupon, handleUpdateCoupon, handleDeleteCoupon, handleToggleRestore, handleToggleStatus, isMutating, refetch, activeKpi, setActiveKpi, totalCoupons, statusFilter, setStatusFilter, isDrawerOpen, setIsDrawerOpen, drawerCoupon } = useSuperadminBillingCouponsManagementMain();
  if (status === 'pending') {
    return (<div className="space-y-6 motion-safe:animate-pulse" data-testid="superadmin_coupons-superadmin-coupons-main-page"><div className="h-8 w-48 rounded bg-card"/><div className="grid grid-cols-1 gap-4 md:grid-cols-3">{[...Array(3)].map((_, i) => <div key={`skeleton-${i}`} className="h-24 rounded-xl border border-border bg-card"/>)}</div><div className="h-96 rounded-xl border border-border bg-card"/></div>);
  }
  if (error) return <div className="p-8 text-center text-danger" role="alert" data-testid="superadmin_coupons-main-error-state"><p>{error}</p><button type="button" onClick={() => void refetch()} className="mt-3 min-h-11 min-w-32 rounded-md bg-primary px-4 py-2 font-medium text-on-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{t('ui.retry_6327b4e5')}</button></div>;
  return (<div className="mx-auto flex w-full max-w-7xl flex-col gap-6" data-testid="superadmin_coupons-superadmin-coupons-main-page-ready">
    <SuperadminBillingCouponsHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} onCreateClick={() => setIsModalOpen(true)} statusFilter={statusFilter} onStatusFilterChange={setStatusFilter}/>
    <SuperadminBillingCouponsStatsBar activeCoupons={activeCoupons} totalRedeemed={totalRedeemed} totalCoupons={totalCoupons} activeKpi={activeKpi} onKpiClick={setActiveKpi}/>
    {coupons.length === 0 ? <SuperadminBillingCouponsEmptyState onCreateClick={() => setIsModalOpen(true)}/> : <SuperadminBillingCouponsTable onCreateClick={() => setIsModalOpen(true)} coupons={coupons} onToggleStatus={handleToggleStatus} onEdit={(cpn) => { setSelectedCoupon(cpn); setIsEditModalOpen(true); }} onDelete={handleDeleteCoupon} onRestore={handleToggleRestore}/> }
    <SuperadminBillingCouponsCouponModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} form={form} onSubmit={handleCreateCoupon} isSubmitting={isMutating}/>
    <SuperadminBillingCouponsCouponEditModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} onSubmit={handleUpdateCoupon} coupon={selectedCoupon} isSubmitting={isMutating}/>
    <SuperadminBillingCouponsRedemptionDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} coupon={drawerCoupon}/>
  </div>);
}

