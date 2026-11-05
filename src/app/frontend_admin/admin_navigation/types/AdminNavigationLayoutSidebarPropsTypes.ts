// RESPONSIBILITY: Defines the AdminNavigationLayoutSidebarPropsTypes route, lifecycle boundary, or module support artifact for admin_navigation_types; it does not expand the feature's approved scope.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_navigation/types/AdminNavigationLayoutSidebarPropsTypes.ts)

export interface AdminSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
}

export interface AdminNavigationLayoutSidebarNavigationProps {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  searchQuery: string;
}

export interface AdminNavigationLayoutSidebarBrandProps {
  isCollapsed: boolean;
  isMobileOpen: boolean;
}

export interface AdminNavigationLayoutSidebarUserFooterProps {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  mounted: boolean;
  userName?: string | null;
  userRole?: string | null;
}
