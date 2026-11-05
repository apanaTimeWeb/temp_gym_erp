// RESPONSIBILITY: Messaging only: legacy ?tab=notifications redirects to its isolated sibling.
"use client";
import { useEffect } from 'react';

import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';

import { SuperadminCommunicationMessagingCenterComposeModal } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/components/messaging_center_modals/SuperadminCommunicationMessagingCenterComposeModal';
import { SuperadminCommunicationMessagingCenterMessagesTab } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/components/messaging_center_tabs/SuperadminCommunicationMessagingCenterMessagesTab';
import { SUPERADMIN_COMMUNICATION_MESSAGING_CENTER_ROUTES } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/config/superadmin_communication_messaging_center.url_config';
import { useSuperadminCommunicationMessagingCenterMainViewModel } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/hooks/useSuperadminCommunicationMessagingCenterMainViewModel';


const NOTIFICATIONS_ROUTE=SUPERADMIN_COMMUNICATION_MESSAGING_CENTER_ROUTES.DESTINATION_1;
/** Messaging only: legacy ?tab=notifications redirects to its isolated sibling. */
export default function SuperadminCommunicationMessagingCenterMain() {
 const t=useTranslations('superadmin_communication_messaging');
 const messaging=useSuperadminCommunicationMessagingCenterMainViewModel();
 const params=useSearchParams(); const router=useRouter();
 const redirect=params.get('tab')==='notifications';
 useEffect(()=>{if(redirect)router.replace(NOTIFICATIONS_ROUTE);},[redirect,router]);
 if(redirect)return <div role="status" aria-busy="true" className="min-h-32 rounded-xl border border-border bg-card p-6 motion-safe:animate-pulse">{t('ui.loading_notifications')}</div>;
 return <section className="space-y-6" data-testid="superadmin_communication_messaging-superadmin-messaging-main-page-ready">
  <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><h1 className="superadmin-page-title text-primary">{t('ui.tenant_messaging_f8491d5')}</h1><p className="mt-1 text-sm text-secondary">{t('ui.direct_tenant_owner_admin_manager_email_or_sms_a_9edccc0')}</p></div>
  <button type="button" onClick={messaging.openCompose} disabled={messaging.tenantsIsPending} className="min-h-11 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-on-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-60"><Plus size={18}/>{t('ui.compose_message_2025ce6')}</button></header>
  {messaging.tenantsIsError&&<p className="rounded-lg border border-border bg-warning-bg p-4 text-warning" role="status">{t('ui.tenants_could_not_be_loaded')} <button type="button" className="min-h-11 underline" onClick={()=>void messaging.refetchTenants()}>{t('ui.retry_88c6aec')}</button></p>}
  {(() => { if (messaging.messagesIsPending) { return (<div role="status" aria-busy="true" className="rounded-xl border border-border bg-card p-8 motion-safe:animate-pulse">{t('ui.loading_messages_8a71e75')}</div>); } if (messaging.messagesIsError) { return (<div role="alert" className="rounded-xl border border-border bg-danger-bg p-6 text-danger"><p>{t('ui.messaging_could_not_be_loaded_6e1b20a')}</p><button type="button" onClick={()=>void messaging.refetchMessages()} className="mt-4 min-h-11 rounded-lg bg-primary px-4 py-2 text-on-primary">{t('ui.retry_88c6aec')}</button></div>); } return (<SuperadminCommunicationMessagingCenterMessagesTab search={messaging.search} setSearch={messaging.setSearch} channelFilter={messaging.channelFilter} setChannelFilter={messaging.setChannelFilter} setRange={messaging.setRange} messages={messaging.messages} currentPage={messaging.currentPage} totalPages={messaging.totalPages} totalItems={messaging.totalItems} onPageChange={messaging.setPage} isFetching={messaging.isFetchingMessages}/>); })()}
  {messaging.composeOpen&&<SuperadminCommunicationMessagingCenterComposeModal tenants={messaging.tenants} isSubmitting={messaging.isSending} onClose={messaging.closeCompose} onSend={messaging.handleSend}/>}
 </section>;
}
