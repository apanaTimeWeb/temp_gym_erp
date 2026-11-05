"use client";
// RESPONSIBILITY: Renders AdminCampaignsComposer for the admin frontend module; feature logic stays in dedicated hooks, stores, APIs, and schemas.
// DATA FLOW: feature data/state and user input → AdminCommunicationWhatsAppCampaignsManagementComposer → accessible UI/events routed to owning hooks (admin_communication/communication_whatsapp_campaigns/components/composer/AdminCommunicationWhatsAppCampaignsManagementComposer.tsx)

import { useTranslations } from 'next-intl';
import { Variable } from 'lucide-react';
import type { AdminCampaignsComposerProps } from '@/app/frontend_admin/admin_communication/communication_whatsapp_campaigns/types/AdminCommunicationWhatsAppCampaignsManagementTypes';

/**
 * AdminCommunicationWhatsAppCampaignsManagementComposer renders the admin campaigns composer UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminCommunicationWhatsAppCampaignsManagementComposer: Renders AdminCampaignsComposer for the admin frontend module; feature logic stays in dedicated hooks, stores, APIs, and schemas.
 * @dependencies Consumes AdminCampaignsTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminCommunicationWhatsAppCampaignsManagementComposer({ body, onChange, testId }: AdminCampaignsComposerProps) {
  const t = useTranslations();

  return (
    <section className="rounded-xl border border-border bg-card p-5" aria-labelledby="campaign-message-heading" data-testid={testId}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 id="campaign-message-heading" className="text-sm font-semibold text-primary">{t('campaigns.admin_campaigns_composer.text_958e798f0b')}</h2>
        <button
          type="button"
          onClick={() => onChange(`${body}${body && !body.endsWith(' ') ? ' ' : ''}{name}`)}
          className="flex items-center gap-1.5 rounded-lg bg-input px-3 py-1.5 text-xs font-medium text-primary motion-safe:transition-colors motion-safe:duration-base hover:bg-primary-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95"
         data-testid="admin_campaigns-admin_campaigns-composer-click">
          <Variable size={18} aria-hidden="true"  strokeWidth={2}/>
          {t('campaigns.admin_campaigns_composer.text_95802daab3')}{'{name}'}
        </button>
      </div>
      <textarea
        value={body}
        onChange={(event) => onChange(event.target.value)}
        aria-label={t('campaigns.admin_campaigns_composer.text_93ab84fd5e')}
        className="h-40 w-full resize-none rounded-lg border border-border bg-input p-4 text-sm text-primary focus-visible:border-focus focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11"
        placeholder={t('campaigns.admin_campaigns_composer.text_43cd839993')}
       data-testid="admin_campaigns-admin_campaigns-composer-control"/>
      <p className="mt-3 text-xs leading-relaxed text-secondary">{t('campaigns.admin_campaigns_composer.text_93ef0dd827')}{'{name}'} {t('campaigns.admin_campaigns_composer.text_a4dbc94e51')}</p>
    </section>
  );
}
