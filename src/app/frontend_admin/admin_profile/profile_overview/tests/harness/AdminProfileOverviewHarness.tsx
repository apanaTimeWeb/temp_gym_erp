'use client';
// RESPONSIBILITY: Defines regression tests for AdminProfileOverviewHarness; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_profile/profile_overview/tests/harness/AdminProfileOverviewHarness.tsx)

/** Provider harness for isolated admin_profile/profile_overview UI and component tests. */
import { useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/app/frontend_admin/admin_profile/profile_overview/locales/admin_profile_overview_en.json';
import FeatureMain from '@/app/frontend_admin/admin_profile/profile_overview/components/main_view/AdminProfileOverviewMain';
import { AdminNavigationLayoutConfirmProvider } from '@/app/frontend_admin/admin_navigation/components/feedback/AdminNavigationLayoutConfirmProvider';
import navigationMessages from '@/app/frontend_admin/admin_navigation/locales/admin_navigation_en.json';
import navigationLayoutMessages from '@/app/frontend_admin/admin_navigation/locales/admin_navigation_layout_en.json';

interface HarnessProps {
  children?: ReactNode;
}

export default function AdminProfileOverviewHarness({ children }: HarnessProps) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime: 0 }, mutations: { retry: false } },
  }));
  return (
    <NextIntlClientProvider locale="en" messages={{ ...navigationMessages, ...navigationLayoutMessages, ...messages }}>
      <QueryClientProvider client={queryClient}>
        <AdminNavigationLayoutConfirmProvider>{children ?? <FeatureMain />}</AdminNavigationLayoutConfirmProvider>
      </QueryClientProvider>
    </NextIntlClientProvider>
  );
}
