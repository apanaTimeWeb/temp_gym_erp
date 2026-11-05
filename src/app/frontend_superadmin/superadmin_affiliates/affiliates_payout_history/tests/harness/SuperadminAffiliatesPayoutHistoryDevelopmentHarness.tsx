// RESPONSIBILITY: Mounts the owning feature with isolated browser mocks and a visible scenario control.
'use client';
import { useEffect, useRef, useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { setupWorker } from 'msw/browser';
import { NextIntlClientProvider } from 'next-intl';

import { ConfirmProvider } from '@/components/ui/Feedback/ConfirmProvider';

import { SuperadminAffiliatesPayoutHistoryMain as Main } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_payout_history/components/SuperadminAffiliatesPayoutHistoryMain';
import messages from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_payout_history/locales/affiliates_payout_history_en.json';
import { createSuperadminAffiliatesPayoutHistoryDevelopmentHandler, SUPERADMIN_AFFILIATES_PAYOUT_HISTORY_DEVELOPMENT_SCENARIOS } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_payout_history/mocks/scenarios/superadmin_affiliates_payout_history_development.scenarios';

import type { SuperadminAffiliatesPayoutHistoryDevelopmentScenario } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_payout_history/mocks/scenarios/superadmin_affiliates_payout_history_development.scenarios';


/** Development/test only. The host supplies semantic theme CSS and mockServiceWorker.js. */
export default function SuperadminAffiliatesPayoutHistoryDevelopmentHarness() {
 const [client] = useState(() => new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } }));
 const scenario = useRef<SuperadminAffiliatesPayoutHistoryDevelopmentScenario>('ACTIVE');
 const [ready, setReady] = useState(false);
 const [failed, setFailed] = useState(false);
 // Own the worker lifecycle exactly once; scenario changes are read from a ref by the local handler.
 useEffect(() => { let active = true; const worker = setupWorker(createSuperadminAffiliatesPayoutHistoryDevelopmentHandler(() => scenario.current));
  worker.start({ onUnhandledRequest: 'bypass' }).then(() => { if (active) setReady(true); }).catch(() => { if (active) setFailed(true); });
  return () => { active = false; worker.stop(); };
 }, []);
 if (failed) return <p role="alert">Local mock worker could not start. Serve mockServiceWorker.js in the development host.</p>;
 if (!ready) return <div role="status" aria-busy="true" className="h-64 bg-skeleton-base motion-safe:animate-pulse">Starting isolated workspace…</div>;
 return <NextIntlClientProvider locale="en" messages={messages}><QueryClientProvider client={client}><ConfirmProvider>
  <label className="block text-primary">Mock scenario<select className="min-h-11 bg-input text-primary" onChange={event => { scenario.current = event.target.value as SuperadminAffiliatesPayoutHistoryDevelopmentScenario; void client.invalidateQueries(); }}>
   {SUPERADMIN_AFFILIATES_PAYOUT_HISTORY_DEVELOPMENT_SCENARIOS.map(value => <option key={value} value={value}>{value}</option>)}
  </select></label><Main />
 </ConfirmProvider></QueryClientProvider></NextIntlClientProvider>;
}
