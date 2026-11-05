// RESPONSIBILITY: Mounts the owning feature with isolated browser mocks and a visible scenario control.
'use client';
import { useEffect, useRef, useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { setupWorker } from 'msw/browser';
import { NextIntlClientProvider } from 'next-intl';

import { ConfirmProvider } from '@/components/ui/Feedback/ConfirmProvider';

import Main from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/components/plans_management_main/SuperadminBillingPlansManagementMain';
import messages from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/locales/superadmin_billing_plans_management_en.json';
import { createSuperadminBillingPlansManagementDevelopmentHandler, SUPERADMIN_BILLING_PLANS_MANAGEMENT_DEVELOPMENT_SCENARIOS } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/mocks/scenarios/superadmin_billing_plans_management_development.scenarios';

import type { SuperadminBillingPlansManagementDevelopmentScenario } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/mocks/scenarios/superadmin_billing_plans_management_development.scenarios';


/** Development/test only. The host supplies semantic theme CSS and mockServiceWorker.js. */
export default function SuperadminBillingPlansManagementDevelopmentHarness() {
 const [client] = useState(() => new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } }));
 const scenario = useRef<SuperadminBillingPlansManagementDevelopmentScenario>('ACTIVE');
 const [ready, setReady] = useState(false);
 const [failed, setFailed] = useState(false);
 // Own the worker lifecycle exactly once; scenario changes are read from a ref by the local handler.
 useEffect(() => { let active = true; const worker = setupWorker(createSuperadminBillingPlansManagementDevelopmentHandler(() => scenario.current));
  worker.start({ onUnhandledRequest: 'bypass' }).then(() => { if (active) setReady(true); }).catch(() => { if (active) setFailed(true); });
  return () => { active = false; worker.stop(); };
 }, []);
 if (failed) return <p role="alert">Local mock worker could not start. Serve mockServiceWorker.js in the development host.</p>;
 if (!ready) return <div role="status" aria-busy="true" className="h-64 bg-skeleton-base motion-safe:animate-pulse">Starting isolated workspace…</div>;
 return <NextIntlClientProvider locale="en" messages={messages}><QueryClientProvider client={client}><ConfirmProvider>
  <label className="block text-primary">Mock scenario<select className="min-h-11 bg-input text-primary" onChange={event => { scenario.current = event.target.value as SuperadminBillingPlansManagementDevelopmentScenario; void client.invalidateQueries(); }}>
   {SUPERADMIN_BILLING_PLANS_MANAGEMENT_DEVELOPMENT_SCENARIOS.map(value => <option key={value} value={value}>{value}</option>)}
  </select></label><Main />
 </ConfirmProvider></QueryClientProvider></NextIntlClientProvider>;
}
