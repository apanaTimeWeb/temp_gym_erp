"use client";
import { useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/app/frontend_admin/admin_sales/sales_membership_report/locales/admin_sales_membership_report_en.json';
import hostLayoutMessages from '@/app/frontend_admin/admin_navigation/locales/admin_navigation_layout_en.json';
import FeaturePage from '@/app/frontend_admin/admin_sales/sales_membership_report/page';

export default function AdminSalesMembershipReportHarness({ children }: { children?: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({ defaultOptions: { queries: { retry: false, staleTime: 0 }, mutations: { retry: false } } }));
  return <NextIntlClientProvider locale="en" messages={{...hostLayoutMessages, ...messages} as never}><QueryClientProvider client={queryClient}>{children ?? <FeaturePage />}</QueryClientProvider></NextIntlClientProvider>;
}
