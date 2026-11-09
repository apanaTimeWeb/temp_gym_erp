// DATA FLOW: Authenticated Manager shell destination registry → context provider → feature navigation hook → requesting component.
'use client';

import { useContext } from 'react';

import { ManagerInfrastructureNavigationDestinationsContext } from '@/app/frontend_manager/manager_infrastructure/components/ManagerInfrastructureNavigationDestinationsProvider';

const DEFAULT_DESTINATIONS: Record<string, string> = {
  MEMBERS: '/frontend_manager/manager_members/members_directory',
  FINANCE: '/frontend_manager/manager_finance_expenses/finance_payments_and_summary',
};

/** Resolves a shell-provided route by key; feature modules never import sibling URL/API contracts. */
export function useManagerInfrastructureNavigationDestination(key: string): string {
  const destinations = useContext(ManagerInfrastructureNavigationDestinationsContext);
  if (!destinations) {
    return DEFAULT_DESTINATIONS[key] ?? '#';
  }
  const destination = destinations[key];
  if (!destination) {
    throw new Error(`Manager navigation destination "${key}" is not registered by the role shell.`);
  }
  return destination;
}
