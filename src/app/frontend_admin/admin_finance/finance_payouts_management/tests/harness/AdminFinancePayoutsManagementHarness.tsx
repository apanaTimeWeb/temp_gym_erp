'use client';
// RESPONSIBILITY: Defines regression tests for AdminFinancePayoutsManagementHarness; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_finance/finance_payouts_management/tests/harness/AdminFinancePayoutsManagementHarness.tsx)

/** Provider harness for isolated admin_finance/finance_payouts_management UI and component tests. */
import { useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/app/frontend_admin/admin_finance/finance_payouts_management/locales/admin_finance_payouts_management_en.json';
import FeatureMain from '@/app/frontend_admin/admin_finance/finance_payouts_management/components/main_view/AdminFinancePayoutsManagementMain';

interface HarnessProps {
  children?: ReactNode;
}

export default function AdminFinancePayoutsManagementHarness({ children }: HarnessProps) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime: 0 }, mutations: { retry: false } },
  }));
  return (
    <NextIntlClientProvider locale="en" messages={messages}>
      <QueryClientProvider client={queryClient}>
        {children ?? <FeatureMain />}
      </QueryClientProvider>
    </NextIntlClientProvider>
  );
}
