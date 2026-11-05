// RESPONSIBILITY: Renders ManagerMocksTestProviders's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ManagerConfirmProvider } from '@/components/ui/manager_confirm_provider/ManagerConfirmProvider';

import type { ManagerMocksTestProvidersProps } from '@/app/frontend_manager/manager_infrastructure/mocks/ManagerMocksTestProvidersTypes';


/** @description Test-only providers used by Manager behavior tests; mounts real feature components against isolated TanStack Query and confirmation contexts. @dependencies Local dependencies are owned by this feature module (1 documented module/import dependencies).. @edge-case Preserves retry/recovery. */
export function ManagerMocksTestProviders({ children }: ManagerMocksTestProvidersProps) {
  const [queryClient] = useState(() => new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } }));
  return <QueryClientProvider client={queryClient}><ManagerConfirmProvider>{children}</ManagerConfirmProvider></QueryClientProvider>;
}
