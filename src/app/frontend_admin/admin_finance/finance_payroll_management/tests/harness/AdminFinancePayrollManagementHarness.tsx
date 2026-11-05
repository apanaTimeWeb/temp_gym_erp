"use client";
import { useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/app/frontend_admin/admin_finance/finance_payroll_management/locales/admin_finance_payroll_management_en.json';
import FeaturePage from '@/app/frontend_admin/admin_finance/finance_payroll_management/page';
import { AdminNavigationLayoutConfirmProvider as AdminFinancePayrollManagementConfirmProvider } from '@/app/frontend_admin/admin_finance/finance_payroll_management/components/feedback/AdminFinancePayrollManagementConfirmProvider';

export default function AdminFinancePayrollManagementHarness({ children }: { children?: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({ defaultOptions: { queries: { retry: false, staleTime: 0 }, mutations: { retry: false } } }));
  return <NextIntlClientProvider locale="en" messages={messages as never}><QueryClientProvider client={queryClient}>{children ? <AdminFinancePayrollManagementConfirmProvider>{children}</AdminFinancePayrollManagementConfirmProvider> : <FeaturePage />}</QueryClientProvider></NextIntlClientProvider>;
}
