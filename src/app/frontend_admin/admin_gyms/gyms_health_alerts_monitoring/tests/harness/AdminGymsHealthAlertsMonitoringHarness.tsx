'use client';
// RESPONSIBILITY: Defines regression tests for AdminGymsHealthAlertsMonitoringHarness; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_gym_health_alerts/gym_health_alerts_monitoring/tests/harness/AdminGymsHealthAlertsMonitoringHarness.tsx)

/** Provider harness for isolated admin_gym_health_alerts/gym_health_alerts_monitoring UI and component tests. */
import { useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/app/frontend_admin/admin_gyms/gyms_health_alerts_monitoring/locales/admin_gyms_health_alerts_monitoring_en.json';
import { AdminNavigationLayoutConfirmProvider } from '@/app/frontend_admin/admin_gyms/gyms_health_alerts_monitoring/components/feedback/AdminGymsHealthAlertsMonitoringConfirmProvider';
import FeatureMain from '@/app/frontend_admin/admin_gyms/gyms_health_alerts_monitoring/components/main_view/AdminGymsHealthAlertsMonitoringMain';

interface HarnessProps {
  children?: ReactNode;
}

export default function AdminGymsHealthAlertsMonitoringHarness({ children }: HarnessProps) {
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
