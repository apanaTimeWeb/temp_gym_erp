"use client";
import { useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/app/frontend_admin/admin_finance/finance_revenue_report/locales/admin_finance_revenue_report_en.json';
import FeaturePage from '@/app/frontend_admin/admin_finance/finance_revenue_report/page';

export default function AdminFinanceRevenueReportHarness({ children }: { children?: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({ defaultOptions: { queries: { retry: false, staleTime: 0 }, mutations: { retry: false } } }));
  return <NextIntlClientProvider locale="en" messages={messages as never}><QueryClientProvider client={queryClient}>{children ?? <FeaturePage />}</QueryClientProvider></NextIntlClientProvider>;
}
