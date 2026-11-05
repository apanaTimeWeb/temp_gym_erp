// RESPONSIBILITY: Renders/orchestrates SuperadminBillingInvoicesTable within its owning Superadmin feature module; no direct backend implementation.
'use client';
/**
 * RESPONSIBILITY: React component SuperadminBillingInvoicesTable owned by the superadmin_billing_invoices feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: useState
 * MODULE DEPENDENCIES: @/lib/formatters, react, next-intl, @/components/ui/Pagination, @/app/frontend_superadmin/superadmin_billing/billing_invoices_management/components/invoices_management_empty_state/SuperadminBillingInvoicesManagementEmptyState, @/app/frontend_superadmin/superadmin_billing/billing_invoices_management/components/invoices_management_table/SuperadminBillingInvoicesManagementTableRow, @/app/frontend_superadmin/superadmin_billing/billing_invoices_management/types/superadmin_billing_invoices_management_table.types
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the SuperadminBillingInvoicesTable component.

import { useTranslations } from 'next-intl';

import Pagination from '@/components/ui/Pagination';

import SuperadminBillingInvoicesEmptyState from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/components/invoices_management_empty_state/SuperadminBillingInvoicesManagementEmptyState';
import SuperadminBillingInvoicesTableRow from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/components/invoices_management_table/SuperadminBillingInvoicesManagementTableRow';

import type { SuperadminBillingInvoicesTableProps } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/types/superadmin_billing_invoices_management_table.types';



const ITEMS_PER_PAGE = 10;
// Rule 68: TABLE_COLUMN_COUNT must match <th> count AND colSpan on empty state
// Columns: Invoice ID | Gym | Tax ID | Plan | Type | Amount | Status | Date | Actions = 9
const TABLE_COLUMN_COUNT = 9;
/**
 * @description Owns the SuperadminBillingInvoicesTable responsibility within the superadmin_role feature boundary.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminBillingInvoicesManagementTable({ invoices, onLogPaymentClick, currentPage, totalPages, onPageChange }: SuperadminBillingInvoicesTableProps) {
  const t = useTranslations('superadmin_billing_invoices');
    // Server-side pagination is now used.
    const paginatedInvoices = invoices;
    return (<div className="flex flex-col min-h-96">
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-start border-collapse min-w-full">
          <thead>
            <tr className="bg-header border-b border-border text-sm">
              <th className="p-4 font-semibold text-secondary">{t('ui.invoice_id_9c5c7edf')}</th>
              <th className="p-4 font-semibold text-secondary">{t('ui.gym_3372bcee')}</th>
              <th className="p-4 font-semibold text-secondary">{t('ui.tax_id_5616e5b0')}</th>
              <th className="p-4 font-semibold text-secondary">{t('ui.plan_0b6cbdf7')}</th>
              <th className="p-4 font-semibold text-secondary">{t('ui.type_a1fa2777')}</th>
              <th className="p-4 font-semibold text-secondary">{t('ui.amount_b2f40690')}</th>
              <th className="p-4 font-semibold text-secondary">{t('ui.status_ec53a8c4')}</th>
              <th className="p-4 font-semibold text-secondary">{t('ui.date_44749712')}</th>
              <th className="p-4 font-semibold text-secondary text-end">{t('ui.actions_06df3300')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginatedInvoices.length === 0 ? (<tr>
                <td colSpan={TABLE_COLUMN_COUNT}><SuperadminBillingInvoicesEmptyState onLogPaymentClick={onLogPaymentClick}/></td>
              </tr>) : (paginatedInvoices.map((inv) => (<SuperadminBillingInvoicesTableRow key={inv.id} invoice={inv}/>)))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (<div className="p-4 border-t border-border">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} data-testid="superadmin_billing_invoices-superadmin-invoices-table-superadmin-invoices-table-pagination"/>
        </div>)}
    </div>);
}
