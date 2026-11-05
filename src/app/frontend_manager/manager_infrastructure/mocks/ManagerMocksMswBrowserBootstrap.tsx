// RESPONSIBILITY: Renders ManagerMocksMswBrowserBootstrap's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useEffect, useState } from 'react';

import { logger } from '@/lib/logger';

import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureEnvConfig';
import { managerMswWorker } from '@/app/frontend_manager/manager_infrastructure/mocks/ManagerMocksMswBrowser';
import type { ManagerMocksMswBrowserBootstrapProps } from '@/app/frontend_manager/manager_infrastructure/mocks/ManagerMocksMswBrowserBootstrapTypes';


// In production there is no MSW — children render immediately.
// In development we gate rendering behind MSW startup so the first queries
// always fire AFTER the mock service worker is listening (no race condition).
/**
 * @description Renders/orchestrates the ManagerMocksMswBrowserBootstrap user interface for the manager infrastructure module without owning sibling business logic.
 * @dependencies @/lib/logger; @/app/frontend_manager/manager_infrastructure/manager_infrastructure_constants/ManagerEnvConfig; @/app/frontend_manager/manager_mocks/manager_mocks_utils/ManagerMswBrowser; @/app/frontend_manager/manager_mocks/manager_mocks_types/ManagerMswBrowserBootstrapTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
const IS_PROD = ManagerEnvConfig.isProduction;

/** @description Renders the ManagerMocksMswBrowserBootstrap component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (4 documented module/import dependencies).. @edge-case Preserves error state. */
export function ManagerMocksMswBrowserBootstrap({ children }: ManagerMocksMswBrowserBootstrapProps) {
  const [ready, setReady] = useState(IS_PROD);
  const [startupError, setStartupError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  // EFFECT: Starts MSW once after mount so initial Manager queries do not race worker registration.
  useEffect(() => {
    let active = true;

    const startWorker = async () => {
      if (IS_PROD) {
        if (active) setReady(true);
        return;
      }

      setReady(false);
      setStartupError(false);
      try {
        await managerMswWorker.start({
          onUnhandledRequest(request) {
            const pathname = new URL(request.url).pathname;
            const managerApiPrefix = `${ManagerEnvConfig.apiBaseUrl.replace(/\/$/, '')}/manager/`;
            if (pathname.startsWith(managerApiPrefix)) {
              logger.error('Unhandled Manager MSW request', { method: request.method, pathname, module: 'manager', route: pathname });
            }
          } });
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        if (/already (?:been )?started|already active/i.test(message)) {
          if (active) setReady(true);
          return;
        }
        logger.error('Manager MSW worker failed to start; manager queries remain blocked until startup succeeds.', { module: 'manager', error });
        if (active) setStartupError(true);
        return;
      }

      if (active) setReady(true);
    };

    void startWorker();

    return () => {
      active = false;
    };
  }, [retryCount]);

  if (startupError) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-page p-6">
        <section role="alert" aria-live="assertive" className="w-full max-w-md rounded-xl border border-border bg-card p-6 text-center shadow-card">
          <p className="text-sm text-text-primary">Manager mock services could not be started. Reloading them may resolve the issue.</p>
          <button type="button" onClick={() => setRetryCount((count) => count + 1)} className="mt-4 min-h-11 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-on-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring">Retry startup</button>
        </section>
      </main>
    );
  }

  if (!ready) {
    return <div className="min-h-screen bg-page" role="status" aria-label="Starting manager mock services" />;
  }

  return children;
}
