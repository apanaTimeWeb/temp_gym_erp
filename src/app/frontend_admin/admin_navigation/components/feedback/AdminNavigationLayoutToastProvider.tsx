"use client";
// RESPONSIBILITY: Renders/orchestrates AdminNavigationLayoutToastProvider for the admin module; UI composition stays here and business/API logic remains in dedicated hooks and APIs.
// DATA FLOW: Admin module UI → local UI state / feature hooks → approved global infrastructure or module-owned APIs.

import AdminNavigationLayoutToast from '@/app/frontend_admin/admin_navigation/components/feedback/AdminNavigationLayoutToast';
import { useAdminNavigationLayoutToastStore } from '@/app/frontend_admin/admin_navigation/state/useAdminNavigationLayoutToastStore';

/**
 * AdminNavigationLayoutToastProvider renders the admin toast provider UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 */
export function AdminNavigationLayoutToastProvider() {
  const { toast, hideToast } = useAdminNavigationLayoutToastStore();

  if (!toast) return null;

  return (
    <AdminNavigationLayoutToast
      key={toast.id}
      id={toast.id}
      message={toast.message}
      type={toast.type}
      onClose={() => hideToast(toast.id)}
    />
  );
}
