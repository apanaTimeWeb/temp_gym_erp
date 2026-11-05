// RESPONSIBILITY: Server component page for Admin Usage & Subscription.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_usage/usage_analytics/page.tsx)

import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import AdminUsageMain from '@/app/frontend_admin/admin_billing/billing_usage_analytics/components/main_view/AdminBillingUsageAnalyticsMain';
import { AdminNavigationLayoutConfirmProvider as AdminBillingLocalConfirmProvider } from '@/app/frontend_admin/admin_billing/billing_usage_analytics/components/feedback/AdminBillingUsageAnalyticsConfirmProvider';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('usage.metadata');
  return { title: t('title'), description: t('description') };
}

/**
 * AdminUsagePage renders the admin usage page UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 */
export default function AdminUsagePage() {
  return (
      <AdminBillingLocalConfirmProvider><AdminUsageMain /></AdminBillingLocalConfirmProvider>
  );
}
