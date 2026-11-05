'use client';
import { useTranslations } from 'next-intl';

// RESPONSIBILITY: Renders ManagerDashboardOverviewSkeleton's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
/** @description Renders the ManagerDashboardOverviewSkeleton sub-view extracted from ManagerDashboardOverviewMain; owns only this presentation responsibility. @dependencies Local dependencies are owned by this feature module (0 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export function ManagerDashboardOverviewSkeleton() {
  const t = useTranslations('MANAGER_DASHBOARD');

  return (
    <div className="min-w-0 p-4 sm:p-6 space-y-6" role="status" aria-busy="true" aria-label={t('COPY_LOADING_DASHBOARD')}>
      <span className="sr-only">{t('COPY_LOADING_DASHBOARD')}</span>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => <div key={`skeleton-${i}`} className="min-w-0 min-h-28 h-28 bg-card rounded-xl motion-safe:animate-pulse border border-border" aria-hidden="true" />)}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => <div key={`skeleton-${i}`} className="min-w-0 min-h-28 h-28 bg-card rounded-xl motion-safe:animate-pulse border border-border" aria-hidden="true" />)}
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="min-w-0 xl:col-span-2 min-h-80 h-80 bg-card rounded-xl motion-safe:animate-pulse border border-border" aria-hidden="true" />
        <div className="space-y-4">
          <div className="min-w-0 min-h-48 h-48 bg-card rounded-xl motion-safe:animate-pulse border border-border" aria-hidden="true" />
          <div className="min-w-0 min-h-28 h-28 bg-card rounded-xl motion-safe:animate-pulse border border-border" aria-hidden="true" />
        </div>
      </div>
      <div className="min-w-0 min-h-40 h-40 bg-card rounded-xl motion-safe:animate-pulse border border-border" aria-hidden="true" />
    </div>
  );
}
