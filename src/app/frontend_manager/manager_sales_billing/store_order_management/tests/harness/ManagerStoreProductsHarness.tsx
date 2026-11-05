// RESPONSIBILITY: Supplies isolated query and i18n providers for store_products tests.
'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextIntlClientProvider } from 'next-intl';
import { useState, type ReactNode } from 'react';

export interface ManagerStoreProductsHarnessProps { children: ReactNode; locale?: string; messages?: Record<string, unknown>; }

export function ManagerStoreProductsHarness({ children, locale = 'en', messages = {} }: ManagerStoreProductsHarnessProps) {
  const [client] = useState(() => new QueryClient({ defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false }, mutations: { retry: false } } }));
  return <QueryClientProvider client={client}><NextIntlClientProvider locale={locale} messages={messages}>{children}</NextIntlClientProvider></QueryClientProvider>;
}
