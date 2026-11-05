// RESPONSIBILITY: Supplies isolated query and i18n providers for finance_payments_and_summary tests.
'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextIntlClientProvider } from 'next-intl';
import { useState, type ReactNode } from 'react';

export interface ManagerFinancePaymentsAndSummaryHarnessProps { children: ReactNode; locale?: string; messages?: Record<string, unknown>; }

export function ManagerFinancePaymentsAndSummaryHarness({ children, locale = 'en', messages = {} }: ManagerFinancePaymentsAndSummaryHarnessProps) {
  const [client] = useState(() => new QueryClient({ defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false }, mutations: { retry: false } } }));
  return <QueryClientProvider client={client}><NextIntlClientProvider locale={locale} messages={messages}>{children}</NextIntlClientProvider></QueryClientProvider>;
}
