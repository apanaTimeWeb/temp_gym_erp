// RESPONSIBILITY: Provides in-session compact/comfortable table density to the Manager shell; durable preference storage remains host-owned.
// DATA FLOW: layout.tsx → ManagerInfrastructureDataDensityProvider → header toggle and table presentation consumers.
'use client';

import { createContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

import type { ManagerInfrastructureDataDensity, ManagerInfrastructureDataDensityContextValue, ManagerInfrastructureDensityStyle } from '@/app/frontend_manager/manager_infrastructure/types/ManagerInfrastructureDataDensityTypes';

export const ManagerInfrastructureDataDensityContext = createContext<ManagerInfrastructureDataDensityContextValue | null>(null);

/**
 * @description Supplies the Manager-wide table density mode and design-token CSS variables for the authenticated role shell.
 * @dependencies Uses React context/state and the density contract defined in ManagerInfrastructureDataDensityTypes.
 * @edge-case Starts in the documented Comfortable default; it intentionally does not read/write browser storage because the approved host persistence utility is not present in this role ZIP.
 * @param children Authenticated Manager shell and route content that consumes density.
 * @returns A context provider with inherited row-height and font-size CSS variables.
 */
export function ManagerInfrastructureDataDensityProvider({ children }: { children: ReactNode }) {
  const [density, setDensity] = useState<ManagerInfrastructureDataDensity>('comfortable');
  const value = useMemo<ManagerInfrastructureDataDensityContextValue>(() => ({
    density,
    setDensity,
    toggleDensity: () => setDensity((current) => current === 'comfortable' ? 'compact' : 'comfortable'),
  }), [density]);
  const densityStyle: ManagerInfrastructureDensityStyle = {
    '--manager-table-row-height': density === 'compact' ? 'var(--table-row-height-compact, 32px)' : 'var(--table-row-height, 48px)',
    '--manager-table-font-size': density === 'compact' ? 'var(--font-size-caption, 12px)' : 'var(--font-size-body, 14px)',
  };

  return (
    <ManagerInfrastructureDataDensityContext.Provider value={value}>
      <div className="contents" data-manager-table-density={density} style={densityStyle}>{children}</div>
    </ManagerInfrastructureDataDensityContext.Provider>
  );
}
