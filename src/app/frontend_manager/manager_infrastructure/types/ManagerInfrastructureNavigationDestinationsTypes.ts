import type { ReactNode } from 'react';

export type ManagerInfrastructureNavigationDestinations = Readonly<Record<string, string>>;

export interface ManagerInfrastructureNavigationDestinationsProviderProps {
  destinations: ManagerInfrastructureNavigationDestinations;
  children: ReactNode;
}
