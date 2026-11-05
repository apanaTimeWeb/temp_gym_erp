"use client";
// RESPONSIBILITY: Exposes the shared Admin confirmation-dialog service.
// DATA FLOW: Admin feature → useAdminNavigationLayoutConfirm → AdminConfirmContext → AdminNavigationLayoutConfirmModal.

import { useContext } from 'react';
import { ConfirmContext } from '@/app/frontend_admin/admin_security/security_permissions_management/components/feedback/AdminSecurityPermissionsManagementConfirmProvider';
/** Coordinates Confirm state, data flow, and feature behavior. */
export const useAdminNavigationLayoutConfirm = () => {
  const context = useContext(ConfirmContext);
  return (context ?? { confirm: async () => true }) as NonNullable<typeof context>;
};
