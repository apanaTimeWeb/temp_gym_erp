/** Provider harness for isolated component tests in profile_overview. */
import { useState, type ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextIntlClientProvider } from 'next-intl';

import enMessages from '@/app/frontend_superadmin/superadmin_account/account_profile_overview/locales/superadmin_account_profile_overview_en.json';


interface SuperadminFeatureHarnessProps {
  children: ReactNode;
  queryClient?: QueryClient;
}

export default function SuperadminAccountProfileOverviewHarness({ children, queryClient }: SuperadminFeatureHarnessProps) {
  const [defaultQueryClient] = useState(() => new QueryClient({ defaultOptions: { queries: { retry: false, staleTime: 0, gcTime: 0 }, mutations: { retry: false } } }));
  const client = queryClient ?? defaultQueryClient;
  return (
    <NextIntlClientProvider locale="en" messages={enMessages}>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </NextIntlClientProvider>
  );
}
