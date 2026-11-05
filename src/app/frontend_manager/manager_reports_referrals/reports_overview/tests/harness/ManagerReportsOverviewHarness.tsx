// RESPONSIBILITY: Supplies isolated query and i18n providers for reports_overview tests.
'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextIntlClientProvider } from 'next-intl';
import { useState, type ReactNode } from 'react';

export interface ManagerReportsOverviewHarnessProps { children: ReactNode; locale?: string; messages?: Record<string, unknown>; }

export function ManagerReportsOverviewHarness({ children, locale = 'en', messages = {} }: ManagerReportsOverviewHarnessProps) {
  const [client] = useState(() => new QueryClient({ defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false }, mutations: { retry: false } } }));
  return <QueryClientProvider client={client}><NextIntlClientProvider locale={locale} messages={messages}>{children}</NextIntlClientProvider></QueryClientProvider>;
}
