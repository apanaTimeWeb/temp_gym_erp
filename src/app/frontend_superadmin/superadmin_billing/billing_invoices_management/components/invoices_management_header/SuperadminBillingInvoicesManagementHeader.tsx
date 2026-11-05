// RESPONSIBILITY: Renders/orchestrates SuperadminBillingInvoicesHeader within its owning Superadmin feature module; no direct backend implementation.
'use client';
/**
 * RESPONSIBILITY: React component SuperadminBillingInvoicesHeader owned by the superadmin_billing_invoices feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: Imported hook APIs: useSuperadminBillingInvoicesManagementInvoiceActions, useTranslations.
 * MODULE DEPENDENCIES: lucide-react, next-intl, sonner, @/app/frontend_superadmin/superadmin_billing/billing_invoices_management/components/invoices_management_forms_and_filters/SuperadminBillingInvoicesManagementDateFilterDropdown, @/app/frontend_superadmin/superadmin_billing/billing_invoices_management/hooks/useSuperadminBillingInvoicesManagementInvoiceActions, @/app/frontend_superadmin/superadmin_billing/billing_invoices_management/types/superadmin_billing_invoices_management_header.types
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders invoice page actions and delegates export behavior to the invoice action hook.
import { Plus, ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { SuperadminBillingInvoicesManagementDateFilterDropdown } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/components/invoices_management_forms_and_filters/SuperadminBillingInvoicesManagementDateFilterDropdown';
import { useSuperadminBillingInvoicesManagementInvoiceActions } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/hooks/useSuperadminBillingInvoicesManagementInvoiceActions';

import type { SuperadminBillingInvoicesHeaderProps } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/types/superadmin_billing_invoices_management_header.types';



/**
 * @description Owns the SuperadminBillingInvoicesHeader responsibility within the superadmin_role feature boundary.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminBillingInvoicesManagementHeader({ onLogPaymentClick }: SuperadminBillingInvoicesHeaderProps) {
  const t = useTranslations('superadmin_billing_invoices');
  const { exportInvoices, isExporting } = useSuperadminBillingInvoicesManagementInvoiceActions();
  const handleExportCSV = async () => { await exportInvoices(); };
  return (
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div><h1 className="text-3xl font-bold text-primary">{t('ui.saas_revenue_amp_invoices_658922fe')}</h1><p className="mt-1 text-secondary">{t('ui.track_actual_payments_from_gym_owners_via_st_74241b46')}</p></div>
      <div className="flex flex-wrap items-center gap-3">
        <SuperadminBillingInvoicesManagementDateFilterDropdown />
        <button type="button" onClick={onLogPaymentClick} className="flex min-h-11 items-center gap-2 rounded-lg border border-border bg-input px-4 py-2 font-medium text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="superadmin_billing_invoices-superadmin-invoices-header-header-log-manual-payment"><Plus size={18} strokeWidth={2} aria-hidden="true"/>{t('ui.log_manual_payment_e15e5207')}</button>
        <button type="button" onClick={() => void handleExportCSV()} disabled={isExporting} className="flex min-h-11 items-center gap-2 rounded-lg bg-primary px-4 py-2 font-medium text-on-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-60 motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="superadmin_billing_invoices-superadmin-invoices-header-superadmin-invoices-header-button"><ArrowUpRight size={18} strokeWidth={2} aria-hidden="true"/>{isExporting ? t('ui.exporting_6cf5a1d2') : t('ui.export_csv_0e36f4bc')}</button>
      </div>
    </div>
  );
}
