/** Provider harness for isolated component and route tests in this autonomous leaf. */
import { useState, type ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextIntlClientProvider } from 'next-intl';

import enMessages from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/locales/superadmin_system_ops_backups_en.json';


interface SuperadminSystemOpsBackupsHarnessProps {
  children: ReactNode;
  queryClient?: QueryClient;
}

export default function SuperadminSystemOpsBackupsHarness({ children, queryClient }: SuperadminSystemOpsBackupsHarnessProps) {
  const [defaultQueryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: { retry: false, staleTime: 0, gcTime: 0 },
      mutations: { retry: false },
    },
  }));
  const client = queryClient ?? defaultQueryClient;

  return (
    <NextIntlClientProvider locale="en" messages={enMessages}>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </NextIntlClientProvider>
  );
}
