// RESPONSIBILITY: Provides a non-React Admin toast API for feature hooks and global adapters without coupling them to react-hot-toast.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_navigation/components/feedback/AdminNavigationLayoutToastService.ts)

import { useAdminNavigationLayoutToastStore } from '@/app/frontend_admin/admin_profile/profile_overview/state/useAdminProfileOverviewToastStore';
import type { AdminToastType } from '@/app/frontend_admin/admin_profile/profile_overview/types/AdminProfileOverviewToastTypes';

export const adminToast = {
  show(message: string, type: AdminToastType, id?: string) {
    useAdminNavigationLayoutToastStore.getState().showToast(message, type, id);
  },
  success(message: string, id?: string) {
    this.show(message, 'success', id);
  },
  error(message: string, id?: string) {
    this.show(message, 'error', id);
  },
  info(message: string, id?: string) {
    this.show(message, 'info', id);
  },
  warning(message: string, id?: string) {
    this.show(message, 'warning', id);
  },
};
