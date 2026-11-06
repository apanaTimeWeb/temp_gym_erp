"use client";
// RESPONSIBILITY: Root Admin shell. Owns only sidebar collapse, persistent header, global Admin feedback, and shell-level alerts.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_navigation/components/shell/AdminNavigationLayout.tsx)

import { useState, type ReactNode } from 'react';
import AdminNavigationLayoutSidebar from '@/app/frontend_admin/admin_navigation/components/AdminNavigationLayoutSidebar';
import AdminNavigationLayoutHeader from '@/app/frontend_admin/admin_navigation/components/AdminNavigationLayoutHeader';
import AdminNavigationLayoutResponsiveTableProvider from '@/app/frontend_admin/admin_navigation/components/shell/AdminNavigationLayoutResponsiveTableProvider';
import { AdminNavigationLayoutDensityProvider } from '@/app/frontend_admin/admin_navigation/components/shell/AdminNavigationLayoutDensityProvider';
import AdminNavigationLayoutCommandPalette from '@/app/frontend_admin/admin_navigation/components/command_palette/AdminNavigationLayoutCommandPalette';
import AdminNavigationLayoutKeyboardShortcuts from '@/app/frontend_admin/admin_navigation/components/AdminNavigationLayoutKeyboardShortcuts';
import AdminShellPrint from '@/app/frontend_admin/admin_navigation/components/shell/AdminNavigationLayoutShellPrint.module.css';

import type { AdminNavigationLayoutProps } from '@/app/frontend_admin/admin_navigation/types/AdminNavigationLayoutPropsTypes';


/**
 * AdminNavigationLayout renders the admin layout UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 */
export default function AdminNavigationLayout({ children, headerContextSlot }: AdminNavigationLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <AdminNavigationLayoutDensityProvider>
      <div className={`${AdminShellPrint.adminShellRoot} min-h-screen bg-page text-primary`} data-admin-shell>
        <div data-admin-shell-header><AdminNavigationLayoutHeader headerContextSlot={headerContextSlot} /></div>
        <AdminNavigationLayoutSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <main data-admin-shell-main className={`min-h-screen pt-16 motion-safe:transition-all motion-safe:duration-slow ${isCollapsed ? 'md:ml-16' : 'md:ml-60'}`}>
          {children}
        </main>
        <AdminNavigationLayoutResponsiveTableProvider />
        <div data-admin-shell-command-palette><AdminNavigationLayoutCommandPalette /></div>
        <AdminNavigationLayoutKeyboardShortcuts />
      </div>
    </AdminNavigationLayoutDensityProvider>
  );
}
