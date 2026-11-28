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
      <article className="relative overflow-hidden rounded-2xl border border-border dark:border-blue-500/30 bg-card dark:bg-gradient-to-br dark:from-[#121B2F] dark:to-[#0C1220] p-6 shadow-card">
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#3B82F6] via-[#60A5FA] to-transparent" aria-hidden="true" />
        <div className="relative">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-blue-500/15 border border-blue-500/30 p-2 text-blue-400"><Cpu size={18} strokeWidth={2} aria-hidden="true" /></div>
            <h2 className="text-lg font-bold text-primary">{t('ui.cpu_usage_5dff621')}</h2>
          </div>
          <div className="mb-2 flex items-end gap-2 tabular-nums"><span className="text-4xl font-extrabold text-primary">{avgCpu ?? '—'}</span><span className="text-xl font-medium text-secondary">{t('ui.text_0bcef9c4')}</span></div>
          {avgCpu !== null ? <div className="h-2 w-full overflow-hidden rounded-full bg-floating"><ProgressBar value={avgCpu} label="" data-testid="superadmin-system-ops-superadmin-system-ops-infrastructure-resource-metrics-progress-bar-1"/></div> : <p className="text-xs text-secondary">{t('ui.telemetry_unavailable')}</p>}
          <p className="mt-3 text-xs text-secondary">{t('ui.avg_load_across_3073662')} {withCpuCount} {t('ui.compute_nodes_ef7efb4')}</p>
        </div>
      </article>

      <article className="relative overflow-hidden rounded-2xl border border-border dark:border-amber-500/30 bg-card dark:bg-gradient-to-br dark:from-[#121B2F] dark:to-[#0C1220] p-6 shadow-card">
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#F59E0B] via-[#FBBF24] to-transparent" aria-hidden="true" />
        <div className="relative">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-amber-500/15 border border-amber-500/30 p-2 text-amber-400"><Server size={18} strokeWidth={2} aria-hidden="true" /></div>
            <h2 className="text-lg font-bold text-primary">{t('ui.memory_ram_67d2d61')}</h2>
          </div>
          <div className="mb-2 flex items-end gap-2 tabular-nums"><span className={`text-4xl font-extrabold ${avgMem !== null && avgMem > 80 ? 'text-warning' : 'text-primary'}`}>{avgMem ?? '—'}</span><span className="text-xl font-medium text-secondary">{t('ui.text_0bcef9c4')}</span></div>
          {avgMem !== null ? <div className="h-2 w-full overflow-hidden rounded-full bg-floating"><ProgressBar value={avgMem} label="" data-testid="superadmin-system-ops-superadmin-system-ops-infrastructure-resource-metrics-progress-bar-2"/></div> : <p className="text-xs text-secondary">{t('ui.telemetry_unavailable')}</p>}
          <p className="mt-3 text-xs text-secondary">{t('ui.avg_memory_across_e04817e')} {withMemCount} {t('ui.nodes_9928f23')} {avgMem !== null && avgMem > 80 ? t('ui.high_load_8b43830') : ''}</p>
        </div>
      </article>

      <article className="relative overflow-hidden rounded-2xl border border-border dark:border-emerald-500/30 bg-card dark:bg-gradient-to-br dark:from-[#121B2F] dark:to-[#0C1220] p-6 shadow-card">
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#10B981] via-[#34D399] to-transparent" aria-hidden="true" />
        <div className="relative">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-emerald-500/15 border border-emerald-500/30 p-2 text-emerald-400"><HardDrive size={18} strokeWidth={2} aria-hidden="true" /></div>
            <h2 className="text-lg font-bold text-primary">{t('ui.storage_ssd_7e5e486')}</h2>
          </div>
          <div className="mb-2 flex items-end gap-2 tabular-nums"><span className="text-4xl font-extrabold text-primary">{avgDisk ?? '—'}</span><span className="text-xl font-medium text-secondary">{t('ui.text_0bcef9c4')}</span></div>
          {avgDisk !== null ? <div className="h-2 w-full overflow-hidden rounded-full bg-floating"><ProgressBar value={avgDisk} label="" data-testid="superadmin-system-ops-superadmin-system-ops-infrastructure-resource-metrics-progress-bar-3"/></div> : <p className="text-xs text-secondary">{t('ui.telemetry_unavailable')}</p>}
          <p className="mt-3 text-xs text-secondary">{t('ui.avg_across_ff23f78')} {withDiskCount} {t('ui.storage_volumes_11758e0')}</p>
        </div>
      </article>
    </section>
  );
}
