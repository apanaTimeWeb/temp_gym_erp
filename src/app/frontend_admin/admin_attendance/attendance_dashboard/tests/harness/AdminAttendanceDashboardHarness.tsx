'use client';
// RESPONSIBILITY: Defines regression tests for AdminAttendanceDashboardHarness; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_attendance/attendance_dashboard/tests/harness/AdminAttendanceDashboardHarness.tsx)

/** Provider harness for isolated admin_attendance/attendance_dashboard UI and component tests. */
import { useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/app/frontend_admin/admin_attendance/attendance_dashboard/locales/admin_attendance_dashboard_en.json';
import FeatureMain from '@/app/frontend_admin/admin_attendance/attendance_dashboard/components/main_view/AdminAttendanceDashboardMain';

interface HarnessProps {
  children?: ReactNode;
}

export default function AdminAttendanceDashboardHarness({ children }: HarnessProps) {
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
