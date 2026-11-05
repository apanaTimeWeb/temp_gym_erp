// RESPONSIBILITY: Renders/orchestrates SuperadminPlatformConfigurationFeaturesHeader within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders the Product Management heading and feature-owned tab navigation without owning business state or mutations.
import { useTranslations } from 'next-intl';

import type { SuperadminPlatformConfigurationFeaturesHeaderProps } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/types/superadmin_platform_configuration_features_management_header.types';
import type { FeaturesTab } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/types/superadmin_platform_configuration_features_management_ui.types';



/**
 * @description Displays the module title, subtitle, and tabs that switch between feature flags, release notes, and SaaS tiers.
 * @dependencies Uses only module-owned translations and receives UI state/intent through explicit props.
 * @edge-case The active tab remains keyboard accessible and the active visual state must track the parent-controlled value.
 */
export default function SuperadminPlatformConfigurationFeaturesManagementHeader({ activeTab, onTabChange }: SuperadminPlatformConfigurationFeaturesHeaderProps) {
  const t = useTranslations('superadmin_platform_configuration_features');
  const tabs: Array<{ id: FeaturesTab; label: string; testId: string }> = [
    { id: 'FLAGS', label: t('ui.feature_flags_5ba305a'), testId: 'superadmin_platform_configuration_features-header-tab-flags' },
    { id: 'NOTES', label: t('ui.release_notes_6cba0c4'), testId: 'superadmin_platform_configuration_features-header-tab-notes' },
    { id: 'TIERS', label: t('ui.saas_tiers_c300e32'), testId: 'superadmin_platform_configuration_features-header-tab-tiers' },
  ];

  return (
    <header className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div>
        <h1 className="superadmin-page-title text-primary">{t('ui.product_management_75a497f')}</h1>
        <p className="mt-1 text-secondary">{t('ui.control_feature_rollout_and_publish_release_note_13d44bd')}</p>
      </div>
      <nav className="flex w-full max-w-xl gap-1 overflow-x-auto rounded-lg border border-border bg-card p-1 md:w-auto" aria-label={t('ui.product_management_75a497f')}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button 
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`min-h-11 shrink-0 rounded-md px-4 py-2 text-sm font-medium motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:active:scale-95 ${isActive ? 'bg-surface-hover text-primary shadow-card' : 'text-secondary hover:text-primary'}`}
              data-testid={tab.testId}>
              {tab.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
}
