// RESPONSIBILITY: Mounts the owning feature with isolated browser mocks and a visible scenario control.
'use client';
import { useEffect, useRef, useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { setupWorker } from 'msw/browser';
import { NextIntlClientProvider } from 'next-intl';

import { ConfirmProvider } from '@/components/ui/Feedback/ConfirmProvider';

import Main from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/components/analytics_dashboard_main/SuperadminAnalyticsDashboardMain';
import messages from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/locales/superadmin_analytics_dashboard_en.json';
import { createSuperadminAnalyticsDashboardDevelopmentHandler, SUPERADMIN_ANALYTICS_DASHBOARD_DEVELOPMENT_SCENARIOS } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/mocks/scenarios/superadmin_analytics_dashboard_development.scenarios';

import type { SuperadminAnalyticsDashboardDevelopmentScenario } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/mocks/scenarios/superadmin_analytics_dashboard_development.scenarios';


/** Development/test only. The host supplies semantic theme CSS and mockServiceWorker.js. */
export default function SuperadminAnalyticsDashboardDevelopmentHarness() {
 const [client] = useState(() => new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } }));
 const scenario = useRef<SuperadminAnalyticsDashboardDevelopmentScenario>('ACTIVE');
 const [ready, setReady] = useState(false);
 const [failed, setFailed] = useState(false);
 // Own the worker lifecycle exactly once; scenario changes are read from a ref by the local handler.
 useEffect(() => { let active = true; const worker = setupWorker(createSuperadminAnalyticsDashboardDevelopmentHandler(() => scenario.current));
  worker.start({ onUnhandledRequest: 'bypass' }).then(() => { if (active) setReady(true); }).catch(() => { if (active) setFailed(true); });
  return () => { active = false; worker.stop(); };
 }, []);
 if (failed) return <p role="alert">Local mock worker could not start. Serve mockServiceWorker.js in the development host.</p>;
 if (!ready) return <div role="status" aria-busy="true" className="h-64 bg-skeleton-base motion-safe:animate-pulse">Starting isolated workspace…</div>;
 return <NextIntlClientProvider locale="en" messages={messages}><QueryClientProvider client={client}><ConfirmProvider>
  <label className="block text-primary">Mock scenario<select className="min-h-11 bg-input text-primary" onChange={event => { scenario.current = event.target.value as SuperadminAnalyticsDashboardDevelopmentScenario; void client.invalidateQueries(); }}>
   {SUPERADMIN_ANALYTICS_DASHBOARD_DEVELOPMENT_SCENARIOS.map(value => <option key={value} value={value}>{value}</option>)}
  </select></label><Main />
 </ConfirmProvider></QueryClientProvider></NextIntlClientProvider>;
}
