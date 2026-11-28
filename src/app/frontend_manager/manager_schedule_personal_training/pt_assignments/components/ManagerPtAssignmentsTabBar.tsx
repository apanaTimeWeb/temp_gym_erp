// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
'use client';
import { useTranslations } from 'next-intl';

import { MANAGER_PT_ASSIGNMENTS_TAB_LABEL_KEYS } from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/constants/manager_pt_assignments_tab.constants';
import type { ManagerPtAssignmentsTabBarProps } from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/types/manager_pt_assignments_tab_bar.types';

/**
 * @description Renders the PT feature tab selector without owning tab state or business logic.
 * @dependencies Receives the documented tab options and active-tab callback from ManagerPtAssignmentsMain.
 * @edge-case Preserves accessible selected-state semantics and unique AI-test selectors for each tab.
 */
export default function ManagerPtAssignmentsTabBar({ tabs, activeTab, onChange }: ManagerPtAssignmentsTabBarProps) {
  const t = useTranslations('MANAGER_PT_ASSIGNMENTS');

  return (
    <div role="tablist" aria-label={t('TEXT_ARIA_SECTIONS')} className="flex w-full sm:w-fit overflow-x-auto scrollbar-none gap-1 rounded-2xl border border-indigo-500/30 bg-input dark:bg-[#0D1628] p-1.5" data-testid="manager_pt-managerpttabbar-interactive">
      {tabs.map((id) => (
        <button
          key={id}
          data-testid={`manager_pt-manager-pt-tab-${id}`}
          type="button"
          role="tab"
          aria-selected={activeTab === id}
          onClick={() => onChange(id)}
          className={`shrink-0 whitespace-nowrap min-h-11 rounded-xl px-4 py-2 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:duration-200 ${activeTab === id ? 'bg-card dark:bg-[#16223B] text-primary shadow-card border border-indigo-500/30' : 'text-text-secondary hover:bg-card hover:text-primary'}`}
        >
          {t(MANAGER_PT_ASSIGNMENTS_TAB_LABEL_KEYS[id])}
        </button>
      ))}
    </div>
  );
}
