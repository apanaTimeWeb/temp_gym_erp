// RESPONSIBILITY: Mounts the owning feature with isolated browser mocks and a visible scenario control.
'use client';
import { useEffect, useRef, useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { setupWorker } from 'msw/browser';
import { NextIntlClientProvider } from 'next-intl';

import { ConfirmProvider } from '@/components/ui/Feedback/ConfirmProvider';

import Main from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/components/SuperadminSystemOpsInfrastructureMain';
import messages from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/locales/superadmin_system_ops_infrastructure_en.json';
import { createSuperadminSystemOpsInfrastructureDevelopmentHandler, SUPERADMIN_SYSTEM_OPS_INFRASTRUCTURE_DEVELOPMENT_SCENARIOS } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/mocks/scenarios/superadmin_system_ops_infrastructure_development.scenarios';

import type { SuperadminSystemOpsInfrastructureDevelopmentScenario } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/mocks/scenarios/superadmin_system_ops_infrastructure_development.scenarios';


/** Development/test only. The host supplies semantic theme CSS and mockServiceWorker.js. */
export default function SuperadminSystemOpsInfrastructureDevelopmentHarness() {
 const [client] = useState(() => new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } }));
 const scenario = useRef<SuperadminSystemOpsInfrastructureDevelopmentScenario>('ACTIVE');
 const [ready, setReady] = useState(false);
 const [failed, setFailed] = useState(false);
 // Own the worker lifecycle exactly once; scenario changes are read from a ref by the local handler.
 useEffect(() => { let active = true; const worker = setupWorker(createSuperadminSystemOpsInfrastructureDevelopmentHandler(() => scenario.current));
  worker.start({ onUnhandledRequest: 'bypass' }).then(() => { if (active) setReady(true); }).catch(() => { if (active) setFailed(true); });
  return () => { active = false; worker.stop(); };
 }, []);
 if (failed) return <p role="alert">Local mock worker could not start. Serve mockServiceWorker.js in the development host.</p>;
 if (!ready) return <div role="status" aria-busy="true" className="h-64 bg-skeleton-base motion-safe:animate-pulse">Starting isolated workspace…</div>;
 return <NextIntlClientProvider locale="en" messages={messages}><QueryClientProvider client={client}><ConfirmProvider>
  <label className="block text-primary">Mock scenario<select className="min-h-11 bg-input text-primary" onChange={event => { scenario.current = event.target.value as SuperadminSystemOpsInfrastructureDevelopmentScenario; void client.invalidateQueries(); }}>
   {SUPERADMIN_SYSTEM_OPS_INFRASTRUCTURE_DEVELOPMENT_SCENARIOS.map(value => <option key={value} value={value}>{value}</option>)}
  </select></label><Main />
 </ConfirmProvider></QueryClientProvider></NextIntlClientProvider>;
}
