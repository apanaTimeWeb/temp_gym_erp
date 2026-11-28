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
    <div className="relative overflow-hidden rounded-2xl p-5 sm:p-6 mt-6 shadow-card border border-orange-500/35 bg-card dark:bg-gradient-to-br dark:from-[#291514] dark:via-[#12192B] dark:to-[#0C1322] text-text-primary">
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#FF5A1F] via-[#EC4899] to-[#38BDF8]" />
      <span aria-hidden="true" className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-orange-500/20 blur-3xl" />
      <h3 className="relative text-xl font-bold text-text-primary mb-2">{t('settings.admin_settings_banner.text_38e76cb829')}</h3>
      <p className="relative text-sm text-secondary mb-4">{t('settings.admin_settings_banner.text_bf906b06a3')}</p>
      
      <div className="relative bg-input/80 dark:bg-white/[0.04] rounded-xl p-4 backdrop-blur-sm border border-border">
        <p className="text-secondary text-xs font-semibold uppercase tracking-wider mb-1">{t('settings.admin_settings_banner.text_22987bc421')}</p>
        <p className="text-2xl font-black tracking-tight text-text-primary tabular-nums mb-4">{ADMIN_GYM_CONFIGURATION.phone}</p>
        <div className="flex flex-col sm:flex-row gap-3">
          {whatsappHref ? (
            <Link data-testid="admin_settings-admin_settings-banner-navigate" href={whatsappHref} target="_blank" rel="noopener noreferrer" className="flex-1 min-h-11 bg-primary text-on-primary font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-primary-hover motion-safe:transition-colors shadow-card motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">
              {t('settings.admin_settings_banner.text_6ade40ff77')}</Link>
          ) : <span aria-disabled="true" className="flex-1 bg-card text-secondary rounded-xl min-h-11 inline-flex items-center justify-center px-4 py-2 opacity-60">{t('settings.admin_settings_banner.text_6ade40ff77')}</span>}
          {phoneHref ? (
            <Link data-testid="admin_settings-admin_settings-banner-navigate-2" href={phoneHref} className="flex-1 min-h-11 border border-orange-500/35 bg-orange-500/15 text-orange-600 dark:text-orange-300 font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-orange-500/25 motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">
              {t('settings.admin_settings_banner.text_8bf547304a')}</Link>
          ) : <span aria-disabled="true" className="flex-1 border border-border text-secondary rounded-xl min-h-11 inline-flex items-center justify-center px-4 py-2 opacity-60">{t('settings.admin_settings_banner.text_8bf547304a')}</span>}
        </div>
      </div>
    </div>
  );
}
