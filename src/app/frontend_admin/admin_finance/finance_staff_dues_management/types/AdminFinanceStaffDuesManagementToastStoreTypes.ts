// RESPONSIBILITY: Defines the AdminNavigationLayoutToastStoreTypes route, lifecycle boundary, or module support artifact for admin_navigation shell types; it does not expand the feature's approved scope.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_navigation/types/AdminNavigationLayoutToastStoreTypes.ts)

// Type contract owned by this module; kept outside implementation files for AI isolation.

import type { AdminToastType } from '@/app/frontend_admin/admin_finance/finance_staff_dues_management/types/AdminFinanceStaffDuesManagementToastTypes';
export interface ToastState {
  toast: { id: string; message: string; type: AdminToastType } | null;
  showToast: (message: string, type: AdminToastType, id?: string) => void;
  hideToast: (id?: string) => void;
}
