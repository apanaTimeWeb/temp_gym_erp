"use client";
// RESPONSIBILITY: Renders AdminCampaignsError for the admin frontend module; feature logic stays in dedicated hooks, stores, APIs, and schemas.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_communication/communication_whatsapp_campaigns/error.tsx)

import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { logErrorToMonitoring } from '@/app/frontend_admin/admin_communication/communication_whatsapp_campaigns/utils/AdminCommunicationWhatsappCampaignsMonitoring';
import { ADMIN_CAMPAIGNS_ROUTES } from '@/app/frontend_admin/admin_communication/communication_whatsapp_campaigns/config/admin_communication_whatsapp_campaigns.url_config';
import type { AdminCampaignsErrorProps } from '@/app/frontend_admin/admin_communication/communication_whatsapp_campaigns/types/AdminCommunicationWhatsAppCampaignsManagementErrorPropsTypes';

/**
 * AdminCampaignsError renders the admin campaigns error UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 */
export default function AdminCampaignsError({ error, reset }: AdminCampaignsErrorProps) {
  const t = useTranslations();

// EFFECT: Synchronizes this component effect with its declared React dependencies in campaigns/error.tsx.
  useEffect(() => {
    logErrorToMonitoring(error, { module: 'campaigns', route: ADMIN_CAMPAIGNS_ROUTES.root });
  }, [error]);

  return (
    <div className="flex min-h-96 flex-col items-center justify-center rounded-xl border border-border bg-danger-bg px-6 py-12 text-center">
      <div className="mb-4 rounded-full bg-danger-bg p-3" data-testid="admin_campaigns-error-status-1"><span className="text-danger" aria-hidden="true">⚠️</span></div>
      <h2 className="mb-2 text-lg font-semibold text-primary">{t('campaigns.AdminCampaignsError.text_b7548c3c70')}</h2>
      <p className="mb-6 text-sm text-secondary">{t('campaigns.AdminCampaignsError.text_a1c0aaa0d2')}</p>
      <button type="button" onClick={reset} className="rounded-lg bg-danger px-4 py-2 text-sm font-semibold text-on-danger motion-safe:transition-colors motion-safe:duration-base hover:bg-danger-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11 min-w-11 motion-safe:active:scale-95" data-testid="admin_campaigns-error-state">{t('campaigns.AdminCampaignsError.text_cef2fe093b')}</button>
    </div>
  );
}
