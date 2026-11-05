// RESPONSIBILITY: Renders/orchestrates SuperadminTeamMembersEmptyState within its owning Superadmin feature module; no direct backend implementation.
'use client';
/**
 * RESPONSIBILITY: React component SuperadminTeamMembersEmptyState owned by the superadmin_team feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: Imported hook APIs: useTranslations.
 * MODULE DEPENDENCIES: next-intl, @/components/ui/EmptyState
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the dedicated empty state for the Superadmin team members list.
import { useTranslations } from 'next-intl';

import EmptyState from '@/components/ui/EmptyState';


/**
 * @description Renders TeamMembersEmptyState within the owning Superadmin feature module.
 * @dependencies Uses only dependencies declared in this module file and documented feature infrastructure.
 * @edge-case Preserves documented loading, empty, error, disabled, retry, and repeated-action behavior.
 */
export default function SuperadminTeamManagementMembersEmptyState() {
  const t = useTranslations('superadmin_team');
    return <EmptyState title={t('ui.team_members_0b272d2a')} description={t('ui.add_a_named_operator_when_platform_access_is_60fa6171')} data-testid="superadmin_team-superadmin-team-members-empty-state-members-empty-state-empty"/>;
}
