// RESPONSIBILITY: Renders/orchestrates SuperadminPlatformShellLayoutRouteError within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Shared App Router error surface for role-owned child routes; never exposes raw exceptions.
import { useTranslations } from 'next-intl';

import type { SuperadminNextErrorProps } from '@/app/frontend_superadmin/superadmin_platform_shell/platform_shell_layout/types/superadmin_platform_shell_layout_infrastructure.types';



/**
 * @description Renders the localized route-level recovery state used by role-owned App Router error boundaries.
 * @dependencies Uses only the role translation namespace and caller-provided reset callback.
 * @edge-case Ignores the raw framework error object so sensitive exception details never reach the UI.
 */
export default function SuperadminPlatformShellLayoutRouteError({ reset }: SuperadminNextErrorProps) {
  const t = useTranslations('SuperadminPlatformShellLayoutStyles');
  return (
    <main className="flex min-h-96 items-center justify-center p-6" aria-labelledby="SuperadminPlatformShellLayoutStyles-route-error-title" data-testid="SuperadminPlatformShellLayoutStyles-superadmin-layout-route-error-layout-route-error-error">
      <section className="w-full max-w-lg space-y-4 rounded-xl border border-border bg-overlay p-7 shadow-dialog text-center" role="alert" data-testid="SuperadminPlatformShellLayoutStyles-superadmin-layout-route-error-SuperadminPlatformShellLayoutStyles-route-error-state">
        <h1 id="SuperadminPlatformShellLayoutStyles-route-error-title" className="text-xl font-semibold text-primary">{t('ui.error_title')}</h1>
        <p className="text-sm text-secondary">{t('ui.error_description')}</p>
        <button type="button" onClick={reset} className="min-h-11 rounded-md bg-primary px-4 py-2 text-sm font-medium text-on-primary motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="SuperadminPlatformShellLayoutStyles-superadmin-layout-route-error-SuperadminPlatformShellLayoutStyles-route-error-retry">{t('ui.retry')}</button>
      </section>
    </main>
  );
}
