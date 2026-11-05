// RESPONSIBILITY: Renders and orchestrates SuperadminPlatformConfigurationWhiteLabelingMain for the owning Superadmin feature module; presentation stays free of direct API calls.
'use client';
/**
 * RESPONSIBILITY: React component SuperadminPlatformConfigurationWhiteLabelingMain owned by the superadmin_platform_configuration_white_labeling feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: Imported hook APIs: useDebouncedValue, useEffect, useSuperadminPlatformConfigurationWhiteLabelingSettingsDomains, useSuperadminPlatformConfigurationWhiteLabelingSettingsStore, useSuperadminPlatformConfigurationWhiteLabelingSettingsUrlState, useTranslations.
 * MODULE DEPENDENCIES: react, lucide-react, next-intl, @/hooks/useDebouncedValue, @/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/components/white_labeling_settings_modals/SuperadminPlatformConfigurationWhiteLabelingSettingsDrawer, @/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/components/white_labeling_settings_states_and_feedback/SuperadminPlatformConfigurationWhiteLabelingSettingsEmptyState, @/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/components/white_labeling_settings_states_and_feedback/SuperadminPlatformConfigurationWhiteLabelingSettingsErrorState, @/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/components/white_labeling_settings_states_and_feedback/SuperadminPlatformConfigurationWhiteLabelingSettingsLoadingState, @/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/components/white_labeling_settings_tables_and_lists/SuperadminPlatformConfigurationWhiteLabelingSettingsTable, @/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/constants/superadmin_platform_configuration_white_labeling_settings.constants, @/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/hooks/useSuperadminPlatformConfigurationWhiteLabelingSettingsDomains, @/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/hooks/useSuperadminPlatformConfigurationWhiteLabelingSettingsUrlState, @/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/state/useSuperadminPlatformConfigurationWhiteLabelingSettingsStore, @/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/types/superadmin_platform_configuration_white_labeling_settings.types
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the White-labeling list shell, URL-synchronized search/filter controls, and selected-domain drawer. No API calls.
import { useEffect } from 'react';
import { Filter, Globe, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useDebouncedValue } from '@/hooks/useDebouncedValue';

import SuperadminPlatformConfigurationWhiteLabelingDrawer from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/components/white_labeling_settings_modals/SuperadminPlatformConfigurationWhiteLabelingSettingsDrawer';
import SuperadminPlatformConfigurationWhiteLabelingErrorState from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/components/white_labeling_settings_states_and_feedback/SuperadminPlatformConfigurationWhiteLabelingSettingsErrorState';
import SuperadminPlatformConfigurationWhiteLabelingLoadingState from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/components/white_labeling_settings_states_and_feedback/SuperadminPlatformConfigurationWhiteLabelingSettingsLoadingState';
import SuperadminPlatformConfigurationWhiteLabelingTable from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/components/white_labeling_settings_tables_and_lists/SuperadminPlatformConfigurationWhiteLabelingSettingsTable';
import { normalizeWhiteLabelSearch, SUPERADMIN_PLATFORM_CONFIGURATION_WHITE_LABELING_SEARCH_DEBOUNCE_MS, SUPERADMIN_PLATFORM_CONFIGURATION_WHITE_LABELING_STATUS_OPTIONS } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/constants/superadmin_platform_configuration_white_labeling_settings.constants';
import { useSuperadminPlatformConfigurationWhiteLabelingSettingsDomains } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/hooks/useSuperadminPlatformConfigurationWhiteLabelingSettingsDomains';
import { useSuperadminPlatformConfigurationWhiteLabelingSettingsUrlState } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/hooks/useSuperadminPlatformConfigurationWhiteLabelingSettingsUrlState';
import { useSuperadminPlatformConfigurationWhiteLabelingSettingsStore } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/state/useSuperadminPlatformConfigurationWhiteLabelingSettingsStore';

import type { SuperadminPlatformConfigurationWhiteLabelingStatus } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/types/superadmin_platform_configuration_white_labeling_settings.types';



/**
 * @description Owns the SuperadminPlatformConfigurationWhiteLabelingMain responsibility within the superadmin_role feature boundary.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminPlatformConfigurationWhiteLabelingSettingsMain() {
  const t = useTranslations('superadmin_platform_configuration_white_labeling');
  const { search, status, setState } = useSuperadminPlatformConfigurationWhiteLabelingSettingsUrlState();
  const debouncedSearch = useDebouncedValue(search, SUPERADMIN_PLATFORM_CONFIGURATION_WHITE_LABELING_SEARCH_DEBOUNCE_MS);
  const query = useSuperadminPlatformConfigurationWhiteLabelingSettingsDomains({ search: debouncedSearch, status });
  const { data: response, isPending, isError, refetch } = query;
  const selectedDomainId = useSuperadminPlatformConfigurationWhiteLabelingSettingsStore((state) => state.selectedDomainId);
  const setSelectedDomainId = useSuperadminPlatformConfigurationWhiteLabelingSettingsStore((state) => state.setSelectedDomainId);
  const domains = response?.data ?? [];

  useEffect(() => {
    if (!isPending && !isError && response && selectedDomainId && !domains.some((domain) => domain.id === selectedDomainId)) {
      setSelectedDomainId(null);
    }
  }, [domains, isError, isPending, response, selectedDomainId, setSelectedDomainId]);

  if (isPending) return <SuperadminPlatformConfigurationWhiteLabelingLoadingState/>;
  if (isError) return <SuperadminPlatformConfigurationWhiteLabelingErrorState onRetry={() => void refetch()} />;

  return (
    <div className="space-y-6" data-testid="superadmin_platform_configuration_white_labeling-superadmin-white-labeling-main-page-ready">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-primary"><Globe size={18} className="text-primary" aria-hidden="true"/>{t('ui.white_labeling_amp_domains_742e46bf')}</h1>
          <p className="mt-1 text-sm text-secondary">{t('ui.manage_custom_domains_and_branding_for_tenan_26c96fd4')}</p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card p-4 sm:flex-row">
        <div className="relative w-full flex-1">
          <Search size={18} className="absolute start-3 top-1/2 -translate-y-1/2 text-secondary" aria-hidden="true"/>
          <label htmlFor="superadmin-white-labeling-search" className="sr-only">{t('ui.search_by_gym_name_or_domain_d96770fb')}</label>
          <input id="superadmin-white-labeling-search" type="search" placeholder={t('ui.search_by_gym_name_or_domain_91307363')} value={search} onChange={(event) => setState({ search: normalizeWhiteLabelSearch(event.target.value) })} className="w-full rounded-lg border border-border bg-input py-2 ps-9 pe-4 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base min-h-11"  data-testid="superadmin_platform_configuration_white_labeling-superadmin-white-labeling-main-superadmin-white-labeling-search"/>
        </div>
        <div className="flex w-full items-center gap-2 sm:w-auto">
          <Filter size={18} className="shrink-0 text-secondary" aria-hidden="true"/>
          <label htmlFor="superadmin-white-labeling-status" className="sr-only">{t('ui.filter_by_status_5dd5cd66')}</label>
          <select id="superadmin-white-labeling-status" value={status} onChange={(event) => setState({ status: event.target.value as SuperadminPlatformConfigurationWhiteLabelingStatus })} className="min-h-11 w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page sm:w-40" data-testid="superadmin_platform_configuration_white_labeling-superadmin-white-labeling-main-superadmin-white-labeling-status">
            {SUPERADMIN_PLATFORM_CONFIGURATION_WHITE_LABELING_STATUS_OPTIONS.map((option) => <option key={option.value} value={option.value} data-testid="superadminwhitelabelingmain-option-6927">{t(option.labelKey)}</option>)}
          </select>
        </div>
      </div>

      <SuperadminPlatformConfigurationWhiteLabelingTable domains={domains} />
      {selectedDomainId ? <SuperadminPlatformConfigurationWhiteLabelingDrawer domains={domains} /> : null}
    </div>
  );
}
