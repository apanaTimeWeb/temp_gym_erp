/** Provider harness for isolated component tests in white_labeling_settings. */
import { useState, type ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextIntlClientProvider } from 'next-intl';

import enMessages from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/locales/superadmin_platform_configuration_white_labeling_settings_en.json';


interface SuperadminFeatureHarnessProps {
  children: ReactNode;
  queryClient?: QueryClient;
}

export default function SuperadminPlatformConfigurationWhiteLabelingSettingsHarness({ children, queryClient }: SuperadminFeatureHarnessProps) {
  const [defaultQueryClient] = useState(() => new QueryClient({ defaultOptions: { queries: { retry: false, staleTime: 0, gcTime: 0 }, mutations: { retry: false } } }));
  const client = queryClient ?? defaultQueryClient;
  return (
    <NextIntlClientProvider locale="en" messages={enMessages}>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </NextIntlClientProvider>
  );
}
