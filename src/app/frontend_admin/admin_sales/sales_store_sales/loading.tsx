// RESPONSIBILITY: Provides the implementation for loading.tsx functionality within its module.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_sales/sales_store_sales/loading.tsx)

import AdminNavigationLayoutTableSkeleton from '@/app/frontend_admin/admin_sales/sales_store_sales/components/AdminSalesStoreSalesTableSkeleton';
/**
 * Loading is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
export default function Loading() {
 return (
 <div className="min-h-screen flex flex-col p-6 space-y-5 bg-page" data-testid="admin_sales-loading-state">
 {/* Header Skeleton */}
 <div className="h-10 bg-skeleton-base motion-safe:animate-pulse rounded-md w-1/4 motion-safe:duration-base"></div>
 {/* Table Skeleton */}
 <AdminNavigationLayoutTableSkeleton rows={8} />
 </div>
 );
}
