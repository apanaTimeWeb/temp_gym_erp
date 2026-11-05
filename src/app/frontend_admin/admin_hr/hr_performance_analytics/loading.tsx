// RESPONSIBILITY: Renders the skeleton loading state for the Staff Performance Dashboard.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_hr/hr_performance_analytics/loading.tsx)

import { useTranslations } from 'next-intl';

/**
 * Loading is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
export default function Loading() {
  const t = useTranslations('hr.admin_hr_performance');
  return (
    <div role="status" aria-live="polite" aria-busy="true" className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto motion-safe:animate-pulse motion-safe:duration-base" data-testid="admin_hr-admin_hr-performance-loading-state">
      <span className="sr-only">{t('loadingStatus')}</span>
      <div aria-hidden="true" className="flex justify-between items-center">
        <div>
          <div className="h-8 w-48 bg-skeleton-base rounded-lg mb-2"></div>
          <div className="h-4 w-64 bg-skeleton-base rounded-lg"></div>
        </div>
        <div className="h-10 w-64 bg-skeleton-base rounded-lg"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={`hr-performance-skeleton-${i}`} className="h-24 bg-skeleton-base border border-border rounded-xl"></div>
        ))}
      </div>
      <div className="h-64 bg-skeleton-base border border-border rounded-xl"></div>
    </div>
  );
}
