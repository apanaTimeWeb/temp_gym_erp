// RESPONSIBILITY: Renders Superadmin System Ops Infrastructure Redis Telemetry Section using its declared props and feature-local hooks.
'use client';

import { useTranslations } from 'next-intl';

import SuperadminSystemOpsInfrastructureRedisTelemetry from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/components/SuperadminSystemOpsInfrastructureRedisTelemetry';

import type { SuperadminSystemOpsInfrastructureRedisTelemetrySectionProps } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/types/superadmin_system_ops_infrastructure_redis_telemetry_section.types';

/**
 * @description Renders the Superadmin system ops infrastructure redis telemetry section interface within its owning Superadmin feature using the declared typed props.
 * @dependencies Consumes the component props and local imports listed in this file; domain logic must remain in the owning feature module.
 * @edge-case Keep null/empty data safe, expose validation or error feedback where applicable, and preserve keyboard/focus and repeated-action behavior.
 */
export default function SuperadminSystemOpsInfrastructureRedisTelemetrySection({ isPending, isError, telemetry, onRetry }: SuperadminSystemOpsInfrastructureRedisTelemetrySectionProps) {
  const t = useTranslations('superadmin_system_ops_infrastructure');
  if (isPending) return <section className="rounded-xl border border-border bg-card p-6" aria-busy="true" role="status"><h2 className="font-semibold text-primary">{t('ui.redis_telemetry_loading')}</h2><div className="mt-4 h-28 rounded-lg bg-skeleton-base motion-safe:animate-pulse" /></section>;
  if (isError) return <section className="flex flex-col items-start gap-3 rounded-xl border border-border bg-danger-bg p-6" role="alert"><h2 className="font-semibold text-danger">{t('ui.redis_telemetry_error')}</h2><button type="button" onClick={onRetry} className="min-h-11 rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">{t('ui.retry')}</button></section>;
  if (!telemetry) return <section className="rounded-xl border border-border bg-card p-6" role="status"><h2 className="font-semibold text-primary">{t('ui.redis_telemetry_unavailable')}</h2></section>;
  return <SuperadminSystemOpsInfrastructureRedisTelemetry telemetry={telemetry} />;
}
