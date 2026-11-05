'use client';
// RESPONSIBILITY: Provides an isolated development workspace with local network scenarios and host UI providers.
import { useEffect, useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { setupWorker } from 'msw/browser';
import { NextIntlClientProvider } from 'next-intl';

import { ConfirmProvider } from '@/components/ui/Feedback/ConfirmProvider';

import Main from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_cache_management/components/SuperadminSystemOpsCacheManagementMain';
import messages from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_cache_management/locales/superadmin_system_ops_cache_management_en.json';
import { SUPERADMIN_SYSTEM_OPS_CACHE_MANAGEMENT_SCENARIOS, setSuperadminSystemOpsCacheManagementScenario, type SuperadminSystemOpsCacheManagementScenario } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_cache_management/mocks/scenarios/superadmin_system_ops_cache_management.scenarios';
import { superadminInfrastructureHandlers } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_cache_management/mocks/SuperadminSystemOpsCacheManagementMockHandlers';


/** The host serves mockServiceWorker.js and provides the documented zero-business ConfirmProvider. */
export default function SuperadminSystemOpsCacheManagementHarness() {
 const [client] = useState(() => new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } }));
 const [ready, setReady] = useState(false);
 const [error, setError] = useState(false);
 useEffect(() => {
  const worker = setupWorker(...superadminInfrastructureHandlers); let mounted = true;
  worker.start({ onUnhandledRequest: 'bypass' }).then(() => { if (mounted) setReady(true); }).catch(() => { if (mounted) setError(true); });
  return () => { mounted = false; worker.stop(); };
 }, []);
 if (error) return <p role="alert">The local mock worker could not start. Serve mockServiceWorker.js in this development host.</p>;
 if (!ready) return <div role="status" className="h-64 bg-skeleton-base motion-safe:animate-pulse">Starting isolated mock workspace…</div>;
 return <NextIntlClientProvider locale="en" messages={messages}><QueryClientProvider client={client}><ConfirmProvider>
  <label className="block text-primary">Mock scenario<select className="min-h-11 bg-input text-primary" onChange={event => { setSuperadminSystemOpsCacheManagementScenario(event.target.value as SuperadminSystemOpsCacheManagementScenario); void client.invalidateQueries(); }}>
   {SUPERADMIN_SYSTEM_OPS_CACHE_MANAGEMENT_SCENARIOS.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
  </select></label><Main />
 </ConfirmProvider></QueryClientProvider></NextIntlClientProvider>;
}
