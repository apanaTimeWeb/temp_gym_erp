// RESPONSIBILITY: Renders/orchestrates SuperadminTeamSummaryCards within its owning Superadmin feature module; no direct backend implementation.
'use client';
import { useLocale as useFormatterLocale } from 'next-intl';
import { useTranslations } from 'next-intl';

import MetricCard from '@/components/ui/MetricCard';

import { SUPERADMIN_TEAM_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_team/team_management/constants/superadmin_team_management_status_badge_config.constants';
import { formatNumber } from '@/app/frontend_superadmin/superadmin_team/team_management/utils/SuperadminTeamManagementPresentationFormatters';

import type { SuperadminTeamSectionProps } from '@/app/frontend_superadmin/superadmin_team/team_management/types/superadmin_team_management.types';

/**
 * RESPONSIBILITY: React component SuperadminTeamSummaryCards owned by the superadmin_team feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: Imported hook APIs: useTranslations.
 * MODULE DEPENDENCIES: next-intl, @/components/ui/MetricCard, @/lib/formatters, @/app/frontend_superadmin/superadmin_team/team_management/constants/superadmin_team_management_status_badge_config.constants, @/app/frontend_superadmin/superadmin_team/team_management/types/superadmin_team_management.types
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the Superadmin team summary cards section.


/**
 * @description Renders TeamSummaryCards within the owning Superadmin feature module.
 * @dependencies Uses only dependencies declared in this module file and documented feature infrastructure.
 * @edge-case Preserves documented loading, empty, error, disabled, retry, and repeated-action behavior.
 */
export default function SuperadminTeamManagementSummaryCards({ data }: SuperadminTeamSectionProps) {
 const formatterLocale = useFormatterLocale();

  const t = useTranslations('superadmin_team');
    const active = data.users.filter(u => u.status === SUPERADMIN_TEAM_STATUS_CODES.ACTIVE).length;
    return (<div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
  <MetricCard label={t('ui.team_members_8196446d')} value={formatNumber(data.users.length, formatterLocale)} helper={t('ui.platform_operators_97a8ff63')} data-testid="superadmin-team-superadmin-team-summary-cards-metric-card-1"/>
  <MetricCard label={t('ui.active_access_7e4b57f7')} value={formatNumber(active, formatterLocale)} helper={t('ui.enabled_accounts_9c0f5fda')} tone="success" data-testid="superadmin-team-superadmin-team-summary-cards-metric-card-2"/>
  <MetricCard label={t('ui.role_groups_02a76b89')} value={formatNumber(data.roles.length, formatterLocale)} helper={t('ui.defined_scopes_a2627074')} tone="info" data-testid="superadmin-team-superadmin-team-summary-cards-metric-card-3"/>
  <MetricCard label={t('ui.alerts_on_c47046a0')} value={formatNumber(data.alerts.filter((item) => item.enabled).length, formatterLocale)} helper={t('ui.current_alerts_2fe5defc')} tone="warning" data-testid="superadmin-team-superadmin-team-summary-cards-metric-card-4"/>
    </div>);
}
