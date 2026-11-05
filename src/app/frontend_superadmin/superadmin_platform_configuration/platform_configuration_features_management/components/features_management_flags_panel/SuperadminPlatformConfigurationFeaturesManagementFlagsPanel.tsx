// RESPONSIBILITY: Renders/orchestrates SuperadminPlatformConfigurationFeaturesFlagsPanel within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders feature-flag search, status rows, rollout actions, history actions, and toggle controls from parent-owned state.
import { Clock, Edit3, Search, ToggleLeft, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';

import type { SuperadminPlatformConfigurationFeaturesFlagsPanelProps } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/types/superadmin_platform_configuration_features_management_flags_panel.types';



/**
 * @description Renders the searchable feature-flag list and delegates every mutation/navigation intent to the parent view model.
 * @dependencies Receives server data and handlers from the feature view-model; owns no API or business state.
 * @edge-case Empty search results remain explicit, toggle actions retain stable identity via flag.id, and touch actions are always visible.
 */
export default function SuperadminPlatformConfigurationFeaturesManagementFlagsPanel({ flags, searchQuery, onSearchQueryChange, onManageRollout, onViewHistory, onEditMetadata, onToggle }: SuperadminPlatformConfigurationFeaturesFlagsPanelProps) {
  const t = useTranslations('superadmin_platform_configuration_features');
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredFlags = flags.filter((flag) => flag.name.toLowerCase().includes(normalizedQuery) || flag.description.toLowerCase().includes(normalizedQuery));

  return (
    <section className="overflow-hidden rounded-xl border border-border bg-card shadow-card" aria-labelledby="superadmin_platform_configuration_features-flags-title">
      <div className="flex flex-col gap-4 border-b border-border p-6 sm:flex-row sm:items-center sm:justify-between">
        <h2 id="superadmin_platform_configuration_features-flags-title" className="flex items-center gap-2 text-lg font-bold text-primary">
          <ToggleLeft size={18} strokeWidth={2} aria-hidden="true" />
          {t('ui.global_feature_flags_92beef0')}
        </h2>
        <div className="relative w-full max-w-xs">
          <label htmlFor="superadmin_platform_configuration_features-search" className="sr-only">{t('ui.search_flags_5d0e8a0')}</label>
          <Search size={18} strokeWidth={2} aria-hidden="true" className="absolute start-3 top-1/2 -translate-y-1/2 text-secondary" />
          <input 
            id="superadmin_platform_configuration_features-search"
            type="search"
            placeholder={t('ui.search_flags_5d0e8a0')}
            className="min-h-11 w-full rounded-lg border border-border bg-input py-2 ps-9 pe-4 text-sm text-primary focus:border-focus focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base"
            value={searchQuery}
            onChange={(event) => onSearchQueryChange(event.target.value)}
            data-testid="superadmin_platform_configuration_features-superadmin-features-flags-panel-flags-panel-search-input"
          />
        </div>
      </div>

      {filteredFlags.length === 0 ? (
        <div className="flex min-h-48 items-center justify-center px-6 text-center text-sm text-secondary" data-testid="superadmin_platform_configuration_features-superadmin-features-flags-panel-flags-panel-empty-state">
          {t('ui.no_feature_flags_found')}
        </div>
      ) : (
        <div className="divide-y divide-border">
          {filteredFlags.map((flag) => (
            <article key={flag.id} className="flex flex-col gap-4 p-6 hover:bg-surface-hover motion-safe:transition-colors md:flex-row md:items-center md:justify-between">
              <div className="min-w-0">
                <h3 className="mb-1 font-bold text-primary">{flag.name}</h3>
                <p className="text-sm text-secondary">{flag.description}</p>

                {!flag.isGlobalEnabled ? (
                  <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                    {flag.enabledTenantIds.length > 0 ? (
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-warning-bg px-2 py-0.5 text-xs font-bold text-warning">{t('ui.beta_override_da42b65')}</span>
                        <span className="text-xs text-secondary">{t('ui.enabled_for_cdb5e27')} {flag.enabledTenantIds.length} {t('ui.specific_superadmin_gyms_cdd2af5')}</span>
                      </div>
                    ) : null}
                    <button  type="button" onClick={() => onManageRollout(flag)} className="inline-flex min-h-11 items-center gap-1.5 text-start text-xs font-semibold text-primary hover:text-primary motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:active:scale-95" data-testid={`superadmin_platform_configuration_features-flags-panel-manage-rollout-${flag.id}`}>
                      <Users size={18} strokeWidth={2} aria-hidden="true" />
                      {t('ui.manage_rollout_90aa0af')}
                    </button>
                  </div>
                ) : (
                  <p className="mt-3 text-xs text-secondary">{t('ui.manage_rollout_from_the_action_above_1aca135')}</p>
                )}

                <button  type="button" onClick={() => onViewHistory(flag)} className="mt-2 inline-flex min-h-11 items-center gap-1.5 text-start text-xs font-semibold text-secondary hover:text-primary motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:active:scale-95" data-testid={`superadmin_platform_configuration_features-flags-panel-history-${flag.id}`}>
                  <Clock size={18} strokeWidth={2} aria-hidden="true" />
                  {t('ui.view_history_39b5ba0')}
                </button>
                <button type="button" onClick={() => onEditMetadata(flag)} aria-label={t('ui.edit_feature_metadata_for', { name: flag.name })} className="mt-2 inline-flex min-h-11 items-center gap-1.5 text-start text-xs font-semibold text-secondary hover:text-primary motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:active:scale-95" data-testid={`superadmin_platform_configuration_features-flags-panel-edit-metadata-${flag.id}`}>
                  <Edit3 size={18} strokeWidth={2} aria-hidden="true" />
                  {t('ui.edit_feature_metadata')}
                </button>
              </div>

              <div className="flex shrink-0 flex-col items-start gap-2 md:items-end">
                <button 
                  type="button"
                  aria-label={t('ui.a11y_toggle_feature', { name: flag.name })}
                  aria-pressed={flag.isGlobalEnabled}
                  onClick={() => void onToggle(flag)}
                  className={`min-h-11 min-w-11 w-12 rounded-full px-1.5 py-1 relative cursor-pointer motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:active:scale-95 ${flag.isGlobalEnabled ? 'bg-success-bg' : 'bg-surface-highlight'}`}
                  data-testid={`superadmin_platform_configuration_features-flags-panel-toggle-${flag.id}`}>
                  <span className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-card motion-safe:transition-all ${flag.isGlobalEnabled ? 'end-1' : 'start-1'}`} aria-hidden="true" />
                </button>
                <span className="text-xs font-medium text-secondary">
                  {flag.isGlobalEnabled ? t('ui.globally_enabled_0026bf0') : t('ui.globally_disabled_1addd15')}
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
