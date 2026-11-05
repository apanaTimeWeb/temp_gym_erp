// RESPONSIBILITY: Defines the AdminNavigationLayoutPropsTypes route, lifecycle boundary, or module support artifact for admin_navigation shell components; it does not expand the feature's approved scope.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_navigation/components/shell/types/AdminNavigationLayoutPropsTypes.ts)

import type { ReactNode } from 'react';
export interface AdminNavigationLayoutProps {
  children: ReactNode;
  /** Optional zero-business shell slot supplied by the host application for role-owned context controls. */
  headerContextSlot?: ReactNode;
}
