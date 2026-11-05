// RESPONSIBILITY: Renders ManagerCommunicationsCampaignsKPIs's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { Send, MessageCircle, Mail, BarChart3 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import ManagerStatCard from '@/components/ui/manager_stat_card/ManagerStatCard';

import { useManagerCommunicationsCampaignsLogic } from '@/app/frontend_manager/manager_communications/communications_history/hooks/useManagerCommunicationsHistoryLogic';
import { ManagerCommunicationsCampaignsFormatNumber } from '@/app/frontend_manager/manager_communications/communications_history/utils/ManagerCommunicationsHistoryFormatters';


/** @description Renders the ManagerCommunicationsCampaignsKPIs component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (3 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerCommunicationsCampaignsKPIs() {
  const t = useTranslations('MANAGER_COMMUNICATIONS_CAMPAIGNS');

  const { kpis } = useManagerCommunicationsCampaignsLogic();
  if (!kpis) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <ManagerStatCard title={t("COPY_TOTAL_MESSAGES_SENT")}    value={ManagerCommunicationsCampaignsFormatNumber(kpis.totalSent)}           icon={Send}          iconBg="bg-primary-subtle"  iconColor="text-primary" />
      <ManagerStatCard title={t("COPY_WHATSAPP_SENT")}          value={ManagerCommunicationsCampaignsFormatNumber(kpis.whatsappSent)}        icon={MessageCircle} iconBg="bg-success-bg"   iconColor="text-success-text" />
      <ManagerStatCard title={t("COPY_EMAILS_SENT")}            value={ManagerCommunicationsCampaignsFormatNumber(kpis.emailSent)}           icon={Mail}          iconBg="bg-info-bg"     iconColor="text-info-text" />
      <ManagerStatCard title={t("COPY_CAMPAIGNS_MONTH")}   value={ManagerCommunicationsCampaignsFormatNumber(kpis.campaignsThisMonth)}  icon={BarChart3}     iconBg="bg-primary-subtle"  iconColor="text-primary" />
    </div>
  );
}
