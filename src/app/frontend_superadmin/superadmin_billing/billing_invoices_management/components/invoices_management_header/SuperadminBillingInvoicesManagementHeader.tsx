// RESPONSIBILITY: Renders/orchestrates SuperadminBillingInvoicesHeader within its owning Superadmin feature module; no direct backend implementation.
'use client';
import { Plus, ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { SuperadminBillingInvoicesManagementDateFilterDropdown } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/components/invoices_management_forms_and_filters/SuperadminBillingInvoicesManagementDateFilterDropdown';
import { useSuperadminBillingInvoicesManagementInvoiceActions } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/hooks/useSuperadminBillingInvoicesManagementInvoiceActions';

import type { SuperadminBillingInvoicesHeaderProps } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/types/superadmin_billing_invoices_management_header.types';

export default function SuperadminBillingInvoicesManagementHeader({ onLogPaymentClick }: SuperadminBillingInvoicesHeaderProps) {
  const t = useTranslations('superadmin_billing_invoices');
  const { exportInvoices, isExporting } = useSuperadminBillingInvoicesManagementInvoiceActions();
  const handleExportCSV = async () => { await exportInvoices(); };

  return (
    <section className="relative overflow-hidden rounded-2xl border border-amber-500/35 bg-card dark:bg-gradient-to-br dark:from-[#281E10] dark:via-[#12192B] dark:to-[#0C1322] p-5 sm:p-6 shadow-card flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#F59E0B] via-[#FACC15] to-[#FF5A1F]" />
      <div className="min-w-0">
        <h1 className="superadmin-page-title text-primary">{t('ui.saas_revenue_amp_invoices_658922fe')}</h1>
        <p className="mt-1 text-sm text-secondary">{t('ui.track_actual_payments_from_gym_owners_via_st_74241b46')}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2.5 shrink-0">
        <SuperadminBillingInvoicesManagementDateFilterDropdown />
        <button
          type="button"
          onClick={onLogPaymentClick}
          className="flex min-h-10 items-center gap-2 rounded-xl border border-border dark:border-white/15 bg-input hover:bg-surface-hover px-4 py-2 text-xs sm:text-sm font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:active:scale-95 cursor-pointer"
          data-testid="superadmin_billing_invoices-superadmin-invoices-header-header-log-manual-payment"
        >
          <Plus size={16} strokeWidth={2.2} aria-hidden="true" />
          <span>{t('ui.log_manual_payment_e15e5207')}</span>
        </button>
        <button
          type="button"
          onClick={() => void handleExportCSV()}
          disabled={isExporting}
          className="flex min-h-10 items-center gap-2 rounded-xl bg-gradient-to-r from-[#FF5A1F] to-[#F97316] px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:brightness-110 shadow-[0_4px_14px_rgba(255,90,31,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-60 motion-safe:transition-all motion-safe:active:scale-95 cursor-pointer"
          data-testid="superadmin_billing_invoices-superadmin-invoices-header-superadmin-invoices-header-button"
        >
          <ArrowUpRight size={16} strokeWidth={2.2} aria-hidden="true" />
          <span>{isExporting ? t('ui.exporting_6cf5a1d2') : t('ui.export_csv_0e36f4bc')}</span>
        </button>
      </div>
    </section>
  );
}
