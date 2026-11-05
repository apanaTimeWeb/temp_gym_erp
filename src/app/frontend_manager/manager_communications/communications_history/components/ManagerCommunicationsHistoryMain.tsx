// RESPONSIBILITY: Composes the communications-history page heading, KPI summary, and history view; it does not fetch campaign history, own query keys, or send communications.
"use client";
import { useTranslations } from 'next-intl';
import ManagerCommunicationsCampaignsKPIs from '@/app/frontend_manager/manager_communications/communications_history/components/ManagerCommunicationsHistoryKPIs';
import ManagerCommunicationsCampaignsHistory from '@/app/frontend_manager/manager_communications/communications_history/components/ManagerCommunicationsHistoryHistory';

export default function CommunicationsHistoryMain() {
  const t = useTranslations('MANAGER_COMMUNICATIONS_CAMPAIGNS');
  return <section className="min-h-full p-6 space-y-5"><h1 className="text-2xl font-bold text-text-primary">Communication History</h1><p className="text-sm text-text-secondary">Review sent campaigns, delivery status, channels, and history filters.</p>      <ManagerCommunicationsCampaignsKPIs />
      <ManagerCommunicationsCampaignsHistory /></section>;
}
