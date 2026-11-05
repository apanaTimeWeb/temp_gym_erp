// RESPONSIBILITY: Renders/orchestrates error within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders the route-segment error boundary for the White-labeling feature and exposes a safe retry action.
import { AlertTriangle, RefreshCcw } from 'lucide-react';
import { useTranslations } from 'next-intl';



/**
 * @description Renders WhiteLabelingError within the owning Superadmin feature module.
 * @dependencies Uses only dependencies declared in this module file and documented feature infrastructure.
 * @edge-case Preserves documented loading, empty, error, disabled, retry, and repeated-action behavior.
 */
export default function SuperadminPlatformConfigurationWhiteLabelingError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = useTranslations('superadmin_platform_configuration_white_labeling');
  return (
    <section className="flex min-h-96 flex-col items-center justify-center space-y-4 rounded-xl border border-border bg-card p-6 text-center" role="alert" aria-labelledby="superadmin-white-labeling-error-title" data-testid="superadmin_platform_configuration_white_labeling-error-white-labeling-error-error">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-danger-bg">
        <AlertTriangle size={18} className="text-danger" aria-hidden="true" />
      </div>
      <div>
        <h2 id="superadmin-white-labeling-error-title" className="text-xl font-bold text-primary">{t('ui.white_labeling_could_not_be_loaded_c0885a56')}</h2>
        <p className="mt-2 max-w-md text-sm text-secondary">{t('ui.the_domain_configuration_view_is_temporarily_54dc4a19')}</p>
      </div>
      <button type="button" onClick={reset} className="mt-4 flex min-h-11 min-w-32 items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 font-medium text-on-primary hover:bg-primary-hover motion-safe:transition-all motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_platform_configuration_white_labeling-error-white-labeling-error-retry">
        <RefreshCcw size={18} aria-hidden="true" />
        {t('ui.retry_6327b4e5')}</button>
    </section>
  );
}
