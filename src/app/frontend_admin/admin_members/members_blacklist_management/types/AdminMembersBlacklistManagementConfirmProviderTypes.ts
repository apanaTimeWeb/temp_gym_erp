// RESPONSIBILITY: Defines the children contract for the global zero-business confirmation provider.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_navigation/types/AdminNavigationLayoutConfirmProviderTypes.ts)

import type { ReactNode } from 'react';

export interface AdminConfirmProviderProps {
  children: ReactNode;
}
