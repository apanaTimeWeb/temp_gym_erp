"use client";
// RESPONSIBILITY: Renders section-level loading and retry states for Campaigns data pickers.
// DATA FLOW: feature data/state and user input → AdminCommunicationWhatsAppCampaignsManagementSectionState → accessible UI/events routed to owning hooks (admin_communication/communication_whatsapp_campaigns/components/section_state/AdminCommunicationWhatsAppCampaignsManagementSectionState.tsx)

import type { AdminCampaignsSectionStateProps } from '@/app/frontend_admin/admin_communication/communication_whatsapp_campaigns/types/AdminCommunicationWhatsAppCampaignsManagementSectionStatePropsTypes';
import { useTranslations } from 'next-intl';
import { RefreshCw } from 'lucide-react';


/**
 * AdminCommunicationWhatsAppCampaignsManagementSectionState renders the admin campaigns section state UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminCommunicationWhatsAppCampaignsManagementSectionState: Renders section-level loading and retry states for Campaigns data pickers.
 * @dependencies Consumes AdminCampaignsSectionStatePropsTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminCommunicationWhatsAppCampaignsManagementSectionState({ message, loading = false, retry }: AdminCampaignsSectionStateProps) {
  const t = useTranslations();

  return (
    <section className="rounded-xl border border-border bg-card p-5" aria-busy={loading} aria-live="polite" data-testid="admin_campaigns-admin_campaigns-section-state-state">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {loading ? [1, 2, 3, 4].map((item) => <div key={`campaigns-section-skeleton-${item}`} className="h-20 rounded-xl border border-border bg-skeleton-base motion-safe:animate-pulse motion-safe:duration-base" aria-hidden="true" />) : (
          <div className="sm:col-span-2 lg:col-span-4 text-center">
            <p className="text-sm text-secondary">{message}</p>
            {retry && (
              <button type="button" onClick={retry} className="motion-safe:transition-all motion-safe:duration-base ease-in-out mt-4 inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-on-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-w-11 motion-safe:active:scale-95" data-testid="admin_campaigns-admin_campaigns-section-state-state-2">
                <RefreshCw size={18} aria-hidden="true"  strokeWidth={2}/>
                {t('campaigns.admin_campaigns_section_state.text_cef2fe093b')}</button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
