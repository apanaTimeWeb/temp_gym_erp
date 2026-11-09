// RESPONSIBILITY: Renders ManagerReportsOverviewContent's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { RefreshCw } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import ManagerReportsOverviewCharts from '@/app/frontend_manager/manager_reports_referrals/reports_overview/components/ManagerReportsOverviewCharts';
import ManagerReportsOverviewDateFilterDropdown from '@/app/frontend_manager/manager_reports_referrals/reports_overview/components/ManagerReportsOverviewDateFilterDropdown';
import ManagerReportsOverviewKPIs from '@/app/frontend_manager/manager_reports_referrals/reports_overview/components/ManagerReportsOverviewKPIs';
import ManagerReportsOverviewTable from '@/app/frontend_manager/manager_reports_referrals/reports_overview/components/ManagerReportsOverviewTable';
import { REPORT_TABS } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/constants/manager_reports_overview_shared.constants';
import { useManagerReportsOverviewLogic } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/hooks/useManagerReportsOverviewLogic';
import type { ReportTab } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/types/manager_reports_overview.types';

const REPORT_TAB_LABELS: Record<ReportTab, { en: string; hi: string }> = {
  Revenue: { en: 'Revenue', hi: 'राजस्व' },
  Attendance: { en: 'Attendance', hi: 'उपस्थिति' },
  Members: { en: 'Members', hi: 'सदस्य' },
  Expenses: { en: 'Expenses', hi: 'खर्च' },
};

/** @description Renders the Manager Reports overview with consistent query states and accessible report navigation. */
export function ManagerReportsOverviewContent() {
  const t = useTranslations('MANAGER_REPORTS_OVERVIEW');
  const locale = useLocale();
  const { tab, setTab, isPending, isError, reload } = useManagerReportsOverviewLogic();
  const isHindi = locale.toLowerCase().startsWith('hi');
  const activeTabId = `manager-reports-tab-${tab.toLowerCase()}`;

  return (
    <div className="min-h-full pb-10">
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">{t('COPY_REPORTS_ANALYTICS')}</h1>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex gap-1 bg-input rounded-xl p-1" role="tablist" aria-label={t('COPY_REPORTS_ANALYTICS')}>
            {REPORT_TABS.map((reportTab) => {
              const selected = tab === reportTab;
              const tabId = `manager-reports-tab-${reportTab.toLowerCase()}`;
              return (
                <button
                  key={reportTab}
                  id={tabId}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="manager-reports-tabpanel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setTab(reportTab)}
                  onKeyDown={(event) => {
                    const currentIndex = REPORT_TABS.indexOf(reportTab);
                    let nextIndex = currentIndex;
                    if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % REPORT_TABS.length;
                    else if (event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + REPORT_TABS.length) % REPORT_TABS.length;
                    else if (event.key === 'Home') nextIndex = 0;
                    else if (event.key === 'End') nextIndex = REPORT_TABS.length - 1;
                    else return;
                    event.preventDefault();
                    const nextTab = REPORT_TABS[nextIndex] ?? REPORT_TABS[0];
                    const nextElement = event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role=\"tab\"]')[nextIndex];
                    nextElement?.focus();
                    setTab(nextTab);
                  }}
                  className={`min-h-11 px-4 py-2 text-sm font-medium rounded-lg motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page hover:brightness-110 ${selected ? 'bg-card text-primary shadow-card' : 'text-text-secondary hover:text-primary'}`}
                >
                  {REPORT_TAB_LABELS[reportTab][isHindi ? 'hi' : 'en']}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="w-48 min-h-11">
              <ManagerReportsOverviewDateFilterDropdown data-testid="manager_reports-managerreportscontent-reports-date-filter-dropdown-1" />
            </div>
            <button
              data-testid="manager_reports-manager-reports-content-reload-1"
              onClick={() => void reload()}
              aria-label={t('COPY_REFRESH')}
              className="min-h-11 min-w-11 flex items-center justify-center gap-2 px-4 text-sm font-medium rounded-lg bg-input border border-border text-text-secondary hover:text-primary motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"
              type="button"
            >
              <RefreshCw size={18} strokeWidth={2} />
              <span>{t('COPY_REFRESH')}</span>
            </button>
          </div>
        </div>

        <div id="manager-reports-tabpanel" role="tabpanel" aria-labelledby={activeTabId} tabIndex={0} aria-busy={isPending} className="space-y-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring rounded-xl">
          {isError ? (
            <div role="alert" aria-live="assertive" className="bg-card border border-danger rounded-xl py-16 px-5 text-center space-y-3">
              <p className="text-sm text-danger-text font-medium">{t('TEXT_GENERIC_ERROR')}</p>
              <button
                data-testid="manager_reports-manager-reports-content-reload-2"
                onClick={() => void reload()}
                className="min-h-11 px-4 text-sm font-medium rounded-lg bg-primary text-on-primary motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"
                type="button"
              >
                {t('COPY_TRY_AGAIN_1')}
              </button>
            </div>
          ) : isPending ? (
            <div aria-label={t('COPY_REPORTS_ANALYTICS')} className="space-y-6">
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-4" aria-hidden="true">
                {Array.from({ length: 8 }, (_, index) => <div key={`kpi-skeleton-${index}`} className="h-24 bg-card rounded-xl motion-safe:animate-pulse border border-border" />)}
              </div>
              <div className="h-72 bg-card rounded-xl motion-safe:animate-pulse border border-border" aria-hidden="true" />
              <div className="h-64 bg-card rounded-xl motion-safe:animate-pulse border border-border" aria-hidden="true" />
            </div>
          ) : (
            <>
              <ManagerReportsOverviewKPIs />
              <ManagerReportsOverviewCharts />
              <ManagerReportsOverviewTable />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
