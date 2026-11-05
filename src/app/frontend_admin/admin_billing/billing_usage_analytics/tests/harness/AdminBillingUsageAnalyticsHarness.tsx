'use client';
// RESPONSIBILITY: Defines regression tests for AdminBillingUsageAnalyticsHarness; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_usage/usage_analytics/tests/harness/AdminBillingUsageAnalyticsHarness.tsx)

/** Provider harness for isolated admin_usage/usage_analytics UI and component tests. */
import { useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/app/frontend_admin/admin_billing/billing_usage_analytics/locales/admin_billing_usage_analytics_en.json';
import { AdminNavigationLayoutConfirmProvider as AdminBillingLocalConfirmProvider } from '@/app/frontend_admin/admin_billing/billing_usage_analytics/components/feedback/AdminBillingUsageAnalyticsConfirmProvider';
import FeatureMain from '@/app/frontend_admin/admin_billing/billing_usage_analytics/components/main_view/AdminBillingUsageAnalyticsMain';

interface HarnessProps {
  children?: ReactNode;
}

export default function AdminBillingUsageAnalyticsHarness({ children }: HarnessProps) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime: 0 }, mutations: { retry: false } },
  }));
  return (
    <NextIntlClientProvider locale="en" messages={messages}>
      <QueryClientProvider client={queryClient}>
        <AdminBillingLocalConfirmProvider>{children ?? <FeatureMain />}</AdminBillingLocalConfirmProvider>
      </QueryClientProvider>
    </NextIntlClientProvider>
  );
}
