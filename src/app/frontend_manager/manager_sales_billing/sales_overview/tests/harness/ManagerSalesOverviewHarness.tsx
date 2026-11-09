// RESPONSIBILITY: Supplies isolated query and i18n providers for sales_overview tests.
'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextIntlClientProvider } from 'next-intl';
import { useState, type ReactNode } from 'react';
import { ManagerInfrastructureDataDensityProvider } from '@/app/frontend_manager/manager_infrastructure/components/ManagerInfrastructureDataDensityProvider';

export interface ManagerSalesOverviewHarnessProps { children: ReactNode; locale?: string; messages?: Record<string, unknown>; }

export function ManagerSalesOverviewHarness({ children, locale = 'en', messages = {} }: ManagerSalesOverviewHarnessProps) {
  const [client] = useState(() => new QueryClient({ defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false }, mutations: { retry: false } } }));
  return (
    <QueryClientProvider client={client}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <ManagerInfrastructureDataDensityProvider>
          {children}
        </ManagerInfrastructureDataDensityProvider>
      </NextIntlClientProvider>
    </QueryClientProvider>
  );
}
