'use client';
// RESPONSIBILITY: Defines regression tests for AdminCommunicationNotificationsCenterHarness; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_communication/communication_notifications_center/tests/harness/AdminCommunicationNotificationsCenterHarness.tsx)

/** Provider harness for isolated admin_communication/communication_notifications_center UI and component tests. */
import { useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/app/frontend_admin/admin_communication/communication_notifications_center/locales/admin_communication_notifications_center_en.json';
import FeatureMain from '@/app/frontend_admin/admin_communication/communication_notifications_center/components/main_view/AdminCommunicationNotificationsCenterMain';
import AdminNavigationLayoutWebSocketProvider from '@/app/frontend_admin/admin_navigation/components/AdminNavigationLayoutWebSocketProvider';

interface HarnessProps {
  children?: ReactNode;
}

export default function AdminCommunicationNotificationsCenterHarness({ children }: HarnessProps) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime: 0 }, mutations: { retry: false } },
  }));
  return (
    <NextIntlClientProvider locale="en" messages={messages}>
      <QueryClientProvider client={queryClient}>
        <AdminNavigationLayoutWebSocketProvider>{children ?? <FeatureMain />}</AdminNavigationLayoutWebSocketProvider>
      </QueryClientProvider>
    </NextIntlClientProvider>
  );
}
