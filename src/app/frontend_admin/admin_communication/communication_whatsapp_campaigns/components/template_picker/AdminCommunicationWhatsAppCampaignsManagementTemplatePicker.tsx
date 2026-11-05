"use client";
// RESPONSIBILITY: Renders AdminCampaignsTemplatePicker for the admin frontend module; feature logic stays in dedicated hooks, stores, APIs, and schemas.
// DATA FLOW: feature data/state and user input → AdminCommunicationWhatsAppCampaignsManagementTemplatePicker → accessible UI/events routed to owning hooks (admin_communication/communication_whatsapp_campaigns/components/template_picker/AdminCommunicationWhatsAppCampaignsManagementTemplatePicker.tsx)

import { useTranslations } from 'next-intl';
import { AlertCircle, Calendar, MessageSquare, RefreshCw } from 'lucide-react';
import type { AdminCampaignsTemplatePickerProps, AdminCampaignsTemplateType } from '@/app/frontend_admin/admin_communication/communication_whatsapp_campaigns/types/AdminCommunicationWhatsAppCampaignsManagementTypes';

/**
 * renderAdminCampaignsTemplateIcon is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
function renderAdminCampaignsTemplateIcon(type: AdminCampaignsTemplateType) {
  const Icon = type === 'FEE_REMINDER' ? Calendar : type === 'OVERDUE' ? AlertCircle : type === 'RENEWAL' ? RefreshCw : MessageSquare;
  return <Icon size={18} strokeWidth={2} aria-hidden="true" />;
}

/**
 * AdminCommunicationWhatsAppCampaignsManagementTemplatePicker renders the admin campaigns template picker UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminCommunicationWhatsAppCampaignsManagementTemplatePicker: Renders AdminCampaignsTemplatePicker for the admin frontend module; feature logic stays in dedicated hooks, stores, APIs, and schemas.
 * @dependencies Consumes AdminCampaignsTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminCommunicationWhatsAppCampaignsManagementTemplatePicker({ templates, selectedTemplateId, onSelect }: AdminCampaignsTemplatePickerProps) {
  const t = useTranslations();

  return (
    <section className="rounded-xl border border-border bg-card p-5" aria-labelledby="campaign-template-heading">
      <h2 id="campaign-template-heading" className="mb-4 text-sm font-semibold text-primary">{t('campaigns.admin_campaigns_template_picker.text_550db245f6')}</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {templates.map((template , __testIdIndex30) => {
          const isSelected = selectedTemplateId === template.id;
          return (
            <button
              key={template.id}
              type="button"
              onClick={() => onSelect(template.id)}
              aria-pressed={isSelected}
              className={`focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95 flex items-center gap-3 rounded-xl border p-4 text-left motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${isSelected ? 'border-focus bg-primary text-on-primary' : 'border-border bg-input text-primary hover:border-focus'}`}
             data-testid={`admin_campaigns-admin_campaigns-template-picker-click-map30-${__testIdIndex30}-1`}>
              <span className="shrink-0">{renderAdminCampaignsTemplateIcon(template.type)}</span>
              <span className="text-sm font-medium">{template.title}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
