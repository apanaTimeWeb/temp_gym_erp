// RESPONSIBILITY: Renders ManagerNotificationsInboxKPIs's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { Bell, BellRing, AlertTriangle, CalendarClock } from 'lucide-react';
import { useTranslations } from 'next-intl';

import ManagerStatCard from '@/components/ui/manager_stat_card/ManagerStatCard';

import { useManagerNotificationsInboxLogic } from '@/app/frontend_manager/manager_communications/notifications_inbox/hooks/useManagerNotificationsInboxLogic';


/** @description KPI stat cards for the Notifications module. @dependencies Local dependencies are owned by this feature module (2 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerNotificationsInboxKPIs() {
  const t = useTranslations('MANAGER_NOTIFICATIONS_INBOX');

  const { kpis } = useManagerNotificationsInboxLogic();

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
      <ManagerStatCard title={t("COPY_TOTAL")}         value={kpis?.total ?? 0}        icon={Bell}          iconBg="bg-surface-highlight" iconColor="text-text-secondary" />
      <ManagerStatCard title={t("COPY_UNREAD")}        value={kpis?.unread ?? 0}       icon={BellRing}      iconBg="bg-primary-subtle"  iconColor="text-primary"   />
      <ManagerStatCard title={t("COPY_HIGH_PRIORITY")} value={kpis?.highPriority ?? 0} icon={AlertTriangle} iconBg="bg-danger-bg"   iconColor="text-danger-text"    />
      <ManagerStatCard title={t("COPY_TODAY")}         value={kpis?.todayCount ?? 0}   icon={CalendarClock} iconBg="bg-info-bg"  iconColor="text-info-text"      />
    </div>
  );
}
