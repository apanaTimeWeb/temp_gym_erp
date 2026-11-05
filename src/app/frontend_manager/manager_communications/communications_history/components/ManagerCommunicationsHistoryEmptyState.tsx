// RESPONSIBILITY: Presents the communications history zero-result state; filtering and campaign creation remain outside this component.
'use client';
import { MessageCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

/** @description Accessible empty state directing operators to the existing compose workflow. */
export default function ManagerCommunicationsHistoryEmptyState({ isFiltered = false }: { isFiltered?: boolean }) {
  const t = useTranslations('MANAGER_COMMUNICATIONS_CAMPAIGNS');
  return (
    <div data-testid="manager-communications-history-empty-state" role="status" aria-live="polite" className="bg-card border border-border rounded-xl p-12 flex flex-col items-center gap-3 text-center motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:hover:-translate-y-1">
      <div className="w-12 h-12 rounded-full bg-primary-subtle flex items-center justify-center"><MessageCircle size={18} strokeWidth={2} className="text-primary" aria-hidden="true" /></div>
      <p className="text-base font-semibold text-text-primary">{t(isFiltered ? 'COPY_NO_CAMPAIGNS_MATCH_FILTERS' : 'COPY_NO_CAMPAIGNS_YET')}</p>
      <p className="text-sm text-text-secondary">{isFiltered ? t('COPY_ADJUST_SEARCH_OR_CHANNEL_FILTER') : t('COPY_SEND_FIRST_CAMPAIGN_USING_COMPOSE_TAB')}</p>
    </div>
  );
}
