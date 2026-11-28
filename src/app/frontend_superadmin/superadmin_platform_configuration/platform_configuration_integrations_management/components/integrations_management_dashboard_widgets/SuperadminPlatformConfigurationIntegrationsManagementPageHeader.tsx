// RESPONSIBILITY: Renders/orchestrates SuperadminPlatformConfigurationIntegrationsPageHeader within its owning Superadmin feature module; no direct backend implementation.
'use client';
import { Plug } from 'lucide-react';
import { useTranslations } from 'next-intl';

import type { SuperadminPlatformConfigurationIntegrationsSectionProps } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/types/superadmin_platform_configuration_integrations_management.types';

export default function SuperadminPlatformConfigurationIntegrationsManagementPageHeader({ data }: SuperadminPlatformConfigurationIntegrationsSectionProps) {
  const t = useTranslations('superadmin_platform_configuration_integrations');
  return (
    <section className="relative overflow-hidden rounded-2xl border border-orange-500/35 bg-card dark:bg-gradient-to-br dark:from-[#291514] dark:via-[#12192B] dark:to-[#0C1322] p-5 sm:p-6 shadow-card flex items-center justify-between gap-4">
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#FB923C] via-[#FF5A1F] to-[#38BDF8]" />
      <div className="min-w-0">
        <h1 className="superadmin-page-title text-primary">{t('ui.integrations_developer_access_ea889ff')}</h1>
        <p className="mt-1 text-sm text-secondary">{t('ui.platform_connection_health_webhook_delivery_and__6450d6e')}</p>
      </div>
      <span className="p-3 rounded-xl border border-orange-500/35 bg-orange-500/15 text-orange-500 dark:text-orange-300 shrink-0" aria-hidden="true">
        <Plug size={20} strokeWidth={2.2} />
      </span>
    </section>
  );
}
