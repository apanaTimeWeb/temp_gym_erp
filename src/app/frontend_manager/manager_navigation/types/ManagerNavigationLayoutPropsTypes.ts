// RESPONSIBILITY: Defines navigation shell layout and test-link props.
import type { ReactNode } from 'react';

export interface ManagerNavigationLayoutProps {
  children: ReactNode;
}

export interface ManagerNavigationBreadcrumbTestLinkProps {
  href: string;
  children: ReactNode;
}

export interface ManagerRoleLayoutProps {
  children: ReactNode;
}
