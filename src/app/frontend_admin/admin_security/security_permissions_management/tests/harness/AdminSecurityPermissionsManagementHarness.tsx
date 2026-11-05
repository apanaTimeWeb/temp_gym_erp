'use client';
// RESPONSIBILITY: Defines regression tests for AdminSecurityPermissionsManagementHarness; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_permissions/permissions_management/tests/harness/AdminSecurityPermissionsManagementHarness.tsx)

/** Provider harness for isolated admin_permissions/permissions_management UI and component tests. */
import { useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/app/frontend_admin/admin_security/security_permissions_management/locales/admin_security_permissions_management_en.json';
import { AdminNavigationLayoutConfirmProvider } from '@/app/frontend_admin/admin_security/security_permissions_management/components/feedback/AdminSecurityPermissionsManagementConfirmProvider';
import FeatureMain from '@/app/frontend_admin/admin_security/security_permissions_management/components/main_view/AdminSecurityPermissionsManagementMain';

interface HarnessProps {
  children?: ReactNode;
}

export default function AdminSecurityPermissionsManagementHarness({ children }: HarnessProps) {
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
