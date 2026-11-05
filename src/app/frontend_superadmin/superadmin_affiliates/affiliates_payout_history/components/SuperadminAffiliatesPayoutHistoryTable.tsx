// RESPONSIBILITY: Renders/orchestrates SuperadminAffiliatesPayoutHistory within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders server-backed affiliate payout history passed from the feature page query.
import { Loader2 } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

import { SUPERADMIN_AFFILIATE_PAYOUT_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_payout_history/constants/superadmin_affiliates_payout_history.constants';
import { SuperadminAffiliatesFormatCurrency } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_payout_history/utils/SuperadminAffiliatesPayoutHistoryFormatCurrency';
import { formatDate } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_payout_history/utils/SuperadminAffiliatesPayoutHistoryFormatters';

import type { SuperadminAffiliatesPayoutHistoryProps } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_payout_history/types/superadmin_affiliates_payout_history_payout_history.types';
import type { AffiliatePayoutRecord } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_payout_history/types/superadmin_affiliates_payout_history.types';



/**
 * @description Renders server-backed affiliate payout history passed from the feature page query.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */

const MOBILE_CARD_TABLE_CLASSES = [
  'w-full text-start border-collapse max-md:block max-md:min-w-0',
  'max-md:[&_thead]:sr-only max-md:[&_tbody]:block',
  'max-md:[&_tbody_tr]:mb-3 max-md:[&_tbody_tr]:grid max-md:[&_tbody_tr]:grid-cols-1 max-md:[&_tbody_tr]:w-full',
  'max-md:[&_tbody_tr]:rounded-lg max-md:[&_tbody_tr]:border max-md:[&_tbody_tr]:border-border max-md:[&_tbody_tr]:bg-card',
  'max-md:[&_tbody_td]:grid max-md:[&_tbody_td]:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] max-md:[&_tbody_td]:gap-3',
  'max-md:[&_tbody_td]:w-full max-md:[&_tbody_td]:border-0 max-md:[&_tbody_td]:p-3',
  'max-md:[&_tbody_td::before]:content-[attr(data-mobile-label)] max-md:[&_tbody_td::before]:text-secondary',
  'max-md:[&_tbody_td::before]:text-xs max-md:[&_tbody_td::before]:font-semibold max-md:[&_tbody_td::before]:uppercase',
].join(' ');

export default function SuperadminAffiliatesPayoutHistoryTable({ payouts, isPending, isError, onRetry }: SuperadminAffiliatesPayoutHistoryProps) {
  const t = useTranslations('superadmin_affiliates');
    const locale = useLocale();

  if (isPending) return <div className="flex min-h-48 items-center justify-center gap-2 text-secondary" aria-busy="true" data-testid="superadmin_affiliates-payout-history-loading-state"><Loader2 size={18} className="motion-safe:animate-spin"/>  {t('ui.loading_payout_history_8f6ea03')}</div>;
  if (isError) return <div role="alert" className="rounded-lg border border-border bg-danger-bg p-5 text-sm text-danger" data-testid="superadmin_affiliates-superadmin-affiliates-payout-history-affiliates-payout-history-history">{t('ui.unable_to_load_payout_history_113f9d3')} <button type="button" onClick={onRetry} className="min-h-11 ms-1 underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95" data-testid="superadmin_affiliates-superadmin-affiliates-payout-history-affiliates-payout-history-retry">{t('ui.retry_0f25598')}</button></div>;
  if (payouts.length === 0) return <div className="rounded-lg border border-border bg-card p-8 text-center text-secondary">{t('ui.no_payout_history_available_b5c8805')}</div>;
  return <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-card"><table className={`w-full min-w-max border-collapse text-start ${MOBILE_CARD_TABLE_CLASSES}`}><thead><tr className="border-b border-border bg-primary-subtle text-secondary" data-testid="superadmin_affiliates-superadmin-affiliates-payout-history-payout-history-action-1"><th className="p-4 text-xs font-semibold uppercase tracking-wider">{t('ui.date_ba31778')}</th><th className="p-4 text-xs font-semibold uppercase tracking-wider">{t('ui.affiliate_774d70b')}</th><th className="p-4 text-xs font-semibold uppercase tracking-wider">{t('ui.amount_f1d432d')}</th><th className="p-4 text-xs font-semibold uppercase tracking-wider">{t('ui.method_dfe267c')}</th><th className="p-4 text-xs font-semibold uppercase tracking-wider">{t('ui.ref_id_c0feb73')}</th><th className="p-4 text-xs font-semibold uppercase tracking-wider">{t('ui.status_1b84b5c')}</th></tr></thead><tbody className="divide-y divide-border">{payouts.map((payout: AffiliatePayoutRecord) => <tr key={payout.id} className="motion-safe:transition-colors hover:bg-surface-hover" data-testid={`superadmin_affiliates-affiliates-payout-history-item-payout-id-2-${String(payout.id)}`}><td className="p-4 text-sm text-secondary" data-mobile-label={t('ui.mobile_date')}>{formatDate(payout.paidAt, locale)}</td><td className="p-4" data-mobile-label={t('ui.mobile_affiliate')}><span className="font-medium text-primary">{payout.affiliateName}</span><span className="block text-xs text-disabled">{payout.affiliateId}</span></td><td className="p-4 font-medium text-primary" data-mobile-label={t('ui.mobile_amount')}>{SuperadminAffiliatesFormatCurrency(payout.amount, payout.currency || 'INR', locale)}</td><td className="p-4 text-sm text-secondary" data-mobile-label={t('ui.mobile_method')}>{payout.method === 'BANK_TRANSFER' ? t('ui.bank_transfer_898f097') : t('ui.paypal')}</td><td className="p-4 text-xs font-mono text-secondary" data-mobile-label={t('ui.mobile_ref_id')}>{payout.referenceId}</td><td className="p-4" data-mobile-label={t('ui.mobile_status')}>{payout.status === SUPERADMIN_AFFILIATE_PAYOUT_STATUS_CODES.COMPLETED ? <span data-testid={`superadmin_affiliates-payout-status-completed-${payout.id}`} className="rounded-full border border-border bg-success-bg px-2.5 py-1 text-xs font-semibold text-success">{t('ui.completed_75e218a')}</span> : <span data-testid={`superadmin_affiliates-payout-status-pending-${payout.id}`} className="rounded-full border border-border bg-warning-bg px-2.5 py-1 text-xs font-semibold text-warning">{t('ui.pending_6d3d6c6')}</span>}</td></tr>)}</tbody></table></div>;
}
