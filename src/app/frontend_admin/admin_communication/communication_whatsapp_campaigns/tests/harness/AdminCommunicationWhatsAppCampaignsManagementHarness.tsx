'use client';
// RESPONSIBILITY: Defines regression tests for AdminCommunicationWhatsAppCampaignsManagementHarness; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_communication/communication_whatsapp_campaigns/tests/harness/AdminCommunicationWhatsAppCampaignsManagementHarness.tsx)

/** Provider harness for isolated admin_communication/communication_whatsapp_campaigns UI and component tests. */
import { useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/app/frontend_admin/admin_communication/communication_whatsapp_campaigns/locales/admin_communication_whatsapp_campaigns_en.json';
import FeatureMain from '@/app/frontend_admin/admin_communication/communication_whatsapp_campaigns/components/main_view/AdminCommunicationWhatsAppCampaignsManagementMain';

interface HarnessProps {
  children?: ReactNode;
}

export default function AdminCommunicationWhatsAppCampaignsManagementHarness({ children }: HarnessProps) {
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
