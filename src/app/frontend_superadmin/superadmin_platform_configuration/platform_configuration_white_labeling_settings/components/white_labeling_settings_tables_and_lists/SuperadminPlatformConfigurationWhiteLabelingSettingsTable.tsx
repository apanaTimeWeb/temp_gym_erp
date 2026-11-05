// RESPONSIBILITY: Renders and orchestrates SuperadminPlatformConfigurationWhiteLabelingTable for the owning Superadmin feature module; presentation stays free of direct API calls.
'use client';
/**
 * RESPONSIBILITY: React component SuperadminPlatformConfigurationWhiteLabelingTable owned by the superadmin_platform_configuration_white_labeling feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: Imported hook APIs: useLocale, useSuperadminPlatformConfigurationWhiteLabelingSettingsStore, useTranslations.
 * MODULE DEPENDENCIES: next-intl, @/components/ui/Tooltip, @/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/utils/SuperadminPlatformConfigurationWhiteLabelingSettingsFormatters, @/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/components/white_labeling_settings_states_and_feedback/SuperadminPlatformConfigurationWhiteLabelingSettingsEmptyState, @/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/components/white_labeling_settings_states_and_feedback/SuperadminPlatformConfigurationWhiteLabelingSettingsStatusBadge, @/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/state/useSuperadminPlatformConfigurationWhiteLabelingSettingsStore, @/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/types/superadmin_platform_configuration_white_labeling_settings_component.types, @/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/types/superadmin_platform_configuration_white_labeling_settings.types
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders White-labeling domain records as a clickable desktop table and mobile card stack. No API calls.
import { useLocale, useTranslations } from 'next-intl';

import Tooltip from '@/components/ui/Tooltip';

import SuperadminPlatformConfigurationWhiteLabelingEmptyState from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/components/white_labeling_settings_states_and_feedback/SuperadminPlatformConfigurationWhiteLabelingSettingsEmptyState';
import SuperadminPlatformConfigurationWhiteLabelingStatusBadge from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/components/white_labeling_settings_states_and_feedback/SuperadminPlatformConfigurationWhiteLabelingSettingsStatusBadge';
import { useSuperadminPlatformConfigurationWhiteLabelingSettingsStore } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/state/useSuperadminPlatformConfigurationWhiteLabelingSettingsStore';
import { formatWhiteLabelingDate } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/utils/SuperadminPlatformConfigurationWhiteLabelingSettingsFormatters';

import type { SuperadminPlatformConfigurationWhiteLabelingTableProps } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/types/superadmin_platform_configuration_white_labeling_settings_component.types';


function openDomain(id: string) { useSuperadminPlatformConfigurationWhiteLabelingSettingsStore.getState().setSelectedDomainId(id); }

/**
 * @description Owns the SuperadminPlatformConfigurationWhiteLabelingTable responsibility within the superadmin_role feature boundary.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminPlatformConfigurationWhiteLabelingSettingsTable({ domains }: SuperadminPlatformConfigurationWhiteLabelingTableProps) {
  const t = useTranslations('superadmin_platform_configuration_white_labeling');
  const locale = useLocale();
  if (domains.length === 0) return <SuperadminPlatformConfigurationWhiteLabelingEmptyState />;

  return (
    <>
      <div className="hidden overflow-hidden rounded-xl border border-border bg-card md:block">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-start">
            <caption className="sr-only">{t('ui.white_labeling_custom_domains_e5d66331')}</caption>
            <thead><tr className="border-b border-border bg-surface-highlight"><th className="w-48 p-4 text-xs font-semibold uppercase tracking-wider text-secondary">{t('ui.gym_name_4ad76c40')}</th><th className="min-w-40 p-4 text-xs font-semibold uppercase tracking-wider text-secondary">{t('ui.domain_eae639a7')}</th><th className="w-28 p-4 text-xs font-semibold uppercase tracking-wider text-secondary">{t('ui.status_ec53a8c4')}</th><th className="w-28 p-4 text-xs font-semibold uppercase tracking-wider text-secondary">{t('ui.ssl_ea52c362')}</th><th className="w-32 p-4 text-xs font-semibold uppercase tracking-wider text-secondary">{t('ui.added_on_70e4179a')}</th></tr></thead>
            <tbody className="divide-y divide-border">
              {domains.map((domain) => (
                <tr key={domain.id} className="motion-safe:transition-colors hover:bg-surface-hover" data-testid={`superadmin_platform_configuration_white_labeling-table-row-${domain.id}`}>
                  <td className="max-w-48 p-4"><Tooltip content={domain.gymName}><button type="button" onClick={() => openDomain(domain.id)} aria-label={t('ui.open_domain_details', { gymName: domain.gymName })} className="block min-h-11 max-w-full truncate text-start font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card" data-testid={`superadmin_platform_configuration_white_labeling-open-domain-${domain.id}`}>{domain.gymName}</button></Tooltip></td>
                  <td className="p-4"><Tooltip content={domain.domain}><span className="block max-w-60 truncate font-mono text-sm text-primary">{domain.domain}</span></Tooltip></td>
                  <td className="p-4"><SuperadminPlatformConfigurationWhiteLabelingStatusBadge status={domain.status} /></td>
                  <td className="p-4"><SuperadminPlatformConfigurationWhiteLabelingStatusBadge status={domain.sslStatus} /></td>
                  <td className="p-4 text-sm text-secondary">{formatWhiteLabelingDate(domain.createdAt, locale)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-3 md:hidden" aria-label={t('ui.white_labeling_custom_domains_e5d66331')}>
        {domains.map((domain) => (
          <button key={domain.id} type="button" onClick={() => openDomain(domain.id)} className="block min-h-11 w-full rounded-xl border border-border bg-card p-4 text-start motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_platform_configuration_white_labeling-superadmin-white-labeling-table-white-labeling-table-button">
            <div className="flex items-start justify-between gap-3"><span className="min-w-0 truncate font-semibold text-primary">{domain.gymName}</span><SuperadminPlatformConfigurationWhiteLabelingStatusBadge status={domain.status} /></div>
            <p className="mt-2 truncate font-mono text-sm text-secondary">{domain.domain}</p>
            <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-secondary"><div><span className="block text-disabled">{t('ui.ssl_ea52c362')}</span><SuperadminPlatformConfigurationWhiteLabelingStatusBadge status={domain.sslStatus} /></div><div><span className="block text-disabled">{t('ui.added_f29ddbfb')}</span><span>{formatWhiteLabelingDate(domain.createdAt, locale)}</span></div></div>
          </button>
        ))}
      </div>
    </>
  );
}
