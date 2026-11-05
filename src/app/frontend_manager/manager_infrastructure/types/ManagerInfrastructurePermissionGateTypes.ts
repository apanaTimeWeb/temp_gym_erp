// RESPONSIBILITY: Type definitions for the owning Manager UI component.
import type { ReactNode } from 'react';

export interface ManagerInfrastructurePermissionGateProps {
  capability: string;
  children: ReactNode;
}
