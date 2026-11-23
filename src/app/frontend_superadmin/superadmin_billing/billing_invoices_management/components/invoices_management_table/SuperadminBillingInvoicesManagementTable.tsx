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

import { useState, useId } from 'react';
import { useLocale, useTranslations } from 'next-intl';

import Pagination from '@/components/ui/Pagination';

import SuperadminBillingInvoicesEmptyState from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/components/invoices_management_empty_state/SuperadminBillingInvoicesManagementEmptyState';
import SuperadminBillingInvoicesTableRow from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/components/invoices_management_table/SuperadminBillingInvoicesManagementTableRow';

import type { SuperadminBillingInvoicesTableProps } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/types/superadmin_billing_invoices_management_table.types';

// Rule 68: TABLE_COLUMN_COUNT must match <th> count AND colSpan on empty state
// Columns: Checkbox | Invoice ID | Gym | Tax ID | Plan | Type | Amount | Status | Date | Actions = 10
const TABLE_COLUMN_COUNT = 10;
const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

/**
 * @description Owns the SuperadminBillingInvoicesTable responsibility within the superadmin_role feature boundary.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminBillingInvoicesManagementTable({
  invoices,
  onLogPaymentClick,
  currentPage,
  totalPages,
  onPageChange,
  total,
  pageSize = 10,
  onPageSizeChange,
  selectedInvoiceIds,
  onToggleSelectInvoice,
  onToggleSelectAllInvoices,
}: SuperadminBillingInvoicesTableProps) {
  const t = useTranslations('superadmin_billing_invoices');
  const locale = useLocale();
  const selectAllId = useId();
  const pageSizeSelectId = useId();

  // Internal selection fallback if not externally controlled
  const [localSelectedIds, setLocalSelectedIds] = useState<Set<string>>(new Set());
  const selectedIds = selectedInvoiceIds ?? localSelectedIds;

  const handleToggleRow = (id: string) => {
    if (onToggleSelectInvoice) {
      onToggleSelectInvoice(id);
    } else {
      setLocalSelectedIds((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      });
    }
  };

  const handleToggleAll = () => {
    if (onToggleSelectAllInvoices) {
      onToggleSelectAllInvoices();
    } else {
      if (selectedIds.size === invoices.length) {
        setLocalSelectedIds(new Set());
      } else {
        setLocalSelectedIds(new Set(invoices.map((inv) => inv.id)));
      }
    }
  };

  const handleClearSelection = () => {
    if (onToggleSelectAllInvoices && selectedIds.size > 0) {
      onToggleSelectAllInvoices();
    } else {
      setLocalSelectedIds(new Set());
    }
  };

  const isAllSelected = invoices.length > 0 && selectedIds.size === invoices.length;
  const isIndeterminate = selectedIds.size > 0 && selectedIds.size < invoices.length;

  // Pagination calculation: "Showing X–Y of N"
  const effectiveTotal = total ?? invoices.length;
  const startRow = effectiveTotal === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endRow = Math.min(currentPage * pageSize, effectiveTotal);

  return (
    <div className="flex flex-col min-h-96">
      {/* Batch Action Floating / Top Bar */}
      {selectedIds.size > 0 && (
        <div className="p-3 bg-primary-subtle border-b border-border flex flex-wrap items-center justify-between gap-3 motion-safe:animate-fadeIn">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary text-on-primary">
              {selectedIds.size} Selected
            </span>
            <button
              type="button"
              onClick={handleClearSelection}
              className="text-xs text-secondary hover:text-primary font-medium underline cursor-pointer"
            >
              Clear Selection
            </button>
          </div>
          <div className="flex items-center gap-2 text-xs text-secondary font-medium">
            <span>Bulk actions active for selected invoices</span>
          </div>
        </div>
      )}

      {/* Scrollable Viewport with Sticky Start Columns */}
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-start border-collapse min-w-full">
          <thead className="sticky top-0 z-20 bg-primary-subtle border-b border-border shadow-xs">
            <tr className="bg-primary-subtle border-b border-border text-sm">
              {/* 1. Multi-Select Checkbox (Sticky Start-0) */}
              <th className="w-12 px-4 py-3 text-center sticky start-0 z-20 bg-primary-subtle border-b border-border">
                <input
                  id={selectAllId}
                  type="checkbox"
                  aria-label={t('ui.select_all_rows') || 'Select all invoices'}
                  checked={isAllSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = isIndeterminate;
                  }}
                  onChange={handleToggleAll}
                  className="h-4 w-4 rounded border-border text-primary accent-primary cursor-pointer focus:ring-2 focus:ring-primary"
                />
              </th>

              {/* 2. Frozen Sticky Invoice ID (Sticky Start-12) */}
              <th className="sticky start-12 z-20 px-4 py-3 text-start font-semibold text-secondary text-xs uppercase tracking-wider bg-primary-subtle border-b border-e border-border">
                {t('ui.invoice_id_9c5c7edf')}
              </th>

              {/* 3. Gym */}
              <th className="p-4 font-semibold text-secondary text-xs uppercase tracking-wider">{t('ui.gym_3372bcee')}</th>

              {/* 4. Tax ID */}
              <th className="p-4 font-semibold text-secondary text-xs uppercase tracking-wider">{t('ui.tax_id_5616e5b0')}</th>

              {/* 5. Plan */}
              <th className="p-4 font-semibold text-secondary text-xs uppercase tracking-wider">{t('ui.plan_0b6cbdf7')}</th>

              {/* 6. Type */}
              <th className="p-4 font-semibold text-secondary text-xs uppercase tracking-wider">{t('ui.type_a1fa2777')}</th>

              {/* 7. Amount */}
              <th className="p-4 font-semibold text-secondary text-xs uppercase tracking-wider">{t('ui.amount_b2f40690')}</th>

              {/* 8. Status */}
              <th className="p-4 font-semibold text-secondary text-xs uppercase tracking-wider">{t('ui.status_ec53a8c4')}</th>

              {/* 9. Date */}
              <th className="p-4 font-semibold text-secondary text-xs uppercase tracking-wider">{t('ui.date_44749712')}</th>

              {/* 10. Actions (Right-aligned) */}
              <th className="p-4 font-semibold text-secondary text-xs uppercase tracking-wider text-end">{t('ui.actions_06df3300')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {invoices.length === 0 ? (
              <tr>
                <td colSpan={TABLE_COLUMN_COUNT}>
                  <SuperadminBillingInvoicesEmptyState onLogPaymentClick={onLogPaymentClick} />
                </td>
              </tr>
            ) : (
              invoices.map((inv) => (
                <SuperadminBillingInvoicesTableRow
                  key={inv.id}
                  invoice={inv}
                  isSelected={selectedIds.has(inv.id)}
                  onToggleSelect={handleToggleRow}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* In-Card Bottom-Pinned Pagination Bar */}
      <div className="border-t border-border px-4 py-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between bg-card">
        <p className="text-xs text-secondary" aria-live="polite">
          Showing <span className="font-semibold text-primary">{new Intl.NumberFormat(locale).format(startRow)}</span>–<span className="font-semibold text-primary">{new Intl.NumberFormat(locale).format(endRow)}</span> of <span className="font-semibold text-primary">{new Intl.NumberFormat(locale).format(effectiveTotal)}</span> invoices
        </p>

        <div className="flex flex-wrap items-center gap-3">
          {onPageSizeChange && (
            <div className="flex items-center gap-1.5 text-xs text-secondary">
              <label htmlFor={pageSizeSelectId} className="font-medium">Rows:</label>
              <select
                id={pageSizeSelectId}
                value={pageSize}
                onChange={(e) => onPageSizeChange(Number(e.target.value))}
                className="h-8 rounded-lg border border-border bg-input px-2 py-0.5 text-xs text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
              >
                {PAGE_SIZE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            data-testid="superadmin_billing_invoices-superadmin-invoices-table-superadmin-invoices-table-pagination"
          />
        </div>
      </div>
    </div>
  );
}
