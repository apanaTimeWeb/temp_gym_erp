'use client';
// RESPONSIBILITY: Defines regression tests for AdminBillingPlansCatalogHarness; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_plans/plans_catalog/tests/harness/AdminBillingPlansCatalogHarness.tsx)

/** Provider harness for isolated admin_plans/plans_catalog UI and component tests. */
import { useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/app/frontend_admin/admin_billing/billing_plans_catalog/locales/admin_billing_plans_catalog_en.json';
import { AdminNavigationLayoutConfirmProvider } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/components/feedback/AdminBillingPlansCatalogConfirmProvider';
import FeatureMain from '@/app/frontend_admin/admin_billing/billing_plans_catalog/components/main_view/AdminBillingPlansCatalogMain';

interface HarnessProps {
  children?: ReactNode;
}

export default function AdminBillingPlansCatalogHarness({ children }: HarnessProps) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime: 0 }, mutations: { retry: false } },
  }));
  return (
    <NextIntlClientProvider locale="en" messages={messages}>
      <QueryClientProvider client={queryClient}>
        <AdminNavigationLayoutConfirmProvider>{children ?? <FeatureMain />}</AdminNavigationLayoutConfirmProvider>
      </QueryClientProvider>
    </NextIntlClientProvider>
  );
}
