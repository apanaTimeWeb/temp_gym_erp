// RESPONSIBILITY: Renders Superadmin Billing Invoices Management Aging Report using its declared props and feature-local hooks.
'use client';
import { useMemo } from 'react';

import { useTranslations, useLocale } from 'next-intl';

import { calculateSuperadminBillingInvoicesAging, type SuperadminBillingInvoicesAgingBucketName } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/utils/SuperadminBillingInvoicesManagementAgingUtils';
import { displaySuperadminInvoiceValue } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/utils/SuperadminBillingInvoicesManagementDisplayUtils';
import { formatSuperadminInvoiceCount } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/utils/SuperadminBillingInvoicesManagementFormatCurrency';
import { formatCurrency as SuperadminBillingInvoicesFormatCurrency } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/utils/SuperadminBillingInvoicesManagementFormatCurrency';

import type { SaaSInvoice } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/types/superadmin_billing_invoices_management.types';


const BUCKET_LABEL_KEYS: Record<SuperadminBillingInvoicesAgingBucketName, string> = {
  'Not Yet Due': 'ui.aging_not_yet_due',
  '0-30 Days': 'ui.aging_0_30_days',
  '31-60 Days': 'ui.aging_31_60_days',
  '60+ Days': 'ui.aging_60_plus_days',
};

/**
 * @description Renders the Superadmin invoices aging report interface within its owning Superadmin feature using the declared typed props.
 * @dependencies Consumes the component props and local imports listed in this file; domain logic must remain in the owning feature module.
 * @edge-case Keep null/empty data safe, expose validation or error feedback where applicable, and preserve keyboard/focus and repeated-action behavior.
 */
export default function SuperadminBillingInvoicesManagementAgingReport({ invoices }: { invoices: SaaSInvoice[] }) {
  const t = useTranslations('superadmin_billing_invoices');
  const locale = useLocale();
  const { agingBuckets, totalUnpaidByCurrency } = useMemo(() => calculateSuperadminBillingInvoicesAging(invoices), [invoices]);
  const currencyText = (totals: Record<string, number>) => Object.keys(totals).sort().map((currency) => `${currency}: ${SuperadminBillingInvoicesFormatCurrency((totals[currency] ?? 0), currency, locale)}`).join(' · ') || '—';
  return <div className="p-6">
    <p className="mb-3 text-xs text-secondary">{t('ui.current_page_summary_note')}</p>
    <div className="mb-6 flex items-center justify-between gap-4">
      <h2 className="text-xl font-bold text-primary">{t('ui.accounts_receivable_aging_8ae68da4')}</h2>
      <div className="text-end"><p className="text-sm text-secondary">{t('ui.total_outstanding_f85ec2ae')}</p><p className="break-words text-lg font-bold text-danger">{currencyText(totalUnpaidByCurrency)}</p></div>
    </div>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
      {(Object.entries(agingBuckets) as [SuperadminBillingInvoicesAgingBucketName, typeof agingBuckets[SuperadminBillingInvoicesAgingBucketName]][]).map(([bucket, data]) => <div key={bucket} className="flex flex-col justify-between rounded-xl border border-border bg-input p-4 shadow-card">
        <div><h3 className="text-sm font-semibold uppercase tracking-wider text-secondary">{t(BUCKET_LABEL_KEYS[bucket])}</h3><p className="mt-2 break-words text-lg font-bold text-primary">{currencyText(data.amountByCurrency)}</p><p className="mt-1 text-xs text-secondary">{formatSuperadminInvoiceCount(data.count, locale)} {t('ui.invoices_56deca22')}</p></div>
        {data.invoices.length > 0 && <div className="mt-4 max-h-32 overflow-y-auto border-t border-border pt-4 scrollbar-thin">{data.invoices.map((invoice) => <div key={invoice.id} className="flex justify-between gap-2 py-1 text-xs"><span className="max-w-24 truncate text-primary" title={displaySuperadminInvoiceValue(invoice.tenantName)}>{displaySuperadminInvoiceValue(invoice.tenantName)}</span><span className="font-medium text-secondary">{SuperadminBillingInvoicesFormatCurrency(invoice.amount, invoice.currency, locale)}</span></div>)}</div>}
      </div>)}
    </div>
  </div>;
}
