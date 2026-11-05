// RESPONSIBILITY: Provides the communications-compose page shell and mounts the campaign composer; it does not select recipients, validate campaign payloads, or send messages.
"use client";
import { useTranslations } from 'next-intl';
import ManagerCommunicationsCampaignsComposer from '@/app/frontend_manager/manager_communications/communications_compose/components/ManagerCommunicationsComposeComposer';

export default function CommunicationsComposeMain() {
  const t = useTranslations('MANAGER_COMMUNICATIONS_CAMPAIGNS');
  return <section className="min-h-full p-6 space-y-5"><h1 className="text-2xl font-bold text-text-primary">Compose Messages</h1><p className="text-sm text-text-secondary">Create and send targeted WhatsApp or email campaigns to a selected member segment.</p>      <ManagerCommunicationsCampaignsComposer /></section>;
}
