'use client';
// RESPONSIBILITY: Defines regression tests for AdminDashboardOverviewHarness; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_dashboard/dashboard_overview/tests/harness/AdminDashboardOverviewHarness.tsx)

/** Provider harness for isolated admin_dashboard/dashboard_overview UI and component tests. */
import { useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/app/frontend_admin/admin_dashboard/dashboard_overview/locales/admin_dashboard_overview_en.json';
import FeatureMain from '@/app/frontend_admin/admin_dashboard/dashboard_overview/components/main_view/AdminDashboardOverviewMain';

interface HarnessProps {
  children?: ReactNode;
}

export default function AdminDashboardOverviewHarness({ children }: HarnessProps) {
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
