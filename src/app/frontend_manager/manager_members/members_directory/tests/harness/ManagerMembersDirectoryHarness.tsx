// RESPONSIBILITY: Supplies isolated query and i18n providers for members_directory tests.
'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextIntlClientProvider } from 'next-intl';
import defaultMessages from '@/app/frontend_manager/manager_members/members_directory/locales/manager_members_directory_en.json';
import { useState, type ReactNode } from 'react';

export interface ManagerMembersDirectoryHarnessProps { children: ReactNode; locale?: string; messages?: Record<string, unknown>; }

export function ManagerMembersDirectoryHarness({ children, locale = 'en', messages = defaultMessages }: ManagerMembersDirectoryHarnessProps) {
  const [client] = useState(() => new QueryClient({ defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false }, mutations: { retry: false } } }));
  return <QueryClientProvider client={client}><NextIntlClientProvider locale={locale} messages={messages}>{children}</NextIntlClientProvider></QueryClientProvider>;
}
