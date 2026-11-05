/** Provider harness for isolated component and route tests in this autonomous leaf. */
import { useState, type ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextIntlClientProvider } from 'next-intl';

import enMessages from '@/app/frontend_superadmin/superadmin_platform_shell/platform_shell_layout/locales/superadmin_platform_shell_layout_en.json';


interface SuperadminPlatformShellLayoutHarnessProps {
  children: ReactNode;
  queryClient?: QueryClient;
}

export default function SuperadminPlatformShellLayoutHarness({ children, queryClient }: SuperadminPlatformShellLayoutHarnessProps) {
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
