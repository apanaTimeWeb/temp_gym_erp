"use client";
// RESPONSIBILITY: Renders AdminCampaignsMain for the admin frontend module; feature logic stays in dedicated hooks, stores, APIs, and schemas.
// DATA FLOW: feature data/state and user input → AdminCommunicationWhatsAppCampaignsManagementMain → accessible UI/events routed to owning hooks (admin_communication/communication_whatsapp_campaigns/components/main_view/AdminCommunicationWhatsAppCampaignsManagementMain.tsx)

import { useTranslations } from 'next-intl';
import { Rocket, Send } from 'lucide-react';
import AdminCampaignsAudiencePicker from '@/app/frontend_admin/admin_communication/communication_whatsapp_campaigns/components/audience_picker/AdminCommunicationWhatsAppCampaignsManagementAudiencePicker';
import AdminCampaignsTemplatePicker from '@/app/frontend_admin/admin_communication/communication_whatsapp_campaigns/components/template_picker/AdminCommunicationWhatsAppCampaignsManagementTemplatePicker';
import AdminCampaignsComposer from '@/app/frontend_admin/admin_communication/communication_whatsapp_campaigns/components/composer/AdminCommunicationWhatsAppCampaignsManagementComposer';
import AdminCampaignsQueuePanel from '@/app/frontend_admin/admin_communication/communication_whatsapp_campaigns/components/queue_panel/AdminCommunicationWhatsAppCampaignsManagementQueuePanel';
import AdminCampaignsSectionState from '@/app/frontend_admin/admin_communication/communication_whatsapp_campaigns/components/section_state/AdminCommunicationWhatsAppCampaignsManagementSectionState';
import { useAdminCampaignsLogic } from '@/app/frontend_admin/admin_communication/communication_whatsapp_campaigns/hooks/useAdminCommunicationWhatsAppCampaignsManagementLogic';

/**
 * AdminCommunicationWhatsAppCampaignsManagementMain renders the admin campaigns main UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminCommunicationWhatsAppCampaignsManagementMain: Renders AdminCampaignsMain for the admin frontend module; feature logic stays in dedicated hooks, stores, APIs, and schemas.
 * @dependencies Consumes AdminCampaignsAudiencePicker, AdminCampaignsTemplatePicker, AdminCampaignsComposer, AdminCampaignsQueuePanel, AdminCampaignsSectionState.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminCommunicationWhatsAppCampaignsManagementMain() {
  const t = useTranslations();

  const logic = useAdminCampaignsLogic();
  const recipientsReady = Boolean(logic.audienceId) && logic.recipientCount > 0;

  return (
    <div className="space-y-6 bg-page">
      <header className="flex flex-col gap-2">
        <h1 className="flex items-center gap-2 text-xl font-bold text-primary"><Rocket size={18} aria-hidden="true"  strokeWidth={2}/>{t('campaigns.admin_campaigns_main.text_b03d458e96')}</h1>
        <p className="text-sm text-secondary">{t('campaigns.admin_campaigns_main.text_0b4a5a9636')}</p>
      </header>

      {logic.audiencesStatus === 'pending' ? <AdminCampaignsSectionState message={t('campaigns.admin_campaigns_main.auto_1591648946')} loading /> : logic.audiencesStatus === 'error' ? <AdminCampaignsSectionState message={t('campaigns.admin_campaigns_main.auto_4ba6c29865')} retry={() => void logic.refetchAudiences()} /> : logic.audiences.length === 0 ? <AdminCampaignsSectionState message={t('campaigns.admin_campaigns_main.auto_noAudiences')} /> : (
        <AdminCampaignsAudiencePicker audiences={logic.audiences} selectedAudienceId={logic.audienceId} onSelect={logic.selectAudience} />
      )}

      {logic.templatesStatus === 'pending' ? <AdminCampaignsSectionState message={t('campaigns.admin_campaigns_main.auto_eba5dda303')} loading /> : logic.templatesStatus === 'error' ? <AdminCampaignsSectionState message={t('campaigns.admin_campaigns_main.auto_fdd45d642d')} retry={() => void logic.refetchTemplates()} /> : logic.templates.length === 0 ? <AdminCampaignsSectionState message={t('campaigns.admin_campaigns_main.auto_noTemplates')} /> : (
        <AdminCampaignsTemplatePicker templates={logic.templates} selectedTemplateId={logic.templateId} onSelect={logic.selectTemplate} />
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <AdminCampaignsComposer body={logic.body} onChange={logic.setBody}  testId="admin_campaigns-admin_campaigns-composer"/>
        <div className="flex flex-col justify-end">
          <p className="mb-3 text-sm text-secondary">{!logic.audienceId ? t('campaigns.admin_campaigns_main.auto_edcdbec5b3') : logic.recipientsStatus === 'pending' ? t('campaigns.admin_campaigns_main.auto_recipientsLoading') : logic.recipientsStatus === 'error' ? t('campaigns.admin_campaigns_main.auto_recipientsUnavailable') : logic.recipientCount === 0 ? t('campaigns.admin_campaigns_main.auto_noRecipients') : t('campaigns.admin_campaigns_main.auto_recipientCount', { count: logic.recipientCount })}</p>
          {logic.recipientsStatus === 'error' && (
            <div className="mb-3 rounded-lg border border-border bg-danger-bg px-3 py-2 text-xs text-danger">
              <p>{t('campaigns.admin_campaigns_main.text_c4f3bfebca')}</p>
              <button type="button" onClick={() => void logic.refetchRecipients()} className="motion-safe:transition-all motion-safe:duration-base ease-in-out mt-2 font-semibold underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11 min-w-11 motion-safe:active:scale-95" data-testid="admin_campaigns-admin_campaigns-main-click">{t('campaigns.admin_campaigns_main.text_cef2fe093b')}</button>
            </div>
          )}
          <button
            type="button"
            onClick={() => { logic.createQueue(); }}
            disabled={!logic.audienceId || !logic.body.trim() || !recipientsReady || logic.recipientsStatus === 'pending'}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 text-lg font-bold text-on-primary shadow-card motion-safe:transition-colors motion-safe:duration-base hover:bg-primary-hover disabled:cursor-not-allowed disabled:bg-primary-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95"
           data-testid="admin_campaigns-admin_campaigns-main-click-2">
            <Send size={18} aria-hidden="true"  strokeWidth={2}/>
            {logic.recipientsStatus === 'pending' ? t('campaigns.admin_campaigns_main.auto_97714fe58d') : t('campaigns.admin_campaigns_main.auto_296c7e0ba8')}
          </button>
        </div>
      </div>

      {logic.queueActionErrorKey && <p role="alert" className="rounded-lg border border-danger bg-danger-bg p-3 text-sm text-danger">{t(logic.queueActionErrorKey)}</p>}
      <AdminCampaignsQueuePanel queue={logic.queue} onOpen={logic.openQueueItem} onMarkSent={(index) => logic.setQueueStatus(index, 'SENT')} onSkip={(index) => logic.setQueueStatus(index, 'SKIPPED')} />
    </div>
  );
}
