// RESPONSIBILITY: Composes the independently refreshable cache telemetry and confirmed flush workflow.
"use client";
import FlushModal from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_cache_management/components/SuperadminSystemOpsCacheManagementFlushTenantModal';
import RedisControls from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_cache_management/components/SuperadminSystemOpsCacheManagementRedisControls';
import RedisTelemetry from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_cache_management/components/SuperadminSystemOpsCacheManagementRedisTelemetrySection';
import { useSuperadminSystemOpsCacheManagementMainViewModel } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_cache_management/hooks/useSuperadminSystemOpsCacheManagementMainViewModel';


/** Owns only the cache workspace view; queries and confirmed mutations stay in the local lifecycle hook. */
export default function SuperadminSystemOpsCacheManagementMain() {
 const vm = useSuperadminSystemOpsCacheManagementMainViewModel();
 return <section className="space-y-6">
  <h1 className="text-2xl font-bold text-primary">{vm.t('ui.redis_cache_telemetry')}</h1>
  <RedisTelemetry isPending={vm.isPendingRedis} isError={vm.isErrorRedis} telemetry={vm.redisTelemetry} onRetry={() => void vm.refetchRedis()} />
  <RedisControls isFlushingGlobal={vm.isFlushingGlobal} onFlushAll={vm.handleFlushAll} onOpenTenantFlush={vm.openFlushModal} />
  <FlushModal isOpen={vm.isFlushModalOpen} onClose={vm.closeFlushModal} onFlush={vm.handleFlushSpecific} />
 </section>;
}
