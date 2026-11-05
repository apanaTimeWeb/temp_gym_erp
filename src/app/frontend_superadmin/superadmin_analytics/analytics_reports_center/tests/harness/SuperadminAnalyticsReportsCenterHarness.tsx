/** Provider harness for isolated component tests in reports_center. */
import { useState, type ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextIntlClientProvider } from 'next-intl';

import enMessages from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/locales/superadmin_analytics_reports_center_en.json';


interface SuperadminFeatureHarnessProps {
  children: ReactNode;
  queryClient?: QueryClient;
}

export default function SuperadminAnalyticsReportsCenterHarness({ children, queryClient }: SuperadminFeatureHarnessProps) {
  const [defaultQueryClient] = useState(() => new QueryClient({ defaultOptions: { queries: { retry: false, staleTime: 0, gcTime: 0 }, mutations: { retry: false } } }));
  const client = queryClient ?? defaultQueryClient;
  return (
    <NextIntlClientProvider locale="en" messages={enMessages}>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </NextIntlClientProvider>
  );
}
