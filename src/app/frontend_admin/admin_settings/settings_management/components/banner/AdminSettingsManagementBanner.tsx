"use client";
// RESPONSIBILITY: Renders the top banner with module title and save status indicator for the Settings page.
// DATA FLOW: feature data/state and user input → AdminSettingsManagementBanner → accessible UI/events routed to owning hooks (admin_settings/settings_management/components/banner/AdminSettingsManagementBanner.tsx)

import { buildAdminSettingsWhatsAppWebUrl, buildAdminSettingsPhoneUrl } from '@/app/frontend_admin/admin_settings/settings_management/constants/AdminSettingsManagementExternalUrlConstants';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { ADMIN_GYM_CONFIGURATION } from '@/app/frontend_admin/admin_settings/settings_management/utils/AdminSettingsManagementGymConfiguration';


/**
 * AdminSettingsManagementBanner renders the admin settings banner UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminSettingsManagementBanner: Renders the top banner with module title and save status indicator for the Settings page.
 * @dependencies Consumes AdminNavigationLayoutGymConfiguration, admin_settings_url_config.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminSettingsManagementBanner() {
  const t = useTranslations();
  const whatsappHref = buildAdminSettingsWhatsAppWebUrl(ADMIN_GYM_CONFIGURATION.phone);
  const phoneHref = buildAdminSettingsPhoneUrl(ADMIN_GYM_CONFIGURATION.phone);

  return (
    <div className="rounded-xl p-6 text-on-primary mt-6 shadow-card bg-primary">
      <h3 className="text-xl font-bold mb-2">{t('settings.admin_settings_banner.text_38e76cb829')}</h3>
      <p className="text-on-primary mb-4">{t('settings.admin_settings_banner.text_bf906b06a3')}</p>
      
      <div className="bg-surface-hover rounded-lg p-4 backdrop-blur-sm border border-border">
        <p className="text-primary text-xs font-medium uppercase tracking-wider mb-1">{t('settings.admin_settings_banner.text_22987bc421')}</p>
        <p className="text-2xl font-black tracking-tight mb-4">{ADMIN_GYM_CONFIGURATION.phone}</p>
        <div className="flex flex-col sm:flex-row gap-3">
          {whatsappHref ? (
            <Link data-testid="admin_settings-admin_settings-banner-navigate" href={whatsappHref} target="_blank" rel="noopener noreferrer" className="flex-1 bg-card text-primary font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 motion-safe:transition-colors shadow-card motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">
              {t('settings.admin_settings_banner.text_6ade40ff77')}</Link>
          ) : <span aria-disabled="true" className="flex-1 bg-card text-secondary rounded-lg min-h-11 inline-flex items-center justify-center px-4 py-2 opacity-60">{t('settings.admin_settings_banner.text_6ade40ff77')}</span>}
          {phoneHref ? (
            <Link data-testid="admin_settings-admin_settings-banner-navigate-2" href={phoneHref} className="flex-1 border border-border text-primary font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-surface-hover motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">
              {t('settings.admin_settings_banner.text_8bf547304a')}</Link>
          ) : <span aria-disabled="true" className="flex-1 border border-border text-secondary rounded-lg min-h-11 inline-flex items-center justify-center px-4 py-2 opacity-60">{t('settings.admin_settings_banner.text_8bf547304a')}</span>}
        </div>
      </div>
    </div>
  );
}
