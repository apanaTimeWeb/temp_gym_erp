'use client';
// RESPONSIBILITY: Defines regression tests for AdminMembersBlacklistManagementHarness; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_blacklist/blacklist_management/tests/harness/AdminMembersBlacklistManagementHarness.tsx)

/** Provider harness for isolated admin_blacklist/blacklist_management UI and component tests. */
import { useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/app/frontend_admin/admin_members/members_blacklist_management/locales/admin_members_blacklist_management_en.json';
import FeatureMain from '@/app/frontend_admin/admin_members/members_blacklist_management/components/main_view/AdminMembersBlacklistManagementMain';

interface HarnessProps {
  children?: ReactNode;
}

export default function AdminMembersBlacklistManagementHarness({ children }: HarnessProps) {
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
