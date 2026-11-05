// RESPONSIBILITY: Renders and orchestrates SuperadminGymsMain for the owning Superadmin feature module; presentation stays free of direct API calls.
'use client';


import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import SuperadminGymsCalendar from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/components/SuperadminGymsDirectoryCalendar';
import { SuperadminGymsDirectoryErrorBoundary } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/components/SuperadminGymsDirectoryErrorBoundary';
import SuperadminGymsTable from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/components/SuperadminGymsDirectoryTable';
import SuperadminGymsToolbar from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/components/SuperadminGymsDirectoryToolbar';
import { SUPERADMIN_GYMS_DIRECTORY_ROUTES as SUPERADMIN_GYMS_MANAGEMENT_ROUTES } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/config/superadmin_gyms_directory.url_config';
import { SUPERADMIN_GYMS_STATUS_FILTER_OPTIONS } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/constants/superadmin_gyms_directory_filter.constants';
import { useSuperadminGymsDirectoryUrlState } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/hooks/useSuperadminGymsDirectoryUrlState';
import { useSuperadminGymsDirectoryStore } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/state/useSuperadminGymsDirectoryStore';


/**

 * RESPONSIBILITY: React component SuperadminGymsMain owned by the superadmin_gyms feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: Imported hook APIs: useSuperadminGymsDirectoryStore, useTranslations, useSuperadminGymsDirectoryUrlState.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_gyms/gyms_directory/components/SuperadminGymsDirectoryToolbar, @/app/frontend_superadmin/superadmin_gyms/gyms_directory/components/SuperadminGymsDirectoryTable, @/app/frontend_superadmin/superadmin_gyms/gyms_directory/components/SuperadminGymsDirectoryCalendar, next-intl, @/app/frontend_superadmin/superadmin_gyms/gyms_directory/state/useSuperadminGymsDirectoryStore, @/app/frontend_superadmin/superadmin_gyms/gyms_directory/hooks/useSuperadminGymsDirectoryUrlState, lucide-react, @/app/frontend_superadmin/superadmin_gyms/gyms_directory/constants/superadmin_gyms_directory_filter.constants, next/link, @/app/frontend_superadmin/superadmin_gyms/gyms_directory/config/superadmin_gyms_directory.url_config, @/app/frontend_superadmin/superadmin_gyms/gyms_directory/components/SuperadminGymsDirectoryErrorBoundary
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Root orchestrator for the Gyms page. Renders the layout, toolbar, and table.


/**
 * @description Owns the SuperadminGymsMain responsibility within the superadmin_role feature boundary.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminGymsDirectoryMain() {
  const t = useTranslations('superadmin_gyms');
    const viewMode = useSuperadminGymsDirectoryStore(state => state.viewMode);
    const { getParam, setParam } = useSuperadminGymsDirectoryUrlState();
    const statusFilter = getParam('statusFilter', 'All');
    
    return (<div className="space-y-6" data-testid="superadmin_gyms-superadmin-gyms-main-page">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">{t('ui.gyms_e88a3380')}</h1>
          <p className="text-secondary mt-1">{t('ui.manage_your_saas_clients_subscriptions_and_a_95ea8e0a')}</p>
        </div>
        <Link href={SUPERADMIN_GYMS_MANAGEMENT_ROUTES.VIEW('add')} className="flex min-h-11 items-center gap-2 bg-primary hover:bg-primary-hover text-on-primary px-4 py-2 rounded-lg font-medium motion-safe:transition-colors shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_gyms-superadmin-gyms-main-main-onboard-new-gym">
          <Plus size={18}/>
          {t('ui.onboard_new_gym_01dd398f')}</Link>
      </div>

      <div className="flex w-full overflow-x-auto border-b border-border hide-scrollbar">
        {SUPERADMIN_GYMS_STATUS_FILTER_OPTIONS.map(({ labelKey, value }) => (
          <button type="button"
            key={value}
            onClick={() => setParam('statusFilter', value)}
            aria-pressed={statusFilter === value}
            className={`whitespace-nowrap px-4 py-3 text-sm font-medium border-b-2 motion-safe:transition-colors focus-visible:outline-none focus-visible:bg-surface-hover ${
              statusFilter === value
                ? 'border-focus text-primary'
                : 'border-transparent text-secondary hover:text-primary hover:border-border'
            }`}
           data-testid={`gyms-superadmin-gyms-main-status-${value.toLowerCase()}`}>
            {t(labelKey)}
          </button>
        ))}
      </div>

      <div className="bg-page border border-border rounded-xl overflow-hidden shadow-card">
        <SuperadminGymsToolbar />
        <SuperadminGymsDirectoryErrorBoundary variant="inline">
          {viewMode === 'calendar' ? <SuperadminGymsCalendar /> : <SuperadminGymsTable />}
        </SuperadminGymsDirectoryErrorBoundary>
      </div>
    </div>);
}
