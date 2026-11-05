// DATA FLOW: Authenticated Manager shell destination registry → context provider → feature navigation hook → requesting component.
'use client';

import { useContext } from 'react';

import { ManagerInfrastructureNavigationDestinationsContext } from '@/app/frontend_manager/manager_infrastructure/components/ManagerInfrastructureNavigationDestinationsProvider';

/** Resolves a shell-provided route by key; feature modules never import sibling URL/API contracts. */
export function useManagerInfrastructureNavigationDestination(key: string): string {
  const destinations = useContext(ManagerInfrastructureNavigationDestinationsContext);
  if (!destinations) {
    throw new Error('Manager navigation destinations must be provided by the authenticated Manager shell.');
  }
  const destination = destinations[key];
  if (!destination) {
    throw new Error(`Manager navigation destination "${key}" is not registered by the role shell.`);
  }
  return destination;
}
