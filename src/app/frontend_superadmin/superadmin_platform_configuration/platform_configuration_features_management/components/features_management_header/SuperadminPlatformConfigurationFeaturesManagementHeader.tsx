// RESPONSIBILITY: Renders/orchestrates SuperadminPlatformConfigurationFeaturesHeader within its owning Superadmin feature module; no direct backend implementation.
'use client';
import { useTranslations } from 'next-intl';

import type { SuperadminPlatformConfigurationFeaturesHeaderProps } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/types/superadmin_platform_configuration_features_management_header.types';
import type { FeaturesTab } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/types/superadmin_platform_configuration_features_management_ui.types';

export default function SuperadminPlatformConfigurationFeaturesManagementHeader({ activeTab, onTabChange }: SuperadminPlatformConfigurationFeaturesHeaderProps) {
  const t = useTranslations('superadmin_platform_configuration_features');
  const tabs: Array<{ id: FeaturesTab; label: string; testId: string }> = [
    { id: 'FLAGS', label: t('ui.feature_flags_5ba305a'), testId: 'superadmin_platform_configuration_features-header-tab-flags' },
    { id: 'NOTES', label: t('ui.release_notes_6cba0c4'), testId: 'superadmin_platform_configuration_features-header-tab-notes' },
    { id: 'TIERS', label: t('ui.saas_tiers_c300e32'), testId: 'superadmin_platform_configuration_features-header-tab-tiers' },
  ];

  return (
    <header className="relative overflow-hidden rounded-2xl border border-orange-500/35 bg-card dark:bg-gradient-to-br dark:from-[#291514] dark:via-[#12192B] dark:to-[#0C1322] p-5 sm:p-6 shadow-card flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#FB923C] via-[#FF5A1F] to-[#38BDF8]" />
      <div className="min-w-0">
        <h1 className="superadmin-page-title text-primary">{t('ui.product_management_75a497f')}</h1>
        <p className="mt-1 text-sm text-secondary">{t('ui.control_feature_rollout_and_publish_release_note_13d44bd')}</p>
      </div>
      <nav className="flex w-full max-w-xl gap-1.5 overflow-x-auto hide-scrollbar rounded-2xl border border-border dark:border-white/10 bg-input/70 dark:bg-[#0E1526]/90 p-1.5 lg:w-auto shrink-0" aria-label={t('ui.product_management_75a497f')}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`min-h-10 shrink-0 rounded-xl border px-4 py-2 text-xs sm:text-sm font-medium motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer ${
                isActive
                  ? 'border-orange-500/40 bg-gradient-to-r from-[#FF5A1F]/20 to-[#F97316]/10 text-primary dark:text-orange-300 font-semibold shadow-card'
                  : 'border-transparent text-secondary hover:bg-surface-hover hover:text-primary'
              }`}
              data-testid={tab.testId}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
}
