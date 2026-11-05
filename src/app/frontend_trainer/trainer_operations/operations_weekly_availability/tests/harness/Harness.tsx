"use client";

import { useEffect, useRef, useState } from 'react';
import type { TrainerOperationsOperationsWeeklyAvailabilityHarnessProps, TrainerOperationsOperationsWeeklyAvailabilityScenarioKey } from '../../types/TrainerOperationsOperationsWeeklyAvailabilityMockScenarioTypes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { startTrainerOperationsOperationsWeeklyAvailabilityMockHarness } from './bootstrap';
import TrainerOperationsOperationsWeeklyAvailabilityScenarioSelector from './ScenarioSelector';
import LocalProviders from '@/app/frontend_trainer/trainer_operations/operations_weekly_availability/components/TrainerOperationsWeeklyAvailabilityLocalProviders';

/** Isolated feature harness: local query cache, module providers, scenario switching, and injectable host session/theme adapters. */
export default function TrainerOperationsOperationsWeeklyAvailabilityHarness<TData>({
  children,
  baseHandlers,
  endpoint,
  activeData,
  sessionProvider,
  themeProvider,
}: TrainerOperationsOperationsWeeklyAvailabilityHarnessProps<TData>) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } },
  }));
  const [scenario, setScenario] = useState<TrainerOperationsOperationsWeeklyAvailabilityScenarioKey>('ACTIVE_RECORDS');
  const scenarioRef = useRef(scenario);
  const harnessRef = useRef<Awaited<ReturnType<typeof startTrainerOperationsOperationsWeeklyAvailabilityMockHarness>> | null>(null);
  const [workerStatus, setWorkerStatus] = useState<'starting' | 'ready' | 'failed'>('starting');

  useEffect(() => {
    let cancelled = false;
    setWorkerStatus('starting');
    void startTrainerOperationsOperationsWeeklyAvailabilityMockHarness(baseHandlers, endpoint, activeData, scenarioRef.current)
      .then((harness) => {
        if (cancelled) { harness.stop(); return; }
        harnessRef.current = harness;
        setWorkerStatus('ready');
      })
      .catch(() => { if (!cancelled) setWorkerStatus('failed'); });
    return () => {
      cancelled = true;
      harnessRef.current?.stop();
      harnessRef.current = null;
    };
  }, [baseHandlers, endpoint, activeData]);

  const handleScenarioChange = (nextScenario: TrainerOperationsOperationsWeeklyAvailabilityScenarioKey) => {
    scenarioRef.current = nextScenario;
    harnessRef.current?.selectScenario(nextScenario);
    setScenario(nextScenario);
    queryClient.clear();
  };

  const moduleContent = <LocalProviders>{children}</LocalProviders>;
  const themedContent = themeProvider ? themeProvider(moduleContent) : moduleContent;
  const sessionContent = sessionProvider ? sessionProvider(themedContent) : themedContent;

  return (
    <QueryClientProvider client={queryClient}>
      <div className="space-y-3" data-testid="trainer_operations_operations_weekly_availability-isolated-harness">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-card p-3">
          <TrainerOperationsOperationsWeeklyAvailabilityScenarioSelector value={scenario} onChange={handleScenarioChange} />
          <span role={workerStatus === 'failed' ? 'alert' : 'status'} className="text-xs text-secondary">
            {workerStatus === 'ready' ? 'Mock worker ready' : workerStatus === 'failed' ? 'Mock worker could not start; check the host MSW browser adapter.' : 'Starting mock worker…'}
          </span>
        </div>
        {sessionContent}
      </div>
    </QueryClientProvider>
  );
}
