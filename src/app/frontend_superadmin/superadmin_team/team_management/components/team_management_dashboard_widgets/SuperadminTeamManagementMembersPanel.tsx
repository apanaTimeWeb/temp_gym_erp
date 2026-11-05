// RESPONSIBILITY: Renders/orchestrates SuperadminTeamMembersPanel within its owning Superadmin feature module; no direct backend implementation.
'use client';
import { useLocale as useFormatterLocale } from 'next-intl';
import { useTranslations } from 'next-intl';

import Panel from '@/components/ui/Panel';
import Tooltip from '@/components/ui/Tooltip';
import { displayValue } from '@/lib/display_value';
import { maskSensitiveData } from '@/lib/formatters';

import SuperadminTeamMembersEmptyState from '@/app/frontend_superadmin/superadmin_team/team_management/components/team_management_states_and_feedback/SuperadminTeamManagementMembersEmptyState';
import { getSuperadminTeamStatusBadgeClasses } from '@/app/frontend_superadmin/superadmin_team/team_management/constants/superadmin_team_management_status_badge_config.constants';
import { formatDateTime } from '@/app/frontend_superadmin/superadmin_team/team_management/utils/SuperadminTeamManagementPresentationFormatters';

import type { SuperadminTeamSectionProps } from '@/app/frontend_superadmin/superadmin_team/team_management/types/superadmin_team_management.types';

/**
 * RESPONSIBILITY: React component SuperadminTeamMembersPanel owned by the superadmin_team feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: Imported hook APIs: useTranslations.
 * MODULE DEPENDENCIES: next-intl, @/components/ui/Panel, @/components/ui/Tooltip, @/lib/formatters, @/app/frontend_superadmin/superadmin_team/team_management/components/team_management_states_and_feedback/SuperadminTeamManagementMembersEmptyState, @/app/frontend_superadmin/superadmin_team/team_management/constants/superadmin_team_management_status_badge_config.constants, @/app/frontend_superadmin/superadmin_team/team_management/types/superadmin_team_management.types
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the Superadmin team members panel section.


/**
 * @description Owns the SuperadminTeamMembersPanel responsibility within the superadmin_role feature boundary.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminTeamManagementMembersPanel({ data }: SuperadminTeamSectionProps) {
 const formatterLocale = useFormatterLocale();

  const t = useTranslations('superadmin_team');
    return (<Panel title={t('ui.team_members_8196446d')} description={t('ui.named_access_is_auditable_and_safer_than_sha_4f4a9116')}>
  {data.users.length === 0 ? <SuperadminTeamMembersEmptyState /> : <div className="overflow-x-auto">
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-border text-start text-xs uppercase text-secondary">
          <th className="px-3 py-3">
            {t('ui.name_49ee3087')}</th>
          <th className="px-3 py-3">
            {t('ui.role_bbbabdbe')}</th>
          <th className="px-3 py-3">
            {t('ui.extra_sign_in_e1918e9e')}</th>
          <th className="px-3 py-3">
            {t('ui.last_sign_in_0d85ffff')}</th>
          <th className="px-3 py-3">
            {t('ui.status_ec53a8c4')}</th>
        </tr>
      </thead>
      <tbody>
        {data.users.map(user => (<tr key={user.id} className="border-b border-border">
            <td className="px-3 py-3">
              <Tooltip content={user.name}>
                <div className="max-w-56 truncate font-medium text-primary">
                  {user.name}
                </div>
              </Tooltip>
              <Tooltip content={maskSensitiveData(user.email, 'email')}>
                <div className="max-w-56 truncate text-xs text-secondary">
                  {maskSensitiveData(user.email, 'email')}
                </div>
              </Tooltip>
            </td>
            <td className="px-3 py-3 text-primary">
              {user.role}
            </td>
            <td className="px-3 py-3 text-secondary">
              {(() => { if (user.mfa === 'Required') { return (t('ui.mfa_required')); } if (user.mfa === 'Enabled') { return (t('ui.mfa_enabled')); } return (t('ui.mfa_unknown')); })()}
            </td>
            <td className="px-3 py-3 text-secondary">
              {displayValue(user.lastLogin ? formatDateTime(user.lastLogin, formatterLocale) : null)}
            </td>
            <td className="px-3 py-3">
              <span className={`rounded-full px-2 py-1 text-xs font-semibold ${getSuperadminTeamStatusBadgeClasses(user.status)}`}>
                {(() => { if (user.status === 'ACTIVE') { return (t('ui.status_active')); } if (user.status === 'DISABLED') { return (t('ui.status_disabled')); } return (t('ui.status_unknown')); })()}
              </span>
            </td>
          </tr>))}
      </tbody>
    </table>
  </div>}
    </Panel>);
}
