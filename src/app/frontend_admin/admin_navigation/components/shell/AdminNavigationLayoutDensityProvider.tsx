"use client";
// RESPONSIBILITY: Provides the zero-business Admin data-density preference to the authenticated shell.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_navigation/components/shell/AdminNavigationLayoutDensityProvider.tsx)

import { useMemo, useState } from 'react';
import styles from '@/app/frontend_admin/admin_navigation/components/shell/AdminNavigationLayoutDensity.module.css';
import { AdminNavigationLayoutDensityContext } from '@/app/frontend_admin/admin_navigation/components/shell/AdminNavigationLayoutDensityContext';
import type { AdminDensity, AdminNavigationLayoutDensityProviderProps } from '@/app/frontend_admin/admin_navigation/types/AdminNavigationLayoutTypes';

/** Provides the compact/comfortable density setting without owning server state. */
export function AdminNavigationLayoutDensityProvider({ children }: AdminNavigationLayoutDensityProviderProps) {
  const [density, setDensity] = useState<AdminDensity>('comfortable');
  const toggleDensity = useMemo(() => () => setDensity((current) => current === 'comfortable' ? 'compact' : 'comfortable'), []);
  const value = useMemo(() => ({ density, setDensity, toggleDensity }), [density, toggleDensity]);
  return <AdminNavigationLayoutDensityContext.Provider value={value}><div data-admin-density={density} className={`min-h-screen ${styles.densityRoot}`}>{children}</div></AdminNavigationLayoutDensityContext.Provider>;
}
