"use client";
// RESPONSIBILITY: Defines the AdminNavigationLayoutSidebarUserFooter route, lifecycle boundary, or module support artifact for admin_navigation_components; it does not expand the feature's approved scope.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_navigation/components/sidebar_user_footer/AdminNavigationLayoutSidebarUserFooter.tsx)

import { useTranslations } from 'next-intl';
import type { AdminNavigationLayoutSidebarUserFooterProps } from '@/app/frontend_admin/admin_navigation/types/AdminNavigationLayoutSidebarPropsTypes';


export default function AdminNavigationLayoutSidebarUserFooter({
  isCollapsed,
  isMobileOpen,
  mounted,
  userName,
  userRole,
}: AdminNavigationLayoutSidebarUserFooterProps) {
  const t = useTranslations();
  const showDetails = !isCollapsed || isMobileOpen;
  const displayName = mounted
    ? userName || t('admin_navigation.AdminNavigationLayoutSidebar.remaining_adminUser')
    : t('admin_navigation.AdminNavigationLayoutSidebar.remaining_adminUser');
  const displayRole = mounted
    ? userRole || t('admin_navigation.AdminNavigationLayoutSidebar.remaining_roleUnavailable')
    : t('admin_navigation.AdminNavigationLayoutSidebar.remaining_roleUnavailable');

  return (
    <div className={`px-4 py-4 border-t border-border bg-header shrink-0 flex items-center ${showDetails ? 'gap-3' : 'justify-center'}`}>
      <div className="w-10 h-10 min-w-10 rounded-full flex items-center justify-center text-on-primary text-sm font-bold border border-border bg-primary">
        {mounted ? (userName?.charAt(0)?.toUpperCase() || 'A') : 'A'}
      </div>
      {showDetails && (
        <div className={`whitespace-nowrap overflow-hidden flex-1 ${isMobileOpen ? 'block' : 'hidden xl:block'}`}>
          <div className="text-primary text-sm font-bold truncate">{displayName}</div>
          <div className="text-secondary text-xs truncate">{displayRole}</div>
        </div>
      )}
    </div>
  );
}
