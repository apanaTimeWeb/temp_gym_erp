"use client";
// RESPONSIBILITY: Tab switcher between "All Entries" and "Cross-Branch View" for the Blacklist module.
// DATA FLOW: feature data/state and user input → AdminMembersBlacklistManagementTabs → accessible UI/events routed to owning hooks (admin_blacklist/blacklist_management/components/tabs/AdminMembersBlacklistManagementTabs.tsx)

import { useTranslations } from 'next-intl';
import { Globe } from 'lucide-react';
import { useAdminBlacklistLogic } from '@/app/frontend_admin/admin_members/members_blacklist_management/hooks/useAdminMembersBlacklistManagementLogic';
import { BLACKLIST_TAB_OPTIONS } from '@/app/frontend_admin/admin_members/members_blacklist_management/constants/AdminMembersBlacklistManagementConstants';

/**
 * AdminMembersBlacklistManagementTabs renders the admin blacklist tabs UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminMembersBlacklistManagementTabs: Tab switcher between "All Entries" and "Cross-Branch View" for the Blacklist module.
 * @dependencies Consumes useAdminBlacklistLogic, AdminBlacklistConstants.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminMembersBlacklistManagementTabs() {
  const t = useTranslations();
  const { activeTab, setActiveTab, gymSpecificEntries } = useAdminBlacklistLogic();

  return (
    <div className="flex items-center gap-1 bg-input border border-border rounded-xl p-1 w-fit">
      {BLACKLIST_TAB_OPTIONS.map((tab , __testIdIndex20) => {
        const isActive = activeTab === tab.value;
        const badge = tab.value === 'cross-branch' ? gymSpecificEntries.length : null;
        return (
          <button type="button"
            key={tab.value}
            aria-pressed={isActive}
            onClick={() => setActiveTab(tab.value)}
            className={`motion-safe:duration-base ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium motion-safe:transition-all ${
              isActive
                ? 'bg-card text-primary shadow-card border border-border'
                : 'text-secondary hover:text-primary'
            }`}
           data-testid={`admin_blacklist-admin_blacklist-tabs-click-map20-${__testIdIndex20}-1`}>
            {tab.value === 'cross-branch' && <Globe size={18}  strokeWidth={2}/>}
            {t(tab.labelKey)}
            {badge !== null && badge > 0 && (
              <span className={`px-1.5 py-0.5 rounded-full text-xs font-semibold ${isActive ? 'bg-warning-bg text-warning' : 'bg-input text-secondary'}`} data-testid={`admin_blacklist-adminblacklisttabs-status-1-map20-${__testIdIndex20}-2`}>
                {badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
