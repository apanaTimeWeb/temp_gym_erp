"use client";

import { useEffect, useRef, useState } from 'react';
import type { TrainerOperationsOperationsTrainerAttendanceHarnessProps, TrainerOperationsOperationsTrainerAttendanceScenarioKey } from '../../types/TrainerOperationsOperationsTrainerAttendanceMockScenarioTypes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { startTrainerOperationsOperationsTrainerAttendanceMockHarness } from './bootstrap';
import TrainerOperationsOperationsTrainerAttendanceScenarioSelector from './ScenarioSelector';

/** Isolated feature harness: local query cache, module providers, scenario switching, and injectable host session/theme adapters. */
export default function TrainerOperationsOperationsTrainerAttendanceHarness<TData>({
  children,
  baseHandlers,
  endpoint,
  activeData,
  sessionProvider,
  themeProvider,
}: TrainerOperationsOperationsTrainerAttendanceHarnessProps<TData>) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } },
  }));
  const [scenario, setScenario] = useState<TrainerOperationsOperationsTrainerAttendanceScenarioKey>('ACTIVE_RECORDS');
  const scenarioRef = useRef(scenario);
  const harnessRef = useRef<Awaited<ReturnType<typeof startTrainerOperationsOperationsTrainerAttendanceMockHarness>> | null>(null);
  const [workerStatus, setWorkerStatus] = useState<'starting' | 'ready' | 'failed'>('starting');

  useEffect(() => {
    let cancelled = false;
    setWorkerStatus('starting');
    void startTrainerOperationsOperationsTrainerAttendanceMockHarness(baseHandlers, endpoint, activeData, scenarioRef.current)
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

  const handleScenarioChange = (nextScenario: TrainerOperationsOperationsTrainerAttendanceScenarioKey) => {
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
      <div className="space-y-3" data-testid="trainer_operations_operations_trainer_attendance-isolated-harness">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-card p-3">
          <TrainerOperationsOperationsTrainerAttendanceScenarioSelector value={scenario} onChange={handleScenarioChange} />
          <span role={workerStatus === 'failed' ? 'alert' : 'status'} className="text-xs text-secondary">
            {workerStatus === 'ready' ? 'Mock worker ready' : workerStatus === 'failed' ? 'Mock worker could not start; check the host MSW browser adapter.' : 'Starting mock worker…'}
          </span>
        </div>
        {sessionContent}
      </div>
    </QueryClientProvider>
  );
}
