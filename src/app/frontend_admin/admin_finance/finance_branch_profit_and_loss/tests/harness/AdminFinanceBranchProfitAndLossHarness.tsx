'use client';
// RESPONSIBILITY: Defines regression tests for AdminFinanceBranchProfitAndLossHarness; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_finance/finance_branch_profit_and_loss/tests/harness/AdminFinanceBranchProfitAndLossHarness.tsx)

/** Provider harness for isolated admin_finance/finance_branch_profit_and_loss UI and component tests. */
import { useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/locales/admin_finance_branch_profit_and_loss_en.json';
import FeatureMain from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/components/main_view/AdminFinanceBranchProfitAndLoss';

interface HarnessProps {
  children?: ReactNode;
}

export default function AdminFinanceBranchProfitAndLossHarness({ children }: HarnessProps) {
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
