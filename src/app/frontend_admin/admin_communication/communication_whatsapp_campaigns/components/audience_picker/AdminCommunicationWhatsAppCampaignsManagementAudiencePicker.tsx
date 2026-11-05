"use client";
// RESPONSIBILITY: Renders AdminCampaignsAudiencePicker for the admin frontend module; feature logic stays in dedicated hooks, stores, APIs, and schemas.
// DATA FLOW: feature data/state and user input → AdminCommunicationWhatsAppCampaignsManagementAudiencePicker → accessible UI/events routed to owning hooks (admin_communication/communication_whatsapp_campaigns/components/audience_picker/AdminCommunicationWhatsAppCampaignsManagementAudiencePicker.tsx)

import { useTranslations } from 'next-intl';
import type { AdminCampaignsAudiencePickerProps } from '@/app/frontend_admin/admin_communication/communication_whatsapp_campaigns/types/AdminCommunicationWhatsAppCampaignsManagementTypes';

/**
 * AdminCommunicationWhatsAppCampaignsManagementAudiencePicker renders the admin campaigns audience picker UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminCommunicationWhatsAppCampaignsManagementAudiencePicker: Renders AdminCampaignsAudiencePicker for the admin frontend module; feature logic stays in dedicated hooks, stores, APIs, and schemas.
 * @dependencies Consumes AdminCampaignsTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminCommunicationWhatsAppCampaignsManagementAudiencePicker({ audiences, selectedAudienceId, onSelect }: AdminCampaignsAudiencePickerProps) {
  const t = useTranslations();

  return (
    <section className="rounded-xl border border-border bg-card p-5" aria-labelledby="campaign-audience-heading">
      <h2 id="campaign-audience-heading" className="mb-4 text-sm font-semibold text-primary">{t('campaigns.admin_campaigns_audience_picker.text_d7613d037b')}</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {audiences.map((audience , __testIdIndex20) => {
          const isSelected = selectedAudienceId === audience.id;
          return (
            <button
              key={audience.id}
              type="button"
              onClick={() => onSelect(audience.id)}
              aria-pressed={isSelected}
              className={`focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95 flex flex-col items-start rounded-xl border p-4 text-left motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${isSelected ? 'border-focus bg-primary-subtle ring-1 ring-primary' : 'border-border bg-input hover:border-focus'}`}
             data-testid={`admin_campaigns-admin_campaigns-audience-picker-click-map20-${__testIdIndex20}-1`}>
              <span className="text-sm font-semibold text-primary">{audience.name}</span>
              <span className="mt-1 text-xs leading-relaxed text-secondary">{audience.description}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
