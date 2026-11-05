/** Provider harness for isolated component and route tests in this autonomous leaf. */


import { useState, type ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextIntlClientProvider } from 'next-intl';

import enMessages from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/locales/superadmin_system_ops_infrastructure_en.json';
import { SUPERADMIN_SYSTEM_OPS_INFRASTRUCTURE_SCENARIOS, setSuperadminSystemOpsInfrastructureScenario, type SuperadminSystemOpsInfrastructureScenario } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/mocks/scenarios/superadmin_system_ops_infrastructure.scenarios';

interface SuperadminSystemOpsInfrastructureHarnessProps {
  children: ReactNode;
  queryClient?: QueryClient;
}

export default function SuperadminSystemOpsInfrastructureHarness({ children, queryClient }: SuperadminSystemOpsInfrastructureHarnessProps) {
  const [defaultQueryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: { retry: false, staleTime: 0, gcTime: 0 },
      mutations: { retry: false },
    },
  }));
  const client = queryClient ?? defaultQueryClient;
  const [scenario, setScenario] = useState<SuperadminSystemOpsInfrastructureScenario>('default');
  const handleScenarioChange = (value: SuperadminSystemOpsInfrastructureScenario) => { setScenario(value); setSuperadminSystemOpsInfrastructureScenario(value); };

  return (
    <NextIntlClientProvider locale="en" messages={enMessages}>
      <QueryClientProvider client={client}>
        {process.env.NODE_ENV === 'development' ? <label className="mb-3 flex items-center gap-2 text-sm">MSW scenario<select value={scenario} onChange={(event) => handleScenarioChange(event.target.value as SuperadminSystemOpsInfrastructureScenario)} className="rounded border border-border bg-input px-2 py-1">{SUPERADMIN_SYSTEM_OPS_INFRASTRUCTURE_SCENARIOS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label> : null}
        {children}
      </QueryClientProvider>
    </NextIntlClientProvider>
  );
}
