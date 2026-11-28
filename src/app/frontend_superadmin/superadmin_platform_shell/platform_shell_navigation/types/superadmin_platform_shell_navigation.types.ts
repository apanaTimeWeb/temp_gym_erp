// RESPONSIBILITY: Defines all TypeScript prop interfaces for Superadmin layout shell components (Header, Sidebar). Single source of truth for layout prop contracts.

export interface SuperadminPlatformShellLayoutSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (v: boolean) => void;
  isMobileOpen?: boolean;
  setIsMobileOpen?: (v: boolean) => void;
}

export interface SuperadminPlatformShellLayoutHeaderProps {
  isSidebarCollapsed?: boolean;
  isMobileSidebarOpen?: boolean;
  isMobileViewport?: boolean;
  onToggleSidebar?: () => void;
}
