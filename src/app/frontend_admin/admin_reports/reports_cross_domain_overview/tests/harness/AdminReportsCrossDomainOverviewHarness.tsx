"use client";
import { useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/app/frontend_admin/admin_reports/reports_cross_domain_overview/locales/admin_reports_cross_domain_overview_en.json';
import hostNavigationMessages from '@/app/frontend_admin/admin_navigation/locales/admin_navigation_en.json';
import FeaturePage from '@/app/frontend_admin/admin_reports/reports_cross_domain_overview/page';

export default function AdminReportsCrossDomainOverviewHarness({ children }: { children?: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({ defaultOptions: { queries: { retry: false, staleTime: 0 }, mutations: { retry: false } } }));
  return <NextIntlClientProvider locale="en" messages={{...hostNavigationMessages, ...messages} as never}><QueryClientProvider client={queryClient}>{children ?? <FeaturePage />}</QueryClientProvider></NextIntlClientProvider>;
}
