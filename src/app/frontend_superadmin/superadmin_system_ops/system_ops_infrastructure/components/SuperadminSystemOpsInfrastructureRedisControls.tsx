// RESPONSIBILITY: Renders/orchestrates SuperadminSystemOpsInfrastructureRedisControls within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders global and tenant-specific Redis flush actions and delegates mutation intent to the module orchestrator.
import { Loader2, Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';

import type { SuperadminSystemOpsInfrastructureRedisControlsProps } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/types/superadmin_system_ops_infrastructure_redis_controls.types';



/**
 * @description Presents the critical Redis cache controls without owning confirmation, API calls, or tenant state.
 * @dependencies Receives mutation intents from the feature orchestrator and uses module-local translations.
 * @edge-case Global flush remains disabled while pending; destructive confirmation happens before the mutation boundary.
 */
export default function SuperadminSystemOpsInfrastructureRedisControls({ isFlushingGlobal, onFlushAll, onOpenTenantFlush }: SuperadminSystemOpsInfrastructureRedisControlsProps) {
  const t = useTranslations('superadmin_system_ops_infrastructure');
  return (
    <section className="rounded-xl border border-border bg-card p-6 shadow-card" aria-labelledby="superadmin-infrastructure-redis-controls-title">
      <div className="mb-4 flex items-center gap-2"><Zap size={18} strokeWidth={2} className="text-primary" aria-hidden="true" /><h2 id="superadmin-infrastructure-redis-controls-title" className="text-xl font-bold text-primary">{t('ui.redis_cache_global_control_29dcd6d')}</h2></div>
      <p className="mb-6 text-sm text-secondary">{t('ui.the_saas_platform_uses_redis_to_cache_massive_multi__8193c5c')}</p>
      <div className="flex flex-col gap-4 sm:flex-row">
        <button type="button" data-testid="superadmin_system_ops_infrastructure-superadmin-system-ops-infrastructure-redis-controls-redis-controls-flush-all" onClick={() => void onFlushAll()} disabled={isFlushingGlobal} className="min-h-11 flex min-w-44 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-medium text-on-primary hover:bg-primary-hover disabled:opacity-50 motion-safe:transition-opacity motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">
          {isFlushingGlobal ? <Loader2 size={18} strokeWidth={2} className="motion-safe:animate-spin" aria-hidden="true" /> : null}
          {t('ui.flush_all_tenants_2aa0c05')}
        </button>
        <button type="button" onClick={onOpenTenantFlush} className="min-h-11 flex min-w-44 items-center justify-center gap-2 rounded-lg border border-border bg-transparent px-5 py-2.5 font-medium text-primary hover:bg-surface-hover motion-safe:transition-colors motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_system_ops_infrastructure-superadmin-system-ops-infrastructure-redis-controls-redis-controls-flush-tenant">
          {t('ui.flush_specific_tenant_7d43c74')}
        </button>
      </div>
    </section>
  );
}
