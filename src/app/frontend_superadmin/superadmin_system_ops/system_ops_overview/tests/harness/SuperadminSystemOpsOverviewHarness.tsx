/** Provider harness for isolated component and route tests in this autonomous leaf. */


import { useState, type ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextIntlClientProvider } from 'next-intl';

import enMessages from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_overview/locales/superadmin_system_ops_en.json';
import { SUPERADMIN_SYSTEM_OPS_OVERVIEW_SCENARIOS, setSuperadminSystemOpsOverviewScenario, type SuperadminSystemOpsOverviewScenario } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_overview/mocks/scenarios/superadmin_system_ops_overview.scenarios';

interface SuperadminSystemOpsOverviewHarnessProps {
  children: ReactNode;
  queryClient?: QueryClient;
}

export default function SuperadminSystemOpsOverviewHarness({ children, queryClient }: SuperadminSystemOpsOverviewHarnessProps) {
  const [defaultQueryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: { retry: false, staleTime: 0, gcTime: 0 },
      mutations: { retry: false },
    },
  }));
  const client = queryClient ?? defaultQueryClient;
  const [scenario, setScenario] = useState<SuperadminSystemOpsOverviewScenario>('default');
  const handleScenarioChange = (value: SuperadminSystemOpsOverviewScenario) => { setScenario(value); setSuperadminSystemOpsOverviewScenario(value); };

  return (
    <NextIntlClientProvider locale="en" messages={enMessages}>
      <QueryClientProvider client={client}>
        {process.env.NODE_ENV === 'development' ? <label className="mb-3 flex items-center gap-2 text-sm">MSW scenario<select value={scenario} onChange={(event) => handleScenarioChange(event.target.value as SuperadminSystemOpsOverviewScenario)} className="rounded border border-border bg-input px-2 py-1">{SUPERADMIN_SYSTEM_OPS_OVERVIEW_SCENARIOS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label> : null}
        {children}
      </QueryClientProvider>
    </NextIntlClientProvider>
  );
}
