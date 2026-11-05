// RESPONSIBILITY: Renders and orchestrates SuperadminBillingInvoicesMain for the owning Superadmin feature module; presentation stays free of direct API calls.
'use client';
/**
 * RESPONSIBILITY: React component SuperadminBillingInvoicesMain owned by the superadmin_billing_invoices feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: Imported hook APIs: useSuperadminBillingInvoicesManagementMain, useTranslations.
 * MODULE DEPENDENCIES: lucide-react, next-intl, @/components/ui/SearchableDropdown, @/app/frontend_superadmin/superadmin_billing/billing_invoices_management/components/invoices_management_aging_report/SuperadminBillingInvoicesManagementAgingReport, @/app/frontend_superadmin/superadmin_billing/billing_invoices_management/components/invoices_management_empty_state/SuperadminBillingInvoicesManagementEmptyState, @/app/frontend_superadmin/superadmin_billing/billing_invoices_management/components/invoices_management_header/SuperadminBillingInvoicesManagementHeader, @/app/frontend_superadmin/superadmin_billing/billing_invoices_management/components/invoices_management_log_payment_modal/SuperadminBillingInvoicesManagementLogPaymentModal, @/app/frontend_superadmin/superadmin_billing/billing_invoices_management/components/invoices_management_stats_bar/SuperadminBillingInvoicesManagementStatsBar, @/app/frontend_superadmin/superadmin_billing/billing_invoices_management/components/invoices_management_table/SuperadminBillingInvoicesManagementTable, @/app/frontend_superadmin/superadmin_billing/billing_invoices_management/constants/superadmin_billing_invoices_management.constants, @/app/frontend_superadmin/superadmin_billing/billing_invoices_management/hooks/useSuperadminBillingInvoicesManagementMain
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Root orchestrator for the Invoices page. Composes child views from useSuperadminBillingInvoicesManagementMain.
import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { SearchableDropdown } from '@/components/ui/SearchableDropdown';

import SuperadminBillingInvoicesAgingReport from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/components/invoices_management_aging_report/SuperadminBillingInvoicesManagementAgingReport';
import SuperadminBillingInvoicesEmptyState from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/components/invoices_management_empty_state/SuperadminBillingInvoicesManagementEmptyState';
import SuperadminBillingInvoicesHeader from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/components/invoices_management_header/SuperadminBillingInvoicesManagementHeader';
import SuperadminBillingInvoicesLogPaymentModal from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/components/invoices_management_log_payment_modal/SuperadminBillingInvoicesManagementLogPaymentModal';
import SuperadminBillingInvoicesStatsBar from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/components/invoices_management_stats_bar/SuperadminBillingInvoicesManagementStatsBar';
import SuperadminBillingInvoicesTable from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/components/invoices_management_table/SuperadminBillingInvoicesManagementTable';
import { SUPERADMIN_BILLING_INVOICES_TAB_CODES, SUPERADMIN_INVOICE_STATUS_OPTIONS } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/constants/superadmin_billing_invoices_management.constants';
import { useSuperadminBillingInvoicesManagementMain } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/hooks/useSuperadminBillingInvoicesManagementMain';



/**
 * @description Owns the SuperadminBillingInvoicesMain responsibility within the superadmin_role feature boundary.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminBillingInvoicesManagementMain() {
  const t = useTranslations('superadmin_billing_invoices');
  const { isPending, error, retryInvoices, invoices, filteredInvoices, filteredTenantsForDropdown, selectedGym, totalsByCurrency, search, setSearch, showAddModal, setShowAddModal, gymSearchTerm, setGymSearchTerm, isGymDropdownOpen, setIsGymDropdownOpen, handleSelectGym, isLoggingPayment, statusFilter, setStatusFilter, overdueCount, currentPage, pageLimit, setPage, total, activeTab, setActiveTab, handleSavePayment } = useSuperadminBillingInvoicesManagementMain();
  if (isPending) return (<div className="space-y-6 motion-safe:animate-pulse" data-testid="superadmin_billing_invoices-superadmin-invoices-main-page"><div className="h-8 w-full rounded bg-card sm:w-64"/><div className="grid grid-cols-1 gap-6 md:grid-cols-2"><div className="h-28 rounded-xl border border-border bg-card"/><div className="h-28 rounded-xl border border-border bg-card"/></div><div className="overflow-hidden rounded-xl border border-border bg-card"><div className="h-12 bg-surface-highlight"/>{[...Array(6)].map((_, i) => <div key={`skeleton-${i}`} className="h-12 border-t border-border"/>)}</div></div>);
  if (error) return <div className="flex flex-col items-center gap-3 p-8 text-center" role="alert" data-testid="superadmin_billing_invoices-main-error-state"><p className="text-danger">{t('ui.invoice_list_error_retry')}</p><button type="button" onClick={() => void retryInvoices()} className="min-h-11 rounded-lg bg-primary px-4 py-2 font-medium text-on-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-colors">{t('ui.try_again_d876a9fe')}</button></div>;
  return (<div className="relative space-y-6" data-testid="superadmin_billing_invoices-superadmin-invoices-main-page-ready">
    <SuperadminBillingInvoicesHeader onLogPaymentClick={() => setShowAddModal(true)}/>
    <SuperadminBillingInvoicesStatsBar totalsByCurrency={totalsByCurrency} overdueCount={overdueCount}/>
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-card">
      <div className="flex flex-col items-center justify-between gap-4 border-b border-border bg-input p-4 md:flex-row">
        <div className="flex w-full rounded-lg border border-border bg-input p-1 md:w-auto">
          <button type="button" onClick={() => setActiveTab(SUPERADMIN_BILLING_INVOICES_TAB_CODES.ALL)} aria-current={activeTab === SUPERADMIN_BILLING_INVOICES_TAB_CODES.ALL ? 'page' : undefined} className={`flex-1 rounded-md px-4 py-2 text-sm font-medium motion-safe:transition-colors md:flex-none ${activeTab === SUPERADMIN_BILLING_INVOICES_TAB_CODES.ALL ? 'bg-page text-primary shadow-card' : 'text-secondary hover:bg-page hover:text-primary'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11 min-w-11`} data-testid="superadmin_billing_invoices-superadmin-invoices-main-invoices-main-all-invoices">{t('ui.all_invoices_cf44752e')}</button>
          <button type="button" onClick={() => setActiveTab('AGING')} aria-current={activeTab === 'AGING' ? 'page' : undefined} className={`flex-1 rounded-md px-4 py-2 text-sm font-medium motion-safe:transition-colors md:flex-none ${activeTab === 'AGING' ? 'bg-page text-primary shadow-card' : 'text-secondary hover:bg-page hover:text-primary'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11 min-w-11`} data-testid="superadmin_billing_invoices-superadmin-invoices-main-invoices-main-aging-report">{t('ui.aging_report_76e9c1a4')}</button>
        </div>
      </div>
      {activeTab === 'AGING' ? <SuperadminBillingInvoicesAgingReport invoices={invoices}/> : <>
        <div className="flex gap-4 border-b border-border p-4">
          <div className="relative max-w-md flex-1"><Search size={18} className="absolute start-3 top-1/2 -translate-y-1/2 text-secondary" aria-hidden="true"/><label htmlFor="superadmin-invoices-search" className="sr-only">{t('ui.search_by_invoice_id_or_gym_name_26bd2806')}</label><input id="superadmin-invoices-search" type="search" placeholder={t('ui.search_by_invoice_id_or_gym_name_50f3a18b')} className="w-full rounded-lg border border-border bg-input py-2 ps-9 pe-4 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11" value={search} onChange={(e) => setSearch(e.target.value)} data-testid="superadmin_billing_invoices-superadmin-invoices-main-main-superadmin-invoices-search"/></div>
          <div className="w-40 rounded-lg bg-input"><SearchableDropdown data-testid="superadmin_billing_invoices-superadmin-invoices-main-status-filter" options={SUPERADMIN_INVOICE_STATUS_OPTIONS.map((option) => ({ label: t(option.labelKey), value: option.value }))} value={statusFilter || ''} onChange={(val) => setStatusFilter(val ? String(val) : null)} className="border-border bg-transparent"/></div>
        </div>
        {filteredInvoices.length === 0 ? <SuperadminBillingInvoicesEmptyState onLogPaymentClick={() => setShowAddModal(true)}/> : <SuperadminBillingInvoicesTable onLogPaymentClick={() => setShowAddModal(true)} invoices={filteredInvoices} currentPage={currentPage} totalPages={Math.ceil(total / pageLimit) || 1} onPageChange={setPage}/>}
      </>}
    </div>
    {showAddModal ? <SuperadminBillingInvoicesLogPaymentModal onClose={() => setShowAddModal(false)} selectedGym={selectedGym} isGymDropdownOpen={isGymDropdownOpen} setIsGymDropdownOpen={setIsGymDropdownOpen} gymSearchTerm={gymSearchTerm} setGymSearchTerm={setGymSearchTerm} filteredTenantsForDropdown={filteredTenantsForDropdown} handleSelectGym={handleSelectGym} onSave={handleSavePayment} isSaving={isLoggingPayment}/> : null}
  </div>);
}
