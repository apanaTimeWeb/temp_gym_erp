// RESPONSIBILITY: Renders/orchestrates SuperadminSystemOpsInfrastructureHeader within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders infrastructure page heading, status filter, and manual refresh control without owning query state.
import { RefreshCcw } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { SearchableDropdown } from '@/components/ui/SearchableDropdown';

import type { SuperadminSystemOpsInfrastructureHeaderProps } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/types/superadmin_system_ops_infrastructure_header.types';



/**
 * @description Presents the infrastructure filter and refresh controls as a pure view component.
 * @dependencies Receives status state and refresh intent from the module orchestrator.
 * @edge-case Refresh remains disabled during active node/Redis fetches and preserves the selected status filter.
 */
export default function SuperadminSystemOpsInfrastructureHeader({ statusFilter, options, isRefreshing, onStatusFilterChange, onRefresh }: SuperadminSystemOpsInfrastructureHeaderProps) {
  const t = useTranslations('superadmin_system_ops_infrastructure');
  return (
    <header className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h1 className="superadmin-page-title text-primary">{t('ui.server_infrastructure_e8ce2ff')}</h1>
        <p className="mt-1 text-secondary">{t('ui.real_time_health_metrics_of_your_docker_kubernetes_c_c7cb1b3')}</p>
      </div>
      <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
        <SearchableDropdown data-testid="superadmin_system_ops_infrastructure-superadmin-system-ops-infrastructure-header-superadmin_system_ops_infrastructure-header-SearchableDropdown-31" value={statusFilter} onChange={(v) => onStatusFilterChange(v as string)} options={options} className="w-full sm:w-40" />
        <button type="button" onClick={onRefresh} disabled={isRefreshing} className="min-h-11 flex min-w-40 items-center justify-center gap-2 rounded-lg border border-focus bg-primary px-4 py-2 font-medium text-on-primary hover:bg-primary-hover disabled:opacity-50 motion-safe:transition-opacity motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_system_ops_infrastructure-superadmin-system-ops-infrastructure-header-superadmin_system_ops_infrastructure-header-refresh">
          <RefreshCcw size={18} strokeWidth={2} className={isRefreshing ? 'motion-safe:animate-spin' : ''} aria-hidden="true" />
          {t('ui.force_sync_metrics_268d77a')}
        </button>
      </div>
    </header>
  );
}
