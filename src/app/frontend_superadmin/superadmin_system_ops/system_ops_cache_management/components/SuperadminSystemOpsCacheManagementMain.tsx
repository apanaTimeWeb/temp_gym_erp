// RESPONSIBILITY: Composes the independently refreshable cache telemetry and confirmed flush workflow.
"use client";
import FlushModal from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_cache_management/components/SuperadminSystemOpsCacheManagementFlushTenantModal';
import RedisControls from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_cache_management/components/SuperadminSystemOpsCacheManagementRedisControls';
import RedisTelemetry from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_cache_management/components/SuperadminSystemOpsCacheManagementRedisTelemetrySection';
import { useSuperadminSystemOpsCacheManagementMainViewModel } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_cache_management/hooks/useSuperadminSystemOpsCacheManagementMainViewModel';

export default function SuperadminSystemOpsCacheManagementMain() {
  const vm = useSuperadminSystemOpsCacheManagementMainViewModel();
  return (
    <section className="space-y-5">
      <header className="relative overflow-hidden rounded-2xl border border-blue-500/35 bg-card dark:bg-gradient-to-br dark:from-[#0E2438] dark:via-[#12192B] dark:to-[#0C1322] p-5 sm:p-6 shadow-card">
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#3B82F6] via-[#38BDF8] to-[#10B981]" />
        <h1 className="superadmin-page-title text-primary">{vm.t('ui.redis_cache_telemetry')}</h1>
      </header>
      <RedisTelemetry isPending={vm.isPendingRedis} isError={vm.isErrorRedis} telemetry={vm.redisTelemetry} onRetry={() => void vm.refetchRedis()} />
      <RedisControls isFlushingGlobal={vm.isFlushingGlobal} onFlushAll={vm.handleFlushAll} onOpenTenantFlush={vm.openFlushModal} />
      <FlushModal isOpen={vm.isFlushModalOpen} onClose={vm.closeFlushModal} onFlush={vm.handleFlushSpecific} />
    </section>
  );
}
