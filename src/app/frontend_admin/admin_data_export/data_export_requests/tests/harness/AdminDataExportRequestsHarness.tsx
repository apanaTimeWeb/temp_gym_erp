'use client';
// RESPONSIBILITY: Defines regression tests for AdminDataExportRequestsHarness; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_data_export/data_export_requests/tests/harness/AdminDataExportRequestsHarness.tsx)

/** Provider harness for isolated admin_data_export/data_export_requests UI and component tests. */
import { useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/app/frontend_admin/admin_data_export/data_export_requests/locales/admin_data_export_requests_en.json';
import FeatureMain from '@/app/frontend_admin/admin_data_export/data_export_requests/components/main_view/AdminDataExportRequestsMain';

interface HarnessProps {
  children?: ReactNode;
}

export default function AdminDataExportRequestsHarness({ children }: HarnessProps) {
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
