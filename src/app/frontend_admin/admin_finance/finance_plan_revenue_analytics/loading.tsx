// RESPONSIBILITY: Renders the skeleton loading state for the Plan Revenue Dashboard.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_finance/finance_plan_revenue_analytics/loading.tsx)

import { getTranslations } from 'next-intl/server';
import { IndianRupee } from 'lucide-react';

/**
 * Loading is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
export default async function Loading() {
  const t = await getTranslations();
  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto motion-safe:animate-pulse motion-safe:duration-base" data-testid="admin_plans-admin_plans-revenue-loading-state">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-secondary flex items-center gap-2">
            <IndianRupee className="text-disabled" size={18}  strokeWidth={2}/>
            {t('plans.Loading.text_loading_plan_revenue')}
          </h1>
          <div className="h-4 bg-skeleton-base rounded w-64 mt-2" />
        </div>
        <div className="h-10 bg-skeleton-base rounded-xl w-64" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={`plans-revenue-skeleton-${i}`} className="h-24 bg-skeleton-base border border-border rounded-xl p-5" />
        ))}
      </div>

      <div className="h-64 bg-skeleton-base border border-border rounded-xl p-5" />
      <div className="h-64 bg-skeleton-base border border-border rounded-xl" />
    </div>
  );
}
