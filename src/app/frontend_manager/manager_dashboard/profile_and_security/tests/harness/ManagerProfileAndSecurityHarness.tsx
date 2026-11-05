// RESPONSIBILITY: Supplies isolated query and i18n providers for profile_and_security tests.
'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextIntlClientProvider } from 'next-intl';
import { useState, type ReactNode } from 'react';

import profileEnglishMessages from '@/app/frontend_manager/manager_dashboard/profile_and_security/locales/manager_profile_and_security_en.json';
import { resetManagerProfileAndSecurityMockState } from '@/app/frontend_manager/manager_dashboard/profile_and_security/mocks/handlers/ManagerProfileAndSecurityMockHandlers';

export interface ManagerProfileAndSecurityHarnessProps { children: ReactNode; locale?: string; messages?: Record<string, unknown>; }

export function ManagerProfileAndSecurityHarness({ children, locale = 'en', messages = profileEnglishMessages }: ManagerProfileAndSecurityHarnessProps) {
  const [client] = useState(() => { resetManagerProfileAndSecurityMockState(); return new QueryClient({ defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false }, mutations: { retry: false } } }); });
  return <QueryClientProvider client={client}><NextIntlClientProvider locale={locale} messages={messages}>{children}</NextIntlClientProvider></QueryClientProvider>;
}
