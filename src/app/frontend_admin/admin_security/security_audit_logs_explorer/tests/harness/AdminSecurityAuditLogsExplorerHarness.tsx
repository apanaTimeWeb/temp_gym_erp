'use client';
// RESPONSIBILITY: Defines regression tests for AdminSecurityAuditLogsExplorerHarness; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_audit_logs/audit_logs_explorer/tests/harness/AdminSecurityAuditLogsExplorerHarness.tsx)

/** Provider harness for isolated admin_audit_logs/audit_logs_explorer UI and component tests. */
import { useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/locales/admin_security_audit_logs_explorer_en.json';
import FeatureMain from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/components/main_view/AdminSecurityAuditLogsExplorerMain';

interface HarnessProps {
  children?: ReactNode;
}

export default function AdminSecurityAuditLogsExplorerHarness({ children }: HarnessProps) {
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
