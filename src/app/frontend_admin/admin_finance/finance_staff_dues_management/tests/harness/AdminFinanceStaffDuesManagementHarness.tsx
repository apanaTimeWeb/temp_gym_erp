"use client";
import { useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/app/frontend_admin/admin_finance/finance_staff_dues_management/locales/admin_finance_staff_dues_management_en.json';
import { AdminNavigationLayoutConfirmProvider } from '@/app/frontend_admin/admin_finance/finance_staff_dues_management/components/feedback/AdminFinanceStaffDuesManagementConfirmProvider';
import FeaturePage from '@/app/frontend_admin/admin_finance/finance_staff_dues_management/page';

export default function AdminFinanceStaffDuesManagementHarness({ children }: { children?: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({ defaultOptions: { queries: { retry: false, staleTime: 0 }, mutations: { retry: false } } }));
  return <NextIntlClientProvider locale="en" messages={messages as never}><QueryClientProvider client={queryClient}>{children ? <AdminNavigationLayoutConfirmProvider>{children}</AdminNavigationLayoutConfirmProvider> : <FeaturePage />}</QueryClientProvider></NextIntlClientProvider>;
}
