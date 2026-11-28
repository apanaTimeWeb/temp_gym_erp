"use client";
// RESPONSIBILITY: Root Admin shell. Owns only sidebar collapse, persistent header, global Admin feedback, and shell-level alerts.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_navigation/components/shell/AdminNavigationLayout.tsx)

import { useState, useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldAlert, LogOut } from 'lucide-react';
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
  const [ghostGymName, setGhostGymName] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;
    const tabletQuery = window.matchMedia('(min-width: 768px) and (max-width: 1023px)');
    if (tabletQuery.matches) setIsCollapsed(true);
    const handleTabletChange = (event: MediaQueryListEvent) => setIsCollapsed(event.matches);
    tabletQuery.addEventListener('change', handleTabletChange);
    return () => tabletQuery.removeEventListener('change', handleTabletChange);
  }, []);

  useEffect(() => {
    try {
      const storedGym = localStorage.getItem('ghost_login_gym_name');
      if (storedGym) {
        setGhostGymName(storedGym);
      }
    } catch {
      // safe fallback for restricted storage environments
    }
  }, []);

  const handleExitGhostLogin = () => {
    try {
      localStorage.removeItem('ghost_login_tenant_id');
      localStorage.removeItem('ghost_login_gym_name');
      localStorage.removeItem('ghost_login_gym_code');
    } catch {
      // safe fallback
    }
    setGhostGymName(null);
    router.push('/frontend_superadmin/superadmin_gyms/gyms_directory');
  };

  return (
    <AdminNavigationLayoutDensityProvider>
      <div className={`${AdminShellPrint.adminShellRoot} min-h-screen bg-page text-text-primary trainer-aurora-canvas`} data-admin-shell>
        {ghostGymName && (
          <aside
            role="status"
            aria-live="polite"
            className="sticky top-0 z-50 flex items-center justify-between gap-4 bg-amber-500 px-4 py-2 text-xs font-semibold text-slate-950 shadow-md"
            data-testid="admin-ghost-login-banner"
          >
            <div className="flex items-center gap-2 min-w-0">
              <ShieldAlert size={16} className="shrink-0 text-slate-950" />
              <span className="truncate">
                Ghost Login Active: Viewing Admin Portal for <strong>{ghostGymName}</strong>
              </span>
            </div>
            <button
              type="button"
              onClick={handleExitGhostLogin}
              className="inline-flex min-h-8 shrink-0 items-center gap-1.5 rounded bg-slate-950 px-3 py-1 text-xs font-bold text-white shadow-sm transition-all hover:bg-slate-800 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950"
              data-testid="admin-exit-ghost-login-btn"
            >
              <LogOut size={13} />
              <span>Exit Impersonation</span>
            </button>
          </aside>
        )}
        <div data-admin-shell-header><AdminNavigationLayoutHeader headerContextSlot={headerContextSlot} isSidebarCollapsed={isCollapsed} /></div>
        <AdminNavigationLayoutSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <main data-admin-shell-main className={`min-h-screen min-w-0 overflow-x-hidden pt-16 motion-safe:transition-all motion-safe:duration-base ${isCollapsed ? 'md:ml-[60px]' : 'md:ml-60'}`}>
          {children}
        </main>
        <AdminNavigationLayoutResponsiveTableProvider />
        <div data-admin-shell-command-palette><AdminNavigationLayoutCommandPalette /></div>
        <AdminNavigationLayoutKeyboardShortcuts />
      </div>
    </AdminNavigationLayoutDensityProvider>
  );
}
