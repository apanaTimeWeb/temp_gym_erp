"use client";

import { useEffect, useRef, useState } from 'react';
import type { TrainerOperationsOperationsMemberAttendanceHarnessProps, TrainerOperationsOperationsMemberAttendanceScenarioKey } from '../../types/TrainerOperationsOperationsMemberAttendanceMockScenarioTypes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { startTrainerOperationsOperationsMemberAttendanceMockHarness } from './bootstrap';
import TrainerOperationsOperationsMemberAttendanceScenarioSelector from './ScenarioSelector';
import LocalProviders from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/components/TrainerOperationsMemberAttendanceLocalProviders';

/** Isolated feature harness: local query cache, module providers, scenario switching, and injectable host session/theme adapters. */
export default function TrainerOperationsOperationsMemberAttendanceHarness<TData>({
  children,
  baseHandlers,
  endpoint,
  activeData,
  sessionProvider,
  themeProvider,
}: TrainerOperationsOperationsMemberAttendanceHarnessProps<TData>) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } },
  }));
  const [scenario, setScenario] = useState<TrainerOperationsOperationsMemberAttendanceScenarioKey>('ACTIVE_RECORDS');
  const scenarioRef = useRef(scenario);
  const harnessRef = useRef<Awaited<ReturnType<typeof startTrainerOperationsOperationsMemberAttendanceMockHarness>> | null>(null);
  const [workerStatus, setWorkerStatus] = useState<'starting' | 'ready' | 'failed'>('starting');

  useEffect(() => {
    let cancelled = false;
    setWorkerStatus('starting');
    void startTrainerOperationsOperationsMemberAttendanceMockHarness(baseHandlers, endpoint, activeData, scenarioRef.current)
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

  const handleScenarioChange = (nextScenario: TrainerOperationsOperationsMemberAttendanceScenarioKey) => {
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
      <div className="space-y-3" data-testid="trainer_operations_operations_member_attendance-isolated-harness">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-card p-3">
          <TrainerOperationsOperationsMemberAttendanceScenarioSelector value={scenario} onChange={handleScenarioChange} />
          <span role={workerStatus === 'failed' ? 'alert' : 'status'} className="text-xs text-secondary">
            {workerStatus === 'ready' ? 'Mock worker ready' : workerStatus === 'failed' ? 'Mock worker could not start; check the host MSW browser adapter.' : 'Starting mock worker…'}
          </span>
        </div>
        {sessionContent}
      </div>
    </QueryClientProvider>
  );
}
