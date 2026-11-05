// RESPONSIBILITY: Supplies isolated query and i18n providers for communications_campaigns tests.
'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextIntlClientProvider } from 'next-intl';
import { useState, type ReactNode } from 'react';

export interface ManagerCommunicationsCampaignsHarnessProps { children: ReactNode; locale?: string; messages?: Record<string, unknown>; }

export function ManagerCommunicationsCampaignsHarness({ children, locale = 'en', messages = {} }: ManagerCommunicationsCampaignsHarnessProps) {
  const [client] = useState(() => new QueryClient({ defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false }, mutations: { retry: false } } }));
  return <QueryClientProvider client={client}><NextIntlClientProvider locale={locale} messages={messages}>{children}</NextIntlClientProvider></QueryClientProvider>;
}
