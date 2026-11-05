// RESPONSIBILITY: Supplies isolated query and i18n providers for inquiries_pipeline tests.
'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextIntlClientProvider } from 'next-intl';
import { useState, type ReactNode } from 'react';

export interface ManagerInquiriesPipelineHarnessProps { children: ReactNode; locale?: string; messages?: Record<string, unknown>; }

export function ManagerInquiriesPipelineHarness({ children, locale = 'en', messages = {} }: ManagerInquiriesPipelineHarnessProps) {
  const [client] = useState(() => new QueryClient({ defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false }, mutations: { retry: false } } }));
  return <QueryClientProvider client={client}><NextIntlClientProvider locale={locale} messages={messages}>{children}</NextIntlClientProvider></QueryClientProvider>;
}
