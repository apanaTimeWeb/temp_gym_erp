// RESPONSIBILITY: Renders/orchestrates SuperadminPlatformConfigurationWhiteLabelingEmptyState within its owning Superadmin feature module; no direct backend implementation.
'use client';
/**
 * RESPONSIBILITY: React component SuperadminPlatformConfigurationWhiteLabelingEmptyState owned by the superadmin_platform_configuration_white_labeling feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: Imported hook APIs: useTranslations.
 * MODULE DEPENDENCIES: lucide-react, next-intl
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the empty-state message for White-labeling domain lists.
import { Globe } from 'lucide-react';
import { useTranslations } from 'next-intl';



/**
 * @description Renders WhiteLabelingEmptyState within the owning Superadmin feature module.
 * @dependencies Uses only dependencies declared in this module file and documented feature infrastructure.
 * @edge-case Preserves documented loading, empty, error, disabled, retry, and repeated-action behavior.
 */
export default function SuperadminPlatformConfigurationWhiteLabelingSettingsEmptyState() {
  const t = useTranslations('superadmin_platform_configuration_white_labeling');
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-12 text-center" data-testid="superadmin_platform_configuration_white_labeling-superadmin-white-labeling-empty-state-labeling-empty-state-empty">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-input" data-testid="superadmin_platform_configuration_white_labeling-whitelabelingemptystate-state"><Globe size={18} className="text-secondary" aria-hidden="true" /></div>
      <h3 className="mb-1 text-lg font-bold text-primary">{t('ui.no_custom_domains_found_7d71ae04')}</h3>
      <p className="max-w-sm text-sm text-secondary">{t('ui.no_domains_match_your_current_search_or_filt_59b9950f')}</p>
    </div>
  );
}
