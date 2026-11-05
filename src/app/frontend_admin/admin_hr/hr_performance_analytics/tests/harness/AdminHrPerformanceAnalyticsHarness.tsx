'use client';
// RESPONSIBILITY: Defines regression tests for AdminHrPerformanceAnalyticsHarness; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_hr/hr_performance_analytics/tests/harness/AdminHrPerformanceAnalyticsHarness.tsx)

/** Provider harness for isolated admin_hr/hr_performance_analytics UI and component tests. */
import { useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/app/frontend_admin/admin_hr/hr_performance_analytics/locales/admin_hr_performance_analytics_en.json';
import FeatureMain from '@/app/frontend_admin/admin_hr/hr_performance_analytics/components/main_view/AdminHrPerformanceAnalytics';

interface HarnessProps {
  children?: ReactNode;
}

export default function AdminHrPerformanceAnalyticsHarness({ children }: HarnessProps) {
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
