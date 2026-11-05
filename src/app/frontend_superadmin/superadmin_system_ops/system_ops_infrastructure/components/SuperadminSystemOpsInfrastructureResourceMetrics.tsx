// RESPONSIBILITY: Renders/orchestrates SuperadminSystemOpsInfrastructureResourceMetrics within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders CPU, RAM, and storage resource KPI cards from already-derived infrastructure metrics.
import { Cpu, HardDrive, Server } from 'lucide-react';
import { useTranslations } from 'next-intl';

import ProgressBar from '@/components/ui/ProgressBar';

import type { SuperadminSystemOpsInfrastructureResourceMetricsProps } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/types/superadmin_system_ops_infrastructure_resource_metrics.types';



/**
 * @description Displays resource utilization KPIs using semantic theme tokens and the shared progress primitive.
 * @dependencies Receives only derived numeric values from the infrastructure view model.
 * @edge-case Missing node coverage is represented by the owning view-model counts rather than invented fallback data.
 */
export default function SuperadminSystemOpsInfrastructureResourceMetrics({ withCpuCount, withMemCount, withDiskCount, avgCpu, avgMem, avgDisk }: SuperadminSystemOpsInfrastructureResourceMetricsProps) {
  const t = useTranslations('superadmin_system_ops_infrastructure');
  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-3" aria-label={t('ui.server_infrastructure_e8ce2ff')}>
      <article className="relative overflow-hidden rounded-xl border border-border bg-card p-6 shadow-card">
        <div className="absolute end-0 top-0 h-32 w-32 rounded-es-xl bg-primary-subtle motion-safe:transition-colors" aria-hidden="true" />
        <div className="relative">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-lg bg-primary-subtle p-2 text-primary"><Cpu size={18} strokeWidth={2} aria-hidden="true" /></div>
            <h2 className="text-lg font-bold text-primary">{t('ui.cpu_usage_5dff621')}</h2>
          </div>
          <div className="mb-2 flex items-end gap-2"><span className="text-4xl font-extrabold text-primary">{avgCpu ?? '—'}</span><span className="text-xl font-medium text-secondary">{t('ui.text_0bcef9c4')}</span></div>
          {avgCpu !== null ? <div className="h-2 w-full overflow-hidden rounded-full bg-floating"><ProgressBar value={avgCpu} label="" data-testid="superadmin-system-ops-superadmin-system-ops-infrastructure-resource-metrics-progress-bar-1"/></div> : <p className="text-xs text-secondary">{t('ui.telemetry_unavailable')}</p>}
          <p className="mt-3 text-xs text-secondary">{t('ui.avg_load_across_3073662')} {withCpuCount} {t('ui.compute_nodes_ef7efb4')}</p>
        </div>
      </article>

      <article className="relative overflow-hidden rounded-xl border border-border bg-card p-6 shadow-card">
        <div className="absolute end-0 top-0 h-32 w-32 rounded-es-xl bg-warning-bg motion-safe:transition-colors" aria-hidden="true" />
        <div className="relative">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-lg bg-warning-bg p-2 text-warning"><Server size={18} strokeWidth={2} aria-hidden="true" /></div>
            <h2 className="text-lg font-bold text-primary">{t('ui.memory_ram_67d2d61')}</h2>
          </div>
          <div className="mb-2 flex items-end gap-2"><span className={`text-4xl font-extrabold ${avgMem !== null && avgMem > 80 ? 'text-warning' : 'text-primary'}`}>{avgMem ?? '—'}</span><span className="text-xl font-medium text-secondary">{t('ui.text_0bcef9c4')}</span></div>
          {avgMem !== null ? <div className="h-2 w-full overflow-hidden rounded-full bg-floating"><ProgressBar value={avgMem} label="" data-testid="superadmin-system-ops-superadmin-system-ops-infrastructure-resource-metrics-progress-bar-2"/></div> : <p className="text-xs text-secondary">{t('ui.telemetry_unavailable')}</p>}
          <p className="mt-3 text-xs text-secondary">{t('ui.avg_memory_across_e04817e')} {withMemCount} {t('ui.nodes_9928f23')} {avgMem !== null && avgMem > 80 ? t('ui.high_load_8b43830') : ''}</p>
        </div>
      </article>

      <article className="relative overflow-hidden rounded-xl border border-border bg-card p-6 shadow-card">
        <div className="absolute end-0 top-0 h-32 w-32 rounded-es-xl bg-success-bg motion-safe:transition-colors" aria-hidden="true" />
        <div className="relative">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-lg bg-success-bg p-2 text-success"><HardDrive size={18} strokeWidth={2} aria-hidden="true" /></div>
            <h2 className="text-lg font-bold text-primary">{t('ui.storage_ssd_7e5e486')}</h2>
          </div>
          <div className="mb-2 flex items-end gap-2"><span className="text-4xl font-extrabold text-primary">{avgDisk ?? '—'}</span><span className="text-xl font-medium text-secondary">{t('ui.text_0bcef9c4')}</span></div>
          {avgDisk !== null ? <div className="h-2 w-full overflow-hidden rounded-full bg-floating"><ProgressBar value={avgDisk} label="" data-testid="superadmin-system-ops-superadmin-system-ops-infrastructure-resource-metrics-progress-bar-3"/></div> : <p className="text-xs text-secondary">{t('ui.telemetry_unavailable')}</p>}
          <p className="mt-3 text-xs text-secondary">{t('ui.avg_across_ff23f78')} {withDiskCount} {t('ui.storage_volumes_11758e0')}</p>
        </div>
      </article>
    </section>
  );
}
