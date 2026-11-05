'use client';
// RESPONSIBILITY: Defines regression tests for AdminMembersDirectoryHarness; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_members/members_directory/tests/harness/AdminMembersDirectoryHarness.tsx)

/** Provider harness for isolated admin_members/members_directory UI and component tests. */
import { useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/app/frontend_admin/admin_members/members_directory/locales/admin_members_directory_en.json';
import FeatureMain from '@/app/frontend_admin/admin_members/members_directory/components/main_view/AdminMembersDirectoryMain';

interface HarnessProps {
  children?: ReactNode;
}

export default function AdminMembersDirectoryHarness({ children }: HarnessProps) {
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
