// RESPONSIBILITY: Renders and orchestrates SuperadminSystemOpsInfrastructureMain for the owning Superadmin feature module; presentation stays free of direct API calls.
'use client';
import Link from 'next/link';

import { SuperadminSystemOpsInfrastructureErrorBoundary } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/components/SuperadminSystemOpsInfrastructureErrorBoundary';
import SuperadminSystemOpsInfrastructureFlushTenantModal from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/components/SuperadminSystemOpsInfrastructureFlushTenantModal';
import SuperadminSystemOpsInfrastructureHeader from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/components/SuperadminSystemOpsInfrastructureHeader';
import SuperadminSystemOpsInfrastructureRedisControls from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/components/SuperadminSystemOpsInfrastructureRedisControls';
import SuperadminSystemOpsInfrastructureRedisTelemetrySection from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/components/SuperadminSystemOpsInfrastructureRedisTelemetrySection';
import SuperadminSystemOpsInfrastructureResourceMetrics from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/components/SuperadminSystemOpsInfrastructureResourceMetrics';
import SuperadminSystemOpsInfrastructureUptimeChart from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/components/SuperadminSystemOpsInfrastructureUptimeChart';
import { SUPERADMIN_SYSTEM_OPS_INFRASTRUCTURE_ROUTES } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/config/superadmin_system_ops_infrastructure.url_config';
import { useSuperadminSystemOpsInfrastructureMainViewModel } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/hooks/useSuperadminSystemOpsInfrastructureMainViewModel';


/**
 * RESPONSIBILITY: React component SuperadminSystemOpsInfrastructureMain owned by the superadmin_system_ops_infrastructure feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: Imported hook APIs: useSuperadminSystemOpsInfrastructureMainViewModel.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/components/SuperadminSystemOpsInfrastructureErrorBoundary, @/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/components/SuperadminSystemOpsInfrastructureHeader, @/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/components/SuperadminSystemOpsInfrastructureRedisControls, @/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/components/SuperadminSystemOpsInfrastructureRedisTelemetrySection, @/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/components/SuperadminSystemOpsInfrastructureResourceMetrics, @/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/components/SuperadminSystemOpsInfrastructureUptimeChart, @/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/components/SuperadminSystemOpsInfrastructureFlushTenantModal, @/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/hooks/useSuperadminSystemOpsInfrastructureMainViewModel
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Composes the infrastructure page sections from the feature-owned view-model; contains no API, mutation, toast, confirmation, or business calculation logic.


/**
 * @description Composes the infrastructure page sections from the feature-owned view-model; contains no API, mutation, toast, confirmation, or business calculation logic.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
/**
 * @description Renders SystemOpsInfrastructureView within the owning Superadmin feature module.
 * @dependencies Uses only dependencies declared in this module file and documented feature infrastructure.
 * @edge-case Preserves documented loading, empty, error, disabled, retry, and repeated-action behavior.
 */
export default function SuperadminSystemOpsInfrastructureMain() {
  const vm = useSuperadminSystemOpsInfrastructureMainViewModel();

  if (vm.isPendingNodes && vm.nodes.length === 0) {
    return (
      <div className="space-y-6" data-testid="superadmin_system_ops_infrastructure-superadmin-system-ops-infrastructure-main-superadmin_system_ops_infrastructure-infrastructure-main-loading">
        <div className="h-10 w-64 rounded-xl bg-skeleton-base motion-safe:animate-pulse" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[1, 2, 3].map((item) => <div key={`skeleton-${item}`} className="h-40 rounded-xl border border-border bg-skeleton-base motion-safe:animate-pulse" />)}
        </div>
      </div>
    );
  }

  if (vm.isErrorNodes) {
    return (
      <div className="flex h-96 flex-col items-center justify-center gap-4 text-danger" data-testid="superadmin_system_ops_infrastructure-superadmin-system-ops-infrastructure-main-superadmin_system_ops_infrastructure-infrastructure-error">
        <p className="font-medium">{vm.t('ui.unable_to_load_infrastructure')}</p>
        <button type="button" onClick={() => void vm.refetchNodes()} className="min-h-11 rounded-lg border border-border bg-card px-4 py-2 font-medium text-primary hover:bg-surface-hover motion-safe:transition-colors motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_system_ops_infrastructure-superadmin-system-ops-infrastructure-main-superadmin_system_ops_infrastructure-infrastructure-retry">{vm.t('ui.retry')}</button>
      </div>
    );
  }

  return (
    <div className="space-y-6" data-testid="superadmin_system_ops_infrastructure-superadmin-system-ops-infrastructure-main-page">
      <SuperadminSystemOpsInfrastructureHeader statusFilter={vm.statusFilter} options={vm.statusOptions} isRefreshing={vm.isFetchingNodes || vm.isFetchingRedis} onStatusFilterChange={vm.setStatusFilter} onRefresh={() => { void vm.refetchNodes(); void vm.refetchRedis(); }} />
      <Link href={SUPERADMIN_SYSTEM_OPS_INFRASTRUCTURE_ROUTES.CACHE} className="inline-flex min-h-11 items-center underline text-primary focus-visible:ring-2 focus-visible:ring-primary">{vm.t('ui.redis_cache_telemetry')}</Link>
      <SuperadminSystemOpsInfrastructureResourceMetrics withCpuCount={vm.metrics.withCpuCount} withMemCount={vm.metrics.withMemCount} withDiskCount={vm.metrics.withDiskCount} avgCpu={vm.metrics.avgCpu} avgMem={vm.metrics.avgMem} avgDisk={vm.metrics.avgDisk} />
      <SuperadminSystemOpsInfrastructureErrorBoundary variant="inline"><SuperadminSystemOpsInfrastructureUptimeChart /></SuperadminSystemOpsInfrastructureErrorBoundary>
    </div>
  );
}
