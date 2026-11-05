// RESPONSIBILITY: Displays page-level metrics with separate totals for each currency; no cross-currency sum is produced.
'use client';
import { AlertCircle, Coins } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { formatCurrency as SuperadminBillingInvoicesFormatCurrency, formatSuperadminInvoiceCount } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/utils/SuperadminBillingInvoicesManagementFormatCurrency';
import type { SuperadminBillingInvoicesStatsBarProps } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/types/superadmin_billing_invoices_management_stats_bar.types';

/** Displays page-level metrics with separate totals for each currency; no cross-currency sum is produced. */
export default function SuperadminBillingInvoicesManagementStatsBar({ totalsByCurrency, overdueCount }: SuperadminBillingInvoicesStatsBarProps) {
  const locale = useLocale();
  const t = useTranslations('superadmin_billing_invoices');
  const currencies = Object.keys(totalsByCurrency).sort();
  const renderCurrencyTotals = (key: 'totalRevenue' | 'failedRevenue' | 'pendingRevenue') => currencies.length
    ? currencies.map((currency) => `${currency}: ${SuperadminBillingInvoicesFormatCurrency((totalsByCurrency[currency]?.[key] ?? 0), currency, locale)}`).join(' · ')
    : '—';
  const cards = [
    { label: t('ui.page_total_collected'), value: renderCurrencyTotals('totalRevenue'), tone: 'success', Icon: Coins },
    { label: t('ui.page_failed_payments'), value: renderCurrencyTotals('failedRevenue'), tone: 'danger', Icon: AlertCircle },
    { label: t('ui.page_pending_revenue'), value: renderCurrencyTotals('pendingRevenue'), tone: 'warning', Icon: Coins },
    { label: t('ui.page_overdue_count'), value: formatSuperadminInvoiceCount(overdueCount, locale), tone: 'danger', Icon: AlertCircle },
  ] as const;
  return <section aria-label={t('ui.current_page_summary')}>
    <p className="mb-2 text-xs text-secondary">{t('ui.current_page_summary_note')}</p>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map(({ label, value, tone, Icon }) => <div key={label} className="flex min-w-0 items-start gap-3 rounded-xl border border-border bg-card p-4 motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:hover:-translate-y-1 hover:shadow-card">
        <div className={`rounded-xl p-3 ${(() => { if (tone === 'success') { return ('bg-success-bg text-success'); } if (tone === 'warning') { return ('bg-warning-bg text-warning'); } return ('bg-danger-bg text-danger'); })()}`}><Icon size={18} aria-hidden="true" /></div>
        <div className="min-w-0"><p className="text-sm font-medium text-secondary">{label}</p><p className="mt-1 break-words text-lg font-bold text-primary">{value}</p></div>
      </div>)}
    </div>
  </section>;
}
