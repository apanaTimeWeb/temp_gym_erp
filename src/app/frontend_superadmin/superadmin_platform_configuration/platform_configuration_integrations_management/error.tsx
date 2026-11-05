// RESPONSIBILITY: Renders/orchestrates error within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders the superadmin_platform_configuration_integrations route-segment error fallback and provides the documented recovery path.
import { useTranslations } from 'next-intl';

import type { SuperadminPlatformConfigurationIntegrationsRouteErrorProps } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/types/superadmin_platform_configuration_integrations_management_route_error.types';



/**
 * @description Route-level Superadmin recovery boundary.
 * @dependencies Consumes the owning feature contract and approved global zero-business UI/infrastructure only.
 * @edge-case Preserves documented loading, empty, error, retry, keyboard, responsive, and repeated-action behavior where applicable.
 */
export default function Error({ reset }: SuperadminPlatformConfigurationIntegrationsRouteErrorProps) {
  const t = useTranslations('superadmin_platform_configuration_integrations');
    return (<div className="flex min-h-80 items-center justify-center" data-testid="superadmin_platform_configuration_integrations-error-superadmin-integrations-error-error">
      <div className="max-w-md rounded-xl border border-border bg-card p-8 text-center">
        <h1 className="text-lg font-semibold text-primary">{t('ui.this_superadmin_page_needs_another_try_27b0a20')}</h1>
        <p className="mt-2 text-sm text-secondary">{t('ui.the_platform_could_not_load_this_section_safely_f44cc21')}</p>
        <button type="button" onClick={reset} className="min-h-11 mt-5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-on-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95" data-testid="superadmin_platform_configuration_integrations-error-integrations-error-try-again">

          {t('ui.try_again_5d1183a')}
        </button>
      </div>
    </div>);
}
