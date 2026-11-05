// RESPONSIBILITY: Renders/orchestrates SuperadminPlatformConfigurationWhiteLabelingErrorState within its owning Superadmin feature module; no direct backend implementation.
'use client';
/**
 * RESPONSIBILITY: React component SuperadminPlatformConfigurationWhiteLabelingErrorState owned by the superadmin_platform_configuration_white_labeling feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: Imported hook APIs: useTranslations.
 * MODULE DEPENDENCIES: next-intl, @/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/types/superadmin_platform_configuration_white_labeling_settings_error_state.types
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the White-labeling section error state and retries the failed query.
import { useTranslations } from 'next-intl';

import type { SuperadminPlatformConfigurationWhiteLabelingErrorStateProps } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/types/superadmin_platform_configuration_white_labeling_settings_error_state.types';


/**
 * @description Renders WhiteLabelingErrorState within the owning Superadmin feature module.
 * @dependencies Uses only dependencies declared in this module file and documented feature infrastructure.
 * @edge-case Preserves documented loading, empty, error, disabled, retry, and repeated-action behavior.
 */
export default function SuperadminPlatformConfigurationWhiteLabelingSettingsErrorState({ onRetry }: SuperadminPlatformConfigurationWhiteLabelingErrorStateProps) {
  const t = useTranslations('superadmin_platform_configuration_white_labeling');
  return (
    <section className="rounded-xl border border-border bg-danger-bg p-6 text-center" role="alert" data-testid="superadmin_platform_configuration_white_labeling-superadmin-white-labeling-error-state-labeling-error-state-error">
      <p className="text-lg font-semibold text-danger" data-testid="superadmin_platform_configuration_white_labeling-whitelabelingerrorstate-state">{t('ui.custom_domains_could_not_be_loaded_99f44225')}</p>
      <p className="mt-1 text-sm text-secondary">{t('ui.please_retry_the_request_045bff68')}</p>
      <button type="button" onClick={onRetry} className="mt-4 min-h-11 rounded-md bg-primary px-4 py-2 text-sm font-medium text-on-primary motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_platform_configuration_white_labeling-superadmin-white-labeling-error-state-error-state-try-again">{t('ui.try_again_d876a9fe')}</button>
    </section>
  );
}
