// RESPONSIBILITY: Defines the reusable responsive-table and row-menu presentation contracts; feature actions remain owned by their source rows.
import type { CSSProperties, ReactElement, ReactNode } from 'react';

export interface ManagerInfrastructureResponsiveTableProps {
  mobilePattern?: 'card-stack' | 'horizontal-scroll';
  /** Column labels in the same order as the table's data cells. */
  labels: readonly string[];
  children: ReactElement;
  className?: string;
}

export interface ManagerInfrastructureTableRowActionMenuProps {
  label: string;
  testId: string;
  children: ReactNode;
}

export type ManagerInfrastructureTableElementWithChildren = ReactElement<{
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  [key: string]: unknown;
}>;
