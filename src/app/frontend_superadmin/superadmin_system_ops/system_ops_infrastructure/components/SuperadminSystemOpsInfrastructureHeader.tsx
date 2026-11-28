// RESPONSIBILITY: Renders/orchestrates SuperadminSystemOpsInfrastructureHeader within its owning Superadmin feature module; no direct backend implementation.
'use client';
import { RefreshCcw } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { SearchableDropdown } from '@/components/ui/SearchableDropdown';

import type { SuperadminSystemOpsInfrastructureHeaderProps } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/types/superadmin_system_ops_infrastructure_header.types';

export default function SuperadminSystemOpsInfrastructureHeader({ statusFilter, options, isRefreshing, onStatusFilterChange, onRefresh }: SuperadminSystemOpsInfrastructureHeaderProps) {
  const t = useTranslations('superadmin_system_ops_infrastructure');
  return (
    <header className="relative overflow-hidden rounded-2xl border border-blue-500/35 bg-card dark:bg-gradient-to-br dark:from-[#0E2438] dark:via-[#12192B] dark:to-[#0C1322] p-5 sm:p-6 shadow-card flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#3B82F6] via-[#38BDF8] to-[#10B981]" />
      <div className="min-w-0">
        <h1 className="superadmin-page-title text-primary">{t('ui.server_infrastructure_e8ce2ff')}</h1>
        <p className="mt-1 text-sm text-secondary">{t('ui.real_time_health_metrics_of_your_docker_kubernetes_c_c7cb1b3')}</p>
      </div>
      <div className="flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row sm:items-center shrink-0">
        <SearchableDropdown
          data-testid="superadmin_system_ops_infrastructure-superadmin-system-ops-infrastructure-header-superadmin_system_ops_infrastructure-header-SearchableDropdown-31"
          value={statusFilter}
          onChange={(v) => onStatusFilterChange(v as string)}
          options={options}
          className="w-full sm:w-44"
        />
        <button
          type="button"
          onClick={onRefresh}
          disabled={isRefreshing}
          className="min-h-10 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FF5A1F] to-[#F97316] hover:brightness-110 px-4 py-2 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(255,90,31,0.3)] disabled:opacity-50 motion-safe:transition-all motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
          data-testid="superadmin_system_ops_infrastructure-superadmin-system-ops-infrastructure-header-superadmin_system_ops_infrastructure-header-refresh"
        >
          <RefreshCcw size={16} strokeWidth={2.2} className={isRefreshing ? 'motion-safe:animate-spin' : ''} aria-hidden="true" />
          <span>{t('ui.force_sync_metrics_268d77a')}</span>
        </button>
      </div>
    </header>
  );
}
