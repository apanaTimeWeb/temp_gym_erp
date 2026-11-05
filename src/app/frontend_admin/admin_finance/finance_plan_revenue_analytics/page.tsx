// RESPONSIBILITY: Entry point for the Admin Plan Revenue Dashboard route.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_finance/finance_plan_revenue_analytics/page.tsx)

import AdminPlansRevenue from '@/app/frontend_admin/admin_finance/finance_plan_revenue_analytics/components/main_view/AdminFinancePlanRevenueAnalytics';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('plans.metadata');
  return { title: t('title'), description: t('description') };
}

/**
 * AdminPlanRevenuePage renders the admin plan revenue page UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 */
export default function AdminPlanRevenuePage() {
  return (
      <AdminPlansRevenue />
  );
}
