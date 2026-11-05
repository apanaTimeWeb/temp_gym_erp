// RESPONSIBILITY: Renders/orchestrates page within its owning Superadmin feature module; no direct backend implementation.
import { Suspense } from 'react';
import SuperadminPlatformShellLayoutPageSuspenseSkeleton from '@/app/frontend_superadmin/superadmin_team/team_management/components/SuperadminTeamManagementPageSuspenseSkeleton';
// RESPONSIBILITY: Framework route artifact for team.
import SuperadminTeamMain from '@/app/frontend_superadmin/superadmin_team/team_management/components/team_management_main/SuperadminTeamManagementMain';
/**
 * @description Framework route artifact for team.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminTeamPage() {
    return <Suspense fallback={<SuperadminPlatformShellLayoutPageSuspenseSkeleton />}>
        <SuperadminTeamMain />
      </Suspense>;
}
