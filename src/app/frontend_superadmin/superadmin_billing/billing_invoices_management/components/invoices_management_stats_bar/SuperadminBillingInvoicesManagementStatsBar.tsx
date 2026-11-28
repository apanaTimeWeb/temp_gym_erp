// RESPONSIBILITY: Displays page-level metrics with separate totals for each currency; no cross-currency sum is produced.
'use client';
import { AlertCircle, Coins } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { formatCurrency as SuperadminBillingInvoicesFormatCurrency, formatSuperadminInvoiceCount } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/utils/SuperadminBillingInvoicesManagementFormatCurrency';
import type { SuperadminBillingInvoicesStatsBarProps } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/types/superadmin_billing_invoices_management_stats_bar.types';

const STAT_TONES = {
  success: {
    border: 'border-border dark:border-emerald-500/35',
    surface: 'bg-card dark:bg-gradient-to-br dark:from-[#0C2722] dark:via-[#121E2D] dark:to-[#0C1220]',
    topBar: 'from-[#10B981] via-[#34D399] to-transparent',
    iconBox: 'bg-success-bg border border-emerald-500/35 text-success',
  },
  warning: {
    border: 'border-border dark:border-amber-500/35',
    surface: 'bg-card dark:bg-gradient-to-br dark:from-[#281E10] dark:via-[#151B2C] dark:to-[#0C1220]',
    topBar: 'from-[#F59E0B] via-[#FACC15] to-transparent',
    iconBox: 'bg-warning-bg border border-amber-500/35 text-warning',
  },
  danger: {
    border: 'border-border dark:border-rose-500/35',
    surface: 'bg-card dark:bg-gradient-to-br dark:from-[#2B121B] dark:via-[#141B2D] dark:to-[#0C1220]',
    topBar: 'from-[#F43F5E] via-[#FB7185] to-transparent',
    iconBox: 'bg-danger-bg border border-rose-500/35 text-danger',
  },
} as const;

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

  return (
    <section aria-label={t('ui.current_page_summary')}>
      <p className="mb-2.5 text-xs text-secondary">{t('ui.current_page_summary_note')}</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ label, value, tone, Icon }) => {
          const style = STAT_TONES[tone];
          return (
            <div
              key={label}
              className={`relative overflow-hidden flex min-w-0 items-start gap-3.5 rounded-2xl border p-5 shadow-card ${style.surface} ${style.border} motion-safe:transition-all motion-safe:duration-base motion-safe:hover:-translate-y-0.5`}
            >
              <span aria-hidden="true" className={`pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${style.topBar}`} />
              <div className={`rounded-xl p-2.5 shrink-0 ${style.iconBox}`}>
                <Icon size={18} strokeWidth={2.2} aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-secondary truncate">{label}</p>
                <p className="mt-1.5 break-words text-lg sm:text-xl font-extrabold text-primary tabular-nums">{value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
