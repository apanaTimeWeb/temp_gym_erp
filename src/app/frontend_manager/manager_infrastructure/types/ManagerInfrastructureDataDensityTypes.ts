// RESPONSIBILITY: Defines the role-level table-density state contract; it does not persist preferences or own host settings.
// DATA FLOW: Manager shell provider → density context → table/header consumers.
import type { CSSProperties } from 'react';

export type ManagerInfrastructureDataDensity = 'compact' | 'comfortable';

export interface ManagerInfrastructureDataDensityContextValue {
  density: ManagerInfrastructureDataDensity;
  setDensity: (density: ManagerInfrastructureDataDensity) => void;
  toggleDensity: () => void;
}

export type ManagerInfrastructureDensityStyle = CSSProperties & {
  '--manager-table-row-height'?: string;
  '--manager-table-font-size'?: string;
};
