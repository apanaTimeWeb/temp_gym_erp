// RESPONSIBILITY: Renders/orchestrates SuperadminTeamRoleGroupsEmptyState within its owning Superadmin feature module; no direct backend implementation.
'use client';
/**
 * RESPONSIBILITY: React component SuperadminTeamRoleGroupsEmptyState owned by the superadmin_team feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: Imported hook APIs: useTranslations.
 * MODULE DEPENDENCIES: next-intl, @/components/ui/EmptyState
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the dedicated empty state for the Superadmin role groups list.
import { useTranslations } from 'next-intl';

import EmptyState from '@/components/ui/EmptyState';


/**
 * @description Renders TeamRoleGroupsEmptyState within the owning Superadmin feature module.
 * @dependencies Uses only dependencies declared in this module file and documented feature infrastructure.
 * @edge-case Preserves documented loading, empty, error, disabled, retry, and repeated-action behavior.
 */
export default function SuperadminTeamManagementRoleGroupsEmptyState() {
  const t = useTranslations('superadmin_team');
    return <EmptyState title={t('ui.role_groups_0200f8b7')} description={t('ui.create_role_groups_before_assigning_platform_c47f59a1')} data-testid="superadmin_team-superadmin-team-role-groups-empty-state-groups-empty-state-empty"/>;
}
