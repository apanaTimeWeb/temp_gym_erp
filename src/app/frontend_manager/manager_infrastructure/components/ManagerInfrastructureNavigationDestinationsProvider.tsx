// RESPONSIBILITY: Provides the role shell’s route-only navigation destinations through React context so feature modules can consume approved destinations without importing sibling URL configuration; it does not resolve permissions, perform navigation, or own feature routes.
'use client';

import { createContext, useMemo } from 'react';

import type { ManagerInfrastructureNavigationDestinations, ManagerInfrastructureNavigationDestinationsProviderProps } from '@/app/frontend_manager/manager_infrastructure/types/ManagerInfrastructureNavigationDestinationsTypes';

export const ManagerInfrastructureNavigationDestinationsContext = createContext<ManagerInfrastructureNavigationDestinations | null>(null);

export default function ManagerInfrastructureNavigationDestinationsProvider({
  destinations,
  children,
}: ManagerInfrastructureNavigationDestinationsProviderProps) {
  const stableDestinations = useMemo(() => destinations, [destinations]);
  return (
    <ManagerInfrastructureNavigationDestinationsContext.Provider value={stableDestinations}>
      {children}
    </ManagerInfrastructureNavigationDestinationsContext.Provider>
  );
}
