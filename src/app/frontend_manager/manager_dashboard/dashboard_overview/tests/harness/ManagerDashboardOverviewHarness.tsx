import type { PropsWithChildren } from 'react';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextIntlClientProvider, type AbstractIntlMessages } from 'next-intl';

export interface ManagerDashboardOverviewHarnessProps extends PropsWithChildren {
  locale?: string;
  messages?: AbstractIntlMessages;
}

/** Test-only isolated providers. It intentionally does not import host business modules. */
export function ManagerDashboardOverviewHarness({
  children,
  locale = 'en',
  messages = {},
}: ManagerDashboardOverviewHarnessProps) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: { retry: false, staleTime: 0 },
      mutations: { retry: false },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </QueryClientProvider>
  );
}
