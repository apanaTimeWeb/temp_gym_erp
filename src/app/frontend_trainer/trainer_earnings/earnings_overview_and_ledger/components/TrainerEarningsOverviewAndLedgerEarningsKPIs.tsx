"use client";
// RESPONSIBILITY: Renders Trainer Earnings KPI values from TanStack Query using the module currency formatter.
import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import { TRAINER_EARNINGS_KPI_CARD_CONFIG, TRAINER_EARNINGS_KPI_CARD_KEYS } from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/utils/TrainerEarningsOverviewAndLedgerEarningsConstants';

import { useTrainerEarningsQuery } from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/hooks/useTrainerEarningsOverviewAndLedgerEarningsQuery';

import { TrainerEarningsFormatNumber } from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/utils/TrainerEarningsOverviewAndLedgerEarningsDisplayFormatters';

import { TrainerEarningsFormatCurrency } from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/utils/TrainerEarningsOverviewAndLedgerEarningsFormatCurrency';

import TrainerInfrastructureTooltip from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/components/TrainerEarningsOverviewAndLedgerTrainerInfrastructureTooltip';

import TrainerInfrastructureSkeletonBlock from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/components/TrainerEarningsOverviewAndLedgerTrainerInfrastructureSkeletonBlock';

// DATA FLOW: URL-backed earnings query → TrainerEarningsKPIs → locale-aware semantic KPI cards.







/**
 * @description Owns TrainerEarningsKPIs behavior in the Trainer module.
 * @dependencies Uses only the module-owned dependencies declared by this artifact.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
/**
 * @description Renders read-only KPI summaries for the earnings feature using module-owned derived data and semantic design tokens.
 * @dependencies Uses only documented earnings module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerEarningsKPIs() {
  const t = useTranslations('TRAINER_EARNINGS');
  const locale = useLocale();
  const searchParams = useSearchParams();
  const range = searchParams.get('range') || 'this_month';
  const { data, isPending } = useTrainerEarningsQuery();
  const kpis = data?.kpis;

  const getKpiTitle = (key: string, defaultLabelKey: string) => {
    if (key === 'total') {
      if (range === 'last_month') return t('TEXT_TOTAL_EARNINGS_LAST_MONTH');
      if (range === 'last_3_months') return t('TEXT_TOTAL_EARNINGS_LAST_3_MONTHS');
      if (range === 'this_year') return t('TEXT_TOTAL_EARNINGS_THIS_YEAR');
      if (range === 'custom') return t('TEXT_TOTAL_EARNINGS_PERIOD');
      return t('TEXT_TOTAL_EARNINGS');
    }
    if (key === 'sessions') {
      if (range === 'last_month') return t('TEXT_SESSIONS_COMPLETED_LAST_MONTH');
      if (range === 'last_3_months') return t('TEXT_SESSIONS_COMPLETED_LAST_3_MONTHS');
      if (range === 'this_year') return t('TEXT_SESSIONS_COMPLETED_THIS_YEAR');
      if (range === 'custom') return t('TEXT_SESSIONS_COMPLETED_PERIOD');
      return t('TEXT_SESSIONS_COMPLETED');
    }
    return t(defaultLabelKey);
  };

  if (isPending || !kpis) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5" aria-busy="true" aria-label={t('TEXT_LOADING_EARNINGS_KPIS')} data-testid="trainer_earnings-kpis-loading">
        {TRAINER_EARNINGS_KPI_CARD_KEYS.map((key) => <TrainerInfrastructureSkeletonBlock key={key} className="h-28 rounded-xl border border-border" testId={`trainer-earnings-kpis-loading-card-${key}`} />)}
      </div>
    );
  }

  const currency = kpis.currency;
  const valuesByKey = {
    total: TrainerEarningsFormatCurrency(kpis.totalEarnings, currency, locale),
    pending: TrainerEarningsFormatCurrency(kpis.pendingPayouts, currency, locale),
    sessions: TrainerEarningsFormatNumber(kpis.sessionsCompleted, locale),
    commission: `${kpis.commissionRate}%`,
    tax: TrainerEarningsFormatCurrency(kpis.taxDeduction, currency, locale),
  } as const;

  const earningsAccents: Record<string, { border: string; surface: string; glow: string; stroke: string; badge: string }> = {
    total: {
      border: 'border-emerald-500/30',
      surface: 'bg-card dark:bg-gradient-to-br dark:from-[#122620] dark:via-[#202020] dark:to-[#181818]',
      glow: 'bg-emerald-500',
      stroke: '#34D399',
      badge: 'border-emerald-500/30',
    },
    pending: {
      border: 'border-amber-500/30',
      surface: 'bg-card dark:bg-gradient-to-br dark:from-[#262012] dark:via-[#202020] dark:to-[#181818]',
      glow: 'bg-amber-500',
      stroke: '#FBBF24',
      badge: 'border-amber-500/30',
    },
    sessions: {
      border: 'border-sky-500/30',
      surface: 'bg-card dark:bg-gradient-to-br dark:from-[#13222d] dark:via-[#202020] dark:to-[#181818]',
      glow: 'bg-sky-500',
      stroke: '#38BDF8',
      badge: 'border-sky-500/30',
    },
    commission: {
      border: 'border-orange-500/30',
      surface: 'bg-card dark:bg-gradient-to-br dark:from-[#261914] dark:via-[#202020] dark:to-[#181818]',
      glow: 'bg-orange-500',
      stroke: '#FF5A1F',
      badge: 'border-orange-500/30',
    },
    tax: {
      border: 'border-rose-500/30',
      surface: 'bg-card dark:bg-gradient-to-br dark:from-[#28141a] dark:via-[#202020] dark:to-[#181818]',
      glow: 'bg-rose-500',
      stroke: '#FB7185',
      badge: 'border-rose-500/30',
    },
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {TRAINER_EARNINGS_KPI_CARD_CONFIG.map(({ key, labelKey, icon: Icon, color, bg }) => {
        const accent = earningsAccents[key] ?? earningsAccents.total;
        return (
          <article key={key} className={`relative overflow-hidden min-w-0 ${accent.surface} border ${accent.border} rounded-2xl p-5 flex flex-col justify-between shadow-card motion-safe:transition-all motion-safe:duration-base motion-safe:hover:scale-[1.01]`} data-testid={`trainer_earnings-kpis-card${key}`}>
            <span aria-hidden="true" className={`pointer-events-none absolute -right-6 -bottom-6 h-24 w-24 rounded-full blur-2xl opacity-15 ${accent.glow}`} />
            <svg aria-hidden="true" viewBox="0 0 150 45" className="pointer-events-none absolute bottom-0 right-0 h-14 w-32 opacity-20">
              <path d="M0 36 Q28 30 56 24 T106 16 T150 8" fill="none" stroke={accent.stroke} strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <div className="relative flex items-start justify-between gap-3">
              <p className="text-xs font-semibold text-secondary uppercase tracking-wider truncate">{getKpiTitle(key, labelKey)}</p>
              <div className={`p-2 rounded-xl border ${accent.badge} flex items-center justify-center shrink-0 ${bg}`}><Icon size={18} strokeWidth={2.2} className={color} /></div>
            </div>
            <TrainerInfrastructureTooltip content={valuesByKey[key]}><p className={`relative text-kpi font-bold tabular-nums ${color} mt-4 break-words`}>{valuesByKey[key]}</p></TrainerInfrastructureTooltip>
          </article>
        );
      })}
    </div>
  );
}
