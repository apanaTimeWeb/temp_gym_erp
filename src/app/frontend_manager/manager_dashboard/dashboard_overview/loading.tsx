// RESPONSIBILITY: Renders the accessible skeleton loading fallback for the dashboard layout.
import { getTranslations } from 'next-intl/server';
/** @description Route-level DashboardLoading for the Manager frontend module. */
export default async function DashboardLoading() {
  const t = await getTranslations('MANAGER_DASHBOARD');
  return (
    <div role="status" aria-live="polite" aria-busy="true" aria-label={t('COPY_LOADING_DASHBOARD')} className="min-h-full p-6 space-y-6 bg-page">
      <span className="sr-only">{t('COPY_LOADING_DASHBOARD')}</span>
      {/* Header skeleton */}
      <div className="h-16 bg-skeleton-base bg-skeleton-highlight rounded-xl motion-safe:animate-pulse" aria-hidden="true" />

      {/* KPI row 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => (
          <div key={`skeleton-${i}`} className="h-28 bg-card rounded-xl motion-safe:animate-pulse border border-border motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:hover:-translate-y-1" />
        ))}
      </div>

      {/* KPI row 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => (
          <div key={`skeleton-${i}`} className="h-28 bg-card rounded-xl motion-safe:animate-pulse border border-border motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:hover:-translate-y-1" />
        ))}
      </div>

      {/* Main content area */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 h-80 bg-card rounded-xl motion-safe:animate-pulse border border-border motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:hover:-translate-y-1" />
        <div className="space-y-4">
          <div className="h-48 bg-card rounded-xl motion-safe:animate-pulse border border-border motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:hover:-translate-y-1" />
          <div className="h-28 bg-card rounded-xl motion-safe:animate-pulse border border-border motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:hover:-translate-y-1" />
        </div>
      </div>

      {/* Distribution */}
      <div className="h-40 bg-card rounded-xl motion-safe:animate-pulse border border-border motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:hover:-translate-y-1" />
    </div>
  );
}
