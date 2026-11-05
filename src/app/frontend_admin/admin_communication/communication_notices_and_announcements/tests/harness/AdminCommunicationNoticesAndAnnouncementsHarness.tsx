'use client';
// RESPONSIBILITY: Defines regression tests for AdminCommunicationNoticesAndAnnouncementsHarness; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_communication/communication_notices_and_announcements/tests/harness/AdminCommunicationNoticesAndAnnouncementsHarness.tsx)

/** Provider harness for isolated admin_communication/communication_notices_and_announcements UI and component tests. */
import { useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/locales/admin_communication_notices_and_announcements_en.json';
import FeatureMain from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/components/main_view/AdminCommunicationNoticesAndAnnouncementsMain';
import { AdminNavigationLayoutConfirmProvider as AdminAnnouncementsConfirmProvider } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/components/feedback/AdminCommunicationNoticesAndAnnouncementsConfirmProvider';

interface HarnessProps {
  children?: ReactNode;
}

export default function AdminCommunicationNoticesAndAnnouncementsHarness({ children }: HarnessProps) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime: 0 }, mutations: { retry: false } },
  }));
  return (
    <NextIntlClientProvider locale="en" messages={messages}>
      <QueryClientProvider client={queryClient}>
        <AdminAnnouncementsConfirmProvider>{children ?? <FeatureMain />}</AdminAnnouncementsConfirmProvider>
      </QueryClientProvider>
    </NextIntlClientProvider>
  );
}
