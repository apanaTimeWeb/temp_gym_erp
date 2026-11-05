// RESPONSIBILITY: Renders ManagerInfrastructureQueryProvider's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import type { ManagerInfrastructureChildrenProps } from '@/app/frontend_manager/manager_infrastructure/types/ManagerInfrastructureChildrenProps';

// Mirrors AdminQueryProvider and SuperadminQueryProvider patterns.
// DATA FLOW: layout.tsx → ManagerInfrastructureQueryProvider → all manager pages


/** @description Wraps all Manager pages with TanStack Query's QueryClientProvider. @dependencies Data flow: layout.tsx → ManagerInfrastructureQueryProvider → all manager pages. @edge-case Preserves retry/recovery. */
export function ManagerInfrastructureQueryProvider({ children }: ManagerInfrastructureChildrenProps) {
  // useState ensures each session gets its own QueryClient instance (no cross-request state sharing)
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            retry: 1 } } })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
