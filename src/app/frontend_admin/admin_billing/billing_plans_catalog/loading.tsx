// RESPONSIBILITY: Provides the implementation for loading.tsx functionality within its module.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_plans/plans_catalog/loading.tsx)

import AdminNavigationLayoutTableSkeleton from '@/app/frontend_admin/admin_billing/billing_plans_catalog/components/AdminBillingPlansCatalogTableSkeleton';
/**
 * Loading is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
export default function Loading() {
 return (
 <div className="min-h-screen flex flex-col p-6 space-y-5 bg-page" data-testid="admin_plans-loading-state">
 <div className="h-20 bg-skeleton-base rounded-xl motion-safe:animate-pulse motion-safe:duration-base"></div>
 <AdminNavigationLayoutTableSkeleton rows={8} />
 
 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
 {["row-1", "row-2", "row-3"].map(i => (
 <div key={`plans-skeleton-${i}`} className="h-96 bg-skeleton-base rounded-2xl motion-safe:animate-pulse motion-safe:duration-base"></div>
 ))}
 </div>
 </div>
 );
}

