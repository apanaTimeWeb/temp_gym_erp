'use client';

import React from 'react';
import { NextIntlClientProvider } from 'next-intl';

import authLoginEn from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/locales/en.json';
import publicLandingEn from '@/app/frontend_public/public_landing/landing_experience/locales/public_landing_en.json';

const defaultMessages = {
  ...authLoginEn,
  ...publicLandingEn,
};

export function IntlProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextIntlClientProvider locale="en" messages={defaultMessages}>
      {children}
    </NextIntlClientProvider>
  );
}

export default IntlProvider;

