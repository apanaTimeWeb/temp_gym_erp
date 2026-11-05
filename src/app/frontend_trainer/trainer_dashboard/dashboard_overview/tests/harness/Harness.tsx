"use client";

import { useEffect, useRef, useState } from 'react';
import type { TrainerDashboardDashboardOverviewHarnessProps, TrainerDashboardDashboardOverviewScenarioKey } from '../../types/TrainerDashboardDashboardOverviewMockScenarioTypes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { startTrainerDashboardDashboardOverviewMockHarness } from './bootstrap';
import TrainerDashboardDashboardOverviewScenarioSelector from './ScenarioSelector';

/** Isolated feature harness: local query cache, module providers, scenario switching, and injectable host session/theme adapters. */
export default function TrainerDashboardDashboardOverviewHarness<TData>({
  children,
  baseHandlers,
  endpoint,
  activeData,
  sessionProvider,
  themeProvider,
}: TrainerDashboardDashboardOverviewHarnessProps<TData>) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } },
  }));
  const [scenario, setScenario] = useState<TrainerDashboardDashboardOverviewScenarioKey>('ACTIVE_RECORDS');
  const scenarioRef = useRef(scenario);
  const harnessRef = useRef<Awaited<ReturnType<typeof startTrainerDashboardDashboardOverviewMockHarness>> | null>(null);
  const [workerStatus, setWorkerStatus] = useState<'starting' | 'ready' | 'failed'>('starting');

  useEffect(() => {
    let cancelled = false;
    setWorkerStatus('starting');
    void startTrainerDashboardDashboardOverviewMockHarness(baseHandlers, endpoint, activeData, scenarioRef.current)
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

  const handleScenarioChange = (nextScenario: TrainerDashboardDashboardOverviewScenarioKey) => {
    scenarioRef.current = nextScenario;
    harnessRef.current?.selectScenario(nextScenario);
    setScenario(nextScenario);
    queryClient.clear();
  };

  const moduleContent = <>{children}</>;
  const themedContent = themeProvider ? themeProvider(moduleContent) : moduleContent;
  const sessionContent = sessionProvider ? sessionProvider(themedContent) : themedContent;

  return (
    <QueryClientProvider client={queryClient}>
      <div className="space-y-3" data-testid="trainer_dashboard_dashboard_overview-isolated-harness">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-card p-3">
          <TrainerDashboardDashboardOverviewScenarioSelector value={scenario} onChange={handleScenarioChange} />
          <span role={workerStatus === 'failed' ? 'alert' : 'status'} className="text-xs text-secondary">
            {workerStatus === 'ready' ? 'Mock worker ready' : workerStatus === 'failed' ? 'Mock worker could not start; check the host MSW browser adapter.' : 'Starting mock worker…'}
          </span>
        </div>
        {sessionContent}
      </div>
    </QueryClientProvider>
  );
}
