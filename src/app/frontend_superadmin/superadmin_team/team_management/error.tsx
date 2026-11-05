// RESPONSIBILITY: Renders/orchestrates error within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Route-level Superadmin recovery boundary.
import { useTranslations } from 'next-intl';

import type { SuperadminRouteErrorProps } from '@/app/frontend_superadmin/superadmin_team/team_management/types/superadmin_team_management_route_error.types';



/**
 * @description Renders Error within the owning Superadmin feature module.
 * @dependencies Uses only dependencies declared in this module file and documented feature infrastructure.
 * @edge-case Preserves documented loading, empty, error, disabled, retry, and repeated-action behavior.
 */
export default function Error({ reset }: SuperadminRouteErrorProps) {
  const t = useTranslations('superadmin_team');
    return (<div className="flex min-h-80 items-center justify-center" data-testid="superadmin_team-error-team-error-error">
      <div className="max-w-md rounded-xl border border-border bg-card p-8 text-center">
        <h1 className="text-lg font-semibold text-primary">{t('ui.this_superadmin_page_needs_another_try_f215438a')}</h1>
        <p className="mt-2 text-sm text-secondary">{t('ui.the_platform_could_not_load_this_section_saf_ae631285')}</p>
        <button type="button" onClick={reset} className="mt-5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-on-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-11 min-w-11" data-testid="superadmin_team-error-team-error-try-again">
          {t('ui.try_again_d876a9fe')}</button>
      </div>
    </div>);
}
