"use client";
// RESPONSIBILITY: Defines the AdminNavigationLayoutSidebarBrand route, lifecycle boundary, or module support artifact for admin_navigation_components; it does not expand the feature's approved scope.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_navigation/components/sidebar_brand/AdminNavigationLayoutSidebarBrand.tsx)

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { AdminNavigationLayoutSidebarBrandProps } from '@/app/frontend_admin/admin_navigation/types/AdminNavigationLayoutSidebarPropsTypes';


export default function AdminNavigationLayoutSidebarBrand({
  isCollapsed,
  isMobileOpen,
}: AdminNavigationLayoutSidebarBrandProps) {
  const t = useTranslations();
  const showBrandText = !isCollapsed || isMobileOpen;

  return (
    <div className="flex items-center justify-center px-4 py-5 border-b border-border shrink-0">
      <div className="flex items-center gap-3 overflow-hidden">
        <Image
          src="/logo.png"
          alt={t('admin_navigation.AdminNavigationLayoutSidebar.text_1ca64e5fd3')}
          width={44}
          height={44}
          className="object-contain min-w-11 rounded-lg"
        />
        {showBrandText && (
          <div className={`whitespace-nowrap motion-safe:transition-opacity motion-safe:duration-slow flex flex-col ${isMobileOpen ? 'flex' : 'hidden xl:flex'}`}>
            <span className="text-primary font-bold text-lg leading-tight tracking-tight">
              {t('admin_navigation.AdminNavigationLayoutSidebar.text_3871a45480')}
            </span>
            <span
              className="text-xs text-warning font-bold uppercase tracking-wider -mt-0.5"
              data-testid="admin_navigation-adminlayout-status-1"
            >
              {t('admin_navigation.AdminNavigationLayoutSidebar.text_b31bc5e6ee')}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
