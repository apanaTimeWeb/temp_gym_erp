// RESPONSIBILITY: Next.js loading.tsx � renders skeleton loader fallback while HR & Payroll module data loads.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_finance/finance_payroll_management/loading.tsx)

import AdminNavigationLayoutTableSkeleton from '@/app/frontend_admin/admin_finance/finance_payroll_management/components/AdminFinancePayrollManagementTableSkeleton';

/**
 * HrLoading is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
export default function FinancePayrollLoading() {
 return (
  <div className="p-6" data-testid="admin_hr-loading-state">
    <div className="h-10 w-48 bg-skeleton-base rounded-lg mb-6 motion-safe:animate-pulse motion-safe:duration-base"></div>
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={`hr-skeleton-${i}`} className="h-24 bg-skeleton-base rounded-xl border border-border motion-safe:animate-pulse motion-safe:duration-base"></div>
      ))}
    </div>
    <AdminNavigationLayoutTableSkeleton cols={9} rows={6} />
  </div>
 );
}
