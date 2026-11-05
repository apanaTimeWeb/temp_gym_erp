// RESPONSIBILITY: Mounts the owning feature with isolated browser mocks and a visible scenario control.
'use client';
import { useEffect, useRef, useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { setupWorker } from 'msw/browser';
import { NextIntlClientProvider } from 'next-intl';

import { ConfirmProvider } from '@/components/ui/Feedback/ConfirmProvider';

import { SuperadminPlatformConfigurationReleaseNotesMain as Main } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_release_notes/components/SuperadminPlatformConfigurationReleaseNotesMain';
import messages from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_release_notes/locales/platform_configuration_release_notes_en.json';
import { createSuperadminPlatformConfigurationReleaseNotesDevelopmentHandler, SUPERADMIN_PLATFORM_CONFIGURATION_RELEASE_NOTES_DEVELOPMENT_SCENARIOS } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_release_notes/mocks/scenarios/superadmin_platform_configuration_release_notes_development.scenarios';

import type { SuperadminPlatformConfigurationReleaseNotesDevelopmentScenario } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_release_notes/mocks/scenarios/superadmin_platform_configuration_release_notes_development.scenarios';


/** Development/test only. The host supplies semantic theme CSS and mockServiceWorker.js. */
export default function SuperadminPlatformConfigurationReleaseNotesDevelopmentHarness() {
 const [client] = useState(() => new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } }));
 const scenario = useRef<SuperadminPlatformConfigurationReleaseNotesDevelopmentScenario>('ACTIVE');
 const [ready, setReady] = useState(false);
 const [failed, setFailed] = useState(false);
 // Own the worker lifecycle exactly once; scenario changes are read from a ref by the local handler.
 useEffect(() => { let active = true; const worker = setupWorker(createSuperadminPlatformConfigurationReleaseNotesDevelopmentHandler(() => scenario.current));
  worker.start({ onUnhandledRequest: 'bypass' }).then(() => { if (active) setReady(true); }).catch(() => { if (active) setFailed(true); });
  return () => { active = false; worker.stop(); };
 }, []);
 if (failed) return <p role="alert">Local mock worker could not start. Serve mockServiceWorker.js in the development host.</p>;
 if (!ready) return <div role="status" aria-busy="true" className="h-64 bg-skeleton-base motion-safe:animate-pulse">Starting isolated workspace…</div>;
 return <NextIntlClientProvider locale="en" messages={messages}><QueryClientProvider client={client}><ConfirmProvider>
  <label className="block text-primary">Mock scenario<select className="min-h-11 bg-input text-primary" onChange={event => { scenario.current = event.target.value as SuperadminPlatformConfigurationReleaseNotesDevelopmentScenario; void client.invalidateQueries(); }}>
   {SUPERADMIN_PLATFORM_CONFIGURATION_RELEASE_NOTES_DEVELOPMENT_SCENARIOS.map(value => <option key={value} value={value}>{value}</option>)}
  </select></label><Main />
 </ConfirmProvider></QueryClientProvider></NextIntlClientProvider>;
}
