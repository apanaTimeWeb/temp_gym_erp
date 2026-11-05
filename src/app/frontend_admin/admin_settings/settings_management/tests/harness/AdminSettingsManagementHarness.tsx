'use client';
// RESPONSIBILITY: Defines regression tests for AdminSettingsManagementHarness; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_settings/settings_management/tests/harness/AdminSettingsManagementHarness.tsx)

/** Provider harness for isolated admin_settings/settings_management UI and component tests. */
import { useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/app/frontend_admin/admin_settings/settings_management/locales/admin_settings_management_en.json';
import { AdminNavigationLayoutConfirmProvider } from '@/app/frontend_admin/admin_settings/settings_management/components/feedback/AdminSettingsManagementConfirmProvider';
import FeatureMain from '@/app/frontend_admin/admin_settings/settings_management/components/main_view/AdminSettingsManagementMain';

interface HarnessProps {
  children?: ReactNode;
}

export default function AdminSettingsManagementHarness({ children }: HarnessProps) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime: 0 }, mutations: { retry: false } },
  }));
  return (
    <NextIntlClientProvider locale="en" messages={messages}>
      <QueryClientProvider client={queryClient}>
        <AdminNavigationLayoutConfirmProvider>{children ?? <FeatureMain />}</AdminNavigationLayoutConfirmProvider>
      </QueryClientProvider>
    </NextIntlClientProvider>
  );
}
