// RESPONSIBILITY: Exposes the shell-provided table density preference to Manager UI consumers; it does not persist settings.
// DATA FLOW: ManagerInfrastructureDataDensityProvider → context hook → header/table presentation.
'use client';

import { useContext } from 'react';
import { ManagerInfrastructureDataDensityContext } from '@/app/frontend_manager/manager_infrastructure/components/ManagerInfrastructureDataDensityProvider';

/**
 * @description Reads the current role-level table density and its update commands from the authenticated Manager shell.
 * @dependencies Uses ManagerInfrastructureDataDensityContext supplied by ManagerInfrastructureDataDensityProvider.
 * @edge-case Throws a clear integration error when a consumer is rendered outside the Manager density provider.
 * @returns The current density, a setter, and a toggle command.
 */
export function useManagerInfrastructureDataDensity() {
  const context = useContext(ManagerInfrastructureDataDensityContext);
  if (!context) throw new Error('Manager table density must be provided by ManagerInfrastructureDataDensityProvider.');
  return context;
}
