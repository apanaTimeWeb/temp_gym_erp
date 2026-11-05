// RESPONSIBILITY: Renders/orchestrates SuperadminTeamMain within its owning Superadmin feature module; no direct backend implementation.
'use client';
/**
 * RESPONSIBILITY: React component SuperadminTeamMain owned by the superadmin_team feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: Imported hook APIs: useSuperadminTeamManagementPage, useTranslations.
 * MODULE DEPENDENCIES: next-intl, @/app/frontend_superadmin/superadmin_team/team_management/components/team_management_dashboard_widgets/SuperadminTeamManagementMembersPanel, @/app/frontend_superadmin/superadmin_team/team_management/components/team_management_dashboard_widgets/SuperadminTeamManagementPageHeader, @/app/frontend_superadmin/superadmin_team/team_management/components/team_management_dashboard_widgets/SuperadminTeamManagementRolesAndAlertPreferencesPanel, @/app/frontend_superadmin/superadmin_team/team_management/components/team_management_dashboard_widgets/SuperadminTeamManagementSummaryCards, @/app/frontend_superadmin/superadmin_team/team_management/hooks/useSuperadminTeamManagementPage
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Orchestrates the Superadmin team page and its focused child sections.
import { useTranslations } from 'next-intl';

import SuperadminTeamMembersPanel from '@/app/frontend_superadmin/superadmin_team/team_management/components/team_management_dashboard_widgets/SuperadminTeamManagementMembersPanel';
import SuperadminTeamPageHeader from '@/app/frontend_superadmin/superadmin_team/team_management/components/team_management_dashboard_widgets/SuperadminTeamManagementPageHeader';
import SuperadminTeamRolesAndAlertPreferencesPanel from '@/app/frontend_superadmin/superadmin_team/team_management/components/team_management_dashboard_widgets/SuperadminTeamManagementRolesAndAlertPreferencesPanel';
import SuperadminTeamSummaryCards from '@/app/frontend_superadmin/superadmin_team/team_management/components/team_management_dashboard_widgets/SuperadminTeamManagementSummaryCards';
import { useSuperadminTeamManagementPage } from '@/app/frontend_superadmin/superadmin_team/team_management/hooks/useSuperadminTeamManagementPage';


/**
 * @description Orchestrates the Superadmin team page and its focused child sections.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminTeamManagementMain() {
  const t = useTranslations('superadmin_team');
    // DATA FLOW: API → useSuperadminTeamManagementPage → focused child views.
    const { data, isPending, isFetching, isError, refetch } = useSuperadminTeamManagementPage();
    if (isPending) {
        return (<div className="space-y-4" aria-busy="true" data-testid="superadmin_team-superadmin-team-main-page">
        <div className="h-32 rounded-xl bg-skeleton-base motion-safe:animate-pulse"/>
        <div className="h-96 rounded-xl bg-skeleton-base motion-safe:animate-pulse"/>
      </div>);
    }
    if (isError || !data) {
        return (<div className="rounded-xl border border-border bg-danger-bg p-5" role="alert" data-testid="superadmin_team-main-error-state">
  <p className="font-semibold text-danger">
    {t('ui.platform_team_data_could_not_be_loaded_3e52e50b')}</p>
  <button type="button" onClick={() => void refetch()} disabled={isFetching} className="mt-3 rounded-md border border-border px-3 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 min-h-11 min-w-11" data-testid="superadmin_team-superadmin-team-main-superadmin-team-main-retry">
    {isFetching ? t('ui.refreshing_team_data') : t('ui.retry_6327b4e5')}</button>
        </div>);
    }
    return (<div className="space-y-6" aria-busy={isFetching} data-testid="superadmin_team-superadmin-team-main-page-ready">{isFetching ? <p className="text-sm text-secondary" role="status">{t('ui.refreshing_team_data')}</p> : null}
      <SuperadminTeamPageHeader data={data}/>
      <SuperadminTeamSummaryCards data={data}/>
      <SuperadminTeamMembersPanel data={data}/>
      <SuperadminTeamRolesAndAlertPreferencesPanel data={data}/>
    </div>);
}
