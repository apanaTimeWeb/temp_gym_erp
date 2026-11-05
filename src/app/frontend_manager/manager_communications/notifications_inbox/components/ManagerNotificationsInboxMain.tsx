// RESPONSIBILITY: Renders ManagerNotificationsInboxMain's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
"use client";
import { useTranslations } from 'next-intl';

import { ManagerNotificationsInboxContent } from '@/app/frontend_manager/manager_communications/notifications_inbox/components/ManagerNotificationsInboxContent';

/** @description Orchestrator for the Notifications module. @dependencies Local dependencies are owned by this feature module (1 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerNotificationsInboxMain() {
  const t = useTranslations('MANAGER_NOTIFICATIONS_INBOX');
  return <section className="min-h-full p-6 space-y-5"><h1 className="text-2xl font-bold text-text-primary">{t('COPY_NOTIFICATIONS')}</h1><ManagerNotificationsInboxContent /></section>;
}
