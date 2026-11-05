// RESPONSIBILITY: Provides the churn-recovery page shell and mounts the churn-recovery tab; it does not calculate churn risk, fetch member data, or send win-back campaigns.
"use client";
import { useTranslations } from 'next-intl';
import ManagerCommunicationsCampaignsChurnRecoveryTab from '@/app/frontend_manager/manager_communications/communications_churn_recovery/components/ManagerCommunicationsChurnRecoveryTab';

export default function CommunicationsChurnRecoveryMain() {
  const t = useTranslations('MANAGER_COMMUNICATIONS_CAMPAIGNS');
  const title = t.has('COPY_CHURN_RECOVERY_TITLE') ? t('COPY_CHURN_RECOVERY_TITLE') : 'Churn Recovery';
  const description = t.has('COPY_CHURN_RECOVERY_DESCRIPTION') ? t('COPY_CHURN_RECOVERY_DESCRIPTION') : 'Identify churn-risk members and manage win-back outreach.';
  return <section className="min-h-full p-6 space-y-5"><h1 className="text-2xl font-bold text-text-primary">{title}</h1><p className="text-sm text-text-secondary">{description}</p><ManagerCommunicationsCampaignsChurnRecoveryTab /></section>;
}
