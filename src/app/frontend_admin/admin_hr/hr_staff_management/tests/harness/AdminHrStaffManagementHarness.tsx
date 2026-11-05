"use client";
import { useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/app/frontend_admin/admin_hr/hr_staff_management/locales/admin_hr_staff_management_en.json';
import FeaturePage from '@/app/frontend_admin/admin_hr/hr_staff_management/page';

export default function AdminHrStaffManagementHarness({ children }: { children?: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({ defaultOptions: { queries: { retry: false, staleTime: 0 }, mutations: { retry: false } } }));
  return <NextIntlClientProvider locale="en" messages={messages as never}><QueryClientProvider client={queryClient}>{children ?? <FeaturePage />}</QueryClientProvider></NextIntlClientProvider>;
}
