// RESPONSIBILITY: Renders ManagerNotificationsInboxContent's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useTranslations } from 'next-intl';

import ManagerNotificationsInboxKPIs from '@/app/frontend_manager/manager_communications/notifications_inbox/components/ManagerNotificationsInboxKPIs';
import ManagerNotificationsInboxTable from '@/app/frontend_manager/manager_communications/notifications_inbox/components/ManagerNotificationsInboxTable';


/** @description Renders the ManagerNotificationsInboxContent component for its owning Manager frontend boundary. @dependencies Data flow: → useManagerNotificationsInboxLogic → KPIs + Table. @edge-case Preserves the documented interaction and boundary states. */
export function ManagerNotificationsInboxContent() {
  const t = useTranslations('MANAGER_NOTIFICATIONS_INBOX');

  return (
    <div className="min-h-full pb-10">
      
      <div className="p-6 space-y-6">
        <ManagerNotificationsInboxKPIs />
        <ManagerNotificationsInboxTable />
      </div>
    </div>
  );
}
