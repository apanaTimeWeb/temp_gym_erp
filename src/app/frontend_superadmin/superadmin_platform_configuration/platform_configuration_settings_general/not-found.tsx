// RESPONSIBILITY: Renders/orchestrates not-found within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders the branded superadmin_platform_configuration_settings not-found state and provides recovery navigation to the owning feature.
import { useTranslations } from 'next-intl';

import Link from 'next/link';

import { SUPERADMIN_PLATFORM_CONFIGURATION_SETTINGS_GENERAL_ROUTES } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_settings_general/config/superadmin_platform_configuration_settings_general.url_config';



/**
 * @description Renders the module-local 404 state using semantic design tokens and the owning URL config.
 * @dependencies Uses module-local translations and URL configuration only.
 * @edge-case Keeps recovery navigation within the owning module so not-found flows do not leak into sibling business features.
 */
export default function SuperadminPlatformConfigurationSettingsNotFound() {
  const t = useTranslations('superadmin_platform_configuration_settings');
  return (
    <div className="flex min-h-80 flex-col items-center justify-center gap-4 rounded-xl border border-border bg-card p-8 text-center" data-testid="superadmin_platform_configuration_settings-not-found-state">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-floating text-secondary" aria-hidden="true">
        <span className="text-lg font-bold text-secondary">404</span>
      </div>
      <div>
        <h2 className="text-lg font-semibold text-primary">{t('ui.page_not_found_title')}</h2>
        <p className="mt-1 max-w-md text-sm text-secondary">{t('ui.page_not_found_message')}</p>
      </div>
      <Link href={SUPERADMIN_PLATFORM_CONFIGURATION_SETTINGS_GENERAL_ROUTES.MAIN} data-testid="superadmin_platform_configuration_settings-not-found-back" className="min-h-11 inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-on-primary motion-safe:transition-all motion-safe:duration-base hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">{t('ui.back_to_module')}</Link>
    </div>
  );
}
