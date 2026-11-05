// RESPONSIBILITY: Presents the notifications inbox zero-result state without owning notification filtering or actions.
'use client';
import { Bell } from 'lucide-react';
import { useTranslations } from 'next-intl';

/** @description Accessible empty state for an inbox with no matching notifications. */
export default function ManagerNotificationsInboxEmptyState() {
  const t = useTranslations('MANAGER_NOTIFICATIONS_INBOX');
  return (
    <div data-testid="manager-notifications-inbox-empty-state" role="status" aria-live="polite" className="py-16 text-center space-y-2">
      <Bell size={18} strokeWidth={2} className="mx-auto text-text-secondary opacity-40" aria-hidden="true" />
      <p className="text-sm text-text-secondary font-medium">{t('COPY_NO_NOTIFICATIONS_FOUND')}</p>
    </div>
  );
}
