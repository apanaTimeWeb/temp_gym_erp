'use client';
// RESPONSIBILITY: Defines regression tests for AdminGymsBranchesDirectoryHarness; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_branches/branches_directory/tests/harness/AdminGymsBranchesDirectoryHarness.tsx)

/** Provider harness for isolated admin_branches/branches_directory UI and component tests. */
import { useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/locales/admin_gyms_branches_directory_en.json';
import FeatureMain from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/components/main_view/AdminGymsBranchesDirectoryMain';

interface HarnessProps {
  children?: ReactNode;
}

export default function AdminGymsBranchesDirectoryHarness({ children }: HarnessProps) {
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
