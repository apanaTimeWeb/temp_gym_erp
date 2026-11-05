// RESPONSIBILITY: Renders/orchestrates SuperadminTeamAlertPreferencesEmptyState within its owning Superadmin feature module; no direct backend implementation.
'use client';
/**
 * RESPONSIBILITY: React component SuperadminTeamAlertPreferencesEmptyState owned by the superadmin_team feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: Imported hook APIs: useTranslations.
 * MODULE DEPENDENCIES: next-intl, @/components/ui/EmptyState
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the dedicated empty state for the Superadmin alert preferences list.
import { useTranslations } from 'next-intl';

import EmptyState from '@/components/ui/EmptyState';


/**
 * @description Renders TeamAlertPreferencesEmptyState within the owning Superadmin feature module.
 * @dependencies Uses only dependencies declared in this module file and documented feature infrastructure.
 * @edge-case Preserves documented loading, empty, error, disabled, retry, and repeated-action behavior.
 */
export default function SuperadminTeamManagementAlertPreferencesEmptyState() {
  const t = useTranslations('superadmin_team');
    return <EmptyState title={t('ui.alert_preferences_d2e1855a')} description={t('ui.add_alert_preferences_when_platform_monitori_8ad20266')} data-testid="superadmin_team-superadmin-team-alert-preferences-empty-state-preferences-empty-state-empty"/>;
}
