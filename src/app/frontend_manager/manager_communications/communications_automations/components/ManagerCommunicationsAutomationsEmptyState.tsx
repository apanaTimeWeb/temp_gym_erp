// RESPONSIBILITY: Presents the communications automations zero-result state; automation configuration remains with the owning feature.
'use client';
import { Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';

/** @description Accessible empty state when the automation query returns no configured automations. */
export default function ManagerCommunicationsAutomationsEmptyState() {
  const t = useTranslations('MANAGER_COMMUNICATIONS_CAMPAIGNS');
  return (
    <div data-testid="manager-communications-automations-empty-state" role="status" aria-live="polite" className="rounded-xl border border-border bg-card py-12 px-6 text-center flex flex-col items-center gap-2">
      <Zap size={20} strokeWidth={2} className="text-text-secondary" aria-hidden="true" />
      <p className="text-sm font-semibold text-text-primary">{t('COPY_NO_AUTOMATIONS_CONFIGURED')}</p>
    </div>
  );
}
