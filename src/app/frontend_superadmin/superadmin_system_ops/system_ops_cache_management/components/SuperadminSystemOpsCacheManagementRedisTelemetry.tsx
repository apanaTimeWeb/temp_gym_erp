// RESPONSIBILITY: Renders/orchestrates SuperadminSystemOpsCacheManagementRedisTelemetry within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders Redis memory, cache-hit-ratio, and cached-key telemetry from the module query response.
import { RefreshCcw, Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';

import ProgressBar from '@/components/ui/ProgressBar';

import { formatNumber } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_cache_management/utils/SuperadminSystemOpsCacheManagementFormatters';

import type { SuperadminSystemOpsCacheManagementRedisTelemetryProps } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_cache_management/types/superadmin_system_ops_cache_management_redis_telemetry.types';



/**
 * @description Displays Redis telemetry cards from a validated server-state payload.
 * @dependencies Consumes only the module-owned RedisTelemetry type and formatter plus the shared ProgressBar primitive.
 * @edge-case A failed Redis section must be isolated by the parent error boundary without taking down node metrics or controls.
 */
export default function SuperadminSystemOpsCacheManagementRedisTelemetry({ telemetry }: SuperadminSystemOpsCacheManagementRedisTelemetryProps) {
  const t = useTranslations('superadmin_system_ops_cache_management');
  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-3" aria-labelledby="superadmin-infrastructure-redis-telemetry-title">
      <h2 id="superadmin-infrastructure-redis-telemetry-title" className="sr-only">{t('ui.redis_memory_305ac31')}</h2>
      <article className="rounded-xl border border-border bg-card p-6 shadow-card">
        <div className="mb-6 flex items-center gap-3"><div className="rounded-lg bg-primary-subtle p-2 text-primary"><Zap size={18} strokeWidth={2} aria-hidden="true" /></div><h3 className="text-lg font-bold text-primary">{t('ui.redis_memory_305ac31')}</h3></div>
        <div className="mb-2 flex items-end gap-2"><span className="text-4xl font-extrabold text-primary">{telemetry.memoryUsagePercent}</span><span className="text-xl font-medium text-secondary">{t('ui.text_0bcef9c4')}</span></div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-floating"><ProgressBar value={telemetry.memoryUsagePercent} label=""  data-testid="superadmin-system-ops-superadmin-system-ops-infrastructure-redis-telemetry-progress-bar-1"/></div>
        <p className="mt-3 text-xs text-secondary">{t('ui.redis_cache_memory_usage_285eb97')}</p>
      </article>
      <article className="rounded-xl border border-border bg-card p-6 shadow-card">
        <div className="mb-6 flex items-center gap-3"><div className="rounded-lg bg-success-bg p-2 text-success"><RefreshCcw size={18} strokeWidth={2} aria-hidden="true" /></div><h3 className="text-lg font-bold text-primary">{t('ui.cache_hit_ratio_a08888e')}</h3></div>
        <div className="mb-2 flex items-end gap-2"><span className="text-4xl font-extrabold text-primary">{telemetry.hitRatioPercent}</span><span className="text-xl font-medium text-secondary">{t('ui.text_0bcef9c4')}</span></div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-floating"><ProgressBar value={telemetry.hitRatioPercent} label=""  data-testid="superadmin-system-ops-superadmin-system-ops-infrastructure-redis-telemetry-progress-bar-2"/></div>
        <p className="mt-3 text-xs text-secondary">{t('ui.requests_served_from_cache_vs_db_0931ca3')}</p>
      </article>
      <article className="flex flex-col justify-center rounded-xl border border-border bg-card p-6 shadow-card">
        <h3 className="text-lg font-bold text-primary">{t('ui.cached_keys_cf8eca6')}</h3>
        <div className="mt-2 flex items-end gap-2"><span className="text-4xl font-extrabold text-primary">{formatNumber(telemetry.totalKeysCached)}</span></div>
        <p className="mt-3 text-xs text-secondary">{t('ui.uptime_0a7e1cf')} {telemetry.uptimeHours} {t('ui.hours_1a9714a')}</p>
      </article>
    </section>
  );
}
