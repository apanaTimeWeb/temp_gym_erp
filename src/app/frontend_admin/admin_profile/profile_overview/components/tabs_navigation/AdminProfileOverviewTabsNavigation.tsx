"use client";
// RESPONSIBILITY: Renders the AdminProfileOverviewTabsNavigation UI surface for profile_overview; business state and network mutations remain in feature hooks/services.
// DATA FLOW: feature data/state and user input → AdminProfileOverviewTabsNavigation → accessible UI/events routed to owning hooks (admin_profile/profile_overview/components/tabs_navigation/AdminProfileOverviewTabsNavigation.tsx)

import { useTranslations } from 'next-intl';
import { ADMIN_PROFILE_TABS } from '@/app/frontend_admin/admin_profile/profile_overview/constants/AdminProfileOverviewConstants';
import type { AdminProfileTabsNavigationProps } from '@/app/frontend_admin/admin_profile/profile_overview/types/AdminProfileOverviewComponentPropsTypes';


/** Provides a keyboard-operable tab-like section selector with stable accessible names. 
 * @description AdminProfileOverviewTabsNavigation renders the ProfileOverviewTabsNavigation interface for its owning feature.
 * @dependencies Uses feature-local hooks and zero-business UI primitives.
 * @edge-case Preserves contract-defined loading, empty, error, permission, and recovery states.
 */
export default function AdminProfileOverviewTabsNavigation({ activeTab, onTabChange }: AdminProfileTabsNavigationProps) {
  const t = useTranslations();
  return (
    <nav aria-label={t('profile.admin_profile_main.text_9ba8d391c5')} className="w-fit max-w-full rounded-xl border border-border bg-input p-1">
      <div className="flex flex-wrap gap-1" role="group">
        {ADMIN_PROFILE_TABS.map(({ id, labelKey, icon: Icon }) => (
          <button
            type="button"
            key={id}
            onClick={() => onTabChange(id)}
            aria-pressed={activeTab === id}
            className={`min-h-11 min-w-11 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-colors motion-safe:duration-base ${activeTab === id ? 'bg-card text-primary shadow-card' : 'text-secondary hover:text-primary'}`}
            data-testid={`admin_profile-tabs-${id}`}
          >
            <Icon size={18} strokeWidth={2} aria-hidden="true" />
            {t(labelKey)}
          </button>
        ))}
      </div>
    </nav>
  );
}
