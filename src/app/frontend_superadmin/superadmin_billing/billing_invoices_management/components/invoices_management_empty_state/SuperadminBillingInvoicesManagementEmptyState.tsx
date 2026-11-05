// RESPONSIBILITY: Renders/orchestrates SuperadminBillingInvoicesEmptyState within its owning Superadmin feature module; no direct backend implementation.
'use client';
/**
 * RESPONSIBILITY: React component SuperadminBillingInvoicesEmptyState owned by the superadmin_billing_invoices feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: Imported hook APIs: useTranslations.
 * MODULE DEPENDENCIES: lucide-react, next-intl, @/app/frontend_superadmin/superadmin_billing/billing_invoices_management/types/superadmin_billing_invoices_management_empty_state.types
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the empty state UI for the Invoices table when no invoices exist. Shows icon, message, and CTA to log first payment.
import { Receipt } from 'lucide-react';
import { useTranslations } from 'next-intl';

import type { SuperadminBillingInvoicesEmptyStateProps } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/types/superadmin_billing_invoices_management_empty_state.types';



/**
 * @description Renders InvoicesEmptyState within the owning Superadmin feature module.
 * @dependencies Uses only dependencies declared in this module file and documented feature infrastructure.
 * @edge-case Preserves documented loading, empty, error, disabled, retry, and repeated-action behavior.
 */
export default function SuperadminBillingInvoicesManagementEmptyState({ onLogPaymentClick }: SuperadminBillingInvoicesEmptyStateProps) {
  const t = useTranslations('superadmin_billing_invoices');
    return (<div className="flex flex-col items-center justify-center py-16 text-center" data-testid="superadmin_billing_invoices-superadmin-invoices-empty-state-invoices-empty-state-empty">
      <div className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center mb-4" data-testid="superadmin_billing_invoices-invoicesemptystate-state">
        <Receipt size={18} className="text-secondary opacity-50"/>
      </div>
      <h3 className="text-base font-semibold text-primary">{t('ui.no_invoices_yet_741a477d')}</h3>
      <p className="text-sm text-secondary mt-1 max-w-xs">{t('ui.no_payment_records_found_log_a_manual_paymen_866f00a4')}</p>
      <button type="button" onClick={onLogPaymentClick} className="mt-4 px-4 py-2 bg-primary hover:bg-primary-hover text-on-primary text-sm font-medium rounded-lg motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11 min-w-11" data-testid="superadmin_billing_invoices-superadmin-invoices-empty-state-state-log-manual-payment">
        {t('ui.log_manual_payment_e15e5207')}</button>
    </div>);
}
