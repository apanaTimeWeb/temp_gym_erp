// RESPONSIBILITY: Provides the implementation for loading.tsx functionality within its module.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_finance/finance_expenses/loading.tsx)

import AdminNavigationLayoutTableSkeleton from '@/app/frontend_admin/admin_finance/finance_expenses/components/AdminFinanceExpensesTableSkeleton';

/**
 * FinanceLoading is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
export default function FinanceLoading() {
 return (
  <div className="p-6" data-testid="admin_finance-loading-state">
    <div className="h-10 w-48 bg-skeleton-base rounded-lg mb-6 motion-safe:animate-pulse motion-safe:duration-base"></div>
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={`finance-skeleton-${i}`} className="h-24 bg-skeleton-base rounded-xl border border-border motion-safe:animate-pulse motion-safe:duration-base"></div>
      ))}
    </div>
    <AdminNavigationLayoutTableSkeleton cols={6} rows={6} />
  </div>
 );
}
