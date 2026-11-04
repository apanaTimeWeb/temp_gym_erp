// RESPONSIBILITY: Independently mount the real Login surface with its owner-local test providers.
'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextIntlClientProvider } from 'next-intl';
import { useState } from 'react';
import type { ReactNode } from 'react';
import AuthMain from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/components/AuthLoginCredentialsAndDemoAccessMain';
import messages from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/locales/en.json';

/** Render in a browser or JSDOM harness that supplies the documented host UI primitives. */
export function AuthLoginCredentialsAndDemoAccessHarness({ children }: { children?: ReactNode }) {
  const [client] = useState(() => new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  }));
  return (
    <NextIntlClientProvider locale="en" messages={messages}>
      <QueryClientProvider client={client}>{children ?? <AuthMain />}</QueryClientProvider>
    </NextIntlClientProvider>
  );
}
