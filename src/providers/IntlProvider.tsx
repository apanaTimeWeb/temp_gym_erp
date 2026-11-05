'use client';

import React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { appMessages } from '@/i18n/messages';

export function IntlProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextIntlClientProvider locale="en" messages={appMessages}>
      {children}
    </NextIntlClientProvider>
  );
}

export default IntlProvider;
