"use client";
// RESPONSIBILITY: Reads the authenticated shell's zero-business data-density preference.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_navigation/hooks/useAdminNavigationLayoutDensity.ts)

import { useContext } from 'react';
import { AdminNavigationLayoutDensityContext } from '@/app/frontend_admin/admin_navigation/components/shell/AdminNavigationLayoutDensityContext';

/** Returns the active Admin density preference for shell controls. */
export function useAdminNavigationLayoutDensity() {
  const value = useContext(AdminNavigationLayoutDensityContext);
  if (!value) throw new Error('useAdminNavigationLayoutDensity must be used inside AdminNavigationLayoutDensityProvider');
  return value;
}
