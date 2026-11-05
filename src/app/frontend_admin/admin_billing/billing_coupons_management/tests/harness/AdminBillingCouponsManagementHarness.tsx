'use client';
// RESPONSIBILITY: Defines regression tests for AdminBillingCouponsManagementHarness; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_coupons/coupons_management/tests/harness/AdminBillingCouponsManagementHarness.tsx)

/** Provider harness for isolated admin_coupons/coupons_management UI and component tests. */
import { useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/app/frontend_admin/admin_billing/billing_coupons_management/locales/admin_billing_coupons_management_en.json';
import FeatureMain from '@/app/frontend_admin/admin_billing/billing_coupons_management/components/main_view/AdminBillingCouponsManagementMain';
import { AdminNavigationLayoutConfirmProvider } from '@/app/frontend_admin/admin_billing/billing_coupons_management/components/feedback/AdminBillingCouponsManagementConfirmProvider';

interface HarnessProps {
  children?: ReactNode;
}

export default function AdminBillingCouponsManagementHarness({ children }: HarnessProps) {
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
