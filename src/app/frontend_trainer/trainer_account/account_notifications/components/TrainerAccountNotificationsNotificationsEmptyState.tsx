"use client";
// RESPONSIBILITY: Renders the empty state for notifications list.
import { BellOff } from 'lucide-react';

import { useTranslations } from 'next-intl';




/**
 * @description Renders the empty state for notifications list.
 * @dependencies Consumes owning-module props/state and localized UI configuration.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Renders the notifications feature's empty-result state with an actionable recovery or creation path when the documented flow permits one.
 * @dependencies Uses only documented notifications module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Keeps the no-data state distinct from a transport/API error state.
 */
export default function TrainerNotificationsEmptyState() {
  const t = useTranslations('TRAINER_NOTIFICATIONS');
  return (
    <div data-testid="trainer_notifications-empty-state" className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-12 h-12 rounded-full bg-surface-highlight flex items-center justify-center mb-4">
        <BellOff className="text-secondary"  strokeWidth={2} size={18}/>
      </div>
      <h3 className="text-sm font-semibold text-primary mb-1">{t("TEXT_NO_NOTIFICATIONS")}</h3>
      <p className="text-sm text-secondary max-w-sm">
        {t("TEXT_YOU_ARE_ALL_CAUGHT_UP_NEW_ALERTS_AND_MES_4DB50A48")}</p>
    </div>
  );
}

