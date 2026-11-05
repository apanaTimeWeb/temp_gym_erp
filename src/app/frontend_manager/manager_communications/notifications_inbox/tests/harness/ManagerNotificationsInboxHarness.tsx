// RESPONSIBILITY: Supplies isolated query and i18n providers for notifications_inbox tests.
'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextIntlClientProvider } from 'next-intl';
import { useState, type ReactNode } from 'react';
import notificationMessages from '@/app/frontend_manager/manager_communications/notifications_inbox/locales/manager_notifications_inbox_en.json';

export interface ManagerNotificationsInboxHarnessProps { children: ReactNode; locale?: string; messages?: Record<string, unknown>; }

export function ManagerNotificationsInboxHarness({ children, locale = 'en', messages = notificationMessages }: ManagerNotificationsInboxHarnessProps) {
  const [client] = useState(() => new QueryClient({ defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false }, mutations: { retry: false } } }));
  return <QueryClientProvider client={client}><NextIntlClientProvider locale={locale} messages={messages}>{children}</NextIntlClientProvider></QueryClientProvider>;
}
