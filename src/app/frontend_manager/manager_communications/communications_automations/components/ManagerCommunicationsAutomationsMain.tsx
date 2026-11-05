// RESPONSIBILITY: Provides the communications-automations page shell and mounts its automation view; it does not own automation transport, scheduling rules, or mutation policy.
"use client";
import { useTranslations } from 'next-intl';
import ManagerCommunicationsCampaignsAutomations from '@/app/frontend_manager/manager_communications/communications_automations/components/ManagerCommunicationsAutomationsAutomations';

export default function CommunicationsAutomationsMain() {
  const t = useTranslations('MANAGER_COMMUNICATIONS_CAMPAIGNS');
  return <section className="min-h-full p-6 space-y-5"><h1 className="text-2xl font-bold text-text-primary">Communication Automations</h1><p className="text-sm text-text-secondary">Inspect and update the manager's communication automation rules.</p>      <ManagerCommunicationsCampaignsAutomations /></section>;
}
